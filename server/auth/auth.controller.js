const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const logger = require('../../config/logger')(module);
const joiErrMsg = require('../utils/JoiErrorMessage');
const asyncHandler = require('../middleware/async');
const ErrRes = require('../utils/errorResponse');
const jwt = require('jsonwebtoken');
const config = require('../../config/config');

const redis = require('../../index.redis');
const tokenGenerator = require('../utils/tokenGenerator');

const getModel = require('../utils/chooseModel');

const {
  userValidation,
  adminValidation,
  loginValidation,
  verifyAccountValidation,
  createNewPasswordVal,
  resetPasswordVal,
  forgetPasswordVal,
} = require('./auth.validation');
const { userModel, adminModel, contactUsModel } = require('./auth.model');
const {
  sendMailForVerifyAccount,
  sendMailForgetPasswordToken,
} = require('../../config/sendMail');

exports.registerUser = asyncHandler(async (req, res, next) => {
  const { error } = userValidation(req.body);
  if (error) {
    const joiErr = joiErrMsg(error);
    return next(new ErrRes(joiErr.message, 400, joiErr.errorField));
  }

  const {
    fullname,
    email,
    password,
    confirmPassword,
    homeAddress,
    flatNo,
    identifier,
    contactNo,
    role,
    facebookID,
    gmailID,
  } = req.body;

  if (password !== confirmPassword)
    return next(new ErrRes('Password is not matching', 401, 'Password'));

  if (facebookID) {
    const isPresent = await userModel.findOne({ facebookID });
    if (isPresent)
      return next(
        new ErrRes('This account is already exists', 400, 'FacebookID')
      );
  }
  if (gmailID) {
    const isPresent = await userModel.findOne({ gmailID });
    if (isPresent)
      return next(new ErrRes('This account is already exists', 400, 'GmailID'));
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  // Will Search here location and find this locationID.
  const location = new mongoose.Types.ObjectId();
  // It is just a dummy data... for now.

  const user = new userModel({
    fullname,
    email,
    hashedPassword,
    location,
    contactNo,
    role,
    facebookID,
    gmailID,
  });

  await user.save();
  const verifyToken = tokenGenerator();
  await sendMailForVerifyAccount(fullname, email, verifyToken, 'USER');
  await redis.set(`VA${verifyToken}`, user._id, 'PX', 24 * 60 * 60 * 1000);
  return res.status(201).json({ success: true });
});
exports.registerAdmin = asyncHandler(async (req, res, next) => {
  const { error } = adminValidation(req.body);
  if (error) return next(new ErrRes(joiErrMsg(error), 400));

  const {
    fullname,
    email,
    password,
    confirmPassword,
    identity,
    contactNo,
    facebookID,
    gmailID,
  } = req.body;

  if (password !== confirmPassword)
    return next(new ErrRes('Password is not matching', 401));

  if (facebookID) {
    const isPresent = await adminModel.findOne({ facebookID });
    if (isPresent)
      return res.status(400).json({
        success: false,
        message: 'Account is already created with this ID',
      });
  }
  if (gmailID) {
    const isPresent = await adminModel.findOne({ gmailID });
    if (isPresent)
      return res.status(400).json({
        success: false,
        message: 'Account is already created with this ID',
      });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new adminModel({
    fullname,
    email,
    hashedPassword,
    identity,
    contactNo,
    facebookID,
    gmailID,
  });

  await user.save();
  const verifyToken = tokenGenerator();
  await sendMailForVerifyAccount(fullname, email, verifyToken, 'ADMIN');
  await redis.set(`VA${verifyToken}`, user._id, 'PX', 24 * 60 * 60 * 1000); // 1 day
  return res.status(201).json({ success: true });
});
exports.verifyAccount = asyncHandler(async (req, res, next) => {
  const { error } = verifyAccountValidation(req.body);
  if (error) return next(new ErrRes(joiErrMsg(error), 400));

  const { token, role } = req.query;
  // role === USER || ADMIN
  const identifyUser = await redis.get(`VA${token}`);
  if (!identifyUser) return res.status(401).json({ success: false });
  let roleDbModel = getModel(role);
  let user = await roleDbModel.findById(identifyUser);
  user.isVerified = true;
  await user.save();
  await redis.del(`VA${token}`);
  return res.status(200).json({ success: true });
});
exports.login = asyncHandler(async (req, res, next) => {
  const { error } = loginValidation(req.body);
  if (error) {
    if (error) {
      const joiErr = joiErrMsg(error);
      return next(new ErrRes(joiErr.message, 400, joiErr.errorField));
    }
  }
  console.log(req.body);
  const {
    gmailID,
    facebookID,
    contactInfo,
    password,
    role,
    infoMed,
  } = req.body;
  let roleDbModel = getModel(role);
  let user;
  if (gmailID) {
    user = await roleDbModel.findOne({ gmailID });
    if (!user) return next(new ErrRes('User not found', 404, 'GmailID'));
  } else if (facebookID) {
    user = await roleDbModel.findOne({ facebookID });
    if (!user) return next(new ErrRes('User not found', 404, 'FacebookID'));
  } else {
    if (!(contactInfo && password))
      return next(new ErrRes('Please provide Contact Info & Password', 400));

    if (!infoMed) {
      return next(new ErrRes('Please provide infoMed', 400));
    }
    if (infoMed === 'EMAIL') {
      user = await roleDbModel
        .findOne({ email: contactInfo })
        .select('+hashedPassword');
    } else {
      user = await roleDbModel
        .findOne({ contactNo: contactInfo })
        .select('+hashedPassword');
    }
    if (!user) return next(new ErrRes('User not found', 404));
    const isMatched = await bcrypt.compare(password, user.hashedPassword);
    if (!isMatched) return next(new ErrRes('Password is not matching', 401));
  }
  const accessToken = await jwt.sign(
    { id: user._id, fullname: user.fullname, role },
    config.jwtAccessKey,
    { expiresIn: config.jwtAccessKeyExpireTime }
  );
  const refreshToken = await jwt.sign(
    { id: user._id, fullname: user.fullname, role },
    config.jwtRefreshKey,
    { expiresIn: config.jwtRefreshKeyExpireTime }
  );
  return res.status(200).json({ success: true, accessToken, refreshToken });
});
exports.tokenRefresher = asyncHandler(async (req, res, next) => {
  const { refreshToken, accessToken } = req.body;
  if (!refreshToken || !accessToken) {
    return next(new ErrRes('Both tokens must be present!!', 404));
  }

  try {
    const decoded = await jwt.verify(accessToken, config.jwtAccessKey);
    return next(new ErrRes('Access token is not expired yet !!', 401));
  } catch (err) {}
  try {
    let isBlackListed;
    isBlackListed = await redis.get(`BlackListed${accessToken}`);
    if (isBlackListed) return next(new ErrRes('Access Token is invalid', 401));

    isBlackListed = await redis.get(`BlackListed${refreshToken}`);
    if (isBlackListed) return next(new ErrRes('Refresh Token is invalid', 401));
    const user = await jwt.verify(refreshToken, config.jwtRefreshKey);
    const { id, fullname, role } = user;
    const token = await jwt.sign({ id, fullname, role }, config.jwtAccessKey, {
      expiresIn: config.jwtAccessKeyExpireTime,
    });
    return res.status(201).json({ success: true, token });
  } catch (err) {
    return next(new ErrRes('Refresh Token is Expired', 401));
  }
});
exports.logout = asyncHandler(async (req, res, next) => {
  const { refreshToken, accessToken } = req.body;
  if (!refreshToken || !accessToken) {
    return next(new ErrRes('Both tokens must be present!!', 404));
  }
  try {
    const decodedAT = await jwt.verify(accessToken, config.jwtAccessKey);
    const decodedRT = await jwt.verify(refreshToken, config.jwtRefreshKey);

    const timeAT =
      decodedAT.exp * 1000 +
      new Date(decodedAT.exp * 1000).getTimezoneOffset() * 60 * 1000 -
      (Date.now() + new Date(Date.now()).getTimezoneOffset() * 60 * 1000) +
      1;

    const timeRT =
      decodedRT.exp * 1000 +
      new Date(decodedRT.exp * 1000).getTimezoneOffset() * 60 * 1000 -
      (Date.now() + new Date(Date.now()).getTimezoneOffset() * 60 * 1000) +
      1;

    await redis.set(`BlackListed${refreshToken}`, accessToken, 'PX', timeAT);
    await redis.set(`BlackListed${accessToken}`, refreshToken, 'PX', timeRT);
    return res.status(200).json({ success: true });
  } catch (err) {
    return next(new ErrRes('Tokens are invalid', 404));
  }
});
exports.viewProfile = asyncHandler(async (req, res, next) => {
  return res.status(200).json({
    success: true,
    user: req.user,
  });
});
exports.updateProfile = asyncHandler(async (req, res, next) => {
  let { fullname, email, contactNo, location } = req.body;
  if (!fullname) fullname = req.user.fullname;
  if (!email) email = req.user.email;
  if (!contactNo) contactNo = req.user.contactNo;
  if (!location) location = req.user.location;

  const fieldsToUpdate = { fullname, email, contactNo, location };
  const Model = getModel(req.user.role);
  const user = await Model.findByIdAndUpdate(req.user._id, fieldsToUpdate, {
    new: true,
  });

  return res.status(200).json({ success: true, user });
});

exports.contactUs = asyncHandler(async (req, res, next) => {
  const { message, messageID, reply } = req.body;

  if (messageID) {
    if (!reply) return next(new ErrRes('Reply is required', 404));
    const dbmsg = await contactUsModel.findById(messageID);
    if (!dbmsg) return res.json({ success: false });
    dbmsg.reply.push({
      role: req.user.role,
      userID: req.user._id,
      message: reply,
    });
    await dbmsg.save();
  } else {
    if (!message) return next(new ErrRes('Message is required', 404));
    const msg = new contactUsModel({ message });
    await msg.save();
  }
  return res.status(201).json({ success: true });
});

exports.forgetPasswordSendToken = asyncHandler(async (req, res, next) => {
  const { error } = forgetPasswordVal(req.body);
  if (error) return next(new ErrRes(error.details[0].message, 400));

  const { email } = req.body;
  let user = await userModel.findOne({ email });
  if (!user) user = await adminModel.findOne({ email });
  if (!user) return next(new ErrRes('User not found', 404));

  const resetToken = crypto.randomBytes(20).toString('hex');

  const token = crypto.createHash('sha256').update(resetToken).digest('hex');

  await redis.set(`RP${token}`, user._id, 'PX', 30 * 60 * 1000);
  const { fullname, role } = user;
  await sendMailForgetPasswordToken(fullname, email, token, role);
  return res.status(200).json({ success: true, token });
});

exports.forgetPasswordRecieveToken = asyncHandler(async (req, res, next) => {
  const userID = await redis.get(`RP${req.params.token}`);
  if (!userID) return next(new ErrRes('Token is not valid', 401));

  let roleDbModel = getModel(req.params.role);
  let user = await roleDbModel.findById(userID);
  if (!user) return next(new ErrRes('User not Found!! ', 404));

  return res.status(200).json({ success: true });
});

exports.resetPassword = asyncHandler(async (req, res, next) => {
  const { error } = resetPasswordVal(req.body);
  if (error) return next(new ErrRes(joiErrMsg(error), 400));

  const userID = await redis.get(`RP${req.params.token}`);
  if (!userID) return next(new ErrRes('Token is not valid', 401));

  let roleDbModel = getModel(req.params.role);
  let user = await roleDbModel.findById(userID);
  if (!user) return next(new ErrRes('User not Found!! ', 404));

  await redis.del(`RP${req.params.token}`);

  user.isVerified = true;
  user.hashedPassword = await bcrypt.hash(req.body.password, 10);
  await user.save();
  return res.status(200).json({ success: true });
});

exports.createNewPassword = asyncHandler(async (req, res, next) => {
  const { oldPassword, confirmOldPassword, newPassword } = req.body;
  const { error } = createNewPasswordVal(req.body);
  if (error) return next(new ErrRes(joiErrMsg(error), 400));

  if (oldPassword !== confirmOldPassword)
    return next(new ErrRes('Password is not matching', 401));

  const user = await req.AuthModel.findById(req.user._id).select(
    '+hashedPassword'
  );

  const isMatched = await bcrypt.compare(oldPassword, user.hashedPassword);
  if (isMatched) {
    user.hashedPassword = await bcrypt.hash(newPassword, 10);
    await user.save();
    return res.status(200).json({ success: true });
  }
  return next(new ErrRes('Old password is not matching', 401));
});

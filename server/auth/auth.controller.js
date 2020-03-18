const bcrypt = require('bcrypt');

const logger = require('../../config/logger')(module);
const joiErrMsg = require('../utils/JoiErrorMessage');
const asyncHandler = require('../middleware/async');
const ErrRes = require('../utils/errorResponse');
const jwt = require('jsonwebtoken');
const config = require('../../config/config');

const redis = require('../../index.redis');
const tokenGenerator = require('../utils/tokenGenerator');

const {
  userValidation,
  adminValidation,
  loginValidation,
  verifyAccountValidation
} = require('./auth.validation');
const { userModel, adminModel } = require('./auth.model');
const { sendMailForVerifyAccount } = require('../../config/sendMail');

exports.registerUser = asyncHandler(async (req, res, next) => {
  const { error } = userValidation(req.body);
  if (error) return next(new ErrRes(joiErrMsg(error), 400));

  const {
    fullname,
    email,
    password,
    confirmPassword,
    location,
    contactNo,
    role,
    facebookID,
    gmailID
  } = req.body;

  if (password !== confirmPassword)
    return next(new ErrRes('Password is not matching', 401));

  if (facebookID) {
    const isPresent = await userModel.findOne({ facebookID });
    if (isPresent)
      return res.status(400).json({
        success: false,
        message: 'Account is already created with this ID'
      });
  }
  if (gmailID) {
    const isPresent = await userModel.findOne({ gmailID });
    if (isPresent)
      return res.status(400).json({
        success: false,
        message: 'Account is already created with this ID'
      });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new userModel({
    fullname,
    email,
    hashedPassword,
    location,
    contactNo,
    role,
    facebookID,
    gmailID
  });
  await user.save();
  const verifyToken = tokenGenerator();
  await sendMailForVerifyAccount(fullname, email, verifyToken, 'USER');
  await redis.set(`VA${verifyToken}`, user._id, 'PX', 24 * 60 * 60 * 1000); // 1 day
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
    gmailID
  } = req.body;

  if (password !== confirmPassword)
    return next(new ErrRes('Password is not matching', 401));

  if (facebookID) {
    const isPresent = await userModel.findOne({ facebookID });
    if (isPresent)
      return res.status(400).json({
        success: false,
        message: 'Account is already created with this ID'
      });
  }
  if (gmailID) {
    const isPresent = await userModel.findOne({ gmailID });
    if (isPresent)
      return res.status(400).json({
        success: false,
        message: 'Account is already created with this ID'
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
    gmailID
  });

  await user.save();
  const verifyToken = tokenGenerator();
  await sendMailForVerifyAccount(fullname, email, verifyToken, 'ADMIN');
  await redis.set(`VA${verifyToken}`, user._id, 'PX', 24 * 60 * 60 * 1000); // 1 day
  return res.status(201).json({ success: true });
});

const getModel = role => {
  if (role === 'USER') return userModel;
  else if (role === 'ADMIN') return adminModel;
};

exports.verifyAccount = asyncHandler(async (req, res, next) => {
  const { error } = verifyAccountValidation(req.body);
  if (error) return next(new ErrRes(joiErrMsg(error), 400));

  const { token, role } = req.query;
  // role === USER | ADMIN
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
  if (error) return next(new ErrRes(joiErrMsg(error), 400));

  const { gmailID, facebookID, email, password, role } = req.body;
  // role === USER | ADMIN
  let roleDbModel = getModel(role);
  let user;
  if (gmailID) {
    user = await roleDbModel.findOne({ gmailID });
    if (!user) return next(new ErrRes('User not found', 404));
  } else if (facebookID) {
    user = await roleDbModel.findOne({ facebookID });
    if (!user) return next(new ErrRes('User not found', 404));
  } else {
    if (!(email && password))
      return next(new ErrRes('Please provide Email & Password', 400));

    user = await roleDbModel.findOne({ email }).select('+hashedPassword');
    if (!user) return next(new ErrRes('User not found', 404));
    const isMatched = await bcrypt.compare(password, user.hashedPassword);
    if (!isMatched) return next(new ErrRes('Password is not matching', 401));
  }
  const accessToken = await jwt.sign(
    { id: user._id, fullname: user.fullname },
    config.jwtAccessKey,
    { expiresIn: config.jwtAccessKeyExpireTime }
  );
  const refreshToken = await jwt.sign(
    { id: user._id, fullname: user.fullname },
    config.jwtRefreshKey,
    { expiresIn: config.jwtRefreshKeyExpireTime }
  );
  return res.status(200).json({ accessToken, refreshToken });
});

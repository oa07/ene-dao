const bcrypt = require('bcrypt');

const logger = require('../../config/logger')(module);
const joiErrMsg = require('../utils/JoiErrorMessage');
const asyncHandler = require('../middleware/async');
const ErrRes = require('../utils/errorResponse');

const redis = require('../../index.redis');
const tokenGenerator = require('../utils/tokenGenerator');

const { userValidation, adminValidation } = require('./auth.validation');
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
    role
  } = req.body;

  if (password !== confirmPassword)
    return next(new ErrRes('Password is not matching', 401));

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new userModel({
    fullname,
    email,
    hashedPassword,
    location,
    contactNo,
    role
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
    contactNo
  } = req.body;

  if (password !== confirmPassword)
    return next(new ErrRes('Password is not matching', 401));

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new adminModel({
    fullname,
    email,
    hashedPassword,
    identity,
    contactNo
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
  const { token, role } = req.query;
  const identifyUser = await redis.get(`VA${token}`);
  if (!identifyUser) return res.status(401).json({ success: false });
  let roleDbModel = getModel(role);
  let user = await roleDbModel.findById(identifyUser);
  user.isVerified = true;
  await user.save();
  await redis.del(`VA${token}`);
  return res.status(200).json({ success: true });
});

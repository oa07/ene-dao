const jwt = require('jsonwebtoken');
const config = require('../../config/config');
const { userModel, adminModel } = require('../../server/auth/auth.model');
const redis = require('../../index.redis');
const asyncHandler = require('./async');
const ErrRes = require('../utils/errorResponse');
const getModel = require('../utils/chooseModel');

exports.verifyToken = asyncHandler(async (req, res, next) => {
  const bearerHeader = req.headers.authorization;
  if (bearerHeader && bearerHeader.startsWith('Bearer')) {
    const accessToken = bearerHeader.split(' ')[1];
    if (!accessToken) return next(new ErrRes('Not authorized !!', 401));

    try {
      const isBlackListed = await redis.get(`BlackListed${accessToken}`);
      if (isBlackListed) {
        return next(new ErrRes('Access token is invalid', 401));
      }
      const decoded = await jwt.verify(accessToken, config.jwtAccessKey);
      const properModel = getModel(decoded.role);
      const user = await properModel.findById(decoded.id);
      if (!user) return next(new ErrRes('User not found', 404));
      req.user = user;
      req.AuthModel = properModel;
      next();
    } catch (err) {
      return next(new ErrRes('Refersh this token !!', 401));
    }
  } else {
    return next(new ErrRes('Enter a valid token !!', 401));
  }
});

exports.adminAccess = asyncHandler(async (req, res, next) => {
  const { role } = req.user;
  if (role === 'admin') next();
  else return next(new ErrRes('ACCESS DENIED', 403));
});

exports.shopperAccess = asyncHandler(async (req, res, next) => {
  const { role } = req.user;
  if (role === 'shopper') next();
  else return next(new ErrRes('ACCESS DENIED', 403));
});

exports.prodUpdateAccess = asyncHandler(async (req, res, next) => {
  const { role } = req.user;
  if (role === 'shopper' || role === 'admin') next();
  else return next(new ErrRes('ACCESS DENIED', 403));
});

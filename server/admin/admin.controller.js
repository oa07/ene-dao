const bcrypt = require('bcrypt');

const logger = require('../../config/logger')(module);
const joiErrMsg = require('../utils/JoiErrorMessage');
const asyncHandler = require('../middleware/async');
const ErrRes = require('../utils/errorResponse');
const config = require('../../config/config');

const { shopModel } = require('../shop/shop.model');
const { OrderModel, productModel } = require('../product/prod.model');
const { userModel } = require('../auth/auth.model');

exports.totalShops = asyncHandler(async (req, res, next) => {
  const countShops = await shopModel.countDocuments();
  return res.json({ countShops });
});

exports.TotalNumberOfOrders = asyncHandler(async (req, res, next) => {
  const yesterday = Date.now() - 24 * 60 * 60 * 1000;
  const week = Date.now() - 7 * 24 * 60 * 60 * 1000;
  const month = Date.now() - 30 * 24 * 60 * 60 * 1000;

  const countOrdersPerDay = await OrderModel.find({
    createdAt: { $gt: yesterday }
  }).countDocuments();

  const countOrdersPerWeek = await OrderModel.find({
    createdAt: { $gt: week }
  }).countDocuments();

  const countOrdersPerMonth = await OrderModel.find({
    createdAt: { $gt: month }
  }).countDocuments();

  return res.json({
    perDay: countOrdersPerDay,
    perWeek: countOrdersPerWeek,
    perMonth: countOrdersPerMonth
  });
});

exports.totalUser = asyncHandler(async (req, res, next) => {
  const users = await userModel.find({ role: 'customer' });
  return res.json({ totalUser: users.length });
});

exports.productOrderMost = asyncHandler(async (req, res, next) => {
  const products = await productModel.find();
  let maxPopularity = 0;
  let popularProduct;
  for (let i = 0; i < products.length; i++) {
    if (maxPopularity < products[i].popularity) {
      maxPopularity = products[i].popularity;
      popularProduct = products[i];
    }
  }
  return res.json({ popularProduct });
});

exports.leadingShop = asyncHandler(async (req, res, next) => {
  const shops = await shopModel.find();
  let maxPopularity = 0;
  let popularShop;
  for (let i = 0; i < shops.length; i++) {
    if (maxPopularity < shops[i].popularity) {
      maxPopularity = shops[i].popularity;
      popularShop = shops[i];
    }
  }
  return res.json({ popularShop });
});

exports.customerOrderedMost = asyncHandler(async (req, res, next) => {
  const orders = await OrderModel.find();
  let count = {};
  let maxOrderedUser;
  let maxOrder = 0;
  for (let i = 0; i < orders.length; i++) {
    if (!count[orders[i].userID]) count[orders[i].userID] = 0;
    count[orders[i].userID]++;
    if (count[orders[i].userID] > maxOrder) {
      maxOrder = count[orders[i].userID];
      maxOrderedUser = orders[i].userID;
    }
  }
  const user = await userModel.findById(maxOrderedUser);
  return res.json({ user });
});

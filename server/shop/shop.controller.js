const bcrypt = require('bcrypt');

const logger = require('../../config/logger')(module);
const joiErrMsg = require('../utils/JoiErrorMessage');
const asyncHandler = require('../middleware/async');
const ErrRes = require('../utils/errorResponse');
const config = require('../../config/config');

const {
  shopValidation,
  shopProdEnlistValidation,
  updatePriceValidation
} = require('./shop.validation');
const { shopModel } = require('./shop.model');

exports.enlistShop = asyncHandler(async (req, res, next) => {
  const { error } = shopValidation(req.body);
  if (error) return next(new ErrRes(joiErrMsg(error), 400));

  const shop = new shopModel(req.body);
  await shop.save();

  return res.status(201).json({ success: true });
});

exports.addProductsToShop = asyncHandler(async (req, res, next) => {
  const { error } = shopProdEnlistValidation(req.body);
  if (error) return next(new ErrRes(joiErrMsg(error), 400));

  const shop = await shopModel.findById(req.body.shopID);
  shop.products.push(...req.body.products);
  await shop.save();

  return res.status(201).json({ success: true });
});

exports.updatePrice = asyncHandler(async (req, res, next) => {
  const { error } = updatePriceValidation(req.body);
  if (error) return next(new ErrRes(joiErrMsg(error), 400));

  const shop = await shopModel.findById(req.body.shopID);
  let found = false;
  for (let i = 0; i < shop.products.length; i++) {
    if (shop.products[i].prodID === req.body.prodID) {
      shop.products[i].price = req.body.price;
      found = true;
      break;
    }
  }
  if (found) {
    await shop.save();
    return res.status(200).json({ success: true });
  }
  return res.status(404).json({ success: false, message: 'Product not found' });
});

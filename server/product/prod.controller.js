const bcrypt = require('bcrypt');

const logger = require('../../config/logger')(module);
const joiErrMsg = require('../utils/JoiErrorMessage');
const asyncHandler = require('../middleware/async');
const ErrRes = require('../utils/errorResponse');
const config = require('../../config/config');

const { productModel, OrderModel } = require('./prod.model');
const { productValidation } = require('./prod.validation');

exports.uploadProducts = asyncHandler(async (req, res, next) => {
  const { error } = productValidation(req.body);
  if (error) return next(new ErrRes(joiErrMsg(error), 400));
  // const { prodName, prodDesc, prodImage, price, MRP, prodCategory } = req.body;
  const product = new productModel(req.body);
  await product.save();
  return res.status(200).json({ success: true });
});

exports.updateProducts = asyncHandler(async (req, res, next) => {
  let {
    prodName,
    prodDesc,
    prodImage,
    price,
    MRP,
    prodCategory,
    prodID
  } = req.body;

  const product = await productModel.findById(prodID);
  if (!prodName) prodName = product.prodName;
  if (!prodDesc) prodDesc = product.prodDesc;
  if (!prodImage) prodImage = product.prodImage;
  if (!price) price = product.price;
  if (!MRP) MRP = product.MRP;
  if (!prodCategory) prodCategory = product.prodCategory;

  const fieldsToUpdate = {
    prodName,
    prodDesc,
    prodImage,
    price,
    MRP,
    prodCategory,
    prodID
  };
  const updatedProd = await productModel.findByIdAndUpdate(
    prodID,
    fieldsToUpdate,
    {
      new: true
    }
  );

  return res.status(200).json({ success: true, new_product: updatedProd });
});

exports.prodInfo = asyncHandler(async (req, res, next) => {
  const { productID } = req.params;
  const product = await productModel.findById(productID);
  return res.status(200).json({ product });
});

exports.processOrder = asyncHandler(async (req, res, next) => {
  const { orderedProducts } = req.body;
  const getValue = async ({ prodID, quantity }) => {
    const prodDB = await productModel.findById(prodID);
    return prodDB.price * quantity;
  };

  let totalValue = 0;
  for (let i = 0; i < orderedProducts.length; i++) {
    totalValue += getValue(orderedProducts[i]);
  }
  if (totalValue < 100)
    return next(new ErrRes('Total price must be greater than 100 BDT', 400));
  const orderPlaced = new OrderModel({
    userID: req.user._id,
    orders: orderedProducts,
    order_status: 'ORDER_PLACED'
  });
  await orderPlaced.save();
  return res.status(201).json({
    success: true
  });
});

exports.viewAllOrders = asyncHandler(async (req, res, next) => {
  const orders = await OrderModel.find({ userID: req.user._id });
  return res.status(200).json({ orders });
});

exports.rateDeliveryMan = asyncHandler(async (req, res, next) => {
  const { rate } = req.body;
});

exports.rateProduct = asyncHandler(async (req, res, next) => {
  const { rate } = req.body;
});

exports.productFeedback = asyncHandler(async (req, res, next) => {
  const { feedback } = req.body;
});

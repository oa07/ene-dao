const joiErrMsg = require('../utils/JoiErrorMessage');
const asyncHandler = require('../middleware/async');
const ErrRes = require('../utils/errorResponse');
const logger = require('../../config/logger')(module);

const { productModel, OrderModel, categoryModel } = require('./prod.model');
const { productValidation, categoryValidation } = require('./prod.validation');

const { userModel } = require('../auth/auth.model');
const { shopModel } = require('../shop/shop.model');

const { showError } = require('../utils/showError');

exports.createCategory = asyncHandler(async (req, res, next) => {
  const { categoryName } = req.body;
  const { error } = categoryValidation({ categoryName });
  if (error) return showError(next, error);
  const category = new categoryModel({ categoryName });
  await category.save();
  return res.status(201).json({ success: true, categoryID: category._id });
});

exports.uploadProducts = asyncHandler(async (req, res, next) => {
  const { error } = productValidation(req.body);
  if (error) return next(new ErrRes(joiErrMsg(error), 400));
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
    prodID,
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
    prodID,
  };
  const updatedProd = await productModel.findByIdAndUpdate(
    prodID,
    fieldsToUpdate,
    {
      new: true,
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
  const getTotalValue = async ({ prodID, quantity }) => {
    const prodDB = await productModel.findById(prodID);
    prodDB.popularity += 1;
    await prodDB.save();
    return prodDB.price * quantity;
  };

  let totalValue = 0;
  for (let i = 0; i < orderedProducts.length; i++) {
    totalValue += getTotalValue(orderedProducts[i]);
  }
  if (totalValue < 100)
    return next(new ErrRes('Total price must be greater than 100 BDT', 400));

  const calculatePopularity = async ({ prodID, shopID }) => {
    const shop = await shopModel.findById(shopID);
    shop.popularity += 1;
    for (let i = 0; i < shop.products.length; i++) {
      if (shop.products[i].prodID === prodID) {
        shop.products[i].popularity += 1;
        break;
      }
    }
    await shop.save();
  };

  for (let i = 0; i < orderedProducts.length; i++) {
    await calculatePopularity(orderedProducts[i]);
  }
  const orderPlaced = new OrderModel({
    userID: req.user._id,
    orders: orderedProducts,
    order_status: 'ORDER_PLACED',
  });
  await orderPlaced.save();
  return res.status(201).json({
    success: true,
  });
});

exports.viewAllOrders = asyncHandler(async (req, res, next) => {
  const orders = await OrderModel.find({ userID: req.user._id });
  return res.status(200).json({ orders });
});

exports.rateDeliveryMan = asyncHandler(async (req, res, next) => {
  const { deliveryManID, rating } = req.body;
  const deliveryMan = await userModel.findById(deliveryManID);
  deliveryMan.rating.push({ userID: req.user._id, rating });
  await deliveryMan.save();
  return res.status(200).json({ success: true });
});

exports.rateProduct = asyncHandler(async (req, res, next) => {
  const { productID, rating } = req.body;
  const prod = await productModel.findById(productID);
  prod.rating.push({ userID: req.user._id, rating });
  await prod.save();
  return res.status(200).json({ success: true });
});

exports.productFeedback = asyncHandler(async (req, res, next) => {
  const { productID, feedback } = req.body;
  const prod = await productModel.findById(productID);
  prod.feedback.push({ userID: req.user._id, feedback });
  await prod.save();
  return res.status(200).json({ success: true });
});

exports.userSeeCustomerFeedback = asyncHandler(async (req, res, next) => {
  const { productID } = req.body;
  const prod = await productModel.findById(productID);
  const { rating, feedback } = prod;
  return res.status(200).json({
    rating,
    feedback,
  });
});

exports.popularProductInAShop = asyncHandler(async (req, res, next) => {
  const { shopID } = req.body;
  const shop = await shopModel.findById(shopID);
  let maxPopularity = 0;
  let popularProduct;
  for (let i = 0; i < shop.products.length; i++) {
    if (maxPopularity < shop.products[i].popularity) {
      maxPopularity = shop.products[i].popularity;
      popularProduct = shop.products[i];
    }
  }
  return res.status(200).json({ popularProduct });
});

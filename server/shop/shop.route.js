const router = require('express').Router();
const { shopperAccess, verifyToken } = require('../middleware/authorization');

const {
  updatePrice,
  addProductsToShop,
  enlistShop
} = require('./shop.controller');

router.post('/enlistShop', [verifyToken, shopperAccess], enlistShop);
router.post('/addProdToShop', [verifyToken, shopperAccess], addProductsToShop);
router.post('/updatePrice', [verifyToken, shopperAccess], updatePrice);

module.exports = router;

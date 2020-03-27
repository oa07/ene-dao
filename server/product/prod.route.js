const router = require('express').Router();
const { verifyToken, adminAccess } = require('../middleware/authorization');

const {
  uploadProducts,
  updateProducts,
  prodInfo
} = require('./prod.controller');

router.post('/upload-product', [verifyToken, adminAccess], uploadProducts);
router.post('/update-product', [verifyToken, adminAccess], updateProducts);

router.get('/product-info', verifyToken, prodInfo);

module.exports = router;

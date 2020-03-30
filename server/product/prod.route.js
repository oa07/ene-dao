const router = require('express').Router();
const {
  verifyToken,
  prodUpdateAccess
} = require('../middleware/authorization');

const {
  uploadProducts,
  updateProducts,
  prodInfo
} = require('./prod.controller');

router.post('/upload-product', [verifyToken, prodUpdateAccess], uploadProducts);
router.post('/update-product', [verifyToken, prodUpdateAccess], updateProducts);

router.get('/product-info/:productID', verifyToken, prodInfo);

module.exports = router;

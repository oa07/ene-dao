const router = require('express').Router();
const {
  verifyToken,
  prodUpdateAccess,
  adminAccess,
} = require('../middleware/authorization');

const {
  uploadProducts,
  updateProducts,
  prodInfo,
  createCategory,
} = require('./prod.controller');

router.post('/upload-product', [verifyToken, prodUpdateAccess], uploadProducts);
router.post('/update-product', [verifyToken, prodUpdateAccess], updateProducts);

router.get('/product-info/:productID', verifyToken, prodInfo);

router.post('/', [verifyToken, adminAccess], createCategory);
module.exports = router;

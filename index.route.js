const express = require('express');
const router = express.Router();

router.use('/auth', require('./server/auth/auth.route'));
router.use('/product', require('./server/product/prod.route'));
router.use('/shop', require('./server/shop/shop.route'));

module.exports = router;

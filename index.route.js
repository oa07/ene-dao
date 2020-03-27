const express = require('express');
const router = express.Router();

router.use('/auth', require('./server/auth/auth.route'));

module.exports = router;

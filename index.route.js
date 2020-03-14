const express = require("express");
const authRoutes = require("./server/auth/auth.route");

const router = express.Router(); // eslint-disable-line new-cap

// TODO: use glob to match *.route files

// mount account user routes at /account
router.use("/auth", authRoutes);

module.exports = router;

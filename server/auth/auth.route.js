const express = require("express");
const controllers = require("./auth.controller");
// const { verifyToken } = require('../middleware/privateRouting');
// const adminAccess = require('../middleware/adminAccess');

const router = express.Router();

router.post("/signup", controllers.signup);
// router.post("/login", controllers.login);

// router.get("/checking", verifyToken, controllers.checking);

// router.post(
// 	"/verifyAccount",
// 	verifyToken,
// 	controllers.sendEmailForVerifyAccount
// );
// router.get(
// 	"/verifyAccount/:token",
// 	verifyToken,
// 	controllers.getAccessTokenForVerifyAccount
// );

// router.post("/forgetPassword", controllers.sendEmailForForgetPassword);
// router.get(
// 	"/forgetPassword/:token",
// 	controllers.getAccessTokenForForgetPassword
// );
// router.post("/resetPassword", controllers.resetPassword);

// router.post("/createNewPassword", verifyToken, controllers.createNewPassword);
// router.post("/updateUser", verifyToken, controllers.updateUser);

// // Only admin can see all accounts information
// router.get("/allUserInfo", adminAccess, controllers.allUserInfo);

// router.post("/deactivateAccount", verifyToken, controllers.deactivateAccount);
// router.delete("/deleteAccount", verifyToken, controllers.deleteAccount);

module.exports = router;

const bcrypt = require("bcryptjs");
const passport = require("passport");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const config = require("../../config/config");
const { AuthModel } = require("./auth.model");
// const { sendEmailForResetPassword } = require("../../config/sendingEmail");
// const { sendEmailForVerifyAccount } = require("../../config/sendingEmail");
// const { createNewPasswordDataValidation } = require("./auth.validations");
// const { loginDataValidation } = require("./auth.validations");
// const { signupDataValidation } = require("./auth.validations");
// const { updateUserDataValidation } = require("./auth.validations");
// const { resetPasswordDataValidation } = require("./auth.validations");

/*
  HTTP Status Codes
  https://www.restapitutorial.com/httpstatuscodes.html
  200 => OK
  400 => Bad Request
  404 => Not Found
  406 => Not Acceptable
*/

// Testing DONE
// POST /auth/signup
// input => username, email, password, confirmPassword, phoneNumber, designation(['admin','customer'])
module.exports.signup = async (req, res, next) => {
	try {
		const data = req.body;
		const { error } = signupDataValidation(data);
		if (error)
			return res.status(400).json(error.details.map(err => err.message));

		// This is temporary for showing the authorization part
		const { designation } = data;
		if (designation !== "admin" && designation !== "customer") {
			return res
				.status(400)
				.json({ message: 'Choose designation between "admin" and "customer"' });
		}

		if (data.password !== data.confirmPassword) {
			return res.status(400).json({ message: "Password Not Matching" });
		}
		let user = await AuthModel.findOne({ username: data.username });
		if (user)
			return res.status(400).json({ message: "Username already Exists" });

		user = await AuthModel.findOne({ email: data.email });
		if (user) return res.status(400).json({ message: "Email already Exists" });

		const hashedPassword = await bcrypt.hash(data.password, 10);
		const newUser = new AuthModel({
			username: data.username,
			email: data.email,
			phoneNumber: data.phoneNumber,
			designation: data.designation,
			password: hashedPassword
		});
		await newUser.save();
		return res
			.status(200)
			.json({ message: "Registration Successful", user: newUser });
	} catch (err) {
		return res.status(500).json({ message: "Internal Server Error" });
	}
};

// Testing DONE
// POST /auth/login
// input => email, password
module.exports.login = async (req, res, next) => {
	const { error } = loginDataValidation(req.body);
	if (error) return res.status(400).json(error.details.map(err => err.message));

	try {
		passport.authenticate("login", async (err, token, user, info) => {
			if (err) return res.status(400).json(err);
			if (info) return res.status(400).json(info);
			return res.status(200).json({ token, user });
		})(req, res, next);
	} catch (err) {
		return res.status(500).json({ message: "Internal Server Error" });
	}
};

// Testing DONE
// module.exports.checking = (req, res) => {
// 	return res.status(200).json({ success: true });
// };

// Testing DONE
// POST /auth/forgetPassword
// input => email
// module.exports.sendEmailForForgetPassword = async (req, res) => {
// 	try {
// 		crypto.randomBytes(32, async (err, buffer) => {
// 			if (err) return res.status(400).json(err);
// 			const token = buffer.toString("hex");
// 			const user = await AuthModel.findOne({ email: req.body.email });
// 			if (!user) return res.status(400).json({ message: "No User Found" });
// 			user.resetPasswordToken = token;
// 			user.resetPasswordTokenExpiration = Date.now() + 3600000; // 1hour
// 			const dbSavedUser = await user.save();
// 			const emailResponse = await sendEmailForResetPassword(
// 				user.username,
// 				user.email,
// 				token
// 			);
// 			return res.status(200).json({ user: dbSavedUser, emailResponse, token });
// 		});
// 	} catch (err) {
// 		return res.status(500).json({ message: "Internal Server Error" });
// 	}
// };

// Testing DONE
// GET /auth/forgetPassword/:token
// Copy The Link sent to your email and paste it into POSTMAN
// module.exports.getAccessTokenForForgetPassword = async (req, res) => {
// 	try {
// 		const { token } = req.params;
// 		const user = await AuthModel.findOne({
// 			resetPasswordToken: token,
// 			resetPasswordTokenExpiration: { $gt: Date.now() }
// 		});
// 		if (!user) return res.status(400).json({ message: "token time expired" });
// 		return res.status(200).json({
// 			message: "Now I get the permission to change the password",
// 			user
// 		});
// 	} catch (err) {
// 		return res.status(500).json({ message: "Internal Server Error" });
// 	}
// };

// // Testing DONE
// // POST /auth/resetPassword
// // input: password, confirmPassword, userID.
// // keep userID from the previous functions (Ex: from 'login')
// module.exports.resetPassword = async (req, res) => {
// 	try {
// 		const { password, confirmPassword, userID } = req.body;
// 		const { error } = resetPasswordDataValidation(req.body);
// 		if (error)
// 			return res.status(400).json(error.details.map(err => err.message));

// 		if (password !== confirmPassword)
// 			return res.status(400).json({ message: "Password Not Matching" });
// 		const user = await AuthModel.findOne({ _id: userID });
// 		user.resetPasswordToken = undefined;
// 		user.resetPasswordTokenExpiration = undefined;
// 		user.isAccountVerified = true;
// 		// Though Email is verified. So the account is verified.
// 		// It can change in future, if we add verifiaction through phone number...
// 		const hashedPassword = await bcrypt.hash(password, 10);
// 		user.password = hashedPassword;
// 		const dbSavedUser = await user.save();
// 		return res.status(200).json({
// 			message: "Password Changed",
// 			user: dbSavedUser
// 		});
// 	} catch (err) {
// 		return res.status(500).json({
// 			message: "server error"
// 		});
// 	}
// };

// Testing DONE
// POST /auth/verifyAccount
// protected route => so must have the header['Authorization'] = 'bearer <access_token>'
// module.exports.sendEmailForVerifyAccount = async (req, res) => {
//   const { user } = req;
//   if (user.isAccountVerified) {
//     return res.status(400).json({ message: 'This Account is already verified' });
//   }
//   // check the user is already verified or not..
//   crypto.randomBytes(32, async (err, buffer) => {
//     if (err) return res.status(400).json(err);
//     const token = buffer.toString('hex');
//     user.verifyAccountToken = token;
//     const dbSavedUser = await user.save();
//     const emailResponse = await sendEmailForVerifyAccount(user.username, user.email, token);
//     return res.json({
//       message: 'Sent token to email',
//       user: dbSavedUser,
//       emailResponse,
//       token
//     });
//   });
// };

// // Testing DONE
// // GET /auth/verifyAccount/:token
// // protected route
// module.exports.getAccessTokenForVerifyAccount = async (req, res) => {
//   try {
//     const { token } = req.params;
//     const user = await AuthModel.findOne({
//       _id: req.user._id,
//       verifyAccountToken: token
//     });
//     if (!user) return res.status(400).json({ message: 'No User Found' });
//     user.verifyAccountToken = undefined;
//     user.isAccountVerified = true;
//     const dbSavedUser = await user.save();
//     return res.json({
//       message: 'Account Verified Successfully',
//       user: dbSavedUser
//     });
//   } catch (err) {
//     return res.status(500).json({
//       message: 'server error'
//     });
//   }
// };

// // Testing DONE
// // protected route
// // POST /auth/createNewPassword
// // input => oldPassword, newPassword, confirmNewPassword
// module.exports.createNewPassword = async (req, res) => {
//   try {
//     const data = req.body;
//     const { user } = req;
//     const { oldPassword, newPassword, confirmNewPassword } = req.body;

//     const { error } = createNewPasswordDataValidation(data);
//     if (error) return res.status(400).json(error.details.map((err) => err.message));

//     if (newPassword !== confirmNewPassword) { return res.status(400).json({ message: 'Password Not Matching' }); }
//     const isMatched = await bcrypt.compare(oldPassword, user.password);
//     if (isMatched) {
//       const hashedPassword = await bcrypt.hash(newPassword, 10);
//       user.password = hashedPassword;
//       const dbSavedUser = await user.save();
//       return res.status(200).json({ message: 'Password changed successfully', user: dbSavedUser });
//     }
//     return res.status(400).json({ message: 'old password is not matching' });
//   } catch (err) {
//     return res.status(500).json({ message: 'internal Server Error' });
//   }
// };

// // input => username, email, phoneNumber.
// module.exports.updateUser = async (req, res) => {
//   try {
//     const { user } = req;
//     const data = req.body;
//     const { error } = updateUserDataValidation(data);
//     if (error) return res.status(400).json(error.details.map((err) => err.message));

//     let anyChange = false;
//     if (user.username !== data.username) {
//       anyChange = true;
//       user.username = data.username;
//     }
//     if (user.email !== data.email) {
//       anyChange = true;
//       user.email = data.email;
//       user.isAccountVerified = false;
//     }
//     if (user.phoneNumber !== data.phoneNumber) {
//       anyChange = true;
//       user.phoneNumber = data.phoneNumber;
//     }
//     if (anyChange) {
//       const dbSavedUser = await user.save();
//       return res.status(200).json({ message: 'Successfully Updated Account', user: dbSavedUser });
//     }
//     return res.status(400).json({ message: 'You haven\'t Change anything' });
//   } catch (err) {
//     return res.status(500).json({ message: 'Internal Server Error' });
//   }
// };

// // GET /auth/allUserInfo
// // only admin can access this page..
// module.exports.allUserInfo = async (req, res) => {
//   try {
//     const users = await AuthModel.find();
//     return res.status(200).json({ users });
//   } catch (err) {
//     return res.status(500).json({ message: 'Internal Server Error' });
//   }
// };

// // DELETE /auth/deleteAccount
// // protected route
// module.exports.deleteAccount = async (req, res) => {
//   try {
//     await AuthModel.findByIdAndDelete({ _id: req.user._id });
//     req.user = undefined;
//     return res.status(200).json({
//       message: 'account Deleted Successfully'
//     });
//     // No logout needed. because there is no user correspondent to the jwt_token.
//     // So, just redirect to the login page.
//   } catch (err) {
//     return res.status(500).json({
//       message: 'server error'
//     });
//   }
// };

// // POST /auth/deactivateAccount
// // protected route
// module.exports.deactivateAccount = async (req, res) => {
//   try {
//     const { user } = req;
//     user.isAccountActive = false;
//     const dbSavedUser = await user.save();
//     return res.status(200).json({
//       message: 'Account Deactivated Successfully',
//       user: dbSavedUser
//     });
//     // logout needed..
//   } catch (err) {
//     return res.status(500).json({
//       message: 'server error'
//     });
//   }
// };

// // logout
// // ACCESS_TOKEN ta delete kore dite hobe..
// // HEADER theke ACCESS_TOKEN ta shoraye dite hobe

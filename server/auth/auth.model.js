const mongoose = require("mongoose");

const { Schema } = mongoose;

const AuthSchema = new Schema({
	username: {
		type: String,
		required: true,
		min: 5,
		unique: true
	},
	email: {
		type: String,
		required: true,
		min: 6,
		max: 255
	}, // will add phone number later
	password: {
		type: String,
		required: true,
		min: 6,
		max: 1024
	},
	resetPasswordToken: {
		type: String
	},
	resetPasswordTokenExpiration: {
		type: String
	},
	verifyAccountToken: {
		type: String
	},
	isAccountVerified: {
		type: Boolean,
		default: false
	},
	isAccountActive: {
		type: Boolean,
		default: true
	},
	phoneNumber: {
		type: String,
		required: true
	},
	designation: {
		type: String,
		required: true
	},
	refreshToken: {
		type: String
	},
	date: {
		type: Date,
		default: Date.now()
	}
});

module.exports.AuthModel = mongoose.model("user", AuthSchema);

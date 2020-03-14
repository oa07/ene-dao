const Joi = require("@hapi/joi");

// require and configure dotenv, will load vars in .env in PROCESS.ENV
require("dotenv").config();

// define validation for all the env vars
const envVarsSchema = Joi.object({
	NODE_ENV: Joi.string().default("development"),
	PORT: Joi.number().default(4040),
	MONGOOSE_DEBUG: Joi.boolean().when("NODE_ENV", {
		is: Joi.string().equal("development"),
		then: Joi.boolean().default(true),
		otherwise: Joi.boolean().default(false)
	}),
	JWT_SECRET: Joi.string()
		.required()
		.description("JWT Secret required to sign"),
	JWT_ACCESS_TOKEN: Joi.string()
		.required()
		.description("JWT Access token Secret required to sign"),
	JWT_REFRESH_TOKEN: Joi.string()
		.required()
		.description("JWT Refresh token required to sign"),
	JWT_EXPIRATION: Joi.string()
		.required()
		.description("JWT access token time expire"),
	JWT_REFRESH_EXPIRATION: Joi.string()
		.required()
		.description("JWT refresh token expired"),
	MONGO_HOST: Joi.string()
		.required()
		.description("Mongo DB host url"),
	MONGO_PORT: Joi.number().default(27017),
	REDIS_HOST: Joi.string()
		.required()
		.description("Redis DB host url"),
	REDIS_PORT: Joi.number(),
	REDIS_PASSWORD: Joi.string()
		.required()
		.description("password should be required"),
	EMAIL_ADDRESS: Joi.string()
		.required()
		.description("email address required"),
	EMAIL_PASSWORD: Joi.string()
		.required()
		.description("password required"),
	FACEBOOK_ID: Joi.string()
		.required()
		.description("facebook id required"),
	FACEBOOK_SECRET: Joi.string()
		.required()
		.description("facebook secret key required"),
	GOOGLE_CLIENT_ID: Joi.string()
		.required()
		.description("Google client id required"),
	GOOGLE_CLIENT_SECRET: Joi.string()
		.required()
		.description("Google client secret required")
})
	.unknown()
	.required();

const { value: envVars } = envVarsSchema.validate(process.env);

const config = {
	env: envVars.NODE_ENV,
	port: envVars.PORT,
	mongooseDebug: envVars.MONGOOSE_DEBUG,
	jwtSecret: envVars.JWT_SECRET,
	accessTokenSecret: envVars.JWT_ACCESS_TOKEN,
	refreshTokenSecret: envVars.JWT_REFRESH_TOKEN,
	accessTokenExpire: envVars.JWT_EXPIRATION,
	refreshTokenExpire: envVars.JWT_REFRESH_EXPIRATION,
	mongo: {
		host: envVars.MONGO_HOST,
		port: envVars.MONGO_PORT
	},
	redis: {
		host: envVars.REDIS_HOST,
		port: envVars.REDIS_PORT,
		password: envVars.REDIS_PASSWORD
	},
	emailAddress: envVars.EMAIL_ADDRESS,
	emailPassword: envVars.EMAIL_PASSWORD,
	facebookID: envVars.FACEBOOK_ID,
	facebookSecret: envVars.FACEBOOK_SECRET,
	googleClientID: envVars.GOOGLE_CLIENT_ID,
	googleClientSecret: envVars.GOOGLE_CLIENT_SECRET
};

module.exports = config;

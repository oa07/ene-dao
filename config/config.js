const Joi = require('@hapi/joi');

require('dotenv').config();

const envSchema = Joi.object({
  NODE_ENV: Joi.string().default('development'),
  PORT: Joi.number().default(5000),
  MONGODB_HOST: Joi.string().required(),
  MONGODB_HOST_TEST: Joi.string().required(),
  JWT_ACCESS_KEY: Joi.string().required(),
  JWT_REFRESH_KEY: Joi.string().required(),
  EMAIL_ID: Joi.string().required(),
  EMAIL_PASSWORD: Joi.string().required(),
  JWT_ACCESS_KEY_EXPIRE_TIME: Joi.string().default('60m'),
  JWT_REFRESH_KEY_EXPIRE_TIME: Joi.string().default('720h'),
  ADMIN_USERNAME: Joi.string().required(),
  ADMIN_PASSWORD: Joi.string().required(),
  ADMIN_ID: Joi.string().required(),
})
  .unknown()
  .required();

const { error, value: validatedEnv } = envSchema.validate(process.env);
if (error) throw new Error(`Config validation error: ${error.message}`);

module.exports = {
  env: validatedEnv.NODE_ENV,
  port: validatedEnv.PORT,
  mongodbHost: validatedEnv.MONGODB_HOST,
  mongodbHostTest: validatedEnv.MONGODB_HOST_TEST,
  jwtAccessKey: validatedEnv.JWT_ACCESS_KEY,
  jwtRefreshKey: validatedEnv.JWT_REFRESH_KEY,
  emailID: validatedEnv.EMAIL_ID,
  emailPassword: validatedEnv.EMAIL_PASSWORD,
  jwtAccessKeyExpireTime: validatedEnv.JWT_ACCESS_KEY_EXPIRE_TIME,
  jwtRefreshKeyExpireTime: validatedEnv.JWT_REFRESH_KEY_EXPIRE_TIME,
  adminUsername: validatedEnv.ADMIN_USERNAME,
  adminPassword: validatedEnv.ADMIN_PASSWORD,
  adminID: validatedEnv.ADMIN_ID,
};

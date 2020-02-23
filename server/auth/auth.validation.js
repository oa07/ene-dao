const Joi = require('@hapi/joi');

exports.customerValidation = Joi.object({
  fullName: Joi.string()
    .alphanum()
    .max(64)
    .required()
    .label('Full name'),
  email: Joi.string()
    .email()
    .max(64)
    .required()
    .label('Email'),
  password: Joi.string()
    .min(8)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/, '[az][AZ][09]')
    .required()
    .label('Password'),
  confirmPassword: Joi.string()
    .required()
    .label('Confirm Password'),
  homeAddress: Joi.string()
    .max(2000)
    .required()
    .label('Home Address'),
  contactNo: Joi.string()
    .min(7)
    .max(15)
    .pattern(/^[0-9]+$/, '[09]')
    .required()
    .label('Contact Number')
});

exports.deliverymanValidation = Joi.object({
  fullName: Joi.string()
    .alphanum()
    .max(64)
    .required()
    .label('Full name'),
  email: Joi.string()
    .email()
    .max(64)
    .required()
    .label('Email'),
  password: Joi.string()
    .min(8)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/, '[az][AZ][09]')
    .required()
    .label('Password'),
  confirmPassword: Joi.string()
    .required()
    .label('Confirm Password'),
  location: Joi.string()
    .max(2000)
    .required()
    .label('Location'),
  contactNo: Joi.string()
    .min(7)
    .max(15)
    .pattern(/^[0-9]+$/, '[09]')
    .required()
    .label('Contact Number')
});

exports.adminValidation = Joi.object({
  fullName: Joi.string()
    .alphanum()
    .max(64)
    .required()
    .label('Full name'),
  email: Joi.string()
    .email()
    .max(64)
    .required()
    .label('Email'),
  password: Joi.string()
    .min(8)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/, '[az][AZ][09]')
    .required()
    .label('Password'),
  confirmPassword: Joi.string()
    .required()
    .label('Confirm Password'),
  identity: Joi.string()
    .max(2000)
    .required()
    .label('Identity'),
  contactNo: Joi.string()
    .min(7)
    .max(15)
    .pattern(/^[0-9]+$/, '[09]')
    .required()
    .label('Contact Number')
});

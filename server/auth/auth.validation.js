const Joi = require('@hapi/joi');

exports.userValidation = data =>
  Joi.object({
    fullname: Joi.string()
      .max(64)
      .pattern(/^([a-zA-Z]+)(\.?\s?[a-zA-Z]+)+$/, '[az][AZ][ .]')
      .required()
      .label('Fullname'),
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
      .label('Home Address'),
    contactNo: Joi.string()
      .length(14)
      .pattern(/^[+][8][8][0-9]+$/, '[09]')
      .required()
      .label('Contact Number'),
    role: Joi.string()
      .allow(...['customer', 'deliveryman'])
      .required()
      .label('Role')
  }).validate(data);

exports.adminValidation = data =>
  Joi.object({
    fullname: Joi.string()
      .max(64)
      .pattern(/^([a-zA-Z]+)(\.?\s?[a-zA-Z]+)+$/, '[az][AZ][ .]')
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
      .length(14)
      .pattern(/^[+][8][8][0-9]+$/, '[09]')
      .required()
      .label('Contact Number')
  }).validate(data);

const Joi = require('@hapi/joi');

exports.userValidation = (data) =>
  Joi.object({
    gmailID: Joi.string().label('Gmail ID'),
    facebookID: Joi.string().label('Facebook ID'),
    fullname: Joi.string()
      .max(64)
      .pattern(/^([a-zA-Z]+)(\.?\s?[a-zA-Z]+)+$/, '[az][AZ][ .]')
      .required()
      .label('Fullname'),
    email: Joi.string().email().max(64).required().label('Email'),
    password: Joi.string()
      .min(8)
      .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/, '[az][AZ][09]')
      .required()
      .label('Password'),
    confirmPassword: Joi.string().required().label('Confirm Password'),
    location: Joi.string().max(2000).required().label('Home Address'),
    contactNo: Joi.string()
      .length(14)
      .pattern(/^[+][8][8][0-9]+$/, '[09]')
      .required()
      .label('Contact Number'),
    role: Joi.string()
      .allow(...['customer', 'deliveryman'])
      .required()
      .label('Role'),
  }).validate(data);

exports.adminValidation = (data) =>
  Joi.object({
    gmailID: Joi.string().label('Gmail ID'),
    facebookID: Joi.string().label('Facebook ID'),
    fullname: Joi.string()
      .max(64)
      .pattern(/^([a-zA-Z]+)(\.?\s?[a-zA-Z]+)+$/, '[az][AZ][ .]')
      .required()
      .label('Full name'),
    email: Joi.string().email().max(64).required().label('Email'),
    password: Joi.string()
      .min(8)
      .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/, '[az][AZ][09]')
      .required()
      .label('Password'),
    confirmPassword: Joi.string().required().label('Confirm Password'),
    identity: Joi.string().max(2000).required().label('Identity'),
    contactNo: Joi.string()
      .length(14)
      .pattern(/^[+][8][8][0-9]+$/, '[09]')
      .required()
      .label('Contact Number'),
  }).validate(data);

exports.loginValidation = (data) =>
  Joi.object({
    gmailID: Joi.string().label('Gmail ID'),
    facebookID: Joi.string().label('Facebook ID'),
    contactInfo: Joi.string().label('Contact Info'),
    password: Joi.string().label('Password'),
    role: Joi.string()
      .allow(...['USER', 'ADMIN'])
      .required()
      .label('Role'),
    infoMed: Joi.string()
      .allow(...['PHONE', 'EMAIL'])
      .label('infoMed'),
  }).validate(data);

exports.verifyAccountValidation = (data) =>
  Joi.object({
    token: Joi.string().required().label('Token'),
    role: Joi.string()
      .allow(...['USER', 'ADMIN'])
      .required()
      .label('Role'),
  }).validate(data);

exports.forgetPasswordVal = (data) =>
  Joi.object({
    email: Joi.string().email().max(64).required().label('Email'),
  }).validate(data);

exports.resetPasswordVal = (data) =>
  Joi.object({
    password: Joi.string()
      .min(8)
      .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/, '[az][AZ][09]')
      .required()
      .label('Password'),
    confirmPassword: Joi.string().required().label('Confirm Password'),
  }).validate(data);

exports.createNewPasswordVal = (data) =>
  Joi.object({
    oldPassword: Joi.string().required().label('Old Password'),
    confirmOldPassword: Joi.string().required().label('Confirm Old Password'),
    newPassword: Joi.string()
      .min(8)
      .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/, '[az][AZ][09]')
      .required()
      .label('New Password'),
  }).validate(data);

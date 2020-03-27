const Joi = require('@hapi/joi');

exports.productValidation = data =>
  Joi.object({
    prodName: Joi.string()
      .max(64)
      .pattern(/^([a-zA-Z]+)(\.?\s?[a-zA-Z]+)+$/, '[az][AZ][ .]')
      .required()
      .label('Product name'),
    prodDesc: Joi.string()
      .max(3000)
      .required()
      .label('Product description'),
    prodImage: Joi.string()
      .required()
      .label('Product image'),
    price: Joi.number()
      .integer()
      .min(0)
      .required()
      .label('Price'),
    MRP: Joi.number()
      .integer()
      .min(0)
      .required()
      .label('MRP'),
    prodCategory: Joi.string()
      .required()
      .label('Product category')
  }).validate(data);

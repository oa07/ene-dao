const Joi = require('@hapi/joi');

exports.productValidation = Joi.object({
  prodName: Joi.string()
    .alphanum()
    .max(64)
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
});

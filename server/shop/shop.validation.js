const Joi = require('@hapi/joi');

exports.shopValidation = data =>
  Joi.object({
    shopName: Joi.string()
      .max(64)
      .pattern(/^([a-zA-Z]+)(\.?\s?[a-zA-Z]+)+$/, '[az][AZ][ .]')
      .required()
      .label('Shop name'),
    shopLogo: Joi.string()
      .required()
      .label('Shop logo'),
    shopLocation: Joi.string()
      .max(3000)
      .required()
      .label('Shop location'),
    products: Joi.array().items(
      Joi.object().keys({
        prodID: Joi.string().required(),
        prodUnitPrice: Joi.number().required()
      })
    )
  }).validate(data);

exports.shopProdEnlistValidation = data =>
  Joi.object({
    shopID: Joi.string().required(),
    products: Joi.array().items(
      Joi.object().keys({
        prodID: Joi.string().required(),
        prodUnitPrice: Joi.number().required()
      })
    )
  }).validate(data);

exports.updatePriceValidation = data =>
  Joi.object({
    shopID: Joi.string().required(),
    prodID: Joi.string().required(),
    price: Joi.number().required()
  }).validate(data);

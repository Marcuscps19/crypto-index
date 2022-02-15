const Joi = require('joi');

const cryptoSchema = Joi.object({
  currency: Joi
    .string()
    .valid('BRL', 'CAN', 'EUR')
    .not()
    .empty()
    .required(),
  value: Joi
    .number()
    .integer()
    .not()
    .empty()
    .min(1)
    .required(),
}).error(() => (new Error('Campos inválidos')));

module.exports = cryptoSchema;

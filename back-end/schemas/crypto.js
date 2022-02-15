const Joi = require('joi');

const cryptoSchema = Joi.object({
  currency: Joi
    .string()
    .valid('BRL', 'CAN', 'EUR')
    .not()
    .empty()
    .required()
    .error(() => (new Error('Moeda inválida'))),
  value: Joi
    .number()
    .integer()
    .not()
    .empty()
    .min(1)
    .required()
    .error(() => (new Error('Valor inválido'))),
});

module.exports = cryptoSchema;

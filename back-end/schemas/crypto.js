const Joi = require('joi');

const cryptoSchema = Joi.object({
  currency: Joi
    .string()
    .valid('BRL', 'CAD', 'EUR')
    .not()
    .empty()
    .required()
    .error(() => (new Error('Moeda inválida'))),
  value: Joi
    .number()
    .greater(0)
    .not()
    .empty()
    .required()
    .error(() => (new Error('Valor inválido'))),
});

module.exports = cryptoSchema;

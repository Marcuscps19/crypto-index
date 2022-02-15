const Joi = require('joi');

const pattern = /^[0-9a-zA-Z]{16}$/;

const authSchema = Joi.object({
  token: Joi
    .string()
    .not()
    .empty()
    .required()
    .regex(pattern)
    .error(() => (new Error('Token inválido'))),
});

module.exports = authSchema;

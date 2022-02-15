const Joi = require('joi');

const passwordPattern = /^[0-9]{6}$/;

const loginSchema = Joi.object({
  email: Joi
    .string()
    .email()
    .not()
    .empty()
    .required(),
  password: Joi
    .string()
    .not()
    .empty()
    .regex(passwordPattern)
    .required(),
}).error(() => (new Error('Campos inválidos')));

module.exports = loginSchema;

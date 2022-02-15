const express = require('express');
const { clientErrors } = require('../utils/httpStatusCodes');

const route = express.Router();

route.use((_req, _res, next) => next({
  message: 'Not Found',
  statusCode: clientErrors.notFound,
}));

module.exports = route;

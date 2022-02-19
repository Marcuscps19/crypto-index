const express = require('express');
const validateToken = require('../middlewares/authToken');
const { getActualCurrencies } = require('../controllers/currencies');

const route = express.Router();

route.get('/', validateToken, getActualCurrencies);

module.exports = route;

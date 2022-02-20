const express = require('express');
const { validatePayload } = require('../middlewares/crypto');
const validateToken = require('../middlewares/authToken');
const { getCurrencies } = require('../controllers/crypto');
const { updateCurrency } = require('../controllers/crypto');
const { validateLoginPayload } = require('../middlewares/login');
const loginController = require('../controllers/login');
const { getActualCurrencies } = require('../controllers/currencies');

const basePath = '/api';

const route = express.Router();

route.post(`${basePath}/login`, validateLoginPayload, loginController.login);
route.get(`${basePath}/crypto/btc`, validateToken, getCurrencies);
route.post(`${basePath}/crypto/btc`, validateToken, validatePayload, updateCurrency);
route.get(`${basePath}/currencies`, validateToken, getActualCurrencies);

module.exports = route;

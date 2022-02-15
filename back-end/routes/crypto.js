const express = require('express');
const { validatePayload } = require('../middlewares/crypto');
const validateToken = require('../middlewares/authToken');
const { getCurrencies } = require('../controllers/crypto');
const { updateCurrency } = require('../controllers/crypto');

const route = express.Router();

route.get('/', validateToken, getCurrencies);
route.post('/', validateToken, validatePayload, updateCurrency);

module.exports = route;

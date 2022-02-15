const express = require('express');
const { validatePayload } = require('../middlewares/crypto');
const { getCurrencies } = require('../controllers/crypto');
const { updateCurrency } = require('../controllers/crypto');

const route = express.Router();

route.get('/', getCurrencies);
route.post('/', validatePayload, updateCurrency);

module.exports = route;

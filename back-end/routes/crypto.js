const express = require('express');
const rescue = require('express-rescue');
const { validatePayload } = require('../middlewares/crypto');
const { getCurrencies } = require('../controllers/crypto');
const { updateCurrency } = require('../controllers/crypto');

const route = express.Router();

route.get('/', rescue(getCurrencies));
route.post('/', validatePayload, rescue(updateCurrency));

module.exports = route;

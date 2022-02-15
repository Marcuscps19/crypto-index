const express = require('express');

const route = express.Router();

const { validateLoginPayload } = require('../middlewares/login');
const loginController = require('../controllers/login');

route.post('/', validateLoginPayload, loginController.login);

module.exports = route;

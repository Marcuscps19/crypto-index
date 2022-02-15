const express = require('express');
const bodyParser = require('body-parser');

const errors = require('./middlewares/error');
const loginRoutes = require('./routes/login');
const cryptoRoutes = require('./routes/crypto');
const basePath = require('./utils/basePath');
const genericRoute = require('./routes/genericRoute');

const app = express();

app.use(bodyParser.json());
app.use(`${basePath}/login`, loginRoutes);
app.use(`${basePath}/crypto/btc`, cryptoRoutes);
app.use(genericRoute);

app.use(errors);

module.exports = app;

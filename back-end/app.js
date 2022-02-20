const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const errors = require('./middlewares/error');
const genericRoute = require('./routes/genericRoute');
const routes = require('./routes/routes');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(routes);
app.use(genericRoute);

app.use(errors);

module.exports = app;

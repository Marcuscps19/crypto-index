const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const errors = require('./middlewares/error');
const genericRoute = require('./routes/genericRoute');
const routes = require('./routes/routes');

const app = express();
app.use(express.static(path.join(__dirname, 'build')));


app.use(cors());
app.use(bodyParser.json());
app.use(routes);
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });
app.use(genericRoute);

app.use(errors);

module.exports = app;

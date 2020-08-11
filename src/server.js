const express = require('express');
const bodyParser = require('body-parser');
const config = require('../config');
const routes = require('./routes');
const cors = require('cors');
const Passport = require('passport');
require('./controllers/passport')(Passport);

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());
app.options("*", cors());
app.use(routes);


app.listen(config.app.port, () => console.info(`Server listening on port ${config.app.port}!`));
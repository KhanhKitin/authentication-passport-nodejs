const express = require('express');
const config = require('../config');
const routes = require('./routes');
const cors = require('cors');
const Passport = require('passport');
require('./controllers/passport')(Passport);

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());
app.options("*", cors());
app.use(routes);


app.listen(config.app.port, () => console.info(`Server listening on port ${config.app.port}!`));
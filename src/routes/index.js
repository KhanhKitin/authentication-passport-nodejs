const Router = require('express').Router();

const authRoutes = require('./auth');

Router.use(authRoutes);

module.exports = Router;
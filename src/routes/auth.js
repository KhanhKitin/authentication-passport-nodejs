const Router = require('express').Router();
const controller = require('../controllers');
const { celebrate, Joi, errors } = require('celebrate');
const authController = controller.Auth;


Router.post('/api/sigin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().max(100),
    password: Joi.string().required().min(8)
  }),
}), authController.sigin)

Router.post('/api/register', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().max(100),
    password: Joi.string().required().min(8),
    name: Joi.string().required().max(100)
  }),
}), authController.register)


Router.use(errors());
module.exports = Router;
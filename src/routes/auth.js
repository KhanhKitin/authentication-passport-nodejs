const Router = require('express').Router();
const controller = require('../controllers');
const { celebrate, Joi, errors } = require('celebrate');
const authController = controller.Auth;


Router.post('/api/v1/sigin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().max(100),
    password: Joi.string().required().min(8)
  }),
}), authController.sigin)

Router.post('/api/v1/register', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().max(100),
    password: Joi.string().required().min(8),
    name: Joi.string().required().max(100)
  }),
}), authController.register)

Router.post('/api/v1/enable-2fa', authController.checkAuthentication, authController.postEnable2FA);
Router.post('/api/v1/verify-2fa', authController.postVerify2FA);

Router.use(errors());
module.exports = Router;
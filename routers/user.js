const express = require('express');
const routerUser = express.Router();
const UserController = require('../controller/UserControllers');

routerUser.post('/users/register', UserController.register);

routerUser.post('/users/login', UserController.login);

routerUser.post('/users/login-google', UserController.loginGoogle);

module.exports = routerUser;

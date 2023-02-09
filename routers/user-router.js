const express = require('express')
const router = require('express').Router()
const UserController = require('../Controllers/user-controller')
const { authentication } = require('../middlewares/authentication')
const { authorization } = require('../middlewares/authorization')

// handle user 
router.post('/login', UserController.handleLogin)
router.post('/register', UserController.handleRegister)
router.post('/google-sign-in', UserController.googleSignIn)

router.use(authentication)
router.post('/generate-midtrans-token', UserController.handleMidtransToken)




router.patch('/subscription', authorization, UserController.handleSubscription)
// router.patch('/subscription', UserController.handleSubscription)


module.exports = router
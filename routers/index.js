const express = require('express')
const router = require('express').Router()
const { authentication } = require('../middlewares/authentication')

router.get('/', (req, res, next) => {
    res.send('hello world')
})
router.use(authentication)


module.exports = router
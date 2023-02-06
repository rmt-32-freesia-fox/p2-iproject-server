const express = require('express')
const router = require('express').Router()
const { authentication } = require('../middlewares/authentication')

// router child
const newsApi = require('./news-router')
const user = require('./user-router')

// for connection test
router.get('/', async (req, res, next) => {
    res.send('You Are Connected to Nusantara Lounge')
})

router.use('/news', newsApi)
router.use('/user', user)



module.exports = router
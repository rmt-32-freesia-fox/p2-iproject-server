const express = require('express')
const router = require('express').Router()
const { authentication } = require('../middlewares/authentication')

// router child
const newsApi = require('./news-router')
const user = require('./user-router')
const playlist = require('./playlist-router')

// for connection test
router.get('/', async (req, res, next) => {
    res.send('You Are Connected to Nusantara Lounge')
})

router.use('/user', user)
router.use(authentication)
router.use('/news', newsApi)
router.use('/playlist', playlist)



module.exports = router
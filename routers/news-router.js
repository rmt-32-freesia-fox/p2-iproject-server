const express = require('express')
const router = require('express').Router()
const newsController = require('../Controllers/news-controller')


// News Api.com

router.get('/', newsController.fetchFromNewsApi)
router.get('/podcast', newsController.fetchPodcast)
router.get('/search', newsController.searchNews)
router.get('/games', newsController.fetchGameNews)
router.get('/games/search', newsController.searchGameNews)
router.get('/tech', newsController.fetchTechNews)





module.exports = router
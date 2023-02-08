const express = require('express')
const router = require('express').Router()
const PlaylistController = require('../Controllers/playlist-controller')

const { authentication } = require('../middlewares/authentication')
const { authorizationFav } = require('../middlewares/authorization')


router.use(authentication)

router.post('/add', authorizationFav, PlaylistController.addPlaylist)






module.exports = router
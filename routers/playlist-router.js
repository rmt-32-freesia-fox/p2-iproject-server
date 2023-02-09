const express = require('express')
const router = require('express').Router()
const PlaylistController = require('../Controllers/playlist-controller')

const { authentication } = require('../middlewares/authentication')
const { authorizationFav, authorizationRemove } = require('../middlewares/authorization')


router.use(authentication)

router.get('/', PlaylistController.showPlaylist)
router.post('/', authorizationFav, PlaylistController.addPlaylist)
router.delete('/', authorizationRemove, PlaylistController.removePlaylist)






module.exports = router
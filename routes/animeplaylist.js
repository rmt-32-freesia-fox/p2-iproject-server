const AnimePlaylistController = require('../controllers/AnimePlaylistController')
const authentication = require('../middlewares/authentication')

const router = require('express').Router()

router.use(authentication)
router.post('/animeplaylist', AnimePlaylistController.createPlaylist)
router.patch('/animeplaylist', AnimePlaylistController.updatePlaylist)
router.delete('/animeplaylist', AnimePlaylistController.deletePlaylist)
router.get('/animeplaylist/:UserId', AnimePlaylistController.allPlaylist)

module.exports = router
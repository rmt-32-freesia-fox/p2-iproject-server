const AnimePlaylistController = require('../controllers/AnimePlaylistController')
const authentication = require('../middlewares/authentication')

const router = require('express').Router()

router.get('/animeplaylist', AnimePlaylistController.allPlaylist)
router.use(authentication)
router.post('/animeplaylist', AnimePlaylistController.createPlaylist)

module.exports = router
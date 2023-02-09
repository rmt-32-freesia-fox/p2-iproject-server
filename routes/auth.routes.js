const { Router } = require('express')
const GithubController = require('../controllers/github.controllers')
const DiscordController = require('../controllers/discord.controllers')
const SpotifyController = require('../controllers/spotify.controllers')
const { authenticate } = require('../middlewares/auth.middlewares')
const router = Router()

router.get('/github', GithubController.oauthUrl)
router.post('/github', GithubController.login)
router.put('/github', authenticate, GithubController.link)
router.delete('/github', authenticate, GithubController.unlink)

router.get('/discord', DiscordController.oauthUrl)
router.post('/discord', DiscordController.login)
router.put('/discord', authenticate, DiscordController.link)
router.delete('/discord', authenticate, DiscordController.unlink)

router.get('/spotify', SpotifyController.oauthUrl)
router.post('/spotify', SpotifyController.login)
router.put('/spotify', authenticate, SpotifyController.link)
router.delete('/spotify', authenticate, SpotifyController.unlink)

module.exports = router

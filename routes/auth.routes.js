const { Router } = require('express')
const GithubController = require('../controllers/github.controllers')
const DiscordController = require('../controllers/discord.controllers')
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

module.exports = router

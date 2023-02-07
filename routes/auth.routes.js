const { Router } = require('express')
const GithubController = require('../controllers/github.controllers')
const DiscordController = require('../controllers/discord.controllers')

const router = Router()

router.post('/github', GithubController.login)
router.put('/github', GithubController.link)
router.delete('/github', GithubController.unlink)

router.post('/discord', DiscordController.login)
router.put('/discord', DiscordController.link)
router.delete('/discord', DiscordController.unlink)

module.exports = router
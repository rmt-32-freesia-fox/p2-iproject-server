const { Router } = require('express')
const ProfileController = require('../controllers/profile.controllers')
const SpotifyController = require('../controllers/spotify.controllers')
const { authenticatePublic, authenticate } = require('../middlewares/auth.middlewares')

const router = Router()

router.get('/:username', authenticatePublic, ProfileController.detail)
router.get('/:username/spotify', SpotifyController.listening)

router.get('/:username/followings', ProfileController.detailFollowings)
router.get('/:username/followers', ProfileController.detailFollowers)

router.post('/:username/follow', authenticate, ProfileController.follow)
router.delete('/:username/follow', authenticate, ProfileController.unfollow)

module.exports = router
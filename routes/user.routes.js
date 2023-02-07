const { Router } = require('express')
const UserController = require('../controllers/user.controllers')

const router = Router()

router.get('/:username', UserController.detail)

router.get('/:username/followings', UserController.detailFollowings)
router.get('/:username/followers', UserController.detailFollowers)

router.post('/:username/follow', UserController.follow)
router.delete('/:username/follow', UserController.unfollow)

module.exports = router
const { Router } = require('express')
const UserController = require('../controllers/user.controller')

const { authenticate } = require('../middlewares/auth.middlewares')
const { uploadImgbox, handleImage } = require('../middlewares/file.middlewares')

const router = Router()

router.use(authenticate)
router.get('/', UserController.getMe)
router.put('/', handleImage, uploadImgbox, UserController.edit)

module.exports = router

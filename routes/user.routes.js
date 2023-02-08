const { Router } = require('express')
const UserController = require('../controllers/user.controller')
const multer = require('multer')

const { authenticate } = require('../middlewares/auth.middlewares')
const { uploadImgbox } = require('../middlewares/file.middlewares')

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })
const router = Router()

router.get('/', authenticate, UserController.getMe)
router.put(
  '/',
  authenticate,
  upload.single('profilePicture'),
  uploadImgbox,
  UserController.edit
)

module.exports = router

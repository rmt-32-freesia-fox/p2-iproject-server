const { imgbox } = require('imgbox')
const multer = require('multer')
const path = require('path')

const storage = multer.memoryStorage()
const upload = multer({
  storage: storage,
  fileFilter: function (req, file, callback) {
    var ext = path.extname(file.originalname)
    if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
      return callback(new Error('Only images are allowed'))
    }
    callback(null, true)
  },
})

const handleImage = upload.single('profilePicture')

const uploadImgbox = async (req, res, next) => {
  try {
    if (req.file) {
      const data = await imgbox(req.file.buffer)
      const file = data.files[0]
      req.file.url = file.original_url
    }
    next()
  } catch (error) {
    next(error)
  }
}

module.exports = { uploadImgbox, handleImage }

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

const uploadImgbox = async (req, res, next) => {
  try {
    const { profilePicture, background } = req.files

    const images = []
    req.imgbox = {}

    if (profilePicture) {
      images.push({
        buffer: profilePicture[0].buffer,
        filename: profilePicture[0].originalname,
      })
    }
    if (background) {
      images.push({
        buffer: background[0].buffer,
        filename: background[0].originalname,
      })
    }

    if (images.length) {
      const data = await imgbox(images)
      const { files } = data
      if (background) {
        req.imgbox.background = files.find(
          ({ name }) => name === background[0].originalname.replace(/ /g, '_')
        ).original_url
      }
      if (profilePicture) {
        req.imgbox.profilePicture = files.find(
          ({ name }) =>
            name === profilePicture[0].originalname.replace(/ /g, '_')
        ).original_url
      }
    }
    next()
  } catch (error) {
    next(error)
  }
}

const handleImage = upload.fields([
  {
    name: 'profilePicture',
    maxCount: 1,
  },
  {
    name: 'background',
    maxCount: 1,
  },
])

module.exports = { uploadImgbox, handleImage }

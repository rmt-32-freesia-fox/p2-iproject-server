const { imgbox } = require('imgbox')

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

module.exports = { uploadImgbox }

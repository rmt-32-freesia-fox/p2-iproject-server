const router = require('express').Router()
const BookController = require('../controllers/bookController')
const { authentication } = require('../middlewares')

router.get('/books', BookController.allBook) //? Ini list of all book untuk di homepage // DONE
router.get('/books/:id', BookController.bookById) //? Ini detail book per id // DONE
router.post('/mybooks/:bookId', authentication, BookController.addToMyBook) //? Ini add to cart dari user // DONE
router.get('/mybooks', authentication, BookController.allMyBook) //? Ini list of all cart dari user // DONE
router.post('/translate', BookController.translateWord) //? Untuk translate kalimat di detail page
router.get('/convert', BookController.currencyConverter) //? Untuk convert currency di detail page
router.get('/searchbook', BookController.searchBook) //? Untuk search trivia book di home page
router.post('/generate-midtrans-token', authentication, BookController.generateTokenMidtrans) //? Untuk dapetin token midtrans
router.get('/send-email', authentication, BookController.sendEmailAfterPayment) //? Untuk kirim email setelah payment


module.exports = router

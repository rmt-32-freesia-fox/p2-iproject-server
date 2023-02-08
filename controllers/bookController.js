const { User, Book, UserBook } = require('../models')
const axios = require('axios')
const midtransClient = require('midtrans-client');
const { sendEmail } = require('./nodeMailer')


// let baseUrl = `http://localhost:3000/` //! Sebelum Deploy
let baseUrl = `berliterasi-production.up.railway.app/` //! Setelah Deploy

class BookController {

    static async allBook(req, res, next) {
        try {
            const books = await Book.findAll()
            res.status(200).json(books)

        } catch (error) {
            console.log(error);
            next(error)
        }
    } //! DONE

    static async bookById(req, res, next) {
        let { id } = req.params
        try {
            const getBookById = await Book.findByPk(id)

            if (!getBookById) {
                res.status(404).json({ message: `Books with ID:${id} is not found` })
            }

            let qrCodeGenerator = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${baseUrl}detail/${id}`
            getBookById.dataValues.qrCodeGenerator = qrCodeGenerator
            res.status(200).json(getBookById)

        } catch (error) {
            next(error)
        }
    } //! DONE

    static async addToMyBook(req, res, next) {
        const { id } = req.user
        const { bookId } = req.params

        try {
            const bookById = await Book.findByPk(bookId)
            if (!bookById) {
                throw ({ name: 'bookNotFound' })
            }

            const addBookToMyBook = await UserBook.create({
                UserId: id,
                BookId: bookId,
            })

            res.status(201).json(addBookToMyBook)

        } catch (error) {
            if (error.name == 'bookNotFound') {
                res.status(404).json({ message: "Book not found" })
            } else {
                res.status(500).json({ message: "Internal server error" })
            }
        }
    } //! DONE

    static async allMyBook(req, res, next) {
        const { id } = req.user

        try {
            const getMyBook = await UserBook.findAll({
                where: { UserId: id },
                include: Book,
            })

            res.status(200).json(getMyBook)

        } catch (error) {
            res.status(500).json({ message: "Internal server error" })
        }
    } //! DONE

    static async translateWord(req, res, next) {
        try {
            const { translate } = req.query

            const encodedParams = new URLSearchParams();
            encodedParams.append("source_language", "en");
            encodedParams.append("target_language", "id");
            encodedParams.append("text", translate);

            const options = {
                method: 'POST',
                url: 'https://text-translator2.p.rapidapi.com/translate',
                headers: {
                    'content-type': 'application/x-www-form-urlencoded',
                    'X-RapidAPI-Key': process.env.Text_Translator,
                    'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
                },
                data: encodedParams
            };

            const response = await axios(options)
            res.status(200).json({ data: response.data.data.translatedText })

        } catch (error) {
            console.log(error);
            next(error)
        }
    } //! DONE

    static async currencyConverter(req, res, next) {
        try {
            const { have, want, amount } = req.query

            const options = {
                method: 'GET',
                url: 'https://currency-converter-by-api-ninjas.p.rapidapi.com/v1/convertcurrency',
                params: { have: have, want: want, amount: amount },
                headers: {
                    'X-RapidAPI-Key': process.env.Currency_Converter,
                    'X-RapidAPI-Host': 'currency-converter-by-api-ninjas.p.rapidapi.com'
                }
            };

            const response = await axios(options)
            res.status(200).json({ data: response.data.new_amount })

        } catch (error) {
            console.log(error);
            next(error)
        }
    } //! DONE

    static async searchBook(req, res, next) {
        try {

            let { search } = req.query

            const options = {
                method: 'GET',
                url: `https://hapi-books.p.rapidapi.com/search/${search}`,
                headers: {
                    'X-RapidAPI-Key': process.env.Search_Book,
                    'X-RapidAPI-Host': 'hapi-books.p.rapidapi.com'
                }
            };

            const response = await axios(options)
            res.status(200).json({ data: response.data })

        } catch (error) {
            console.log(error);
            next(error)
        }
    } //! DONE

    static async generateTokenMidtrans(req, res, next) {
        try {

            const findUser = await User.findByPk(req.user.id)

            let snap = new midtransClient.Snap({
                // Set to true if you want Production Environment (accept real transaction).
                isProduction: false,
                serverKey: process.env.MIDTRANS_SERVER_KEY
            });

            let parameter = {
                "transaction_details": {
                    "order_id": "Transaction_" + Math.floor(10000 + Math.random() * 90000),
                    "gross_amount": 250000
                },
                "credit_card": {
                    "secure": true
                },
                "customer_details": {
                    "email": findUser.email
                }
            };

            const midtranToken = await snap.createTransaction(parameter)
            // console.log(midtranToken);
            res.status(201).json(midtranToken)

        } catch (error) {
            console.log(error);
            next(error)
        }
    } //! DONE

    static async sendEmailAfterPayment(req, res, next) {
        try {

            sendEmail({
                to: req.user.email,
                subject: 'Thank you for buying book from us!',
                html: `<p> Thank you for <strong> supporting the development of this platform </strong> by buying book from us.<br>
                <br>
                The book you ordered <strong> will be sent immediately </strong> to the address you registered at sign up. <br>
                <br>
                Once again, thank You! </p>`
            })

        } catch (error) {
            next(error)
        }
    }
}

module.exports = BookController
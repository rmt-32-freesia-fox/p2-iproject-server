const { User, Book, UserBook } = require('../models')
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
            console.log(error, '<--- INI ERRORNYA', 0);
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



}

module.exports = BookController
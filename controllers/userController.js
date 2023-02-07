const { User, Book, UserBook } = require('../models')
const { hashPassword, checkPassword, generateToken, decodeToken } = require('../helpers')

class UserController {

    static async register(req, res, next) {
        const { email, password, address } = req.body
        try {
            const user = await User.create({ email, password, address })

            res.status(201).json({
                id: user.id,
                email: user.email,
                address: user.address
            })
        } catch (error) {
            next(error)
        }
    } //! DONE - EROR HANDLER BELUM DI BUAT

    static async login(req, res, next) {
        const { email, password } = req.body
        try {
            const userLogin = await User.findOne({ where: { email } })
            const error = {
                name: "InvalidLogin",
                message: "Incorrect Email and Password",
            }

            if (!userLogin) {
                throw error

            } else {
                const isValid = checkPassword(password, userLogin.password)

                if (!isValid) {
                    throw error
                } else {
                    const access_token = generateToken({
                        id: userLogin.id,
                        email: userLogin.email,
                        address: userLogin.address
                    })

                    res.status(200).json({ access_token })
                }
            }
        } catch (error) {
            console.log(error);
            next(error)
        }
    } //! DONE - EROR HANDLER BELUM DI BUAT

    static async loginByGoogle(req, res, next) {
        // WIll update soon, ASAP!
    }

    static async loginByGithub(req, res, next) {
        // WIll update soon, ASAP!
    }

    static async loginByFacebook(req, res, next) {
        // WIll update soon, ASAP!
    }

}

module.exports = UserController
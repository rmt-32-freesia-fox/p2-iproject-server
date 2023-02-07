const { comparePassword } = require('../helpers/bcrypt')
const { encodedToken } = require('../helpers/jwt')
const { User } = require('../models')

class UserController {
    static async register(req, res, next) {
        try {
            const { username, email, password } = req.body
            const user = await User.create({ username, email, password })

            res.status(201).json({ message: "success create user", username: user.username, email: user.email })
        } catch (error) {
            console.log(error);
            next(error)
        }
    }
    static async login(req, res, next) {
        try {
            const { email, password } = req.body
            if (!email || !password) {
                throw { name: "InvalidLogin" }
            }
            const user = await User.findOne({ where: { email } })
            if (!user) {
                throw { name: "InvalidLogin" }
            } else {
                const isValid = comparePassword(password, user.password)
                if (!isValid) {
                    throw { name: "InvalidLogin" }
                } else {
                    const access_token = encodedToken({
                        id: user.id,
                        username: user.username
                    })
                    res.status(200).json({ access_token })
                }
            }
        } catch (error) {
            console.log(error);
            next(error)
        }
    }
}

module.exports = UserController
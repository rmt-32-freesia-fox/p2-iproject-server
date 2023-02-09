const { hashPassword, checkPassword, generateToken, decodeToken } = require('../helpers')
const { User, Book, UserBook } = require('../models')

async function authentication(req, res, next) {
    try {
        let { access_token } = req.headers
        if (!access_token) {
            throw ({ name: 'invalidToken' })
        }

        let payload = decodeToken(access_token)
        let checkUser = await User.findOne({ where: { email: payload.email } })

        console.log(checkUser);

        if (!checkUser) {
            throw ({ name: 'invalidToken' })
        } else {
            req.user = {
                id: payload.id,
                email: payload.email
            }
        }

        next()

    } catch (error) {
        console.log(error, '<-- Ini error dari authentication');
        if (error.name == 'invalidToken') {
            res.status(401).json({ message: "Invalid token" })
        } else if (error.name == 'JsonWebTokenError') {
            res.status(403).json({ message: "You are not authorized" })
        }
    }
}

module.exports = { authentication }
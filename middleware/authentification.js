const { decodedToken } = require("../helpers/jwt")
const { User } = require("../models")



async function authentification(req, res, next) {
    try {
        let { access_token } = req.headers
        if (!access_token) {
            throw { name: 'Unauthentificated' }
        }
        let payLoad = decodedToken(access_token)

        let user = await User.findByPk(payLoad.id)
        if (!user) {
            throw { name: 'Unauthentificated' }
        }
        req.user = {
            id: user.id,
            username: user.username,
            email: user.email
        }
        next()
    } catch (error) {
        next(error)
    }
}


module.exports = { authentification }
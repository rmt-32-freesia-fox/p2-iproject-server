const { decodeToken } = require('../helpers/helpers')
const { User } = require('../models')

async function authentication(req, res, next) {
    try {
        let { access_token } = req.headers
        if (!access_token) throw { name: `unAuthentication` }

        let payload = decodeToken(access_token)
        let user = await User.findOne({ where: { email: payload.email } })
        if (!user) throw { name: `unAuthentication` }
        req.user = payload.id
        console.log(req.user);
        next()
    } catch (error) {
        // console.log(error);
        next(error)
    }
}



module.exports = { authentication }
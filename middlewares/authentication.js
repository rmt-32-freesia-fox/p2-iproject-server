const { decodeToken } = require('../helpers/helpers')

async function authentication(req, res, next) {
    try {
        let { access_token } = req.headers
        if (!access_token) throw { name: `unAuthentication` }

        let payload = decodeToken(access_token)
        let user = await User.findOne({ where: { username: payload.username } })
        if (!user) throw { name: `unAuthentication` }

        next()
    } catch (error) {
        console.log(error);
        next(error)
    }
}

async function authenticationCustomer(req, res, next) {
    try {
        let { access_token } = req.headers
        if (!access_token) throw { name: `unAuthentication` }

        let payload = decodeToken(access_token)
        let user = await Customer.findByPk(payload.id)
        if (!user) throw { name: `unAuthentication` }
        req.id = user.id

        next()
    } catch (error) {
        console.log(error);
        next(error)
    }
}


module.exports = { authentication, authenticationCustomer }
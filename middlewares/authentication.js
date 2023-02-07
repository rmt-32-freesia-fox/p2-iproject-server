const { decodeToken } = require('../helpers/jwt')
const {User} = require('../models')

async function authentication(req,res,next){
    const {access_token} = req.headers
    try {
        if(!access_token) throw {name: 'Unauthenticated'}
        const payload = decodeToken(access_token)
        const user = await User.findByPk(payload.id)
        if(!user) throw {name: 'Unauthenticated'}
        req.user = {
            id:user.id
        }
        next()
    } catch (err) {
        next(err)
    }
}

module.exports = {authentication}
const { User } = require('../models')




async function authorization(req, res, next) {
    try {
        const validUser = await User.findByPk(req.user)
        if (!validUser) throw { name: `unauthorized` }
        if (validUser.role === 'Premium') throw { name: `alreadyPremium` }

        next()
    } catch (error) {
        next(error)
    }
}



module.exports = { authorization }
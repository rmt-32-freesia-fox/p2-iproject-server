const { User, UserPlaylist, Playlist } = require('../models')




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

async function authorizationFav(req, res, next) {
    const { title, image, audio, post_content, published_at } = req.body
    try {
        const checkPlaylist = await Playlist.findOrCreate({
            where: {
                title, image, audio, post_content, published_at
            }
        })
        const checkUserFav = await UserPlaylist.findOne({ where: { UserId: req.user, PlaylistId: checkPlaylist[0].id } })
        if (checkUserFav) throw { name: `faved` }
        next()
    } catch (error) {
        next(error)
    }
}



module.exports = { authorization, authorizationFav }
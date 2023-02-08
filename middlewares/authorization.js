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
    console.log(title, image, audio, post_content, published_at);
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

async function authorizationRemove(req, res, next) {
    try {
        const { PlaylistId } = req.body
        const checkPlaylist = await Playlist.findOne({ where: { id: PlaylistId } })
        const checkUser = await User.findByPk(req.user)
        if (!checkPlaylist || !checkUser) throw { name: `unauthorized` }

        next()
    } catch (error) {
        next(error)
    }
}



module.exports = { authorization, authorizationFav, authorizationRemove }
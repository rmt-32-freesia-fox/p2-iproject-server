"use strict"
const { Playlist, UserPlaylist } = require('../models')

class Controller {
    static async addPlaylist(req, res, next) {
        const { title, image, audio, post_content, published_at } = req.body
        try {
            const findPlaylist = await Playlist.findOne({ title, image, audio, post_content, published_at })
            const verifyPlaylist = await UserPlaylist.findOne({ where: { UserId: req.user, PlaylistId: findPlaylist.id } })
            if (verifyPlaylist) throw { name: `faved` }

            const makePlaylist = await UserPlaylist.create({ UserId: req.user, PlaylistId: findPlaylist.id })
            res.status(201).json(`success adding to favorite`)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = Controller
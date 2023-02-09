"use strict"
const { Playlist, UserPlaylist } = require('../models')

class Controller {
    static async addPlaylist(req, res, next) {
        const { title, image, audio, post_content, published_at } = req.body
        try {
            const findPlaylist = await Playlist.findOne({ where: { title, image, audio, post_content, published_at } })
            const verifyPlaylist = await UserPlaylist.findOne({ where: { UserId: req.user, PlaylistId: findPlaylist.id } })
            console.log(verifyPlaylist, '<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>', req.user, findPlaylist.id);
            if (verifyPlaylist) throw { name: `faved` }
            const makePlaylist = await UserPlaylist.create({ UserId: req.user, PlaylistId: findPlaylist.id })
            res.status(201).json(`success adding to favorite`)
        } catch (error) {
            next(error)
        }
    }

    static async showPlaylist(req, res, next) {
        try {
            let userPlaylist = await UserPlaylist.findAll({
                include: {
                    model: Playlist,

                },
                where: {
                    UserId: req.user
                }
            })
            res.status(200).json(userPlaylist)
        } catch (error) {
            next(error)
        }
    }

    static async removePlaylist(req, res, next) {
        const { UserPlaylistId } = req.body
        try {
            let remove = await UserPlaylist.destroy({ where: { id: UserPlaylistId } })
            if (!remove) throw { name: `removed` }
            res.status(200).json(`successfuly removed`)
        } catch (error) {
            next(error)
        }
    }

}

module.exports = Controller
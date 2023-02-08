const { User,Anime,AnimePlaylist } = require("../models");
const { comparePassword } = require("../helpers/bcrypt");
const { generateToken } = require("../helpers/jwt");
const axios = require('axios')

class AnimePlaylistController {
  static async allPlaylist(req, res, next) {
    try {
        let {UserId} = req.params 
        console.log(req.params);
      let animePlaylist = await AnimePlaylist.findAll({where : {UserId} , include : Anime, order: [
        ['id'],
    ],});
    // console.log(animePlaylist);
      res.status(201).json(animePlaylist);
    } catch (error) {
      next(error);
    }
  }

  static async createPlaylist(req, res, next) {
    try {
       let {title,AnimeId,episodes,image} = req.body
       console.log(req.body);
       const [anime, created] = await Anime.findOrCreate({
        where: { id : AnimeId, title,episodes,image },
      });
    //   console.log(anime,"USER");
    let dataPlaylist = await AnimePlaylist.create({
        UserId: req.user.id,
        AnimeId: anime.dataValues.id,
        status: "not watched",
        totalEpisodes: anime.dataValues.episodes,
        watchedEpisodes: 0
    })
    //   console.log(created,"created");
      res.status(200).json(dataPlaylist);
    } catch (error) {
      next(error);
    }
  }
  static async updatePlaylist(req, res, next) {
    try {
       let {UserId,watchedEpisodes,AnimeId} = req.body
       console.log(req.body);
       const anime = await AnimePlaylist.findOne({
        where: { AnimeId, UserId },
      });
      console.log(anime,"anime");
      let status = "Not Finish Watched"
      if (anime.totalEpisodes == watchedEpisodes) {
        status = "Watched"
      } else {
        status = "Not Finish Watched" 
      }
    let dataPlaylist = await anime.update({
        status,
        watchedEpisodes: watchedEpisodes
    })
    //   console.log(created,"created");
      res.status(200).json(dataPlaylist);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = AnimePlaylistController;

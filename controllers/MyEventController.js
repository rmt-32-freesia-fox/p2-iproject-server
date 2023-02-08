const { User,Anime,AnimePlaylist } = require("../models");
const { comparePassword } = require("../helpers/bcrypt");
const { generateToken } = require("../helpers/jwt");
const axios = require('axios')

class MyEventController {
  static async createMyEvent(req, res, next) {
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
}

module.exports = MyEventController;

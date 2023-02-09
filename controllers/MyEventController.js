const { User,Anime,AnimePlaylist,MyEvent } = require("../models");
const { comparePassword } = require("../helpers/bcrypt");
const { generateToken } = require("../helpers/jwt");
const axios = require('axios')

class MyEventController {
  static async createMyEvent(req, res, next) {
    console.log(req.user);
    try {
        let {UserId,EventId} = req.body 
      let myevent = await MyEvent.create({UserId,EventId});
    // console.log(animePlaylist);
      res.status(201).json(myevent);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = MyEventController;

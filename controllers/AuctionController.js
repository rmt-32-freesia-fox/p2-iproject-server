"use strict";
const { User, Auction, Image, History } = require("../models");
const axios = require("axios");
const { imgbox } = require("imgbox");
const { Op } = require("sequelize");

module.exports = class AuctionController {
  static async getAuction(req, res, next) {
    try {
      const auctions = await Auction.findAll({
        where: {
          status: "available",
        },
      });
      res.status(200).json(auctions);
    } catch (err) {
      next(err);
    }
  }
  static async getMyAuction(req, res, next) {
    try {
      const UserId = req.user.id;
      console.log(UserId);
      const auctions = await Auction.findAll({
        where: {
          UserId,
        },
      });
      res.status(200).json(auctions);
    } catch (err) {
      next(err);
    }
  }
  static async getWinner(req, res, next) {
    try {
      const AuctionId = req.params.id;
      const winner = await History.findOne({
        include: {
          model: User,
          attributes: ["id", "email", "name"],
        },
        where: {
          AuctionId,
        },
        order: [["bid", "desc"]],
        limit: 1,
      });
      if (!winner) {
        res.status(200).json({ bid: "-", User: { name: "-" } });
      }
      res.status(200).json(winner);
    } catch (err) {
      next(err);
    }
  }
  static async getItem(req, res, next) {
    try {
      const { category } = req.query;
      const { data } = await axios({
        method: "GET",
        url: `https://computer-components-api.p.rapidapi.com/${category}`,
        params: { limit: "10", offset: "0" },
        headers: {
          "X-RapidAPI-Key":
            "fde6a3afcfmsh393ee3de8984917p193f72jsn153f00a61685",
          "X-RapidAPI-Host": "computer-components-api.p.rapidapi.com",
        },
      });
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }
  static async postAuction(req, res, next) {
    try {
      const upload = req.files.map((el) => {
        return {
          filename: el.originalname,
          buffer: el.buffer,
        };
      });
      const response = await imgbox(upload);
      const UserId = req.user.id;
      const { name, category, date, color, startPrice, multiple } = req.body;
      const newAuction = await Auction.create({
        UserId,
        name,
        category,
        color,
        startPrice,
        multiple,
        date,
        status: "available",
      });
      for (let i = 0; i < response.files.length; i++) {
        await Image.create({
          AuctionId: newAuction.id,
          imageUrl: response.files[i].original_url,
        });
      }
      res.status(200).json(newAuction);
    } catch (err) {
      next(err);
    }
  }
  static async getAuctionById(req, res, next) {
    try {
      const id = req.params.id;
      const auction = await Auction.findByPk(id);
      if (!auction) throw { name: "notFound" };
      const images = await Image.findAll({
        where: {
          AuctionId: auction.id,
        },
      });
      res.status(200).json({ auction, images });
    } catch (err) {
      next(err);
    }
  }
  static async getRecentAuction(req, res, next) {
    try {
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      const auction = await Auction.findAll({
        where: {
          date: {
            [Op.eq]: new Date(),
          },
        },
      });
      // console.log(auction);
      res.status(200).json(auction);
    } catch (err) {
      next(err);
    }
  }
  static async closeRoom(req, res, next) {}
};

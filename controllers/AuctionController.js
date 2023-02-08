"use strict";
const { User, Auction, Image, History } = require("../models");
const midtransClient = require("midtrans-client");
const nodemailer = require("nodemailer");
const axios = require("axios");
const { imgbox } = require("imgbox");
const { Op } = require("sequelize");
let transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.GMAIL_EMAIL, // generated ethereal user
    pass: process.env.GMAIL_KEY, // generated ethereal password
  },
});

module.exports = class AuctionController {
  static async getAuction(req, res, next) {
    try {
      const { search, category, page } = req.query;
      const option = {
        where: {
          name: {
            [Op.iLike]: `%%`, //KALO GAK DIKASIH INI ERROR TERUS
          },
        },
        order: [["date", "desc"]],
      };

      if (search) {
        option.where.name[Op.iLike] = `%${search}%`;
      }
      if (category) {
        option.where["category"] = category;
      }
      if (page) {
        const limiter = 8;
        option.limit = limiter;
        option.offset = (page - 1) * limiter;
      }
      const { count, rows } = await Auction.findAndCountAll(option);
      res.status(200).json({ totalItem: count, auctions: rows });
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
      });
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
      await History.create({
        AuctionId: newAuction.id,
        UserId: newAuction.UserId,
        bid: newAuction.startPrice,
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
      const auction = await Auction.findAll({
        where: {
          date: {
            [Op.eq]: new Date(),
          },
        },
      });
      res.status(200).json(auction);
    } catch (err) {
      next(err);
    }
  }
  static async closeBid(req, res) {
    try {
      await Auction.update(
        { status: "pending" },
        {
          where: {
            date: {
              [Op.eq]: new Date(),
            },
          },
        }
      );
    } catch (err) {
      console.log(err);
    }
  }
  static async getTransaction(req, res, next) {
    try {
      const UserId = req.user.id;
      const transactions = await History.findAll({
        include: {
          model: User,
          attributes: ["id", "name", "email"],
        },
        where: {
          UserId,
        },
        order: [["updatedAt", "desc"]],
      });
      res.status(200).json(transactions);
    } catch (err) {
      next(err);
    }
  }
  static async postTransaction(req, res, next) {
    try {
      const { email, id, name, price } = req.body;
      const auctionId = req.params.id;
      const auction = await Auction.findByPk(auctionId);
      if (auction.status !== "pending") throw { name: "alreadyPay" };
      let snap = new midtransClient.Snap({
        // Set to true if you want Production Environment (accept real transaction).
        isProduction: false,
        serverKey: process.env.MIDTRANS_SERVER,
      });
      let parameter = {
        transaction_details: {
          order_id: `${name}-INVOICE-ORDER-ID-${
            10000 + Math.floor(Math.random() * 30000)
          }`,
          gross_amount: price,
        },
        credit_card: {
          secure: true,
        },
        customer_details: {
          first_name: name,
          email: email,
        },
      };
      let midtransToken = await snap.createTransaction(parameter);
      res.status(200).json(midtransToken);
    } catch (err) {
      next(err);
    }
  }
  static async changeStatus(req, res, next) {
    try {
      const { id } = req.params;
      console.log(id);
      const auction = await Auction.findByPk(id);
      if (!auction) throw { name: "notFound" };
      await auction.update({ status: "sold" });
      res.status(200).json("Thankyou for purchasing this auction");
    } catch (err) {
      next(err);
    }
  }
};

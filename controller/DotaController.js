const axios = require('axios');
const { getPagination, getPaginationData } = require('../helper/pagination');
const { User } = require('../models');
const midtransClient = require('midtrans-client');
require('dotenv').config();
class DotaController {
  static async getAllProPlayers(req, res, next) {
    try {
      const { data } = await axios({
        method: 'GET',
        url: 'https://api.opendota.com/api/proPlayers',
      });

      let dota = [];
      for (let i = 0; i < 25; i++) {
        dota.push(data[i]);
      }

      res.status(200).json(dota);
    } catch (error) {
      console.log(error);
    }
  }

  static async getAllTeams(req, res, next) {
    try {
      const { data } = await axios({
        method: 'GET',
        url: 'https://api.opendota.com/api/teams',
      });

      let teamDota = [];
      for (let i = 0; i < 100; i++) {
        teamDota.push(data[i]);
      }

      res.status(200).json(teamDota);
    } catch (error) {
      console.log(error);
    }
  }

  static async getTeamById(req, res, next) {
    try {
      const { data } = await axios({
        method: 'GET',
        url: `https://api.opendota.com/api/teams/${req.params.team_id}`,
      });

      res.status(200).json(data);
    } catch (error) {
      console.log(error);
    }
  }

  static async midtrans(req, res, next) {
    try {
      const UserId = req.user.id;

      const findUser = await User.findByPk(UserId);

      // Create Snap API instance
      let snap = new midtransClient.Snap({
        // Set to true if you want Production Environment (accept real transaction).
        isProduction: false,
        serverKey: process.env.MIDTRANS_SERVER_KEY,
        clientKey: process.env.MIDTRANS_CLIENT_KEY,
      });

      let parameter = {
        transaction_details: {
          order_id: 'TRANSACTION_' + Math.floor(100000 + Math.random() * 900000),
          gross_amount: 1000000,
        },
        credit_card: {
          secure: true,
        },
        customer_details: {
          username: findUser.username,
          email: findUser.email,
        },
      };

      const midtransToken = await snap.createTransaction(parameter);

      res.status(200).json(midtransToken);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = DotaController;

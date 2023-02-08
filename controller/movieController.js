const axios = require("axios");
const midtransClient = require('midtrans-client');
const { Order } = require('../models')


class MovieController {
    static async allMovie(req, res, next) {
        try {
            const options = {
                method: 'GET',
                url: 'https://imdb-top-100-movies.p.rapidapi.com/',
                headers: {
                    'X-RapidAPI-Key': 'a19ac7857cmsh9fb1c28537353eep13be81jsnc2cf2963c3ac',
                    'X-RapidAPI-Host': 'imdb-top-100-movies.p.rapidapi.com'
                }
            };
            const response = await axios(options)
            res.status(200).json({ data: response.data })
        } catch (error) {
            console.log(error);
            next(error)
        }
    }
    static async movieById(req, res, next) {
        try {
            const id = req.params.id
            const options = {
                method: 'GET',
                url: `https://imdb-top-100-movies.p.rapidapi.com/${id}`,
                headers: {
                    'X-RapidAPI-Key': 'a19ac7857cmsh9fb1c28537353eep13be81jsnc2cf2963c3ac',
                    'X-RapidAPI-Host': 'imdb-top-100-movies.p.rapidapi.com'
                }
            };
            const response = await axios(options)
            res.status(200).json({ data: response.data })
        } catch (error) {
            console.log(error);
            next(error)
        }
    }
    static async midtransToken(req, res, next) {
        try {
            const MovieId = req.params.id
            const { id, username, email } = req.user
            let snap = new midtransClient.Snap({
                // Set to true if you want Production Environment (accept real transaction).
                isProduction: false,
                serverKey: "SB-Mid-server-hJt-nLiZ4zT2U1ugrPxzah2p"
            });
            const orderNumber = new Date().getTime()
            let parameter = {

                "transaction_details": {
                    "order_id": orderNumber,
                    "gross_amount": 50000
                },
                "credit_card": {
                    "secure": true
                },
                "customer_details": {
                    first_name: username,
                    email: email
                }
            };
            const order = await Order.create({ orderNumber, UserId: id, MovieId })
            snap.createTransaction(parameter)
                .then((transaction) => {
                    let transactionToken = transaction.token;
                    res.status(201).json({ transactionToken })
                })
        } catch (error) {
            next(error)
        }
    }
    static async updateStatus(req, res, next) {
        try {
            const orderNumber = req.params.id
            const order = await Order.update({ status: "paid" }, { where: { orderNumber } })
            const data = await Order.findOne({ where: { orderNumber, status: 'paid' } })
            res.status(200).json({ message: "success update status", data })
        } catch (error) {
            next(error)
        }
    }
    static async orderById(req, res, next) {
        try {
            const MovieId = req.params.movieId
            const order = await Order.findOne({ where: { MovieId, status: "paid" } })
            if (!order) {
                res.status(200).json({ message: "null" })
            } else {
                res.status(200).json({ order })
            }
        } catch (error) {
            console.log(error);
            next(error)
        }
    }
}
module.exports = MovieController
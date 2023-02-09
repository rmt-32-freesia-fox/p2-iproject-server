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
                    'X-RapidAPI-Key': '2e49e0f5b0msh29f18cffd1cf153p1e2596jsnb0ce53987731',
                    'X-RapidAPI-Host': 'imdb-top-100-movies.p.rapidapi.com'
                }
            };
            const response = await axios(options)
            // console.log(response.data);
            const output = response.data
            console.log(output.title);
            let { page, genre, search, limit } = req.query;
            console.log(search);
            let result;

            let query = {
                limit: 20,
            };
            console.log(output.map(el => el.title));
            if (genre && genre !== '') {
                result = output.filter((el) => el.genre[0] == genre || el.genre[1] == genre || el.genre[2] == genre);
            } else if (search && search !== '') {
                result = output.filter((el) => el.title == search);
            } else {
                result = output;
            }

            if (page) {
                query.offset = (page - 1) * limit
            } else {
                query.offset = 0;
            }
            const currentPage = +page ? +page : 0;
            const totalPage = Math.ceil(output.length / query.limit);

            const data = result.slice(query.offset, query.offset + query.limit);
            res.status(200).json({ data, currentPage, totalPage })
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
                    'X-RapidAPI-Key': '2e49e0f5b0msh29f18cffd1cf153p1e2596jsnb0ce53987731',
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
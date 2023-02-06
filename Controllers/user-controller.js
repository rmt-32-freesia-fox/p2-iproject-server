"use strict"
const { hashPassword, checkPass, decodeToken, generatetoken, generateRandomId } = require('../helpers/helpers')
const { User } = require('../models')
const midtransClient = require('midtrans-client');


class Controller {
    static async handleLogin(req, res, next) {
        try {
            const { email, password } = req.body
            if (!email || !password) throw { name: `loginError` }


            //check email
            const check = await User.findOne({ where: { email } })
            if (!check) throw { name: `loginError` }

            // check password
            const isValid = checkPass(password, check.password)
            if (!isValid) throw { name: `loginError` }

            // generate token
            const access_token = generatetoken({ id: check.id, email: check.email })
            res.status(200).json({ access_token, email: check.email })
        } catch (error) {
            next(error)
        }
    }

    static async handleRegister(req, res, next) {
        try {
            const { email, password } = req.body

            const newUser = await User.create({ email, password, role: `basic` })
            res.status(201).json({ response: { newUser }, msg: `${email} with id: ${newUser.id} has been succesfuly added` })

        } catch (error) {
            next(error)
        }
    }


    static async handleMidtransToken(req, res, next) {
        try {
            const validUser = await User.findOne({ where: { id: req.user } })
            if (validUser.status === 'premium') throw { name: `alreadyPremium` }

            // Create Snap API instance
            let snap = new midtransClient.Snap({
                // Set to true if you want Production Environment (accept real transaction).
                isProduction: false,
                serverKey: process.env.MIDTRANS_SERVER_KEY
            });

            let parameter = {
                "transaction_details": {
                    "order_id": generateRandomId(),
                    "gross_amount": 29000
                },
                "credit_card": {
                    "secure": true
                },
                "customer_details": {
                    "email": validUser.email,
                }
            };

            const midtransToken = await snap.createTransaction(parameter)
            res.status(201).json(midtransToken)
        } catch (error) {
            next(error)
        }
    }


    static async handleSubscription(req, res, next) {
        try {
            const newUser = await User.update({ role: `Premium` }, {
                where: {
                    id: req.user
                }
            });
            res.status(201).json({ msg: `status has been succesfuly updated` })

        } catch (error) {
            next(error)
        }
    }


}

module.exports = Controller
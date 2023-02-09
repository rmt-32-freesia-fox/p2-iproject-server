"use strict"
const { CLIENT_ID } = process.env
const { hashPassword, checkPass, decodeToken, generatetoken, generateRandomId } = require('../helpers/helpers')
const { User } = require('../models')
const midtransClient = require('midtrans-client');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(CLIENT_ID);
const nodemailer = require('nodemailer')

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

            console.log(check);
            // generate token
            const access_token = generatetoken({ id: check.id, email: check.email })
            res.status(200).json({ access_token, email: check.email, role: check.role })
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
            console.log(error);
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

    static async googleSignIn(req, res, next) {
        try {
            const token = req.headers["google-oauth-token"]
            //verify id
            const ticket = await client.verifyIdToken({
                idToken: token,
                audience: CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
                // Or, if multiple clients access the backend:
                //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
            });
            const payload = ticket.getPayload();

            //make id
            const { email, name } = payload

            let [user, created] = await User.findOrCreate({
                where: { email },
                defaults: {
                    email,
                    password: String(Math.random()),
                    role: 'Basic'
                }
            })

            let message, code

            if (created) {
                message = `User with email ${email} has been created`
                code = 201
                user = created
            } else {
                message = `${email} is a valid user`
                code = 200
            }
            console.log(user);
            const access_token = generatetoken({ id: user.id, email: user.email })
            res.status(code).json({ message, access_token, email: user.email, role: user.role })

        } catch (error) {
            console.log(error);
            next(error)
        }
    }

}

module.exports = Controller
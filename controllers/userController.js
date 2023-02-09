const { User, Book, UserBook } = require('../models')
const { hashPassword, checkPassword, generateToken, decodeToken } = require('../helpers')
const { sendEmail } = require('./nodeMailer')
const { CLIENT_ID } = process.env
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(CLIENT_ID);

class UserController {

    static async register(req, res, next) {
        const { email, password, address } = req.body
        try {

            const user = await User.create({ email, password, address })

            res.status(201).json({
                id: user.id,
                email: user.email,
                address: user.address
            })

            sendEmail({
                to: user.email,
            })

        } catch (error) {
            next(error)
        }
    } //! DONE - EROR HANDLER DONE

    static async login(req, res, next) {
        const { email, password } = req.body
        try {
            const userLogin = await User.findOne({ where: { email } })
            const error = {
                name: "InvalidLogin",
                message: "Incorrect Email and Password",
            }

            if (!userLogin) {
                throw error

            } else {
                const isValid = checkPassword(password, userLogin.password)

                if (!isValid) {
                    throw error
                } else {
                    const access_token = generateToken({
                        id: userLogin.id,
                        email: userLogin.email,
                        address: userLogin.address
                    })

                    res.status(200).json({ access_token })
                }
            }
        } catch (error) {
            console.log(error);
            next(error)
        }
    } //! DONE - EROR HANDLER DONE

    static async loginByGoogle(req, res, next) {
        try {
            const token = req.headers["google-auth-token"]
            // console.log(token, '<--- Ini token dari GIS');


            const ticket = await client.verifyIdToken({
                idToken: token,
                audience: CLIENT_ID,
            });
            const payload = ticket.getPayload();
            // console.log(payload, '<--- Ini payload dari GIS');
            const { email } = payload

            let [user, created] = await User.findOrCreate({
                where: { email },
                defaults: {
                    email,
                    password: String(Math.random()),
                    address: 'Indonesia'
                }
            })

            let message, code

            if (created) {
                message = `User with email ${email} has successfully created`
                code = 201
                // user = created
            } else {
                message = `User with email ${email} found`
                code = 200
            }

            const access_token = generateToken({
                id: user.id,
                address: "Indonesia"
            })

            res.status(code).json({ message, access_token })

        } catch (error) {
            console.log(error, '<-- Ini error dari google sign in');
            next(error)
        }
    }

    static async loginByGithub(req, res, next) {
        // WIll update soon, ASAP!
    }

    static async loginByFacebook(req, res, next) {
        // WIll update soon, ASAP!
    }

}

module.exports = UserController
"use strict"
const { hashPassword, checkPass, decodeToken, generatetoken } = require('../helpers/helpers')
const { User } = require('../models')


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
            const access_token = generatetoken({ id: check.id, email: check.email, role: check.role })
            req.role = check.role
            res.status(200).json({ access_token, email: check.email, role: check.role })
            // res.send('hello')

        } catch (error) {
            next(error)
        }
    }

    static async handleRegister(req, res, next) {
        try {
            const { email, password } = req.body

            const newUser = await User.create({ email, password, role: "basic", })
            res.status(201).json({ response: { newUser }, msg: `${email} with id: ${newUser.id} has been succesfuly added` })

        } catch (error) {
            next(error)
        }
    }

    static async handleSubscription(req, res, next) {
        try {
            const { role } = req.body

            const newUser = await User.update({ role }, {
                where: {
                    email: req.user.email
                }
            });
            res.status(201).json({ msg: `${email} status has been succesfuly updated` })

        } catch (error) {
            next(error)
        }
    }


}

module.exports = Controller
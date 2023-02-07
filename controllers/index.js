const { comparePassword } = require('../helpers/bcrypt')
const { encodeToken } = require('../helpers/jwt')
const {Plant,User,MyPlant,Categorie}= require('../models')
const CLIENT_ID = process.env['CLIENT_ID']
const { Op } = require('sequelize');

class Controller{

    //REGISTER

    static async REGIST (req,res,next){
        
        try {
            console.log(req.body);
            const {email,password,role} =req.body
            const newUser = await User.create({ email,password, role:"admin"})
            res.status(201).json({message:`Succes create New User With email ${newUser.email} `, id:newUser.id, email:newUser.email})
            
        } catch (error) {
            // console.log(error);
            next(error)
            
        }
    }

    ///LOGIN ADMIN

    static async LOGIN (req,res,next){
        try {
                // console.log(req.body);
            const {email,password} = req.body
           

            if(!email||email == ""){
                throw {name:'invalid_login'}

            }
            if(!password||password == ""){
                throw {name:'invalid_login'}

            }
            const Userlogin = await User.findOne ({
                where: {email}
            })
           
            if(!Userlogin){
                throw {name: 'invalid_login'}
            } else {
               
                const ValPassword = comparePassword (password, Userlogin.password)
                if(!ValPassword){
                    throw {name: 'invalid_login'}
                } else{

                    const access_token = encodeToken({
                        id: Userlogin.id,
                        
                    })
                    // console.log(Userlogin);
                    res.status(200).json({access_token,email: Userlogin.email, role:Userlogin.role})
                }



            }

            
        } catch (error) {
            // console.log(error);
           next(error)
        }
    }

    ///LOGIN CUSTOMER
    static async loginGoogle (req,res,next){
        try {

            const googleToken = req.headers['google-oauth-token']
            // console.log(req.headers);
            // console.log(googleToken)
            ///verivy by google
            const { OAuth2Client } = require('google-auth-library')
            const client = new OAuth2Client(CLIENT_ID)
            const ticket = await client.verifyIdToken({
                idToken: googleToken,
                audience: CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
                // Or, if multiple clients access the backend:
                //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
            })
            const { email, name } = ticket.getPayload()
            const [user, create] = await User.findOrCreate({
                where: { email },
                defaults: {
                    username: name,
                    email,
                    password: Math.random().toString(),
                    role: 'customer',
                   
                },
            })
            let message,code
            if(create){
                code = 201
                message = `User with ${create.email} has been created`
                user = create
            } else{
                code= 200
                message = `User with ${create.email} found`
            }
            // console.log(user.username);
            res.status(code).json({message, access_token: encodeToken({ id: user.id, role: user.role ,email:user.email,username:user.username}),
                email: user.email,
                username:user.username,
                role:user.role
            })
            
        } catch (error) {
            // console.log(error);
            next(error)
            
        }
    }







}

module.exports = Controller
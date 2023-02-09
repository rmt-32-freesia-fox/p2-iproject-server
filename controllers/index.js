const { comparePassword } = require('../helpers/bcrypt')
const { encodeToken } = require('../helpers/jwt')
const {Plant,User,MyPlant,Categorie}= require('../models')
const CLIENT_ID = process.env['CLIENT_ID']
const { Op } = require('sequelize');
const mailer = require('../helpers/nodemailer');
const midtransClient = require('midtrans-client');



class Controller{

    //REGISTER

    static async REGIST (req,res,next){
        
        try {
            // console.log(req.body);
            const {email,password,role} =req.body
            const newUser = await User.create({ email,password, role:"admin"})
            mailer(email)
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
                // mailer(email)
                
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

    ///FETCHPLANTS

    static async ALLPLANTS (req,res,next){
        try {

            const PLANTS= await Plant.findAll({
                include:{
                    model:Categorie,
                    attributes:['name']
                },

                orders:[
                    ['updatedAt','ASC']
                ]
            })
            res.status(200).json(PLANTS)
            
        } catch (error) {

            next(error)
            
        }
    }

    ///POST PLANT

    static async ADDPLANTS (req,res,next){
        try {

            const ADD = await Plant.create(req.body)

            res.status(201).json({id:ADD.id,name:ADD.name,imageUrl:ADD.imageUrl,price:ADD.price,stock:ADD.stock,CategoryId:ADD.CategoryId})
            
        } catch (error) {

            next(error)
            
        }

    }

    ///DELETE PLANT

    static async DELETEADMIN(req,res,next){
        try {
            const {id} =req.params
            const FIND= await Plant.findByPk(id)

            if(!FIND){
                res.status(404).json({
                    message:"Plant_not_found"
                })
            }

            const delet= await Plant.destroy({
                where:{
                    id:req.params.id
                }
            })


            if(delet){
                res.status(200).json({
                    message:`succes delete a ${FIND.name} plant`
                })
            }
            
        } catch (error) {
            
            next(error)
            
        }

    }

    ///EDIT PLANT

    static async EDITPLANT(req, res, next) {
        try {
            const EDIT = await Plant.update(req.body, {
                where: {
                    id: req.params.id
                },
                returning: true
            })
            res.status(200).json(
              EDIT
            )
        } catch (error) {
            next(error)
        }
    }





    //CUSTOMER SIDE 

    //ADDMYPLANT


    static async ALLMYFAV(req,res,next){
        try {

            const ALLMY= await MyPlant.findAll({
                where:{
                    UserId:req.user.id,status:false
                },
                attributes:['id','UserId','PlantId','status','quantity'],
                include:['Plant'],
                order:[
                    ['createdAt','ASC']
                ]
            })
            
            let totalQ=0
            const sub = ALLMY.map(el=>{
                totalQ=el.quantity*el.Plant.price
                return totalQ
            })

            let total= sub.reduce((a,b)=> a+b)

            res.status(200).json({ALLMY,sub,total})
            
        } catch (error) {
            next(error)
        }
    }

    ///ADDMYFAV

    static async ADDMYFAV(req,res,next){
        try {
            
             const addtomy = {
                UserId: req.user.id,
                PlantId: +req.body.PlantId,
                quantity: +req.body.quantity,
                status: false
            }
        
            const list = await MyPlant.findOne({
                where: {
                    UserId: addtomy.UserId,
                    PlantId: addtomy.PlantId,
                    status: false
                },
                attributes: ['id', 'UserId', 'PlantId', 'status', 'quantity']
            })
         
            const plantADD = await Plant.findByPk(+req.body.PlantId)
         
            if (plantADD.stock === 0) {
                throw{name:'Out_of_Stock'}
                return
            }

            if (!list) {
                const createlist = await MyPlant.create(addtomy)
                res.status(201).json(createlist)

            } else {
                console.log(plantADD.stock, list.quantity, addtomy.quantity);
                if ((plantADD.stock - list.quantity - addtomy.quantity) < 0) {
                    const checkQuantity = await MyPlant.update({
                        quantity: plantADD.stock
                    }, {
                        where: {
                            id: list.id,
                            status: false
                        },
                    })
                    throw{name:'Out_of_Stock'}
                    return
                } else {
                    
                    const updatelist = await MyPlant.update({
                        quantity: list.quantity + addtomy.quantity
                    }, {
                        where: {
                            id: list.id,
                            status: false
                        },
                        returning: true
                    })
                    if (updatelist[1][0].quantity <= 0) {
                        const deletelist = await MyPlant.destroy({
                            where: {
                                id: list.id
                            }
                        })
                        res.status(200).json({
                            message: 'succes delete plant'
                        })
                    } else {
                        res.status(200).json(updatelist)
                    }
                }
                
            }
            

           


            
        } catch (error) {
            next(error)
        }
    }


    ///DELETEMYFAV


    static async DELETEMY(req,res,next){
        try {

            const {plantId}=req.params
            

            const delet= await MyPlant.destroy({
                where:{
                    id:plantId
                }
            })
            res.status(200).json({
                message:`your plant list has been deleted`
            })
            
        } catch (error) {

            next(error)
            
        }
    }
    
      static async PAYMENTRANS(req, res, next) {
        try {
            const checkoutCarts = await MyPlant.findAll({
                where: {
                    UserId: req.user.id,
                    status: false
                },
                attributes: ['id', 'UserId', 'quantity', 'status'],
                include: ['Plant']
            })
            let subTotal = 0
            const sub = checkoutCarts.map(el => {
                subTotal = el.quantity * el.Plant.price
                return subTotal
            })
            
            let total = sub.reduce((a, b) => a + b)
            const user = await User.findByPk(req.user.id)

            let snap = new midtransClient.Snap({
                isProduction: false,
                serverKey: process.env.MIDTRANS_SERVER_KEY
            })
            let parameter = {
                "transaction_details": {
                    "order_id": "TRANSACTIONS_" + Math.floor(100000 + Math.random() * 900000),
                    "gross_amount": total
                },
                "credit_card": {
                    "secure": true
                },
                "customer_details": {
                    "name": user.name,
                    "email": user.email,

                }
            }
            const midtransToken = await snap.createTransaction(parameter)
            res.status(201).json({

                midtransToken
            })
        } catch (error) {
            next(error)
        }
    }

    static async CHECKOUT(req,res,next){
        try {
            const STATUS= await MyPlant.update({
                status:true
            }, {
                where:{
                    UserId:req.user.id
                }
            })
            res.status(200).json({message:"thank you for checkout"})
            
        } catch (error) {
            nrxt(error)
            
        }
    }


















}

module.exports = Controller
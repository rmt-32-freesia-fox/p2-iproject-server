if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
  }
const express = require('express')
const app = express()
const port = 3000
const cors = require('cors')
const router = require('./routes')
const errorHandler = require('./middlewares/errorHandler');
const midtransClient = require('midtrans-client');
const authentication = require("./middlewares/authentication");
const { User,Event } = require("./models");


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.post('/generate-midtrans-token',authentication, async (req,res,next)=>{
  let user = await User.findByPk(req.user.id)
try {
  let snap = new midtransClient.Snap({
    // Set to true if you want Production Environment (accept real transaction).
    isProduction : false,
    serverKey : process.env.MIDTRANS_SERVER_KEY
});
let parameter = {
  "transaction_details": {
      "order_id": "TRANSACTION_"+ Math.floor(100000+ Math.random() * 5585849),
      "gross_amount": 100000
  },
  "credit_card":{
      "secure" : true
  },
  "customer_details": {
      "username": user.username,
      "email": user.email,
  }
};
const midtransToken = await snap.createTransaction(parameter)
    console.log(midtransToken);
    res.status(201).json(midtransToken)
} catch (error) {
  next(error)
}
})
app.use(router)

app.use(errorHandler)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
const express = require('express')
const app = express()
const port = 3000

const cors = require('cors')

app.use(cors())
app.use(express.json())

app.use(express.urlencoded({ extended: true }))

const midtransClient = require('midtrans-client');

var client_id = '29694d93e1d24518aec34551ed349c5e'; // Your client id
var client_secret = 'bb6596f931934078b30f993bb36ab839'; // Your secret
var redirect_uri = 'http://localhost:3000/redirect/'; // Your redirect uri

var myCode = 'AQC_TIB-Twa01xZMXvBalPtBe1plZaUMjmC7qnjGLzor7u68exboycNJlIzTs6-wSRqIw4xsRQc_0I2P6FHVdVDMHmXsKd-OMbmJiJvIEtCMUmEV2DJPi3bN7SB-ctYHx23rlin-rkuVVGmoYmcNe2QHRd9MpZBPGyS8gGRxsO5Xw62sauwh9-kcyvWM1R2izdZDehu3sHQBQ7NEb3S8wZLOtePKqCLwRnVc1fhmQkBiTkes3NUyi2spKUsjlsQxTiVkIhpN6AZmuA'

var request = 'https://accounts.spotify.com/authorize?client_id=29694d93e1d24518aec34551ed349c5e&response_type=code&redirect_uri=http://localhost:3000/redirect/&scope=user-top-read%20user-read-recently-played%20user-read-currently-playing'

var request_token = 'https://accounts.spotify.com/api/token'

var access_token = "BQAg-qaRNc7G2ZNxaxlQ1xzjNdgr5ELWJGbBf0-7QF_u7gLGGFFZHdVVxQyxx6xXj3gMnLIyHiGvU9CasZU9y9hujdyMjmq5V23LbpN2Uw6i_rtqOXrb9xVscb2VZWAyjdSA1K3_d6huvCoGDka7xdQhJ01HUXyRfbID0bwcsfX6eMbMoQpAxbxrwlZi6QnWLOxQCjB5cv7nakLO9Y1TlKHZ"

var server_key = "SB-Mid-server-LLsj1r0T21cb2IQx_o6shDCS"

class Controller {
  
  static async get(req, res, next) { 
    res.send(req.query)
  }
  static async redirect(req, res, next) { 
    res.send(req.query)
  }
 
  static async midtrans(req, res, next) {  
    try {
        // Create Snap API instance
        let snap = new midtransClient.Snap({
        // Set to true if you want Production Environment (accept real transaction).
        isProduction : false,
        serverKey : server_key
        });
        
        let parameter = {
            "transaction_details": {
                "order_id": "macnesa_"+ Math.random(), // harus unique 
                "gross_amount": 10000
            },
            "credit_card":{
                "secure" : true
            },
            "customer_details": {
                "first_name": "budi",
                "last_name": "pratama",
                "email": "budi.pra@example.com",
                "phone": "08111222333"
            }
        };
        
        const request = await snap.createTransaction(parameter)
        
        let transactionToken = request.token;
        
        // trans action token
        console.log('transactionToken:',request); 
        
    } catch (error) {
        console.log(error);
    }
  }
  
  
  static async secondCall() {
    try {
      
    } catch (error) {
      console.log(error);
    }
  }
  
  static async login(req, res, next) { 
    try {
        const {code} = req.body
        console.log(code);
    } catch (error) {
        console.log(error);
    }
    // res.send(req.query)
  }
  
}

app.get('/', Controller.get)

app.get('/redirect', Controller.redirect)

app.post('/midtransToken', Controller.midtrans)




app.post('/login', Controller.login)






const  reqToken = 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64'))
// Basic Mjk2OTRkOTNlMWQyNDUxOGFlYzM0NTUxZWQzNDljNWU6YmI2NTk2ZjkzMTkzNDA3OGIzMGY5OTNiYjM2YWI4Mzk=

// console.log(reqToken);



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})



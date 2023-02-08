const express = require('express')
const app = express()
const port = 3000

const cors = require('cors')

const axios = require('axios')

const baseUrl = 'http://localhost:3000'

app.use(cors())
app.use(express.json())

app.use(express.urlencoded({ extended: true }))

const midtransClient = require('midtrans-client');

const {User} = require('./models')

var client_id = '29694d93e1d24518aec34551ed349c5e'; // Your client id
var client_secret = 'bb6596f931934078b30f993bb36ab839'; // Your secret
var redirect_uri = 'http://localhost:3000/redirect/'; // Your redirect uri

var myCode = 'AQC_TIB-Twa01xZMXvBalPtBe1plZaUMjmC7qnjGLzor7u68exboycNJlIzTs6-wSRqIw4xsRQc_0I2P6FHVdVDMHmXsKd-OMbmJiJvIEtCMUmEV2DJPi3bN7SB-ctYHx23rlin-rkuVVGmoYmcNe2QHRd9MpZBPGyS8gGRxsO5Xw62sauwh9-kcyvWM1R2izdZDehu3sHQBQ7NEb3S8wZLOtePKqCLwRnVc1fhmQkBiTkes3NUyi2spKUsjlsQxTiVkIhpN6AZmuA'

var request = 'https://accounts.spotify.com/authorize?client_id=29694d93e1d24518aec34551ed349c5e&response_type=code&redirect_uri=http://localhost:3000/redirect/&scope=user-top-read%20user-read-recently-played%20user-read-currently-playing'

var request_token = 'https://accounts.spotify.com/api/token'

var access_token = "BQAg-qaRNc7G2ZNxaxlQ1xzjNdgr5ELWJGbBf0-7QF_u7gLGGFFZHdVVxQyxx6xXj3gMnLIyHiGvU9CasZU9y9hujdyMjmq5V23LbpN2Uw6i_rtqOXrb9xVscb2VZWAyjdSA1K3_d6huvCoGDka7xdQhJ01HUXyRfbID0bwcsfX6eMbMoQpAxbxrwlZi6QnWLOxQCjB5cv7nakLO9Y1TlKHZ"

var server_key = "SB-Mid-server-LLsj1r0T21cb2IQx_o6shDCS"

const  buffer = 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64'))
// Basic Mjk2OTRkOTNlMWQyNDUxOGFlYzM0NTUxZWQzNDljNWU6YmI2NTk2ZjkzMTkzNDA3OGIzMGY5OTNiYjM2YWI4Mzk=





class Controller {
  
  static async get(req, res, next) { 
    res.send(req.query)
  }
  static async redirect(req, res, next) { 
    try {
      const {code} = req.query  
      const token = await Controller.secondCall(code) 
      // console.log(token);
      const data = token.data.access_token
      
      const request = await Controller.getProfile(data) 
      const {id} = request 
      
      let [user, created] = await User.findOrCreate({
        where: {
          userId: id
        }
      }) 
      // console.log(user, created);
      // let {id: idi} = user
      // let access_token = generateToken({ id }) 
      // let status = (created) ? 201 : 200
      // res.status(status).json({access_token})  
      
      // console.log(token.data.access_token);
      res.redirect('http://localhost:5173/?token=' + data) 
    } catch (error) {
      console.log(error, 'error nich');
    }
  }
  static getClientId(req, res, next) { 
    res.send(req.query)
  }
 
  static async getMidtransToken(req, res, next) {  
    const {access_token} = req.headers
    
    try {
        
        let profile = await Controller.getProfile(access_token)
        
        let { country, display_name, id } = profile
      
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
                "first_name": display_name 
            }
        };
        
        const request = await snap.createTransaction(parameter)
        
        let transactionToken = request.token;
        
        console.log(id, 'id');
        const updateDb = await User.update({paymentToken: transactionToken }, {
          where : {
            userId: id
          }
        })  
        console.log(updateDb);
        
        // trans action token
        console.log('transactionToken:',request); 
        res.status(201).json({payment_token: transactionToken })
    } catch (error) {
        console.log(error);
    }
  }
  
  
  static async secondCall(code) {
    try {
      const req = await 
      axios({
        method:'post',
        url:'https://accounts.spotify.com/api/token',
        data: {
          code,
          redirect_uri: baseUrl + "/redirect/",
          grant_type: "authorization_code"
        },
        headers: {
          // Authorization: 'Basic Mjk2OTRkOTNlMWQyNDUxOGFlYzM0NTUxZWQzNDljNWU6YmI2NTk2ZjkzMTkzNDA3OGIzMGY5OTNiYjM2YWI4Mzk=',
          Authorization: buffer,
          "Content-Type": 'application/x-www-form-urlencoded'
        }
      })
      return req
    } catch (error) {
      console.log(error, 'error gaes');
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
  
  static async getProfile(access_token) {
    try {
      const {data} = await 
      axios({
        method:'get',
        url:'https://api.spotify.com/v1/me', 
        headers: {
          Authorization: `Bearer `+ access_token,
        }
      })   
      return data   
    } catch (error) {
      throw error
    }
  }
  
  static async myProfile(req, res, next) { 
    const {access_token} = req.headers
    try {
      const data = await Controller.getProfile(access_token)
      
      res.status(200).json(data)
    } catch (error) {
      console.log(error, 'error gaes');
    }
  }
  
  static async myTopTracks(req, res, next) {
    const {limit} = req.query
    const {access_token} = req.headers
    let url = 'https://api.spotify.com/v1/me/top/tracks' 
    if(limit) url += `?limit=${limit}` 
    try {
      const {data} = await 
      axios({
        method:'get',
        url,
        headers: {
          Authorization: `Bearer `+ access_token,
        }
      })   
      res.status(200).json(data) 
    } catch (error) { 
      console.log(error, 'error gaes');
    }
  }
  
  static async myTopArtists(req, res, next) {
    const {limit} = req.query
    const {access_token} = req.headers
    let url = 'https://api.spotify.com/v1/me/top/artists' 
    if(limit) url += `?limit=${limit}` 
    try {
      const {data} = await 
      axios({
        method:'get',
        url,
        headers: {
          Authorization: `Bearer `+ access_token,
        }
      })   
      res.status(200).json(data) 
    } catch (error) {
      console.log(error, 'error gaes'); 
    }
  }
  
  static async myRecentlyPlayed(req, res, next) {
    const {limit} = req.query
    const {access_token} = req.headers
    let url = 'https://api.spotify.com/v1/me/player/recently-played'  
    if(limit) url += `?limit=${limit}` 
    try {
      const {data} = await 
      axios({
        method:'get',
        url,
        headers: {
          Authorization: `Bearer `+ access_token,
        }
      })   
      res.status(200).json(data) 
    } catch (error) {
      console.log(error, 'error gaes'); 
    }
  }
  
  static async findsomeSongs(req, res, next) {
    const {limit, q} = req.query
    const {access_token} = req.headers
    let url = `https://api.spotify.com/v1/search?q=${q}&type=track`  
    if(limit) url += `&limit=${limit}` 
    try {
      const {data} = await 
      axios({
        method:'get',
        url,
        headers: {
          Authorization: `Bearer `+ access_token,
        }
      })   
      res.status(200).json(data) 
    } catch (error) {
      console.log(error, 'error gaes'); 
    }
  }
  
  static async getTopGlobal(req, res, next) { 
    const {access_token} = req.headers
    let url = `https://api.spotify.com/v1/playlists/37i9dQZEVXbMDoHDwVN2tF?limit=1` 
    try {
      const {data} = await 
      axios({
        method:'get',
        url,
        headers: {
          Authorization: `Bearer `+ access_token,
        }
      })   
      res.status(200).json(data) 
    } catch (error) {
      console.log(error, 'error gaes'); 
    }
  }
}

app.get('/', Controller.get)

app.get('/redirect', Controller.redirect)

app.get('/paymentToken', Controller.getMidtransToken)



app.get('/clientId', Controller.getClientId)

app.post('/login', Controller.login)


app.get('/profile', Controller.myProfile)

app.get('/topTracks', Controller.myTopTracks)

app.get('/topArtists', Controller.myTopArtists)

app.get('/recently', Controller.myRecentlyPlayed)

app.get('/findSongs', Controller.findsomeSongs)

app.get('/topGlobal', Controller.getTopGlobal)
 


app.get('/test', (req, res, next) => {
  res.redirect('https://www.google.com')
})





// console.log(reqToken);



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})





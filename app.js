if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config(); }
    
const express = require('express')
const User = require('./models')
const app = express()
const port = process.env.PORT || 3000
const cors = require('cors')
const router = require('./router')
const errorhandler = require('./middleware/errorhandler')
const passport = require('passport');
const UserController = require('./controller/userController');
const FacebookStrategy = require('passport-facebook').Strategy

passport.use(
    new FacebookStrategy({
        clientID: 768383447545784,
        clientSecret: "b28071c89f3b816ca05a51b05115b801",
        callbackURL: "http://localhost:3000/auth/facebook/secrets"
    },
        function (access_token, refreshToken, profile, cb) {
            User.findOrCreate({ facebookId: profile.id }, function (err, user) {
                return cb(err, user);
            });
        }
    )
)

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(router)

app.use(errorhandler)
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
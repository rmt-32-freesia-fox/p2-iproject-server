if (process.env.NODE_ENV !== 'production') {
    require("dotenv").config();
}

const express = require('express')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 3000
const router = require('./routers')
const { errorHandler } = require("./middlewares/errorhandler");

app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())


app.use(router)

app.listen(port, () => {
    console.log(`News app listening on port ${port}`)
})
app.use(errorHandler);

module.exports = app
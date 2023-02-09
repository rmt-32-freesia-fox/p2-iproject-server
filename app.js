if (process.env.NODE_ENV != 'production') {
  require('dotenv').config()
}

const express = require('express')
const app = express()
const cors = require('cors')
const routes = require('./routes')
const errorHandling = require('./middlewware/errorHandling')
const port = process.env.PORT || 3000


app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())

app.use(routes)

app.use(errorHandling)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
const express = require('express')
const app = express()
const port = 3000
const cors = require('cors')
const routes = require('./routes')
const errorHandling = require('./middlewware/errorHandling')

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())

app.use(routes)

app.use(errorHandling)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
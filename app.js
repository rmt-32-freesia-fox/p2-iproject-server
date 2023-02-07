const express = require('express')
const app = express()
const port = 3000
const cors = require('cors')
const router = require('./routes')
app.use(cors())
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(router)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
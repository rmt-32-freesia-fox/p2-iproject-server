const express = require('express')
const router = express.Router()
const userRouter = require('../routes/userRoutes')
const bookRouter = require('../routes/bookRoutes')

//! Test home
router.get('/', (req, res) => {
    res.status(200).json({
        message: 'Server On!',
        status: '200'
    })
})

router.use(userRouter)
router.use(bookRouter)

module.exports = router
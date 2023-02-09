const router = require('express').Router()
const Controller = require('../controllers')

const { authorizationMYPLANT} = require('../middlewers/authorization')


router.get('/', Controller.ALLMYFAV)
router.post('/', Controller.ADDMYFAV)

// router.put('/',)
router.patch('/checkout')
router.post('/payment',Controller.PAYMENTRANS )


router.delete('/:plantId',authorizationMYPLANT,Controller.DELETEMY)
module.exports = router
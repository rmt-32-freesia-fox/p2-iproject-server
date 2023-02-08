const router = require('express').Router()
const Controller = require('../controllers')

const { authorizationMYPLANT} = require('../middlewers/authorization')


router.get('/', Controller.ALLMYFAV)
router.post('/', Controller.ADDMYFAV)
router.delete('/:plantId',authorizationMYPLANT,Controller.DELETEMY)

// router.put('/',)
// router.get('/payment', )


module.exports = router
const router = require('express').Router()
const Controller = require('../controllers')
const {authorizationAdmin} = require('../middlewers/authorization')



router.get('/',Controller.ALLPLANTS)
router.post('/',authorizationAdmin,Controller.ADDPLANTS)
router.delete('/:id',authorizationAdmin, Controller.DELETEADMIN)
router.put('/:id',authorizationAdmin,Controller.EDITPLANT)

module.exports = router
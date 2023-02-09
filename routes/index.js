const router = require('express').Router()
const Controller = require('../controllers')


const PlantR= require('./plants')
const MyPlantR= require('./myplants')
const CategorieR= require('./categorie')
const authentication = require('../middlewers/authentication')

router.post(`/google-signin`, Controller.loginGoogle)
router.post(`/register`, Controller.REGIST)
router.post('/login',Controller.LOGIN )


router.use(authentication)


router.use('/ArinandaPlants',PlantR)
router.use('/MyArinandaPlants',MyPlantR)
router.use('/categories',CategorieR)



module.exports = router
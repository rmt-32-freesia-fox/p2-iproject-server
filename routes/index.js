const { Controller } = require('../controllers')
const { errorHandler,  auth } = require('../middlewares')
const router = require('express').Router()  



// router.get('/', Controller.get)



router.get('/redirect', Controller.redirect)

router.get('/paymentToken', Controller.getMidtransToken)

router.use(auth)

router.get('/profile', Controller.myProfile)

router.get('/topTracks', Controller.myTopTracks)

router.get('/topArtists', Controller.myTopArtists)

router.get('/recently', Controller.myRecentlyPlayed)

router.get('/findSongs', Controller.findsomeSongs)

router.get('/topGlobal', Controller.getTopGlobal)

router.patch('/subcribed', Controller.userSubscribed)


router.get('/download/:id', Controller.downloadSong)





router.use(errorHandler)


module.exports = {
  router
}
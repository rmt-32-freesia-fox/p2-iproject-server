const { Controller } = require('../controllers')
const router = require('express').Router() 





router.get('/', Controller.get)

router.get('/redirect', Controller.redirect)

router.get('/paymentToken', Controller.getMidtransToken)

router.get('/clientId', Controller.getClientId)

router.post('/login', Controller.login)

router.get('/profile', Controller.myProfile)

router.get('/topTracks', Controller.myTopTracks)

router.get('/topArtists', Controller.myTopArtists)

router.get('/recently', Controller.myRecentlyPlayed)

router.get('/findSongs', Controller.findsomeSongs)

router.get('/topGlobal', Controller.getTopGlobal)

router.patch('/subcribed', Controller.userSubscribed)


router.get('/download/:id', Controller.downloadSong)




router.get('/test', (req, res, next) => {
  res.redirect('https://www.google.com')
})


module.exports = {
  router
}
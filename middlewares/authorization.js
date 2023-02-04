const { Genre } = require('../models')




async function authorizationGenre(req, res, next) {
    try {
        //check movie
        let genreId = req.params.id
        let genre = await Genre.findByPk(genreId)
        if (!genre) throw { name: "notFound" }

        // check author
        if (req.role !== 'admin') throw { name: "unauthorized" }
        next()
    } catch (error) {
        next(error)
    }
}



module.exports = { authorizationMovie, authorizationGenre, authorizatioFav }
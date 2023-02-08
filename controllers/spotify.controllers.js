const {
  getAccessToken,
  getLoginUrl,
  getNewAccessToken,
  getUserData,
  revokeUserToken,
  getListening,
} = require('../helpers/spotify')

const { Spotify, User, Discord, Github } = require('../models')
const { signToken } = require('../helpers/jwt')
const usernameGenerator = require('../helpers/usernameGenerator')

class SpotifyController {
  static async oauthUrl(req, res, next) {
    res.redirect(getLoginUrl())
  }
  static async login(req, res, next) {
    try {
      const { code } = req.body
      if (!code) throw { status: 400, message: 'Invalid code provided' }

      const response = await getAccessToken(code)
      const data = await getUserData(response.access_token)
      const { display_name, email, id: spotifyId } = data

      // login
      const spotifyUser = await Spotify.findOne({ where: { spotifyId } })
      if (spotifyUser) {
        const access_token = signToken({ id: spotifyUser.UserId })
        res.json({ access_token })
        spotifyUser.update(response)
        return
      }

      // signup
      const username = await usernameGenerator(display_name)
      const user = await User.create({ username, name: display_name })

      await Spotify.create({
        UserId: user.id,
        email,
        spotifyId,
        username: display_name,
        access_token: response.access_token,
        refresh_token: response.refresh_token,
      })

      const access_token = signToken({ id: user.id })

      res.status(201).json({ access_token })
    } catch (error) {
      next(error)
    }
  }
  static async link(req, res, next) {
    try {
      const { id } = req.user
      const { code } = req.body

      const spotifyData = await Spotify.findOne({ where: { UserId: id } })
      if (spotifyData)
        throw {
          status: 400,
          message:
            'You already link a spotify account, please unlink before procced',
        }

      const { access_token, refresh_token } = await getAccessToken(code)

      const data = await getUserData(access_token)
      const { email, display_name, id: spotifyId } = data

      await Github.create({
        UserId: id,
        email,
        spotifyId,
        username: display_name,
        access_token,
        refresh_token,
      })

      res.status(201).json({ message: `Successfuly link your github account!` })
      return
    } catch (error) {
      next(error)
    }
  }
  static async unlink(req, res, next) {
    try {
      const { id } = req.user
      const spotifyUser = await Spotify.findOne({ where: { UserId: id } })

      if (!spotifyUser) throw { name: 'NotFound', message: 'Data not found' }
      const user = await User.findByPk(id, {
        include: [
          {
            model: Github,
            attributes: {
              exclude: ['access_token', 'refresh_token'],
            },
          },
          {
            model: Discord,
            attributes: {
              exclude: ['access_token', 'refresh_token'],
            },
          },
          {
            model: Spotify,
            attributes: {
              exclude: ['access_token', 'refresh_token'],
            },
          },
        ],
      })

      const providers = [
        user.Discord ? 'Discord' : null,
        user.Spotify ? 'Spotify' : null,
        user.Github ? 'Github' : null,
      ].filter((p) => p !== 'Spotify')

      const isOkToUnlink = providers.some((p) => p)

      if (!isOkToUnlink)
        throw {
          name: 'ValidationError',
          message: 'Cant unlink, must have at least 1 link',
        }
      await spotifyUser.destroy()
      await revokeUserToken(spotifyUser.access_token)

      res.json({ message: 'Spotify unlinked!' })
    } catch (error) {
      next(error)
    }
  }

  static async listening(req, res, next) {
    try {
      const { username } = req.params
      const user = await User.findOne({
        where: { username },
        include: [{ model: Spotify, required: true}],
      })

      if (!user) {
        throw { name: 'NotFound', message: 'Data not found' }
      }
      let access_token = user.Spotify.access_token
      if(user.Spotify.isExpired) {
        const { refresh_token } = user.Spotify
        const response = await getNewAccessToken(refresh_token)
        access_token = response.access_token
      }

      const data = await getListening(access_token)
      
      res.json(data)
    } catch (error) {
      next(error)
    }
  }
}

module.exports = SpotifyController

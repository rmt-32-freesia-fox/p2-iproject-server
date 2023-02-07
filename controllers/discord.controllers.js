const {
  getAccessToken,
  getLoginUrl,
  getNewAccessToken,
  getUserData,
  revokeUserToken,
} = require('../helpers/discord')

const { Discord, User } = require('../models')
const { signToken } = require('../helpers/jwt')
const usernameGenerator = require('../helpers/usernameGenerator')
class DiscordController {
  static async oauthUrl(req, res, next) {
    res.redirect(getLoginUrl())
  }
  static async login(req, res, next) {
    try {
      const { code } = req.body
      if (!code) throw { status: 400, message: 'Invalid code provided' }

      const response = await getAccessToken(code)
      const data = await getUserData(response.access_token)
      const {
        discriminator,
        email,
        username: discordUsername,
        id: discordId,
      } = data

      // login
      const discordUser = await Discord.findOne({ where: { discordId } })
      if (discordUser) {
        const access_token = signToken({ id: discordUser.UserId })
        res.json({ access_token })
        discordUser.update(response)
        return
      }

      // signup
      const username = await usernameGenerator(discordUsername)
      const user = await User.create({ username, name: discordUsername })

      await Discord.create({
        UserId: user.id,
        email,
        discordId,
        username: discordUsername,
        discriminator,
        access_token: response.access_token,
        refresh_token: response.refresh_token,
      })

      const access_token = signToken({ id: user.id })

      res.status(201).json({ access_token })
    } catch (error) {
      console.log(error)
      next(error)
    }
  }
  static async link(req, res, next) {
    try {
      const { id } = req.user
      const { code } = req.body

      const discordData = await Discord.findOne({ where: { UserId: id } })
      if (discordData)
        throw {
          status: 400,
          message:
            'You already link a github account, please unlink before procced',
        }

      const { access_token, refresh_token } = await getAccessToken(code)

      const data = await getUserData(access_token)
      const {
        discrimnator,
        email,
        username: discordUsername,
        id: discordId,
      } = data

      await Discord.create({
        UserId: id,
        email,
        discordId,
        username: discordUsername,
        discrimnator,
        access_token: access_token,
        refresh_token: refresh_token,
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
      const discordUser = await Discord.findOne({ where: { UserId: id } })

      if (!discordUser) throw { name: 'NotFound', message: 'Data not found' }

      await discordUser.destroy()
      await revokeUserToken(discordUser.access_token)

      res.json({ message: 'Discord unlinked!' })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = DiscordController

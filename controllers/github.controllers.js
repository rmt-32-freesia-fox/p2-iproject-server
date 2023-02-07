const {
  getAccessToken,
  getUserData,
  revokeUserGrant,
  getLoginUrl,
} = require('../helpers/github')
const { Github, User } = require('../models')
const usernameGenerator = require('../helpers/usernameGenerator')
const { signToken } = require('../helpers/jwt')

class GithubController {
  /**
   *
   * @type {import('express').RequestHandler}
   */
  static async oauthUrl(req, res, next) {
    res.redirect(getLoginUrl())
  }
  /**
   *
   * @type {import('express').RequestHandler}
   */
  static async login(req, res, next) {
    try {
      const { code } = req.body
      if (!code) throw { status: 400, message: 'Invalid code provided' }

      const response = await getAccessToken(code)
      const data = await getUserData(response.access_token)
      const { login, id: githubId, email, name } = data

      // login
      const githubUser = await Github.findOne({ where: { githubId } })
      if (githubUser) {
        const access_token = signToken({ id: githubUser.UserId })
        res.json({ access_token })
        return
      }

      // signup
      const username = await usernameGenerator(login)
      const user = await User.create({ username, name: name || login })

      await Github.create({
        username: login,
        githubId,
        UserId: user.id,
        email,
        access_token: response.access_token,
      })

      const access_token = signToken({ id: user.id })

      res.status(201).json({ access_token })
    } catch (error) {
      next(error)
    }
  }

  /**
   *
   * @type {import('express').RequestHandler}
   */
  static async link(req, res, next) {
    try {
      const { id } = req.user
      const { code } = req.body
      
      // if github account already linked, throw an error
      const githubData = await Github.findOne({ where: { UserId: id } })
      if (githubData)
        throw {
          status: 400,
          message:
            'You already link a github account, please unlink before procced',
        }

      const { access_token } = await getAccessToken(code)

      const data = await getUserData(access_token)
      const { login, id: githubId, email } = data

      await Github.create({
        username: login,
        githubId,
        UserId: id,
        email,
        access_token,
      })

      res
        .status(201)
        .json({ message: `Successfuly link your github account!` })
      return
    } catch (error) {
      next(error)
    }
  }

  /**
   *
   * @type {import('express').RequestHandler}
   */
  static async unlink(req, res, next) {
    try {
      const { id } = req.user
      const githubUser = await Github.findOne({ where: { UserId: id } })

      await githubUser.destroy()
      await revokeUserGrant(githubUser.access_token)

      res.json({ message: 'Github unlinked!' })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = GithubController

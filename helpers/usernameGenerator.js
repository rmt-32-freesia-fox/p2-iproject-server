const { User } = require('../models')
const DOUsername = require('do_username')

module.exports = async (initialUsername) => {
  let i = 0,
    username = initialUsername || DOUsername.generate(15)
  while (true) {
    if (i >= 15) {
      username += Math.floor(Math.random() * 1e4 + 1e4)
    }
    const user = await User.findOne({ where: { username } })
    if (!user) return username
    username = DOUsername.generate(15)
    i++
  }
}

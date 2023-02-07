const { Log } = require('../models')

const createLog = async (type, UserId, LinkId) => {
  await Log.create({ type, UserId, LinkId })
}

module.exports = { createLog }

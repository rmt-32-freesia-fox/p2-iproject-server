const axios = require('axios')
const { DISCORD_CLIENT_ID, DISCORD_CLIENT_SECRET, DISCORD_REDIRECT_URL } =
  process.env

if (!DISCORD_CLIENT_ID || !DISCORD_CLIENT_SECRET || !DISCORD_REDIRECT_URL) {
  console.log(
    `"DISCORD_CLIENT_ID" and "DISCORD_CLIENT_SECRET" and "DISCORD_REDIRECT_URL" is required in envoirment`
  )
  process.exit(1)
}

/**
 * @typedef {object} Credentials
 * @property {string} access_token
 * @property {string} token_type
 * @property {number} expires_in
 * @property {string} refresh_token
 * @property {string} scope
 */

/**
 *
 * @param {String} code
 * @returns { Promise<Credentials> }
 *
 */
const getAccessToken = async (code) => {
  const payload = {
    client_id: DISCORD_CLIENT_ID,
    client_secret: DISCORD_CLIENT_SECRET,
    grant_type: 'authorization_code',
    code,
  }
  const config = {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  }

  const { data } = await axios.post(
    'https://discord.com/api/v10/oauth2/token',
    payload,
    config
  )

  return data
}

/**
 *
 * @param {String} refresh_token
 * @returns { Promise<Credentials> }
 *
 */
const getNewAccessToken = async (refresh_token) => {
  const payload = {
    client_id: DISCORD_CLIENT_ID,
    client_secret: DISCORD_CLIENT_SECRET,
    grant_type: 'refresh_token',
    refresh_token,
  }
  const config = {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  }

  const { data } = await axios.post(
    'https://discord.com/api/v10/oauth2/token',
    payload,
    config
  )
  return data
}

/**
 * @typedef {object} UserData
 * @property {number} id
 * @property {string} username
 * @property {number} discrimnator
 * @property {string} email
 * @property {string} avatar
 * @property {string} flags
 */

/**
 *
 * @param {String} access_token
 * @returns { Promise<UserData> }
 *
 */
const getUserData = async (access_token) => {
  const { data } = await axios.get('https://discordapp.com/api/users/@me', {
    headers: { Authorization: `Bearer ${access_token}` },
  })

  return data
}

/**
 *
 * @param {String} access_token
 * @returns { Promise<void> }
 *
 */
const revokeUserToken = async (access_token) => {
  const payload = {
    client_id: DISCORD_CLIENT_ID,
    client_secret: DISCORD_CLIENT_SECRET,
    access_token,
  }
  const config = {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  }

  await axios.post(
    'https://discord.com/api/oauth2/token/revoke',
    payload,
    config
  )
  return
}

/**
 * for testing purpose only
 * @returns { Promise<Credentials> }
 *
 */
const getTestAccessToken = async () => {
  const { data } = await axios.post(
    'https://discord.com/api/oauth2/token/revoke',
    {
      grant_type: 'client_credentials',
      scope: 'identify connections',
    },
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      auth: {
        username: DISCORD_CLIENT_ID,
        password: DISCORD_CLIENT_SECRET,
      },
    }
  )

  return data
}

const getLoginUrl = () =>
  `https://discord.com/oauth2/authorize?response_type=token&client_id=${DISCORD_CLIENT_ID}&state=${Math.floor(
    Math.random() * 1e9
  )}&scope=identify&redirect_uri=${DISCORD_REDIRECT_URL}`

module.exports = {
  getAccessToken,
  getNewAccessToken,
  revokeUserToken,
  getUserData,
  getLoginUrl,
  getTestAccessToken,
}

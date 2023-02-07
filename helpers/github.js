const axios = require('axios')
const { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, GITHUB_REDIRECT_URL } =
  process.env

if (!GITHUB_CLIENT_ID || !GITHUB_CLIENT_SECRET || !GITHUB_REDIRECT_URL) {
  console.log(
    `"GITHUB_CLIENT_ID" and "GITHUB_CLIENT_SECRET" and "GITHUB_REDIRECT_URL" is required in envoirment`
  )
  process.exit(1)
}

/**
 * @typedef {object} Credentials
 * @property {string} access_token
 * @property {string} scope
 * @property {string} token_type
 */

/**
 *
 * @param {String} code
 * @returns { Promise<Credentials> }
 *
 */
const getAccessToken = async (code) => {
  const payload = {
    code,
    client_secret: GITHUB_CLIENT_SECRET,
    client_id: GITHUB_CLIENT_ID,
  }
  const config = {
    headers: {
      Accept: 'application/json',
    },
  }
  const { data } = await axios.post(
    'https://github.com/login/oauth/access_token',
    payload,
    config
  )

  return data
}

/**
 * @typedef {object} UserData
 * @property {number} id
 * @property {string} avatar_url
 * @property {string} email
 * @property {string} login
 * @property {string} name
 *
 */

/**
 * Hasil returnnya tergantung scope.
 * Scope ini (user) cuman butuh beberapa key: email, id, avatar_url, login (username)
 * @param {String} access_token
 * @returns { Promise<UserData> }
 *
 */
const getUserData = async (access_token) => {
  const { data } = await axios.get('https://api.github.com/user', {
    headers: {
      Authorization: 'Bearer ' + access_token,
    },
  })
  return data
}

/**
 *
 * @param {String} access_token
 * @returns { Promise<void> }
 *
 */
const revokeUserGrant = async (access_token) => {
  await axios.delete(
    `https://api.github.com/applications/${GITHUB_CLIENT_ID}/grant`,
    {
      access_token,
    },
    {
      headers: {
        Accept: 'application/vnd.github+json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      auth: {
        username: GITHUB_CLIENT_ID,
        password: GITHUB_CLIENT_SECRET,
      },
    }
  )
}

const getLoginUrl = () =>
  `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&scope=user&state=${Math.floor(
    Math.random() * 1e9
  )}&redirect_uri=${GITHUB_REDIRECT_URL}`

module.exports = { getAccessToken, getUserData, revokeUserGrant, getLoginUrl }

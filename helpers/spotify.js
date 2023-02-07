const axios = require('axios')

const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REDIRECT_URL } =
  process.env

if (!SPOTIFY_CLIENT_ID || !SPOTIFY_CLIENT_SECRET || !SPOTIFY_REDIRECT_URL) {
  console.log(
    `SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REDIRECT_URL required in envoirment`
  )
  process.exit(1)
}

const getAccessToken = async (code) => {
  const config = {
    headers: {
      Accept: 'application/json',
      'Content-Type':'application/x-www-form-urlencoded'
    },
    auth: {
      username: SPOTIFY_CLIENT_ID,
      password: SPOTIFY_CLIENT_SECRET,
    },
  }

  const payload = {
    code,
    grant_type: 'authorization_code',
    redirect_uri:SPOTIFY_REDIRECT_URL
  }

  const { data } = await axios.post(
    'https://accounts.spotify.com/api/token',
    payload,
    config
  )

  const { refresh_token, access_token } = data
  return data
}

const getUserData = async (access_token) => {
  const { data } = await axios.get('https://api.spotify.com/v1/me', {
    headers: { Authorization: 'Bearer ' + access_token },
  })

  return data
}

const getNewAccessToken = async (refresh_token) => {
  const config = {
    headers: {
      Accept: 'application/json',
    },
    auth: {
      username: SPOTIFY_CLIENT_ID,
      password: SPOTIFY_CLIENT_SECRET,
    },
  }

  const payload = {
    refresh_token,
    grant_type: 'refresh_token',
  }

  const { data } = await axios.post(
    'https://accounts.spotify.com/api/token',
    payload,
    config
  )

  // const { refresh_token, access_token } = data
  return data
}

const getLoginUrl = () =>
  `https://accounts.spotify.com/authorize?response_type=code&client_id=${SPOTIFY_CLIENT_ID}&scope=user-read-private%20user-read-email%20user-read-currently-playing&state=${Math.floor(
    Math.random() * 1e9
  )}&redirect_uri=${SPOTIFY_REDIRECT_URL}`

module.exports = {
  getAccessToken,
  getLoginUrl,
  getNewAccessToken,
  getUserData,
}

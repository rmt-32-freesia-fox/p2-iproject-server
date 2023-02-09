const supertest = require('supertest')
const { response } = require('../app')
const app = require('../app')
const { signToken } = require('../helpers/jwt')
const { User } = require('../models')

let access_token

beforeAll((done) => {
  User.create({ username: 'nyan', name: 'black fish' })
  .then((user) => {
    access_token = signToken({ id: user.id })
    done()
  })
  .catch(done)
})

afterAll((done) => {
  User.destroy({ truncate: true, cascade: true, restartIdentity: true}).then(done).catch(done)
})

describe('POST /link', () => {
  it('201', (done) => {
    supertest(app)
    .post('/link')
    .send({ link: 'https://google.com' })
    .set('access_token', access_token)
    .then(response => {
      const { body, status } = response
      expect(status).toBe(201)
      done()
    })
  })
})

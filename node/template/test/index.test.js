const app = require('../server/index')
const request = require('supertest')(app)
describe('# test index.js', function () {
  it('GET /api 404', done => {
    request
      .get('/api/')
      .expect(404, done)
  })
})
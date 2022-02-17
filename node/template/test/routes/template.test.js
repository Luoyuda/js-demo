const app = require('../../server/index')
const request = require('supertest')(app)
const assert = require('power-assert')
describe('# test routes', function () {
  it('GET /xhr/v1/template', done => {
    request
      .get('/xhr/v1/template')
      .expect(200)
      .end((err, res) => {
        if(err) return done(err)
        assert(res.body.code === 200)
        assert(res.body.msg === 'success')
        assert(Array.isArray(res.body.data))
        done()
      })
  })
  it('POST /xhr/v1/template', done => {
    const temp = {
      name: 'mocha-test',
      template: '<h2>Hello ${name}</h2>',
      data: '{ name: "mocha" }'
    }
    request
      .post('/xhr/v1/template', temp)
      .expect(200)
      .end((err, res) => {
        if(err) return done(err)
        assert(res.body.code === 200)
        assert(res.body.msg === 'success')
        const data = res.body.data
        assert(data._id !== undefined)
        done()
      })
  })
  it('GET /xhr/v1/template/:id', done => {
    request
      .get('/xhr/v1/template/620dffc529ab2ff728ec729d')
      .expect(200)
      .end((err, res) => {
        if(err) return done(err)
        assert(res.body.code === 200)
        assert(res.body.msg === 'success')
        assert(res.body.data._id === '620dffc529ab2ff728ec729d')
        done()
      })
  })
  it('GET /xhr/v1/template/:id', done => {
    request
      .get('/xhr/v1/template/2')
      .expect(200)
      .end((err, res) => {
        if(err) return done(err)
        assert(res.body.code === 400)
        done()
      })
  })
})
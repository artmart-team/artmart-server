const request = require ('supertest')
const app = require ('../../app')

describe ('GET /', function () {

    // berhasil 200 data
    it ('should response get', function (done) {
      request (app)
        .get ('/')
        .end (function (err, res) {
          if (err) done (err)

          expect(res.statusCode).toEqual(200)
          expect(res.body).toHaveProperty('messages')
          expect(typeof res.body.messages).toEqual('string')

          done()
        })
    })
})
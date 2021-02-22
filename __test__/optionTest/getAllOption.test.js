const request = require ('supertest')
const app = require ('../../app')
// const { generateToken } = require('../../helpers/jwt')
// const { Artist } = require('../../models')

describe ('GET /artists/:artistId/options', function () {
    let artistId = 1
    let access_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJ1c2VybmFtZVRlc3RpbmdGb3JBcnRpc3QiLCJwcm9maWxlUGljdHVyZSI6ImxpbmsuZ29vZ2xlLmNvbSIsImlhdCI6MTYxMzk1NzA4OH0.tZGZdtQTNGbwunb0HYEMnczuxlweSCjDrSvOz4zNLT4"


    it ('should send response with 200 status code', function (done) {
      request (app)
        .get (`/artists/${artistId}/options`)
        .set('access_token', access_token)
        .end (function (err, res) {
          if (err) done (err)

          expect(res.statusCode).toEqual(200)
          expect(Array.isArray (res.body)).toEqual(true)
          res.body.forEach(opt => {
            expect(opt).toHaveProperty('id')
            expect(opt).toHaveProperty('title')
            expect(opt).toHaveProperty('extraPrice')
            expect (typeof opt.title).toEqual('string')
            expect (typeof opt.extraPrice).toEqual('number')
          })

          done()
        })
    })

    // error internal server 500
    it ('should response 500, error internal server', function (done) {
      let idArtist = "asadasdsad"


      request (app)
        .get (`/artists/${idArtist}/options`)
        .set('access_token', access_token)
        .end (function (err, res) {
          if (err) done (err)

          expect(res.statusCode).toEqual(500)
          expect(typeof res.body).toEqual('object')
          expect(res.body).toHaveProperty('messages')
          expect(typeof res.body.messages).toEqual('string')

          done()
        })
    })
})
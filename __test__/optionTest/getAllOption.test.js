const request = require ('supertest')
const app = require ('../../app')


describe ('GET /artists/:artistId/options', function () {
    let artistId = 1

    it ('should send response with 200 status code', function (done) {
      request (app)
        .get (`/artists/${artistId}/options`)
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
})
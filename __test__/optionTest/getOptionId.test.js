const request = require ('supertest')
const { Option, Artist } = require('../../models')
const app = require ('../../app')


describe ('GET /artists/:artistId/options/:optionId', function () {
    let artistId
    let optionId = 3 

    beforeAll(done => {
        Artist.findOne({ where : {email : "user@mail.com"}})
        .then(data => {
            artistId = data.id
            done()
        })
        .catch(err => {
            console.log(err)
        })
    })

    it ('should send response with 200 status code', function (done) {
      request (app)
        .get (`/artists/${artistId}/options/${optionId}`)
        .end (function (err, res) {
          if (err) done (err)

          expect(res.statusCode).toEqual(200)
          expect(typeof res.body).toEqual('object')
          expect(res.body).toHaveProperty('title')
          expect(res.body).toHaveProperty('extraPrice')
          expect(typeof res.body.title).toHaveProperty('string')
          expect(typeof res.body.extraPrice).toHaveProperty('number')

          done()
        })
    })
})
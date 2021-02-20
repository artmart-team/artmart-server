const request = require ('supertest')
const { Option, Artist } = require('../../models')
const app = require ('../../app')

// DONE REVISION AFISTA 19-02-2021

// 1 testing, 1 success testing

// describe GET /categories/
// -- it success

describe ('GET /artists/:artistId/options', function () {
    let artistId = 1

    beforeAll(done => {
      Option.create({
        title : "mahal",
        extraPrice : 200000,
        ArtistId : artistId
      })
      .then(() => {
        done()
      })
      .catch(err => {
        console.log(err, "<< error beforeAll getALlOption.test.js")
      })
    })

    afterAll(done => {
      Option.destroy()
      .then(() => {
        done()
      })
      .catch(err => {
        console.log(err, "<< error afterAll getAllCat.test.js")
      })
    })

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
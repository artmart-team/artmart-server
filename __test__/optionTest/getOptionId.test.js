const request = require ('supertest')
const { Option, Artist } = require('../../models')
const app = require ('../../app')
const { generateToken } = require('../../helpers/jwt')


describe ('GET /artists/:artistId/options/:optionId', function () {
    let artistId = 1
    let optionId = 3 
    let access_token = null

    beforeAll(done => {
        Artist.findOne({ where : {email : "user@mail.com"}})
        .then(data => {
            artistId = data.id

            const payload = {
                id : data.id,
                username : data.username,
                profilePicture : data.profilePicture
            }

            access_token = generateToken(payload)

            done()
        })
        .catch(err => {
            console.log(err)
        })
    })

    // success
    it ('should send response with 200 status code', function (done) {
      request (app)
        .get (`/artists/${artistId}/options/${optionId}`)
        .set('access_token', access_token)
        .end (function (err, res) {
          if (err) done (err)

          expect(res.statusCode).toEqual(200)
          expect(typeof res.body).toEqual('object')
          expect(res.body).toHaveProperty('title')
          expect(res.body).toHaveProperty('extraPrice')
          expect(typeof res.body.title).toEqual('string')
          expect(typeof res.body.extraPrice).toEqual('number')

          done()
        })
    })

    // error internal server
    it ('should send response with 500 error internal server', function (done) {
        let idOpt = "asdaasdas"


        request (app)
          .get (`/artists/${artistId}/options/${idOpt}`)
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
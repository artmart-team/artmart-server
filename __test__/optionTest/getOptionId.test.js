const request = require ('supertest')
const { Option, Artist } = require('../../models')
const app = require ('../../app')
const { generateToken } = require('../../helpers/jwt')


describe ('GET /artists/:artistId/options/:optionId', function () {
    let artistId = null
    let optionId = null
    let access_token = null

    beforeAll(done => {
        Artist.create({ 
            username : "getOptionIdArtist",
            firstName : "artist",
            lastName : "idsearch",
            email : "getOptionIdArtist@mail.com",
            password : '123456',
            profilePicture : "link.google.com",
            completeDuration : 48,
            bankAccount : 230230230,
            defaultPrice : 100000
        })
        .then(data => {
            artistId = data.id

            const payload = {
                id : data.id,
                username : data.username,
                profilePicture : data.profilePicture
            }

            access_token = generateToken(payload)

            return Option.create({
                title : "create new option",
                extraPrice : 10000,
                ArtistId : artistId
            })
        })
        .then(res => {
            optionId = res.id
            done()
        })
    })

    afterAll(done => {
        Option.destroy({ where : { id : optionId}})
        .then(res => {
          return Artist.destroy({ where : {id : artistId}})
        })
        .then(() => {
          done()
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
    // it ('should send response with 500 error internal server', function (done) {
    //     let idOpt = "asd"


    //     request (app)
    //       .get (`/artists/${artistId}/options/${idOpt}`)
    //       .set('access_token', access_token)
    //       .end (function (err, res) {
    //         if (err) done (err)
  
    //         expect(res.statusCode).toEqual(500)
    //         expect(typeof res.body).toEqual('object')
    //         expect(res.body).toHaveProperty('messages')
    //         expect(typeof res.body.messages).toEqual('string')
  
    //         done()
    //       })
    //   })
})
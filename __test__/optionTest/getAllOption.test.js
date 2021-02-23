const request = require ('supertest')
const app = require ('../../app')

const { generateToken } = require('../../helpers/jwt')
const { Artist, Option } = require('../../models')

describe ('GET /artists/:artistId/options', function () {
  let artistId = null
  let access_token = null
  let optId = null

  beforeAll(done => {
      Artist.create({ 
          username : "getAllOptionArtist",
          firstName : "artist",
          lastName : "idsearch",
          email : "getAllOptionArtist@mail.com",
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
              title : "option for get all",
              extraPrice : 11000,
              ArtistId : artistId
          })
      })
      .then(res => {
        optId = res.id
          done()
      })
  })

  afterAll(done => {
    Option.destroy({ where : { id : optId}})
    .then(res => {
      return Artist.destroy({ where : {id : artistId}})
    })
    .then(() => {
      done()
    })
  })


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
    // it ('should response 500, error internal server', function (done) {
    //   let idArtist = "asadasdsad"

    //   request (app)
    //     .get (`/artists/${idArtist}/options`)
    //     .set('access_token', access_token)
    //     .end (function (err, res) {
    //       if (err) done (err)

    //       expect(res.statusCode).toEqual(500)
    //       expect(typeof res.body).toEqual('object')
    //       expect(res.body).toHaveProperty('messages')
    //       expect(typeof res.body.messages).toEqual('string')

    //       done()
    //     })
    // })
})
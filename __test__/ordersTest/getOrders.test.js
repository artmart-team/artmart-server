const request = require('supertest')

const { beforeAll } = require("@jest/globals")

const app = require('../../app')  

const { User, Artist } = require('../../models')
const { generateToken } = require('../../helpers/jwt')

// describe /users/:userId/orders  (get orders by userId)
// -- it success

describe('GET /users/:userId/orders', function () {
  let userId = 1
  let access_token = null

  beforeAll(done => {
    User.findOne({ where : { email : "user@mail.com"}})
    .then(data => {
        const payload = {
          id : data.id,
          username : data.username,
          profilePicture : data.profilePicture
        }

        access_token = generateToken(payload)

        done()
    })
  })

  it ('should status 200, successfull get all orders by userId', function (done) {
    request (app)
      .get(`/users/${userId}/orders`)
      .set('access_token', access_token)
      .end(function (err, res) {
        if (err) done (err)

        expect(res.statusCode).toEqual(200)
        expect(Array.isArray (res.body)).toEqual(true)
        expect(res.body[0]).toHaveProperty('title')
        expect(res.body[0]).toHaveProperty('description')
        expect(res.body[0]).toHaveProperty('refPictureId')
        expect(res.body[0]).toHaveProperty('deadline')
        expect(res.body[0]).toHaveProperty('price')
        expect(res.body[0]).toHaveProperty('totalPrice')
        expect(res.body[0]).toHaveProperty('accepted')
        expect(res.body[0]).toHaveProperty('done')
        expect(res.body[0]).toHaveProperty('paid')
        expect(res.body[0]).toHaveProperty('imageURL')
        expect(res.body[0]).toHaveProperty('UserId')
        expect(res.body[0]).toHaveProperty('ArtistId')
        expect(typeof res.body[0].title).toEqual('string')
        expect(typeof res.body[0].description).toEqual('string')
        expect(typeof res.body[0].refPictureId).toEqual('number')
        expect(typeof res.body[0].deadline).toEqual('object')
        expect(typeof res.body[0].price).toEqual('number')
        expect(typeof res.body[0].totalPrice).toEqual('number')
        expect(typeof res.body[0].accepted).toEqual('boolean')
        expect(typeof res.body[0].done).toEqual('boolean')
        expect(typeof res.body[0].paid).toEqual('boolean')
        expect(typeof res.body[0].imageURL).toEqual('string')

        done()
      })
  })


  // error internal server
  // it('should status 500, error internal server' ,function (done) {
  //   const idUser = "asdadsad"


  //   request(app) 
  //   .get(`/users/${idUser}/orders`)
  //   .set('access_token',access_token)
  //   .end((err, res) => {
  //       if(err) done(err)
                
  //       //assert
  //       expect(res.statusCode).toEqual(500)
  //       expect(typeof res.body).toEqual('object')
  //       expect(res.body).toHaveProperty('messages')
  //       expect(typeof res.body.messages).toEqual('string')

  //       done()
  //   })
  // })
})

// describe /artists/:artistId/orders  (get orders by userId)
// -- it success

describe('GET /artists/:artistId/orders', function () {

  let artistId = 1
  let access_token = null

  beforeAll(done => {
    Artist.findOne({ where : { email : "artist@mail.com"}})
    .then(data => {
        const payload = {
          id : data.id,
          username : data.username,
          profilePicture : data.profilePicture
        }

        access_token = generateToken(payload)

        done()
    })
  })

  it ('should status 200, successfull get all orders by artistId', function (done) {
    request (app)
      .get(`/artists/${artistId}/orders`)
      .set('access_token', access_token)
      .end(function (err, res) {
        if (err) done (err)

        expect(res.statusCode).toEqual(200)
        expect(Array.isArray (res.body)).toEqual(true)
        expect(res.body[0]).toHaveProperty('title')
        expect(res.body[0]).toHaveProperty('description')
        expect(res.body[0]).toHaveProperty('refPictureId')
        expect(res.body[0]).toHaveProperty('deadline')
        expect(res.body[0]).toHaveProperty('price')
        expect(res.body[0]).toHaveProperty('totalPrice')
        expect(res.body[0]).toHaveProperty('accepted')
        expect(res.body[0]).toHaveProperty('done')
        expect(res.body[0]).toHaveProperty('paid')
        expect(res.body[0]).toHaveProperty('imageURL')
        expect(res.body[0]).toHaveProperty('UserId')
        expect(res.body[0]).toHaveProperty('ArtistId')
        res.body.forEach(order => {
          expect(typeof order.title).toEqual('string')
          expect(typeof order.description).toEqual('string')
        })

        done()
      })
  })


  // error internal server
  // it('should status 500, error internal server' ,function (done) {
  //   const idArt = "asdadsad"


  //   request(app) 
  //   .get(`/artists/${idArt}/orders`)
  //   .set('access_token',access_token)
  //   .end((err, res) => {
  //       if(err) done(err)
                
  //       //assert
  //       expect(res.statusCode).toEqual(500)
  //       expect(typeof res.body).toEqual('object')
  //       expect(res.body).toHaveProperty('messages')
  //       expect(typeof res.body.messages).toEqual('string')

  //       done()
  //   })
  // })
})
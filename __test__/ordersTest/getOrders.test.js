const request = require('supertest')

const { beforeAll } = require("@jest/globals")

const app = require('../../app')  

const { User, Artist } = require('../../models')

// describe /users/:userId/orders  (get orders by userId)
// -- it success

describe('GET /users/:userId/orders', function () {
  let userId 

  beforeAll(done => {
    User.findOne({ where : { email : "user@mail.com"}})
    .then(data => {
        userId = data.id
        done()
    })
  })

  it ('should status 200, successfull get all orders by userId', function (done) {
    request (app)
      .get(`/users/${userId}/orders`)
      .end(function (err, res) {
        if (err) done (err)

        expect(res.statusCode).toEqual(200)
        expect(Array.isArray (res.body)).toEqual(true)
        res.body.forEach(order => {
          expect(order).toHaveProperty('title')
          expect(order).toHaveProperty('description')
          expect(order).toHaveProperty('refImageId')
          expect(order).toHaveProperty('duration')
          expect(order).toHaveProperty('accepted')
          expect(order).toHaveProperty('done')
          expect(order).toHaveProperty('paid')
          expect(order).toHaveProperty('imageURL')
          expect(order).toHaveProperty('UserId')
          expect(order).toHaveProperty('ArtistId')
          expect(order).toEqual({
            title : expect.any(String),
            description : expect.any(String),
            refImageId : expect.any(Number),
            duration : expect.any(Number),
            accepted : expect.any(Boolean),
            done : expect.any(Boolean),
            paid : expect.any(Boolean),
            imageURL : expect.any(String)
          })
        })
      })
  })
})

// describe /artists/:artistId/orders  (get orders by userId)
// -- it success

describe('GET /artists/:artistId/orders', function () {

  let artistId 

  beforeAll(done => {
    Artist.findOne({ where : { email : "user@mail.com"}})
    .then(data => {
        artistId = data.id
        done()
    })
  })

  it ('should status 200, successfull get all orders by artistId', function (done) {
    request (app)
      .get(`/artists/${artistId}/orders`)
      .end(function (err, res) {
        if (err) done (err)

        expect(res.statusCode).toEqual(200)
        expect(Array.isArray (res.body)).toEqual(true)
        res.body.forEach(order => {
          expect(order).toHaveProperty('title')
          expect(order).toHaveProperty('description')
          expect(order).toHaveProperty('refImageId')
          expect(order).toHaveProperty('duration')
          expect(order).toHaveProperty('accepted')
          expect(order).toHaveProperty('done')
          expect(order).toHaveProperty('paid')
          expect(order).toHaveProperty('imageURL')
          expect(order).toHaveProperty('UserId')
          expect(order).toHaveProperty('ArtistId')
          expect(order).toEqual({
            title : expect.any(String),
            description : expect.any(String),
            refImageId : expect.any(Number),
            duration : expect.any(Number),
            accepted : expect.any(Boolean),
            done : expect.any(Boolean),
            paid : expect.any(Boolean),
            imageURL : expect.any(String)
          })
        })
      })
  })
})
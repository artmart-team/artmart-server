const request = require('supertest')

const { beforeAll, afterAll } = require("@jest/globals")

const app = require('../app')  

// describe /users/:userId/orders  (get orders by userId)
// -- it success

describe('GET /users/:userId/orders', function () {
  it ('should status 200, successfull get all orders by userId', function (done) {
    request (app)
      .get('/users/:userId/orders')
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
          expect(res.body).toEqual({
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
  it ('should status 200, successfull get all orders by artistId', function (done) {
    request (app)
      .get('/artists/:artistId/orders')
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
          expect(res.body).toEqual({
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
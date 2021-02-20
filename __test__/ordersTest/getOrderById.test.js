

// 1 test , 1 sucess test, error test belom // error id not found

const request = require('supertest')

const { beforeAll } = require("@jest/globals")

const app = require('../app')  
const { Artist, Order, User } = require('../../models')

/// artist

describe('GET /artists/:artistsId/orders/:orderId', function() {

  let artId, orderId

  beforeAll(done => {
    Artist.findOne({where : { email : 'user@mail.com' }})
    .then(data => {
      artId = data.id

      return Order.findOne({ where : { title : "orderId testing"}})
    })
    .then(res => {
      orderId = res.id
      done()
    })
    .catch(err => {
      console.log(err, "<< err beforeAll getOrferById.test.js")
    })
  })

  // success get order By id using artist id
  it('should status 200, successfull get all Image' ,function (done) {
    request(app) 
    .get(`/artists/${artId}/orders/${orderId}`)
    .end((err, res) => {
        if(err) done(err)
                
        //assert
        expect(res.statusCode).toEqual(200)
        expect(typeof res.body).toEqual('Object')
        expect(res.body).toHaveProperty('title')
        expect(res.body).toHaveProperty('description')
        expect(res.body).toHaveProperty('duration')
        expect(res.body).toHaveProperty('price')
        expect(res.body).toHaveProperty('totalPrice')
        expect(res.body).toHaveProperty('accepted')
        expect(res.body).toHaveProperty('done')
        expect(res.body).toHaveProperty('paid')
        expect(res.body).toHaveProperty('imageURL')
        expect(res.body).toEqual({
            title : expect.any(String),
            description : expect.any(String),
            duration : expect.any(Number),
            price : expect.any(Number),
            totalPrice : expect.any(Number),
            accepted: expect.any(Boolean),
            done: expect.any(Boolean),
            paid: expect.any(Boolean),
            imageURL: expect.any(String)
        })
        done()
    })
  })
})




/// User

describe('GET /artists/:artistsId/orders/:orderId', function() {

  let userId, orderId

  beforeAll(done => {
    User.findOne({where : { email : 'user@mail.com' }})
    .then(data => {
      userId = data.id

      return Order.findOne({ where : { title : "orderId testing"}})
    })
    .then(res => {
      orderId = res.id
      done()
    })
    .catch(err => {
      console.log(err, "<< err beforeAll getOrferById.test.js")
    })
  })

  // success get order By id using artist id
  it('should status 200, successfull get all Image' ,function (done) {
    request(app) 
    .get(`/users/${userId}/orders/${orderId}`)
    .end((err, res) => {
        if(err) done(err)
                
        //assert
        expect(res.statusCode).toEqual(200)
        expect(typeof res.body).toEqual('Object')
        expect(res.body).toHaveProperty('title')
        expect(res.body).toHaveProperty('description')
        expect(res.body).toHaveProperty('duration')
        expect(res.body).toHaveProperty('price')
        expect(res.body).toHaveProperty('totalPrice')
        expect(res.body).toHaveProperty('accepted')
        expect(res.body).toHaveProperty('done')
        expect(res.body).toHaveProperty('paid')
        expect(res.body).toHaveProperty('imageURL')
        expect(res.body).toEqual({
            title : expect.any(String),
            description : expect.any(String),
            duration : expect.any(Number),
            price : expect.any(Number),
            totalPrice : expect.any(Number),
            accepted: expect.any(Boolean),
            done: expect.any(Boolean),
            paid: expect.any(Boolean),
            imageURL: expect.any(String)
        })
        done()
    })
  })
})


// 1 test , 1 sucess test, error test belom // error id not found

const request = require('supertest')

const { beforeAll } = require("@jest/globals")

const app = require('../../app')  
const { Artist, Order, User } = require('../../models')
const { generateToken } = require('../../helpers/jwt')

/// artist

describe('GET /artists/:artistsId/orders/:orderId', function() {

  let artId = null
  let orderId = 2
  let access_token = null

  beforeAll(done => {
    Artist.findOne({where : { email : 'artist@mail.com' }})
    .then(data => {
      artId = data.id

      const payload = {
        id : data.id,
        username : data.username,
        profilePicture : data.profilePicture
      }

      access_token = generateToken(payload)
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
    .set('access_token',access_token)
    .end((err, res) => {
        if(err) done(err)
                
        //assert
        expect(res.statusCode).toEqual(200)
        expect(typeof res.body).toEqual('object')
        expect(res.body).toHaveProperty('title')
        expect(res.body).toHaveProperty('description')
        expect(res.body).toHaveProperty('deadline')
        expect(res.body).toHaveProperty('price')
        expect(res.body).toHaveProperty('totalPrice')
        expect(res.body).toHaveProperty('accepted')
        expect(res.body).toHaveProperty('done')
        expect(res.body).toHaveProperty('paid')
        expect(res.body).toHaveProperty('imageURL')
        expect(typeof res.body.title).toEqual('string')
        expect(typeof res.body.description).toEqual('string')
        expect(typeof res.body.deadline).toEqual('object')
        expect(typeof res.body.price).toEqual('number')
        expect(typeof res.body.totalPrice).toEqual('number')
        expect(typeof res.body.accepted).toEqual('boolean')
        expect(typeof res.body.done).toEqual('boolean')
        expect(typeof res.body.paid).toEqual('boolean')
        expect(typeof res.body.imageURL).toEqual('string')

        done()
    })
  })

  // error internal server
  // it('should status 500, error internal server' ,function (done) {
  //   const idOrder = "asdadsad"


  //   request(app) 
  //   .get(`/artists/${artId}/orders/${idOrder}`)
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




/// User

describe('GET /artists/:artistsId/orders/:orderId', function() {

  let userId = null 
  let orderId = 2
  let access_token = null

  beforeAll(done => {
    User.findOne({where : { email : 'user@mail.com' }})
    .then(data => {
      userId = data.id

      const payload = {
        id : data.id,
        username : data.username,
        profilePicture : data.profilePicture
      }

      access_token = generateToken(payload)

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
    .set('access_token',access_token)
    .end((err, res) => {
        if(err) done(err)
                
        //assert
        expect(res.statusCode).toEqual(200)
        expect(typeof res.body).toEqual('object')
        expect(res.body).toHaveProperty('title')
        expect(res.body).toHaveProperty('description')
        expect(res.body).toHaveProperty('deadline')
        expect(res.body).toHaveProperty('price')
        expect(res.body).toHaveProperty('totalPrice')
        expect(res.body).toHaveProperty('accepted')
        expect(res.body).toHaveProperty('done')
        expect(res.body).toHaveProperty('paid')
        expect(res.body).toHaveProperty('imageURL')
        expect(typeof res.body.title).toEqual('string')
        expect(typeof res.body.description).toEqual('string')
        expect(typeof res.body.deadline).toEqual('object')
        expect(typeof res.body.price).toEqual('number')
        expect(typeof res.body.totalPrice).toEqual('number')
        expect(typeof res.body.accepted).toEqual('boolean')
        expect(typeof res.body.done).toEqual('boolean')
        expect(typeof res.body.paid).toEqual('boolean')
        expect(typeof res.body.imageURL).toEqual('string')
        
        done()
    })
  })


  // error internal server
  // it('should status 500, error internal server' ,function (done) {
  //   const idOrder = "asdadsad"


  //   request(app) 
  //   .get(`/users/${userId}/orders/${idOrder}`)
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
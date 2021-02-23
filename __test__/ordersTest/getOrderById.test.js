

// 1 test , 1 sucess test, error test belom // error id not found

const request = require('supertest')

const { beforeAll } = require("@jest/globals")

const app = require('../../app')  
const { Artist, Order, User } = require('../../models')
const { generateToken } = require('../../helpers/jwt')

/// artist

describe('GET /artists/:artistsId/orders/:orderId', function() {

  let userId = null
  let accessUser = null
  let accessArtist = null
  let artistId = null
  let orderId = null

  beforeAll(done => {
      User.create({ 
          username : "getOrderByIdUser",
          firstName : "artist",
          lastName : "idsearch",
          email : "getOrderByIdUser@mail.com",
          password : '123456',
          profilePicture : ""
      })
      .then(data => {
          userId = data.id

          const payload = {
              id : data.id,
              username : data.username,
              profilePicture : data.profilePicture
          }

          accessUser = generateToken(payload)

          return Artist.create({
              username : "getOrderByIdArtist",
              firstName : "artist",
              lastName : "idsearch",
              email : "getOrderByIdArtist@mail.com",
              password : '123456',
              profilePicture : "link.google.com",
              completeDuration : 48,
              bankAccount : 230230230,
              defaultPrice : 100000
          })
      })
      .then(datas => {
          artistId = datas.id

          const payloads = {
            id : datas.id,
            username : datas.username,
            profilePicture : datas.profilePicture
        }

        accessArtist = generateToken(payloads)

          return Order.create({
              title : 'testingOrderByIdData',
              description : 'testing',
              deadline : new Date(),
              price : 100000,
              totalPrice : 120000,
              accepted : false,
              done : false,
              paid : false,
              imageURL : 'link.google.com',
              ArtistId : artistId,
              UserId : userId  
          })
      })
      .then(res => {
          orderId = res.id
          done()
      })
  })

  afterAll(done => {
    Order.destroy({ where : { id : orderId }})
    .then(() => {
        return Artist.destroy({ where : {id : artistId}})
    })
    .then(() => {
        return User.destroy({ where : { id: userId}})
    })
    .then(() => {
        done()
    })
  })


  // success get order By id using artist id
  it('should status 200, successfull get all Image' ,function (done) {
    request(app) 
    .get(`/artists/${artId}/orders/${orderId}`)
    .set('access_token',accessArtist)
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

  // success get order By id using users id
  it('should status 200, successfull get all Image' ,function (done) {
    request(app) 
    .get(`/users/${userId}/orders/${orderId}`)
    .set('access_token',accessUser)
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
})
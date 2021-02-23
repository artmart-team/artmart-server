const request = require('supertest')

const { beforeAll } = require("@jest/globals")

const app = require('../../app')  

const { User, Artist } = require('../../models')
const { generateToken } = require('../../helpers/jwt')

// describe /users/:userId/orders  (get orders by userId)
// -- it success

describe('GET /users/:userId/orders', function () {
  let userId = null
  let accessUser = null
  let artistId = null
  let accessArtist = null
  let orderId = null

  beforeAll(done => {
      User.create({ 
          username : "getOrderIdUser",
          firstName : "artist",
          lastName : "idsearch",
          email : "getOrderIdUser@mail.com",
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
              username : "getOrderIdArtist",
              firstName : "artist",
              lastName : "idsearch",
              email : "getOrderIdArtist@mail.com",
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
              title : 'testingOrderGetAll',
              description : 'getAll',
              deadline : new Date(),
              price : 100000,
              totalPrice : 120000,
              accepted : true,
              done : true,
              paid : true,
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
    Order.destroy({ where : { title : "testingOrderGetAll" }})
    .then(data => {
      done()
    })
  })


  // testing if success
  it ('should status 200, successfull get all orders by userId', function (done) {
    request (app)
      .get(`/users/${userId}/orders`)
      .set('access_token', accessUser)
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

  it ('should status 200, successfull get all orders by artistId', function (done) {
    request (app)
      .get(`/artists/${artistId}/orders`)
      .set('access_token', accessArtist)
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
})


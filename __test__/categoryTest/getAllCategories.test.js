const request = require ('supertest')
const { Category } = require('../../models')
const app = require ('../../app')

// DONE REVISION AFISTA 19-02-2021

// 1 testing, 1 success testing

// describe GET /categories/
// -- it success

describe ('GET /categories', function () {

  beforeAll(done => {
    Category.create({
        name: "Otherssssssss"
    })
    .then(() => {
      done()
    })
  })

  afterAll(done => {
    Category.destroy({ where : {name : "Otherssssssss" }})
    .then(() => {
      done()
    })
  })


    it ('should send response with 200 status code', function (done) {
      request (app)
        .get ('/categories')
        .end (function (err, res) {
          if (err) done (err)

          expect(res.statusCode).toEqual(200)
          expect(Array.isArray (res.body)).toEqual(true)
          res.body.forEach(category => {
            expect(category).toHaveProperty('id')
            expect(category).toHaveProperty('name')
            expect (typeof category.name).toEqual('string')
          })

          done()
        })
    })
})
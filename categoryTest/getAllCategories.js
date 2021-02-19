const request = require ('supertest')
const app = require ('../app')

// describe GET /categories/
// -- it success
// -- it error not found 

describe ('GET /categories', function () {
    it ('should send response with 200 status code', function (done) {
      request (app)
        .get ('/categories')
        .end (function (err, res) {
          if (err) done (err)

          expect(res.statusCode).toEqual(200)
          expect(Array.isArray (res.body)).toEqual(true)
          res.body.forEach(category => {
            expect (typeof category).toEqual('string')
          })

          done()
        })
    })
})
const request = require('supertest')

const { beforeAll, afterAll } = require("@jest/globals")

const app = require('../app')  

it('should status 200, successfull get all Image' ,function (done) {
  request(app) 
  .get(`/artists/${id}/images`)
  .end((err, res) => {
      if(err) done(err)
              
      //assert
      expect(res.statusCode).toEqual(200)
      expect(typeof res.body).toEqual('Object')
      expect(res.body).toHaveProperty('name')
      expect(res.body).toHaveProperty('description')
      expect(res.body).toHaveProperty('price')
      expect(res.body).toHaveProperty('link')
      expect(res.body).toHaveProperty('hidden')
      expect(res.body).toHaveProperty('CategoryId')
      expect(res.body).toHaveProperty('ArtistId')
      expect(res.body).toEqual({
          name : expect.any(String),
          description : expect.any(String),
          price : expect.any(Number),
          link : expect.any(String),
          hidden : expect.any(Boolean)
      })
      done()
  })
})
// describe GET /images
// -- it success

// 1 success test

const request = require('supertest')

// const { Picture, Artist, Category, User } = require('../../models')

// const { beforeAll, afterAll } = require("@jest/globals")

const app = require('../../app')  

// ===================================================================================
// ==========================    GET /pictures
// ==================================================================================

describe('GET /pictures',function() {

    // ======================== successfull get image ==========================
    it('should status 200, successfull get all Image' ,function (done) {
        //setup

        //excecute
        request(app) 
        .get(`/pictures`)
        .end((err, res) => {
            if(err) done(err)
                    
            //assert
            expect(res.statusCode).toEqual(200)
            expect(Array.isArray (res.body)).toEqual(true)
            expect(typeof res.body[0]).toEqual('object')
            expect(res.body[0]).toHaveProperty('name')
            expect(res.body[0]).toHaveProperty('description')
            expect(res.body[0]).toHaveProperty('price')
            expect(res.body[0]).toHaveProperty('link')
            expect (typeof res.body[0].name).toEqual('string')
            expect (typeof res.body[0].description).toEqual('string')
            expect (typeof res.body[0].price).toEqual('number')
            expect (typeof res.body[0].link).toEqual('string')

            done()
        })
    })
})
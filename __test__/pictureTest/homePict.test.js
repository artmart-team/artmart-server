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
        .get(`/images`)
        .end((err, res) => {
            if(err) done(err)
                    
            //assert
            expect(res.statusCode).toEqual(200)
            res.body(Array.isArray (res.body)).toEqual(true)
            res.body.forEach(picture => {
                expect (typeof picture).toEqual('Object')
                expect (picture).toHaveProperty('name')
                expect (picture).toHaveProperty('description')
                expect (picture).toHaveProperty('price')
                expect (picture).toHaveProperty('link')

                expect (typeof picture.name).toHaveProperty('string')
                expect (typeof picture.description).toHaveProperty('string')
                expect (typeof picture.price).toHaveProperty('number')
                expect (typeof picture.link).toHaveProperty('string')
            })

            done()
        })
    })
})
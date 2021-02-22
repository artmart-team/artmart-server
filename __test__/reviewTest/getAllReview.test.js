// describe GET /artists/:artistId/reviews  //comment artisnya
// -- it success
// -- it error not found 

const request = require('supertest')

const { beforeAll } = require("@jest/globals")

const { generateToken } = require('../../helpers/jwt')

const { User, Artist, Order } = require('../../models')

const app = require('../../app')  

describe('GET /users/:userId/reviews',function() {
    let userId = 1

    // ======================== successfull get all reviews ==========================
    it('should status 200, successfull get all reviews' ,function (done) {
        //setup

        //excecute
        request(app) 
        .get(`/users/${userId}/reviews`)
        .end((err, res) => {
            if(err) done(err)
                    
            //assert
            expect(res.statusCode).toEqual(200)
            expect(Array.isArray (res.body)).toEqual(true)
            res.body.forEach(review => {
                expect (typeof review).toEqual('object')
                expect (review).toHaveProperty('title')
                expect (review).toHaveProperty('description')
                expect (typeof review.title).toEqual('string')
                expect (typeof review.description).toEqual('string')
            })

            done()
        })
    })
})

describe('GET /users/:userId/reviews',function() {
    let artistId = 1

    // ======================== successfull get all reviews ==========================
    it('should status 200, successfull get all reviews' ,function (done) {
        //setup

        //excecute
        request(app) 
        .get(`/artists/${artistId}/reviews`)
        .end((err, res) => {
            if(err) done(err)
                    
            //assert
            expect(res.statusCode).toEqual(200)
            expect(Array.isArray (res.body)).toEqual(true)
            res.body.forEach(review => {
                expect (typeof review).toEqual('object')
                expect (review).toHaveProperty('title')
                expect (review).toHaveProperty('description')
                expect (typeof review.title).toEqual('string')
                expect (typeof review.description).toEqual('string')
            })

            done()
        })
    })
})


// describe GET /artists/:artistId/reviews  //comment artisnya
// -- it success
// -- it error not found 


const request = require('supertest')

const { beforeAll } = require("@jest/globals")

const { User } = require('../../models')

const app = require('../../app')  

// ===================================================================================
// ==========================  GET /users/:userId/comments
// ==================================================================================

describe('GET /users/:userId/comments',function() {
    let userId

    beforeAll(done => {
        User.findOne({where : {email : "user@mail.com"}})
        .then(data => {
            userId = data.id
            done()
        })
        .catch(err => {
            console.log(err)
        })
    })

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
            res.body(Array.isArray (res.body)).toEqual(true)
            res.body.forEach(review => {
                expect (typeof review).toEqual('Object')
                expect (review).toHaveProperty('title')
                expect (review).toHaveProperty('description')
                expect (typeof review.title).toHaveProperty('string')
                expect (typeof review.description).toHaveProperty('string')
            })

            done()
        })
    })
})


// ===================================================================================
// ==========================  GET /artists/:artistId/reviews
// ==================================================================================

describe('GET /ratings/:artistId/reviews',function() {
    let artistId

    beforeAll(done => {
        Artist.findOne({where : {email : "user@mail.com"}})
        .then(data => {
            artistId = data.id
            done()
        })
        .catch(err => {
            console.log(err)
        })
    })

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
            res.body(Array.isArray (res.body)).toEqual(true)
            res.body.forEach(review => {
                expect (typeof review).toEqual('Object')
                expect (review).toHaveProperty('title')
                expect (review).toHaveProperty('description')
                expect (typeof review.title).toHaveProperty('string')
                expect (typeof review.description).toHaveProperty('string')
            })

            done()
        })
    })
})


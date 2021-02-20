// describe GET /artists/:artistId/ratings  //comment artisnya
// -- it success
// -- it error not found 


const request = require('supertest')

const { beforeAll } = require("@jest/globals")

const { User, Artist } = require('../../models')

const app = require('../../app')  

// ===================================================================================
// ==========================  GET /users/:userId/ratings
// ==================================================================================

describe('GET /users/:userId/ratings',function() {
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

    // ======================== successfull get all ratings ==========================
    it('should status 200, successfull get all ratings' ,function (done) {
        //setup

        //excecute
        request(app) 
        .get(`/users/${userId}/ratings`)
        .end((err, res) => {
            if(err) done(err)
                    
            //assert
            expect(res.statusCode).toEqual(200)
            res.body(Array.isArray (res.body)).toEqual(true)
            res.body.forEach(rating => {
                expect (typeof rating).toEqual('Object')
                expect (rating).toHaveProperty('score')
                expect (typeof rating.score).toHaveProperty('number')
            })

            done()
        })
    })
})


// ===================================================================================
// ==========================  GET /artists/:artistId/ratings
// ==================================================================================

describe('GET /ratings/:artistId/comments',function() {
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

    // ======================== successfull get all rating ==========================
    it('should status 200, successfull get all rating' ,function (done) {
        //setup

        //excecute
        request(app) 
        .get(`/artists/${artistId}/ratings`)
        .end((err, res) => {
            if(err) done(err)
                    
            //assert
            expect(res.statusCode).toEqual(200)
            res.body(Array.isArray (res.body)).toEqual(true)
            res.body.forEach(rating => {
                expect (typeof rating).toEqual('Object')
                expect (rating).toHaveProperty('score')
                expect (typeof rating.description).toHaveProperty('number')
            })

            done()
        })
    })
})
// descibe GET /artists/:artistId/ratings/:ratingId
// -- it success
// -- it error rating id not found 

const request = require('supertest')
const { User, Rating, Artist, Order } = require('../../models')
const { beforeAll } = require("@jest/globals")
const app = require('../../app')  

// ===================================================================================
// ==========================  GET /users/:userId/ratings/:ratingId
// ==================================================================================

describe('GET /users/:userId/ratings/:ratingId',function() {
    let userId = 1
    let ratingId = 2

    // ======================== successfull get rating ==========================
    it('should status 200, successfull get rating id' ,function (done) {
        //setup

        //excecute
        request(app) 
        .get(`/users/${userId}/ratings/${ratingId}`)
        .end((err, res) => {
            if(err) done(err)
                    
            //assert
            expect(res.statusCode).toEqual(200)
            expect(typeof res.body).toEqual('object')
            expect(res.body).toHaveProperty('score')
            expect(typeof res.body.score).toEqual('number')

            done()
        })
    })


    // ======================== error comments id not found ==========================
    it('should status 404, error comment id not found' ,function (done) {
        //setup
        const id = 9999999

        //excecute
        request(app) 
        .get(`/users/${userId}/ratings/${id}`)
        .end((err, res) => {
            if(err) done(err)
                    
            //assert
            expect(res.statusCode).toEqual(404)
            expect(typeof res.body).toEqual('object')
            expect(res.body).toHaveProperty('messages')
            expect(typeof res.body.messages).toEqual('string')

            done()
        })
    })
})



describe('GET /users/:userId/ratings/:ratingId',function() {
    let artistId = 1
    let ratingId = 2

    // ======================== successfull get rating ==========================
    it('should status 200, successfull get rating id' ,function (done) {
        //setup

        //excecute
        request(app) 
        .get(`/artists/${artistId}/ratings/${ratingId}`)
        .end((err, res) => {
            if(err) done(err)
                    
            //assert
            expect(res.statusCode).toEqual(200)
            expect(typeof res.body).toEqual('object')
            expect(res.body).toHaveProperty('score')
            expect(typeof res.body.score).toEqual('number')

            done()
        })
    })


    // ======================== error comments id not found ==========================
    it('should status 404, error comment id not found' ,function (done) {
        //setup
        const id = 9999999

        //excecute
        request(app) 
        .get(`/artists/${artistId}/ratings/${id}`)
        .end((err, res) => {
            if(err) done(err)
                    
            //assert
            expect(res.statusCode).toEqual(404)
            expect(typeof res.body).toEqual('object')
            expect(res.body).toHaveProperty('messages')
            expect(typeof res.body.messages).toEqual('string')

            done()
        })
    })
})
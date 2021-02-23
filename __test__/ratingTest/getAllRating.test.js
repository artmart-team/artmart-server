// describe GET /artists/:artistId/ratings  //comment artisnya
// -- it success
// -- it error not found 


const request = require('supertest')

const { beforeAll } = require("@jest/globals")

const { User } = require('../../models')

const app = require('../../app')  
const { generateToken } = require('../../helpers/jwt')
const { disable } = require('../../app')

// ===================================================================================
// ==========================  GET /users/:userId/ratings
// ==================================================================================

describe('GET /users/:userId/ratings',function() {
    let userId = 1

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
            expect(Array.isArray (res.body)).toEqual(true)
            res.body.forEach(rating => {
                expect (typeof rating).toEqual('object')
                expect (rating).toHaveProperty('score')
            })

            done()
        })
    })


    // ======================== error internal server ==========================
    it('should status 500, error internal server' ,function (done) {
        //setup

        let idUser = "ad"

        //excecute
        request(app) 
        .get(`/users/${idUser}/ratings`)
        .end((err, res) => {
            if(err) done(err)
                    
            //assert
            expect(res.statusCode).toEqual(500)
            expect (typeof res.body).toEqual('object')
            expect (typeof res.body.messages).toEqual('string')

            done()
        })
    })
})


describe('GET /users/:userId/ratings',function() {
    let artistId = 1 

    // ======================== successfull get all ratings ==========================
    it('should status 200, successfull get all ratings' ,function (done) {
        //setup

        //excecute
        request(app) 
        .get(`/artists/${artistId}/ratings`)
        .end((err, res) => {
            if(err) done(err)
                    
            //assert
            expect(res.statusCode).toEqual(200)
            expect(Array.isArray (res.body)).toEqual(true)
            res.body.forEach(rating => {
                expect (typeof rating).toEqual('object')
                expect (rating).toHaveProperty('score')
            })

            done()
        })
    })

    // ======================== error internal server ==========================
    it('should status 500, error internal server' ,function (done) {
        //setup

        let idArt = "ad"

        //excecute
        request(app) 
        .get(`/artists/${idArt}/ratings`)
        .end((err, res) => {
            if(err) done(err)
                    
            //assert
            expect(res.statusCode).toEqual(500)
            expect (typeof res.body).toEqual('object')
            expect (typeof res.body.messages).toEqual('string')

            done()
        })
    })
})


describe('GET /artists/:artistId/ratings/average',function() {
    let artistId = 1 

    // ================ successfull average rating ===================
    it('should status 200, success average ratings' ,function (done) {
        //setup

        //excecute
        request(app) 
        .get(`/artists/${artistId}/ratings/average`)
        .end((err, res) => {
            if(err) done(err)
                    
            //assert
            expect(res.statusCode).toEqual(200)
            expect(Array.isArray (res.body)).toEqual(false)
            expect(res.body).toHaveProperty("ArtistId")
            expect(res.body).toHaveProperty("averageRating")

            done()
        })
    })

    // ======================== error internal server ==========================
    it('should status 500, error internal server' ,function (done) {
        //setup

        let idArt = "ad"

        //excecute
        request(app) 
        .get(`/artists/${idArt}/ratings/average`)
        .end((err, res) => {
            if(err) done(err)
                    
            //assert
            expect(res.statusCode).toEqual(500)
            expect (typeof res.body).toEqual('object')
            expect (typeof res.body.messages).toEqual('string')

            done()
        })
    })
})
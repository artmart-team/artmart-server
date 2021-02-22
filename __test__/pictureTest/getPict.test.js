// describe GET /users/:userId
// -- it success
// -- it error id not found 

// 1 testting, 1 success test

const request = require('supertest')

const { Picture, Artist, Category, User } = require('../../models')

const { beforeAll } = require("@jest/globals")

const app = require('../../app')  

// ===================================================================================
// ==========================    GET /artists/:artistId/pictures
// ==================================================================================

describe('GET /artists/:artistId/pictures',function() {
    let artId = 1
    
    // ======================== successfull get image ==========================
    it('should status 200, successfull get all Image' ,function (done) {
        //setup

        //excecute
        request(app) 
        .get(`/artists/${artId}/pictures`)
        .end((err, res) => {
            if(err) done(err)
                    
            //assert
            expect(res.statusCode).toEqual(200)
            expect(Array.isArray (res.body)).toEqual(true)
            res.body.forEach(picture => {
                expect (typeof picture).toEqual('object')
                expect (picture).toHaveProperty('name')
                expect (picture).toHaveProperty('description')
                expect (picture).toHaveProperty('price')
                expect (picture).toHaveProperty('link')

                expect (typeof picture.name).toEqual('string')
                expect (typeof picture.description).toEqual('string')
                expect (typeof picture.price).toEqual('number')
                expect (typeof picture.link).toEqual('string')
            })

            done()
        })
    })

    // ======================== error internal server ==========================
    it('should status 500, error internal server' ,function (done) {
        //setup
        const idArt = "asdadasd"


        //excecute
        request(app) 
        .get(`/artists/${idArt}/pictures`)
        .end((err, res) => {
            if(err) done(err)
                    
            //assert
            expect(res.statusCode).toEqual(500)
            expect (typeof res.body).toEqual('object')
            expect (res.body).toHaveProperty('messages')
            expect (typeof res.body.messages).toEqual('string')

            done()
        })
    })
})


describe('GET /users/:userId/pictures',function() {
    let userId = 1
    
    // ======================== successfull get image ==========================
    it('should status 200, successfull get all Image' ,function (done) {
        //setup

        //excecute
        request(app) 
        .get(`/users/${userId}/pictures`)
        .end((err, res) => {
            if(err) done(err)
                    
            //assert
            expect(res.statusCode).toEqual(200)
            expect(Array.isArray (res.body)).toEqual(true)
            res.body.forEach(picture => {
                expect (typeof picture).toEqual('object')
                expect (picture).toHaveProperty('name')
                expect (picture).toHaveProperty('description')
                expect (picture).toHaveProperty('price')
                expect (picture).toHaveProperty('link')

                expect (typeof picture.name).toEqual('string')
                expect (typeof picture.description).toEqual('string')
                expect (typeof picture.price).toEqual('number')
                expect (typeof picture.link).toEqual('string')
            })

            done()
        })
    })


    // ======================== error internal server ==========================
    it('should status 500, error internal server' ,function (done) {
        //setup
        const idUser = "asdadasd"


        //excecute
        request(app) 
        .get(`/users/${idUser}/pictures`)
        .end((err, res) => {
            if(err) done(err)
                    
            //assert
            expect(res.statusCode).toEqual(500)
            expect (typeof res.body).toEqual('object')
            expect (res.body).toHaveProperty('messages')
            expect (typeof res.body.messages).toEqual('string')

            done()
        })
    })
})
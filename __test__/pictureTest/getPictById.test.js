// describe GET /users/:userId
// -- it success
// -- it error id not found 

//2 testing, 1 success, 1 error test

const request = require('supertest')

const { Picture, Artist } = require('../../models')

const { beforeAll, afterAll } = require("@jest/globals")

const app = require('../../app')  

// ===================================================================================
// ==========================    GET /artists/:artistId/pictures
// ==================================================================================

describe('GET /artists/:artistId/pictures/:pictureId',function() {
    let artId = 1
    let pictId = 2

    // ======================== successfull get image ==========================
    it('should status 200, successfull get all Image' ,function (done) {
        //setup

        //excecute
        request(app) 
        .get(`/artists/${artId}/pictures/${pictId}`)
        .end((err, res) => {
            if(err) done(err)
                    
            //assert
            expect(res.statusCode).toEqual(200)
            expect(typeof res.body).toEqual('object')
            expect(res.body).toHaveProperty('name')
            expect(res.body).toHaveProperty('description')
            expect(res.body).toHaveProperty('price')
            expect(res.body).toHaveProperty('link')
            expect(typeof res.body.name).toEqual('string')
            expect(typeof res.body.description).toEqual('string')
            expect(typeof res.body.price).toEqual('number')
            expect(typeof res.body.link).toEqual('string')
            
            done()
        })
    })

    // ======================== error image id not found ==========================
    it('should status 404, error image id not found' ,function (done) {
        //setup
        const idImage = 9999999

        //excecute
        request(app) 
        .get(`/artists/${artId}/pictures/${idImage}`)
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

    // ======================== error internal server ==========================
    it('should status 500, error internal server' ,function (done) {
        //setup
        const idImage = "ssdasdasdasd"

        //excecute
        request(app) 
        .get(`/artists/${artId}/pictures/${idImage}`)
        .end((err, res) => {
            if(err) done(err)
                    
            //assert
            expect(res.statusCode).toEqual(500)
            expect(typeof res.body).toEqual('object')
            expect(res.body).toHaveProperty('messages')
            expect(typeof res.body.messages).toEqual('string')

            done()
        })
    })
})



describe('GET /users/:userId/pictures/:pictureId',function() {
    let userId = 1
    let pictId = 2
    
    // ======================== successfull get image ==========================
    it('should status 200, successfull get all Image' ,function (done) {
        //setup

        //excecute
        request(app) 
        .get(`/users/${userId}/pictures/${pictId}`)
        .end((err, res) => {
            if(err) done(err)
                    
            //assert
            expect(res.statusCode).toEqual(200)
            expect(typeof res.body).toEqual('object')
            expect(res.body).toHaveProperty('name')
            expect(res.body).toHaveProperty('description')
            expect(res.body).toHaveProperty('price')
            expect(res.body).toHaveProperty('link')
            expect(typeof res.body.name).toEqual('string')
            expect(typeof res.body.description).toEqual('string')
            expect(typeof res.body.price).toEqual('number')
            expect(typeof res.body.link).toEqual('string')
            
            done()
        })
    })

    // ======================== error image id not found ==========================
    it('should status 404, error image id not found' ,function (done) {
        //setup
        const idImage = 9999999

        //excecute
        request(app) 
        .get(`/users/${userId}/pictures/${idImage}`)
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


    // ======================== error internal server ==========================
    it('should status 500, error internal server' ,function (done) {
        //setup
        const idImage = "sadasdadsada"

        //excecute
        request(app) 
        .get(`/users/${userId}/pictures/${idImage}`)
        .end((err, res) => {
            if(err) done(err)
                    
            //assert
            expect(res.statusCode).toEqual(500)
            expect(typeof res.body).toEqual('object')
            expect(res.body).toHaveProperty('messages')
            expect(typeof res.body.messages).toEqual('string')

            done()
        })
    })
})
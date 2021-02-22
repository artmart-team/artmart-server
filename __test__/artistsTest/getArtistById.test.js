// CREATE AFISTA 18-02-2021 20.00
// DONE REVISION AFISTA 19-02-2021 20.00

// 2 testting -> 1 success test, 1 error test

// describe GET /artists/:artistId
// -- it success
// -- it error id nonpt found 

const request = require('supertest')

const { Artist } = require('../../models')

const { beforeAll } = require("@jest/globals")

const app = require ('../../app')  

// ===================================================================================
// ==========================    GET /artists/:artistId
// ==================================================================================

describe('GET /artists/:artistId',function() {
    let artistId 

    beforeAll(done => {
        Artist.findOne({ where: { email : "testing@mail.com"}})
        .then(data => {
            artistId = data.id
            done()
        })
        .catch(err => {
            console.log(err, "<< err beforeAll getArtistById.test.js")
        })
    })
    
    // ======================== successfull get artist id ==========================
    it('should status 200, successfull get user ID' ,function (done) {
        //setup
        const id = artistId

        //excecute
        request(app) 
        .get(`/artists/${id}`)
        .end((err, res) => {
            if(err) done(err)
                    
            //assert
            expect(res.statusCode).toEqual(200)
            expect(typeof res.body).toEqual('object')
            expect(res.body).toHaveProperty('username')
            expect(res.body).toHaveProperty('firstName')
            expect(res.body).toHaveProperty('lastName')
            expect(res.body).toHaveProperty('email')
            expect(res.body).toHaveProperty('profilePicture')
            expect(res.body).toHaveProperty('bankAccount')
            expect(res.body).toHaveProperty('completeDuration')
            expect(typeof res.body.username).toEqual('string')
            expect(typeof res.body.lastName).toEqual('string')
            expect(typeof res.body.firstName).toEqual('string')
            expect(typeof res.body.email).toEqual('string')
            expect(typeof res.body.profilePicture).toEqual('string')

            done()
        })
    })

    // ==========================  error get artist id  ===============================
    it('should status 404, error user id not found' ,function (done) {
        //setup
        const id = 9999999
    
        //excecute
        request(app) 
        .get(`/artists/${id}`)
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

        // ==========================  error internal server  ===============================
        it('should status 500, error internal server' ,function (done) {
            //setup
            const id = "selat"
        
            //excecute
            request(app) 
            .get(`/artists/${id}`)
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
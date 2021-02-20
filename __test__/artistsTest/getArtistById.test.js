

// CREATE AFISTA 18-02-2021 20.00
// DONE REVISION AFISTA 19-02-2021 20.00

// 2 testting -> 1 success test, 1 error test

// describe GET /artists/:artistId
// -- it success
// -- it error id not found 

const request = require('supertest')

const { Artist } = require('../../models')

const { beforeAll, afterAll } = require("@jest/globals")

const app = require ('../../app')  

// ===================================================================================
// ==========================    GET /artists/:artistId
// ==================================================================================

describe('GET /artists/:artistId',function() {
    let artistId 

    beforeAll(done => {
        Artist.create({
            username : 'username',
            firstName : 'user',
            lastName : 'name',
            email : 'user@mail.com',
            password : '123456',
            profilePicture : "link.google.com",
            bankAccount : 230230230,
            completeDuration : 48
        })
        .then(data => {
            artistId = data.id
            done()
        })
        .catch(err => {
            console.log(err, "<< err beforeAll getArtistById.test.js")
        })
    })

    afterAll(done => {
        Artist.destroy()
        .then(() => {
            done()
        })
        .catch(err => {
            console.log(err, "<< err afterAll delete getArtistById.test.js")
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
            expect(typeof res.body).toBe('object')
            expect(res.body).toHaveProperty('username')
            expect(res.body).toHaveProperty('firstName')
            expect(res.body).toHaveProperty('lastName')
            expect(res.body).toHaveProperty('email')
            expect(res.body).toHaveProperty('profilePicture')
            expect(res.body).toHaveProperty('bankAccount')
            expect(res.body).toHaveProperty('completeDuration')
            expect(typeof res.body.username).toBe('string')
            expect(typeof res.body.lastName).toBe('string')
            expect(typeof res.body.firstName).toBe('string')
            expect(typeof res.body.email).toBe('string')
            expect(typeof res.body.profilePicture).toBe('string')

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
            expect(res.body).toHaveProperty('message')
            expect(typeof res.body.message).toHaveProperty('string')

            done()
        })
    })
})
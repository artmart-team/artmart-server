// describe GET /users/:userId
// -- it success
// -- it error id not found 

const request = require('supertest')

const { Artist } = require('../models')

const { beforeAll, afterAll } = require("@jest/globals")

const app = require('../app')  

// ===================================================================================
// ==========================    GET /users/:userId
// ==================================================================================

describe('GET /artists/:userId',function() {
    let artistId 

    beforeAll(done => {
        Artist.create({
            username : 'username',
            firstName : 'user',
            lastName : 'name',
            email : 'user@mail.com',
            completeDuration : 48,
            password : '123456',
        })
        .then(data => {
            artistId = data.id
            done()
        })
        .catch(err => {
            console.log(err, "<< err create artist get by id test")
        })
    })

    afterAll(done => {
        Artist.delete()
        .then(() => {
            done()
        })
        .catch(err => {
            console.log(err, "<< err delete artist get by id test")
        })
    })
    
    // ======================== successfull login ==========================
    it('should status 200, successfull get artist ID' ,function (done) {
        //setup
        const id = artistId

        //excecute
        request(app) 
        .get(`/artists/${id}`)
        .end((err, res) => {
            if(err) done(err)
                    
            //assert
            expect(res.statusCode).toEqual(200)
            expect(typeof res.body).toEqual('Object')
            expect(res.body).toHaveProperty('username')
            expect(res.body).toHaveProperty('firstName')
            expect(res.body).toHaveProperty('lastName')
            expect(res.body).toHaveProperty('email')
            expect(res.body).toHaveProperty('completeDuration')
            expect(res.body).toEqual({
                username : expect.any(String),
                firstName : expect.any(String),
                lastName : expect.any(String),
                email : expect.any(String)
            })

            done()
        })
    })

    // ==========================  error in password  ===============================
    it('should status 404, error artist id not found' ,function (done) {
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
            expect(res.body.message).toEqual('artist id not found')
            done()
        })
    })
})
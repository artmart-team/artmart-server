// CREATE AFISTA 18-02-2021 20.00
// DONE REVISION AFISTA 19-02-2021 18.00

// 2 testting -> 1 success test, 1 error test

// describe GET /users/:userId
// -- it success
// -- it error id not found 

const request = require('supertest')

const { User } = require('../../models')

const { beforeAll } = require("@jest/globals")

const app = require ('../../app') 

// ===================================================================================
// ==========================    GET /users/:userId
// ==================================================================================

describe('GET /users/:userId',function() {
    let userId 

    beforeAll(done => {
        User.create({ 
            username : "userTestIdSearchData",
            firstName : "artist",
            lastName : "idsearch",
            email : "userTestingById@mail.com",
            password : '123456',
            profilePicture : ""
        })
        .then(data => {
            return User.findOne({ where : {username : 'userTestIdSearchData'}})
        })
        .then(response => {
            userId = response.id
            done()
        })
    })

    afterAll(done => {
        User.destroy({ where : {
            username: "userTestIdSearchData"
        }})
        .then(data => {
            done()
        })
    })

    // ======================== successfull get user Id ==========================
    it('should status 200, successfull get user ID' ,function (done) {
        //setup
        const id = userId

        //excecute
        request(app) 
        .get(`/users/${id}`)
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
            expect(typeof res.body.username).toBe('string')
            expect(typeof res.body.lastName).toBe('string')
            expect(typeof res.body.firstName).toBe('string')
            expect(typeof res.body.email).toBe('string')
            expect(typeof res.body.profilePicture).toBe('string')

            done()
        })
    })

    // ==========================  error id  ===============================
    it('should status 404, error user id not found' ,function (done) {
        //setup
        const id = 9999999
    
        //excecute
        request(app) 
        .get(`/users/${id}`)
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
        .get(`/users/${id}`)
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
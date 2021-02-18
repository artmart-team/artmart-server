// describe GET /users/:userId
// -- it success
// -- it error id not found 

const request = require('supertest')

const { User } = require('../models')

const { beforeAll, afterAll } = require("@jest/globals")

const app = require('../app')  

// ===================================================================================
// ==========================    GET /users/:userId
// ==================================================================================

describe('GET /users/:userId',function() {
    let userId 

    beforeAll(done => {
        User.create({
            username : 'username',
            firstName : 'user',
            lastName : 'name',
            email : 'user@mail.com',
            password : '123456',
        })
        .then(data => {
            userId = data.id
            done()
        })
        .catch(err => {
            console.log(err, "<< err create user test")
        })
    })

    afterAll(done => {
        User.delete()
        .then(() => {
            done()
        })
        .catch(err => {
            console.log(err, "<< err delete user test")
        })
    })
    
    // ======================== successfull login ==========================
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
            expect(typeof res.body).toEqual('Object')
            expect(res.body).toHaveProperty('username')
            expect(res.body).toHaveProperty('firstName')
            expect(res.body).toHaveProperty('lastName')
            expect(res.body).toHaveProperty('email')
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
            expect(res.body).toHaveProperty('message')
            expect(res.body.message).toEqual('user id not found')
            done()
        })
    })
})
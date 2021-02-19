
// DONE REVISION AFISTA 19-02-2021 18.00

// 6 testing -> 2 success test,  4 error test

// describe POST /users/login  
// -- it success
// -- it error email / password empty
// -- it error id not found
// -- it error email and password error

const request = require('supertest')

const { User } = require('../models')

const { beforeAll, afterAll } = require("@jest/globals")

const app = require('../app')  

// ===================================================================================
// POST /users/login
// ==================================================================================

describe('POST /users/login',function() {
    beforeAll(done => {
        User.create({
            username : 'username',
            firstName : 'user',
            lastName : 'name',
            email : 'user@mail.com',
            password : '123456',
            profilePicture : 'link.google.com'
        })
        .then(() => {
            done()
        })
        .catch(err => {
            console.log(err, "<< err beforeAll loginUser.test.js ")
        })
    })

    afterAll(done => {
        User.delete()
        .then(() => {
            done()
        })
        .catch(err => {
            console.log(err, "<< err afterAll loginUser.test.js ")
        })
    })
    
    // ======================== successfull login with usernmae ==========================
    it('should status 200, successfull login with username' ,function (done) {
        //setup
        const body = {
            username : 'username',
            password : '123456',         
        }
    
        //excecute
        request(app) 
        .post('/users/login')
        .send(body)
        .end((err, res) => {
            if(err) done(err)
                    
            //assert
            expect(res.statusCode).toEqual(200)
            expect(typeof res.body).toEqual('object')
            expect(res.body).toHaveProperty('access_token')
            expect(res.body).toHaveProperty('id')
            expect(res.body).toHaveProperty('username')
            expect(res.body).toEqual({
                access_token : expect.any(String),
                username : expect.any(String)
            })

            done()
        })
    })


    // ======================== successfull login with email ==========================
    it('should status 200, successfull login with email' ,function (done) {
        //setup
        const body = {
            email : 'user@mail.com',
            password : '123456',         
        }
    
        //excecute
        request(app) 
        .post('/users/login')
        .send(body)
        .end((err, res) => {
            if(err) done(err)
                    
            //assert
            expect(res.statusCode).toEqual(200)
            expect(typeof res.body).toEqual('object')
            expect(res.body).toHaveProperty('access_token')
            expect(res.body).toHaveProperty('id')
            expect(res.body).toHaveProperty('username')
            expect(res.body).toEqual({
                access_token : expect.any(String),
                username : expect.any(String)
            })


            done()
        })
    })

    // ==========================  error in username  ===============================
    it('should status 400, invalid for password / not found in database' ,function (done) {
        //setup
        const body = {
            username : 'userrrrrrrrrrrr@mail.com',
            password : '123456',         
        }
    
        //excecute
        request(app) 
        .post('/users/login')
        .send(body)
        .end((err, res) => {
            if(err) done(err)
                    
            //assert
            expect(res.statusCode).toEqual(400)
            expect(typeof res.body).toEqual('object')
            expect(res.body).toHaveProperty('errors')

            done()
        })
    })


    // ==========================  error in password  ===============================
    it('should status 400, invalid for password / not found in database' ,function (done) {
        //setup
        const body = {
            email : 'user@mail.com',
            password : '12345678910',         
        }
    
        //excecute
        request(app) 
        .post('/users/login')
        .send(body)
        .end((err, res) => {
            if(err) done(err)
                    
            //assert
            expect(res.statusCode).toEqual(400)
            expect(typeof res.body).toEqual('object')
            expect(res.body).toHaveProperty('errors')

            done()
        })
    })


    // ====================== email tidak ada di db ===========================
    it('should status 400, invalid for email / not found in database' ,function (done) {
        //setup
        const body = {
            email : 'usernamename@mail.com',
            password : '123456',         
        }
    
        //excecute
        request(app) 
        .post('/users/login')
        .send(body)
        .end((err, res) => {
            if(err) done(err)
                    
            //assert
            expect(res.statusCode).toEqual(400)
            expect(typeof res.body).toEqual('object')
            expect(res.body).toHaveProperty('errors')

            done()
        })
    })


    // ====================== email, pass not fill ===========================
    it('should status 400, email and pass must be filled' ,function (done) {
        //setup
        const body = {
            email : '',
            password : '',         
        }
    
        //excecute
        request(app) 
        .post('/users/login')
        .send(body)
        .end((err, res) => {
            if(err) done(err)
                    
            //assert
            expect(res.statusCode).toEqual(400)
            expect(typeof res.body).toEqual('object')
            expect(res.body).toHaveProperty('message')
            expect(res.body.message).toEqual('Email / Password must be filled')

            done()
        })
    })
})
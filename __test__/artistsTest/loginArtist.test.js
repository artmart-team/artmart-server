// describe POST /users/login  
// -- it success
// -- it error email / password empty
// -- it error id not found
// -- it error email and password error

const request = require('supertest')

const { Artist } = require('../models')

const app = require('../app')  

const { beforeAll, afterAll } = require("@jest/globals")

// ===================================================================================
// POST /users/login
// ==================================================================================

describe('POST /artists/login',function() {
    beforeAll(done => {
        Artist.create({
            username : 'username',
            firstName : 'user',
            lastName : 'name',
            email : 'user@mail.com',
            password : '123456',
            completeDuration: 48
        })
        .then(() => {
            done()
        })
        .catch(err => {
            console.log(err, "<< err create artist test")
        })
    })

    afterAll(done => {
        Artist.delete()
        .then(() => {
            done()
        })
        .catch(err => {
            console.log(err, "<< err delete artist test")
        })
    })
    
    // ======================== successfull login ==========================
    it('should status 200, successfull login' ,function (done) {
        //setup
        const body = {
            email : 'user@mail.com',
            password : '123456',         
        }
    
        //excecute
        request(app) 
        .post('/artists/login')
        .send(body)
        .end((err, res) => {
            if(err) done(err)
                    
            //assert
            expect(res.statusCode).toEqual(200)
            expect(typeof res.body).toEqual('object')
            expect(res.body).toHaveProperty('access_token')
            expect(res.body).toEqual({
                access_token : expect.any(String)
            })


            done()
        })
    })

    // ==========================  error in password  ===============================
    it('should status 401, invalid for password / not found in database' ,function (done) {
        //setup
        const body = {
            email : 'user@mail.com',
            password : '12345678910',         
        }
    
        //excecute
        request(app) 
        .post('/artists/login')
        .send(body)
        .end((err, res) => {
            if(err) done(err)
                    
            //assert
            expect(res.statusCode).toEqual(401)
            expect(typeof res.body).toEqual('object')
            expect(res.body).toHaveProperty('message')
            expect(res.body.message).toEqual('Invalid email / password')
            done()
        })
    })


    // ====================== email tidak ada di db ===========================
    it('should status 401, invalid for email / not found in database' ,function (done) {
        //setup
        const body = {
            email : 'usernamename@mail.com',
            password : '123456',         
        }
    
        //excecute
        request(app) 
        .post('/artists/login')
        .send(body)
        .end((err, res) => {
            if(err) done(err)
                    
            //assert
            expect(res.statusCode).toEqual(500)
            expect(typeof res.body).toEqual('object')
            expect(res.body).toHaveProperty('message')

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
        .post('/artists/login')
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
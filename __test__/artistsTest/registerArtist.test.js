

// DONE REVISION AFISTA 19-02-2021 18.00

// 7 testing -> 1 success test, 6 error test 

// describe POST /users/register
// -- it success
// -- it firstname empty
// -- it lastname empty
// -- it error username empty
// -- it error email empty
// -- it error email not email format
// -- it password empty

// 7 code

const request = require('supertest')

const { User } = require('../models')

const app = require('../app')  


// ===================================================================================
// POST /users/register
// ==================================================================================

describe('POST /users/register',function() {
    afterAll(done => {
        User.delete()
        .then(() => {
            done()
        })
        .catch(err => {
            console.log(err, "<< err delete afterAll registerUser.test.js ")
        })
    })
    
    // ======================== successfull register ==========================
    it('should status 201, successfull created user' ,function (done) {
        //setup
        const body = {
            username : 'username',
            firstName : 'user',
            lastName : 'name',
            email : 'user@mail.com',
            password : '123456',
            profilePicture : "link.google.com"         
        }
    
        //excecute
        request(app) 
        .post('/users/register')
        .send(body)
        .end((err, res) => {
            if(err) done(err)
                    
            //assert
            expect(res.statusCode).toEqual(201)
            expect(typeof res.body).toEqual('object')
            expect(res.body).toHaveProperty('username')
            expect(res.body).toHaveProperty('firstName')
            expect(res.body).toHaveProperty('lastName')
            expect(res.body).toHaveProperty('email')
            expect(res.body).toHaveProperty('profilePicture')
            expect(res.body).toEqual({
                username : expect.any(String),
                firstName : expect.any(String),
                lastName : expect.any(String),
                email : expect.any(String),
                profilePicture : expect.any(String)
            })

            done()
        })
    })

    // ==========================  username diisi kosong  ===============================
    it('should status 400, error input username empty / null' ,function (done) {
        //setup
        const body = {
            username : '',
            firstName : 'user',
            lastName : 'name',
            email : 'user@mail.com',
            password : '123456',
            profilePicture : "link.google.com"         
        }
    
        //excecute
        request(app) 
        .post('/users/register')
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


    // ====================== firstname diisi kosong ===========================
    it('should status 400, error input firstname empty / null' ,function (done) {
        //setup
        const body = {
            username : 'username',
            firstName : '',
            lastName : 'name',
            email : 'user@mail.com',
            password : '123456',
            profilePicture : "link.google.com"         
        }
    
        //excecute
        request(app) 
        .post('/users/register')
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


    // ====================== lastname diisi kosong ===========================
    it('should status 400, error input lastname empty / null' ,function (done) {
        //setup
        const body = {
            username : 'username',
            firstName : 'user',
            lastName : '',
            email : 'user@mail.com',
            password : '123456',
            profilePicture : "link.google.com"         
        }
    
        //excecute
        request(app) 
        .post('/users/register')
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

    // ====================== email tidak sesuai format ===========================
    it('should status 400, error input email format' ,function (done) {
        //setup
        const body = {
            username : 'username',
            firstName : 'user',
            lastName : 'name',
            email : 'user',
            password : '123456',
            profilePicture : "link.google.com"         
        }
    
        //excecute
        request(app) 
        .post('/users/register')
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

    // ====================== email diisi kosong ===========================
    it('should status 400, error input email empty / null' ,function (done) {
        //setup
        const body = {
            username : 'username',
            firstName : 'user',
            lastName : 'name',
            email : '',
            password : '123456',
            profilePicture : "link.google.com"         
        }
    
        //excecute
        request(app) 
        .post('/users/register')
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

    // ====================== password diisi kosong ===========================
    it('should status 400, error input password empty / null' ,function (done) {
        //setup
        const body = {
            username : 'username',
            firstName : 'user',
            lastName : 'name',
            email : 'user@mail.com',
            password : '',
            profilePicture : "link.google.com"         
        }
    
        //excecute
        request(app) 
        .post('/users/register')
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
})

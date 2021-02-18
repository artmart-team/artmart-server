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

const { Artist } = require('../models')

const app = require('../app')  


// ===================================================================================
// POST /users/register
// ==================================================================================

describe('POST /users/register',function() {
    afterAll(done => {
        Artist.delete()
        .then(() => {
            done()
        })
        .catch(err => {
            console.log(err, "<< err delete user test")
        })
    })
    
    // ======================== successfull login ==========================
    it('should status 201, successfull created artist' ,function (done) {
        //setup
        const body = {
            username : 'username',
            firstName : 'user',
            lastName : 'name',
            email : 'user@mail.com',
            password : '123456',         
        }
    
        //excecute
        request(app) 
        .post('/artists/register')
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
            expect(res.body).toEqual({
                username : expect.any(String),
                firstName : expect.any(String),
                lastName : expect.any(String),
                email : expect.any(String)
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
        }
    
        //excecute
        request(app) 
        .post('/artists/register')
        .send(body)
        .end((err, res) => {
            if(err) done(err)
                    
            //assert
            expect(res.statusCode).toEqual(400)
            expect(typeof res.body).toEqual('object')
            expect(res.body).toHaveProperty('message')

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
        }
    
        //excecute
        request(app) 
        .post('/artists/register')
        .send(body)
        .end((err, res) => {
            if(err) done(err)
                    
            //assert
            expect(res.statusCode).toEqual(400)
            expect(typeof res.body).toEqual('object')
            expect(res.body).toHaveProperty('message')

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
        }
    
        //excecute
        request(app) 
        .post('/artists/register')
        .send(body)
        .end((err, res) => {
            if(err) done(err)
                    
            //assert
            expect(res.statusCode).toEqual(400)
            expect(typeof res.body).toEqual('object')
            expect(res.body).toHaveProperty('message')

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
        }
    
        //excecute
        request(app) 
        .post('/artists/register')
        .send(body)
        .end((err, res) => {
            if(err) done(err)
                    
            //assert
            expect(res.statusCode).toEqual(400)
            expect(typeof res.body).toEqual('object')
            expect(res.body).toHaveProperty('message')

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
        }
    
        //excecute
        request(app) 
        .post('/artists/register')
        .send(body)
        .end((err, res) => {
            if(err) done(err)
                    
            //assert
            expect(res.statusCode).toEqual(400)
            expect(typeof res.body).toEqual('object')
            expect(res.body).toHaveProperty('message')

            done()
        })
    })

    // ====================== password diisi kosong ===========================
    it('should status 400, error input password empty / null' ,function (done) {
        //setup
        const body = {
            username : 'username',
            firstName : 'user',
            lastName : '',
            email : 'user@mail.com',
            password : '',         
        }
    
        //excecute
        request(app) 
        .post('/artists/register')
        .send(body)
        .end((err, res) => {
            if(err) done(err)
                    
            //assert
            expect(res.statusCode).toEqual(400)
            expect(typeof res.body).toEqual('object')
            expect(res.body).toHaveProperty('message')

            done()
        })
    })
})

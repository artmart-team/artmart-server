// decribe PATCH /users/:userId -- edit username or email or password
// -- it success
// -- it edit first name empty
// -- it edit last name empty
// -- it edit error username empty
// -- it edit error email empty
// -- it edit error email not email format
// -- it edit password empty

const request = require('supertest')

const { Artist } = require('../models')

const app = require('../app.js')

const { beforeAll, afterAll } = require("@jest/globals")



// ==================================================================================
// POST /users/:userId
// ==================================================================================

describe('PATCH /artists/:userId',function() {
    let artistId 

    beforeAll(done => {
        Artist.create({
            username : 'username',
            firstName : 'user',
            lastName : 'name',
            email : 'user@mail.com',
            password : '123456',  
        })
        .then(data => {
            artistId = data.id
            done()
        })
        .catch(err => {
            console.log(err, '<< err create for patch artist test')
        })
    })

    afterAll(done => {
        Artist.delete()
        .then(() => {
            done()
        })
        .catch(err => {
            console.log(err, "<< err delete for patch artist test")
        })
    })
    
    // ======================== successfull login ==========================
    it('should status 200, successfull update user' ,function (done) {
        //setup
        const body = {
            username : 'username',      
        }
    
        //excecute
        request(app) 
        .patch(`/users/${artistId}`)
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
        }
    
        //excecute
        request(app) 
        .patch(`/users/${artistId}`)
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
            firstName : '',      
        }
    
        //excecute
        request(app) 
        .patch(`/users/${artistId}`)
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
            lastName : '', 
        }
    
        //excecute
        request(app) 
        .patch(`/users/${artistId}`)
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
            email : 'user'       
        }
    
        //excecute
        request(app) 
        .patch(`/users/${artistId}`)
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
            email : ''
        }
    
        //excecute
        request(app) 
        .patch(`/users/${artistId}`)
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
            password : ''      
        }
    
        //excecute
        request(app) 
        .patch(`/users/${artistId}`)
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

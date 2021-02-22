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

// const { User } = require('../../models')

const app = require ('../../app')  


// ===================================================================================
// POST /users/register
// ==================================================================================

describe('POST /users/register',function() {

    // ======================== successfull register ==========================
    it('should status 201, successfull created user' ,function (done) {
        //setup
        const body = {
            username : 'testUser',
            firstName : 'test',
            lastName : 'user',
            email : 'testingforuser@mail.com',
            password : '123456'        
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
            expect(typeof res.body.username).toEqual('string')
            expect(typeof res.body.firstName).toEqual('string')
            expect(typeof res.body.lastName).toEqual('string')
            expect(typeof res.body.email).toEqual('string')
            expect(typeof res.body.profilePicture).toEqual('string')

            done()
        })
    })

    // ==========================  username diisi kosong  ===============================
    it('should status 400, error input username empty / null' ,function (done) {
        //setup
        const body = {
            username : '',
            firstName : 'test',
            lastName : 'user',
            email : 'testingforuser@mail.com',
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
            // expect(typeof res.body.messages).toEqual('string')

            done()
        })
    })


    // ====================== firstname diisi kosong ===========================
    it('should status 400, error input firstname empty / null' ,function (done) {
        //setup
        const body = {
            username : 'testUser',
            firstName : '',
            lastName : 'user',
            email : 'testingforuser@mail.com',
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
            // expect(typeof res.body.messages).toEqual('string')

            done()
        })
    })


    // ====================== lastname diisi kosong ===========================
    it('should status 400, error input lastname empty / null' ,function (done) {
        //setup
        const body = {
            username : 'testUser',
            firstName : 'test',
            lastName : '',
            email : 'testingforuser@mail.com',
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
            // expect(typeof res.body.messages).toEqual('string')

            done()
        })
    })

    // ====================== email tidak sesuai format ===========================
    it('should status 400, error input email format' ,function (done) {
        //setup
        const body = {
            username : 'testUser',
            firstName : 'test',
            lastName : 'user',
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
            // expect(typeof res.body.messages).toEqual('string')

            done()
        })
    })

    // ====================== email diisi kosong ===========================
    it('should status 400, error input email empty / null' ,function (done) {
        //setup
        const body = {
            username : 'testUser',
            firstName : 'test',
            lastName : 'user',
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
            // expect(typeof res.body.messages).toEqual('string')

            done()
        })
    })

    // ====================== password diisi kosong ===========================
    it('should status 400, error input password empty / null' ,function (done) {
        //setup
        const body = {
            username : 'testUser',
            firstName : 'test',
            lastName : 'user',
            email : 'testingforuser@mail.com',
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
            // expect(typeof res.body.messages).toEqual('string')

            done()
        })
    })

        // ====================== error internal server ===========================
        it('should status 500, error internal server' ,function (done) {
            //setup
            const body = {
                ssss : 'testUser',
                sssssss : 'test',
                ssssdsd : 'user',
                asdsadasd : 'testingforuser@mail.com',
                asdsadasdas : '',
                adsadasds : "link.google.com"         
            }
        
            //excecute
            request(app) 
            .post('/users/register')
            .send(body)
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

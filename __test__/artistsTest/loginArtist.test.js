
// DONE REVISION AFISTA 19-02-2021 18.00

// 6 testing -> 2 success test,  4 error test

// describe POST /artists/login  
// -- it success
// -- it error email / password empty
// -- it error id not found
// -- it error email and password error

const request = require('supertest')

// const { Artist } = require('../../models')

const app = require ('../../app') 

// ===================================================================================
// POST /artists/login
// ==================================================================================

describe('POST /artists/login',function() {
    
    // ======================== successfull login with usernmae ==========================
    it('should status 200, successfull login with username' ,function (done) {
        //setup
        const body = {
            username : 'testing',
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
            email : 'testing@mail.com',
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
            username : 'testinggggggg@mail.com',
            password : '123456',         
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
            expect(res.body).toHaveProperty('errors')
            expect(typeof res.body.errors).toBe('string')

            done()
        })
    })


    // ==========================  error in password  ===============================
    it('should status 400, invalid for password / not found in database' ,function (done) {
        //setup
        const body = {
            email : 'testing@mail.com',
            password : '12345678910',         
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
            expect(res.body).toHaveProperty('errors')
            expect(typeof res.body.errors).toBe('string')

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
        .post('/artists/login')
        .send(body)
        .end((err, res) => {
            if(err) done(err)
                    
            //assert
            expect(res.statusCode).toEqual(400)
            expect(typeof res.body).toEqual('object')
            expect(res.body).toHaveProperty('errors')
            expect(typeof res.body.errors).toBe('string')

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
            expect(typeof res.body.message).toEqual('string')

            done()
        })
    })
})
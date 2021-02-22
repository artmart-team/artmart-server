
// DONE REVISION AFISTA 19-02-2021 18.00

// 7 testing, 1 success test, 6 error test 


// decribe PATCH /users/:userId -- edit username or email or password
// -- it success
// -- it edit first name empty
// -- it edit last name empty
// -- it edit error username empty
// -- it edit error email empty
// -- it edit error email not email format
// -- it edit password empty

const axios = require('axios')

const request = require('supertest')

const { Artist } = require('../../models')

const { generateToken } = require('../../helpers/jwt')

const app = require ('../../app')

// masih error , before all tidak bisa login axios

// ==================================================================================
// PUT /artists/:artistId
// ==================================================================================

describe('PUT /artists/:artistId',function () {
    let artistId =  3
    let access_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwidXNlcm5hbWUiOiJ0ZXN0QXJ0aXN0IiwicHJvZmlsZVBpY3R1cmUiOiJsaW5rLmdvb2dsZS5jb20iLCJpYXQiOjE2MTM5MTI4NTR9.Y7XNvktMRcJnHr31BCEGqG9PQMmY8roSic85FynLMps"

    beforeAll(done => {
        //dummy artist login
        const data = {
            email : 'testingedit@mail.com',
            password : '123456'
        }

        axios.post('artists/login', data)
        .then(response => {
            console.log(response)
            done()
        })
        .catch(err => {
            console.log(err)
        })
    })
    
    // ======================== successfull login ==========================
    it('should status 200, successfull update artist' ,function (done) {
        //setup
        const body = {
            username : 'usernamesss',      
        }
    
        //excecute
        request(app) 
        .put(`/artists/${artistId}`)
        .set('access_token', access_token)
        .send(body)
        .end((err, res) => {
            if(err) done(err)
                    
            //assert
            expect(res.statusCode).toEqual(200)
            expect(typeof res.body).toEqual('object')
            expect(res.body).toHaveProperty('username')
            expect(res.body).toHaveProperty('firstName')
            expect(res.body).toHaveProperty('lastName')
            expect(res.body).toHaveProperty('email')
            expect(res.body).toHaveProperty('profilePicture')
            expect(typeof res.body.username).toHaveProperty('string')
            expect(typeof res.body.firstName).toHaveProperty('string')
            expect(typeof res.body.lastName).toHaveProperty('string')
            expect(typeof res.body.email).toHaveProperty('string')
            expect(typeof res.body.profilePicture).toHaveProperty('string')

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
        .put(`/artists/${artistId}`)
        .set('access_token', access_token)
        .send(body)
        .end((err, res) => {
            if(err) done(err)
                    
            //assert
            expect(res.statusCode).toEqual(403)
            expect(typeof res.body).toEqual('object')
            expect(res.body).toHaveProperty('messages')
            expect(typeof res.body.messages).toEqual('string')

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
        .put(`/artists/${artistId}`)
        .set('access_token', access_token)
        .send(body)
        .end((err, res) => {
            if(err) done(err)
                    
            //assert
            expect(res.statusCode).toEqual(403)
            expect(typeof res.body).toEqual('object')
            expect(res.body).toHaveProperty('messages')
            expect(typeof res.body.messages).toEqual('string')

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
        .put(`/artists/${artistId}`)
        .set('access_token', access_token)
        .send(body)
        .end((err, res) => {
            if(err) done(err)
                    
            //assert
            expect(res.statusCode).toEqual(403)
            expect(typeof res.body).toEqual('object')
            expect(res.body).toHaveProperty('messages')
            expect(typeof res.body.messages).toEqual('string')

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
        .put(`/artists/${artistId}`)
        .set('access_token', access_token)
        .send(body)
        .end((err, res) => {
            if(err) done(err)
                    
            //assert
            expect(res.statusCode).toEqual(403)
            expect(typeof res.body).toEqual('object')
            expect(res.body).toHaveProperty('messages')
            expect(typeof res.body.messages).toEqual('string')

            done()
        })
    })

    // ====================== email diisi kosong ===========================
    it('should status 401, error input email empty / null' ,function (done) {
        //setup
        const body = {
            email : ''
        }
    
        //excecute
        request(app) 
        .put(`/artists/${artistId}`)
        .set('access_token', access_token)
        .send(body)
        .end((err, res) => {
            if(err) done(err)
                    
            //assert
            expect(res.statusCode).toEqual(403)
            expect(typeof res.body).toEqual('object')
            expect(res.body).toHaveProperty('messages')
            expect(typeof res.body.messages).toEqual('string')

            done()
        })
    })

    // ====================== notLogin users ===========================
    it('should status 401, error input password empty / null' ,function (done) {
        //setup
        const body = {
            username : "userrrrs"      
        }
    
        //excecute
        request(app) 
        .put(`/artists/${artistId}`)
        .send(body)
        .end((err, res) => {
            if(err) done(err)
                    
            //assert
            expect(res.statusCode).toEqual(401)
            expect(typeof res.body).toEqual('object')
            expect(res.body).toHaveProperty('messages')
            expect(typeof res.body.messages).toEqual('string')

            done()
        })
    })


        // ====================== error internal server ===========================
        it('should status 500, error internal server' ,function (done) {
            //setup
            const body = {
                sssssss : ''
            }
        
            //excecute
            request(app) 
            .put(`/artists/${artistId}`)
            .set('access_token', access_token)
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


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

const request = require('supertest')

const { Artist } = require('../../models')

const { generateToken } = require('../../helpers/jwt')

const { beforeAll, afterAll } = require("@jest/globals")

const app = require ('../../app')

// ==================================================================================
// PUT /artists/:artistId
// ==================================================================================

describe('PUT /artists/:artistId',function() {
    let artistId
    let access_token 

    beforeAll(done => {
        // dummy creating user 
        Artist.create({
            username : 'username',
            firstName : 'user',
            lastName : 'name',
            email : 'user@mail.com',
            password : '123456',
            profilePicture  : "link.google.com",
            bankAccount : 230230230,
            completeDuration : 48
        })
        .then(data => {
            userId = data.id

        })
        .catch(err => {
            console.log(err, '<< err beforeAll register putArtists.test.js')
        })

        //dummy user login
        Artist.findOne({ where : { email : "user@mail.com"}})
        .then(artis => {
            const payload = {
                id : artis.id,
                usernmae : artis.username
            }

            access_token = generateToken(payload)

            done()
        })
        .catch(err => {
            console.log(err, "<< err beforeAll get token putArtists.test.js")
        })
    })

    afterAll(done => {
        Artist.destroy()
        .then(() => {
            done()
        })
        .catch(err => {
            console.log(err, "<< err afterAll putArtists.test.js")
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
        .patch(`/artists/${artistId}`)
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
        .patch(`/artists/${artistId}`)
        .set('access_token', access_token)
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
        .patch(`/artists/${artistId}`)
        .set('access_token', access_token)
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
        .patch(`/artists/${artistId}`)
        .set('access_token', access_token)
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
        .patch(`/artists/${artistId}`)
        .set('access_token', access_token)
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
        .patch(`/artists/${artistId}`)
        .set('access_token', access_token)
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

    // ====================== notLogin users ===========================
    it('should status 403, error input password empty / null' ,function (done) {
        //setup
        const body = {
            username : "userrrrs"      
        }
    
        //excecute
        request(app) 
        .patch(`/artists/${artistId}`)
        .send(body)
        .end((err, res) => {
            if(err) done(err)
                    
            //assert
            expect(res.statusCode).toEqual(403)
            expect(typeof res.body).toEqual('object')
            expect(res.body).toHaveProperty('message')
            expect(typeof res.body.message).toHaveProperty('string')

            done()
        })
    })
})

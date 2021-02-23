
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

const { User } = require('../../models')

const { generateToken } = require('../../helpers/jwt')

const { beforeAll, afterAll } = require("@jest/globals")

const app = require ('../../app')


// ==================================================================================
// PUT /users/:userId
// ==================================================================================

describe('PUT /users/:userId',function() {
    let userId = null
    let access_token = null

    beforeAll(done => {
        User.create({
            username : "artistTestingPut",
            firstName : "artist",
            lastName : "idsearch",
            email : "artistTestingPut@mail.com",
            password : '123456',
            profilePicture : "link.google.com"
        })
        .then(data => {
            return User.findOne({ where : { username : "artistTestingPut"}})
        })
        .then(response => {
            userId = response.id

            let payload = {
                id : response.id,
                username : response.username,
                profilePicture : response.profilePicture
            }

            access_token = generateToken(payload)

            done()
        })
    })

    afterAll(done => {
        User.destroy({ where : {username : "artistTestingPut"}})
        .then(() => {
            done()
        })
    })
    
    // ======================== successfull login ==========================
    it('should status 200, successfull update user' ,function (done) {
        //setup
        const body = {
            username : 'editberhasilusername',
            firstName : "yessss",
            lastName : "berhasil",
            email : "berhasiledit@mail.com",
            profilePicture : "link2.google.com"      
        }
    
        //excecute
        request(app) 
        .put(`/users/${userId}`)
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
            expect(typeof res.body.username).toEqual('string')
            expect(typeof res.body.firstName).toEqual('string')
            expect(typeof res.body.lastName).toEqual('string')
            expect(typeof res.body.email).toEqual('string')

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
        .put(`/users/${userId}`)
        .set('access_token', access_token)
        .send(body)
        .end((err, res) => {
            if(err) done(err)
                    
            //assert
            expect(res.statusCode).toEqual(403)
            expect(typeof res.body).toEqual('object')
            expect(res.body).toHaveProperty('message')
            expect(typeof res.body.message).toEqual('string')

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
        .put(`/users/${userId}`)
        .set('access_token', access_token)
        .send(body)
        .end((err, res) => {
            if(err) done(err)
                    
            //assert
            expect(res.statusCode).toEqual(403)
            expect(typeof res.body).toEqual('object')
            expect(res.body).toHaveProperty('message')
            expect(typeof res.body.message).toEqual('string')

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
        .put(`/users/${userId}`)
        .set('access_token', access_token)
        .send(body)
        .end((err, res) => {
            if(err) done(err)
                    
            //assert
            expect(res.statusCode).toEqual(403)
            expect(typeof res.body).toEqual('object')
            expect(res.body).toHaveProperty('message')
            expect(typeof res.body.message).toEqual('string')

            done()
        })
    })

    // ====================== email tidak sesuai format ===========================
    it('should status 401, error input email format' ,function (done) {
        //setup
        const body = {
            email : 'user'       
        }
    
        //excecute
        request(app) 
        .put(`/users/${userId}`)
        .set('access_token', access_token)
        .send(body)
        .end((err, res) => {
            if(err) done(err)
                    
            //assert
            expect(res.statusCode).toEqual(403)
            expect(typeof res.body).toEqual('object')
            expect(res.body).toHaveProperty('message')
            expect(typeof res.body.message).toEqual('string')

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
        .put(`/users/${userId}`)
        .set('access_token', access_token)
        .send(body)
        .end((err, res) => {
            if(err) done(err)
                    
            //assert
            expect(res.statusCode).toEqual(403)
            expect(typeof res.body).toEqual('object')
            expect(res.body).toHaveProperty('message')
            expect(typeof res.body.message).toEqual('string')

            done()
        })
    })

    // ====================== notLogin users ===========================
    it('should status 403, not login user' ,function (done) {
        //setup
        const body = {
            username : "userrrrs"      
        }
    
        //excecute
        request(app) 
        .put(`/users/${userId}`)
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

    // ====================== error auth user edit ===========================
    it('should status 401, error auth' ,function (done) {
        //setup
        const body = {
            firstName : 'asikdeh',      
        }
    
        //excecute
        request(app) 
        .put(`/users/2`)
        .set('access_token', access_token)
        .send(body)
        .end((err, res) => {
            if(err) done(err)
                    
            //assert
            expect(res.statusCode).toEqual(403)
            expect(typeof res.body).toEqual('object')
            expect(res.body).toHaveProperty('message')
            expect(typeof res.body.message).toEqual('string')

            done()
        })
    })


    // ==========================  error internal server ===============================
    // it('should status 500, error internal server' ,function (done) {
    //     //setup
    //     const body = {
    //         ssssss : '',      
    //     }
    
    //     //excecute
    //     request(app) 
    //     .put(`/users/${userId}`)
    //     .set('access_token', access_token)
    //     .send(body)
    //     .end((err, res) => {
    //         if(err) done(err)
                    
    //         //assert
    //         expect(res.statusCode).toEqual(500)
    //         expect(typeof res.body).toEqual('object')
    //         expect(res.body).toHaveProperty('messages')
    //         expect(typeof res.body.messages).toEqual('string')

    //         done()
    //     })
    // })
})

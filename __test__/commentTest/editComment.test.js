// decribe PATCH /artists/:artistId/comments/:commentId   // updating title commnet or desciption
// -- it success 
// -- it error description empty
// -- it comment id not found
// -- it error not login user

const request = require('supertest')
const { User } = require('../../models')
const { beforeAll } = require("@jest/globals")
const app = require('../../app')  
const { generateToken } = require('../../helpers/jwt')

// ===================================================================================
// ==========================  PUT /users/:userId/comments/:commentId
// ==================================================================================

describe('PUT /users/:userId/comments/:commentId',function() {
    let userId = null 
    let access_token = null
    let commentId = 2
    let artistId = 1

    beforeAll(done => {
        User.findOne({where : {email : "user@mail.com"}})
        .then(data => {
            userId = data.id

            const decoded = {
                id : data.id,
                username : data.username,
                profilePicture : data.profilePicture
            }
            
            access_token = generateToken(decoded)
            done()
        })
        .catch(err => {
            console.log(err)
        })

    })

    // ======================== successfull edit comments ==========================
    it('should status 200, successfull edit COmment' ,function (done) {
        //setup
        const body = {
            description : "edit berhasil"
        }

        //excecute
        request(app) 
        .put(`/users/${userId}/artists/${artistId}/comments/${commentId}`)
        .set('access_token', access_token)
        .send(body)
        .end((err, res) => {
            if(err) done(err)
                    
            //assert
            expect(res.statusCode).toEqual(200)
            expect(typeof res.body).toEqual('object')
            expect(res.body).toHaveProperty('description')
            expect(typeof res.body.description).toEqual('string')

            done()
        })
    })


    // ======================== error Desc comments epmty ==========================
    it('should status 400, error Desc comment empty' ,function (done) {
        //setup
        const body = {
            description : ""
        }

        //excecute
        request(app) 
        .put(`/users/${userId}/artists/${artistId}/comments/${commentId}`)
        .set('access_token', access_token)
        .send(body)
        .end((err, res) => {
            if(err) done(err)
                    
            //assert
            expect(res.statusCode).toEqual(400)
            expect(typeof res.body).toEqual('object')
            expect(res.body).toHaveProperty('messages')
            expect(typeof res.body.messages).toEqual('string')

            done()
        })
    })


    // ======================== error comments id not found ==========================
    it('should status 404, error comment id not found' ,function (done) {
        //setup
        const id = 9999999

        const body = {
            description : 'tidak berhasil edit'
        }

        //excecute
        request(app) 
        .put(`/users/${userId}/artists/${artistId}/comments/${id}`)
        .set('access_token', access_token)
        .send(body)
        .end((err, res) => {
            if(err) done(err)
                    
            //assert
            expect(res.statusCode).toEqual(404)
            expect(typeof res.body).toEqual('object')
            // expect(res.body).toHaveProperty('messages')
            // expect(typeof res.body.messages).toEqual('string')

            done()
        })
    })


    // ======================== error user not login ==========================
    it('should status 403, error edit user not login' ,function (done) {
        //setup
        const body = {
            description : "tidak berhasil edit"
        }

        //excecute
        request(app) 
        .put(`/users/${userId}/artists/${artistId}/comments/${commentId}`)
        .send(body)
        .end((err, res) => {
            if(err) done(err)
                    
            //assert
            expect(res.statusCode).toEqual(403)
            expect (typeof res.body).toEqual('object')
            expect(res.body).toHaveProperty('messages')
            expect(typeof res.body.messages).toEqual('string')

            done()
        })
    })


    // ======================== error internal server ==========================
    it('should status 500, error internal server' ,function (done) {
        //setup
        const body = {
            ssssss : "sadads"
        }

        //excecute
        request(app) 
        .put(`/users/${userId}/artists/${artistId}/comments/${commentId}`)
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
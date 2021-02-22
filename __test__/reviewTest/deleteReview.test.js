// describe DELETE /artists/:artistId/reviews/:reviewId
// -- it success
// -- it error ratings id not found
// -- it error not login user


const request = require('supertest')
const { User } = require('../../models')
const { beforeAll } = require("@jest/globals")
const app = require('../../app')  
const { generateToken } = require('../../helpers/jwt')

// ===================================================================================
// ==========================  DELETE /users/:userId/reviews/:reviewId
// ==================================================================================

describe('DELETE /users/:userId/reviews/:reviewId',function() {
    let userId = null
    let access_token = null
    let reviewId = 2
    let revDel = 5  
    let artistId = 1

    beforeAll(done => {
        User.findOne({where : {email : "user@mail.com"}})
        .then(data => {
            userId = data.id

            const payload = {
                id : data.id,
                username : data.username,
                profilePicture : data.profilePicture
            }

            access_token = generateToken(payload)
            done()
        })
        .catch(err => {
            console.log(err)
        })

    })


    // ======================== error reviews id not found ==========================
    it('should status 500, error reviews id not found' ,function (done) {
        //setup
        const id = 9999999

        //excecute
        request(app) 
        .delete(`/users/${userId}/artists/${artistId}/reviews/${id}`)
        .set('access_token', access_token)
        .end((err, res) => {
            if(err) done(err)
                    
            //assert
            expect(res.statusCode).toEqual(500)
            expect(typeof res.body).toEqual('object')
            // expect(res.body).toHaveProperty('messages')
            // expect(typeof res.body.messages).toEqual('string')

            done()
        })
    })


    // ======================== error user not login ==========================
    it('should status 403, error edit user not login' ,function (done) {
        //setup

        //excecute
        request(app) 
        .delete(`/users/${userId}/artists/${artistId}/reviews/${revDel}`)
        .end((err, res) => {
            if(err) done(err)
                    
            //assert
            expect(res.statusCode).toEqual(401)
            expect (typeof res.body).toEqual('object')
            expect(res.body).toHaveProperty('messages')
            expect(typeof res.body.messages).toEqual('string')

            done()
        })
    })


    // ======================== error internal server ==========================
    it('should status 500, errorinternal server' ,function (done) {
        //setup
        const id = "asdasdadadsd"

        //excecute
        request(app) 
        .delete(`/users/${userId}/artists/${artistId}/reviews/${id}`)
        .set('access_token', access_token)
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

    // ======================== successfull delete reviews ==========================
    it('should status 200, successfull delete reviews' ,function (done) {
        //setup

        //excecute
        request(app) 
        .delete(`/users/${userId}/artists/${artistId}/reviews/${reviewId}`)
        .set('access_token', access_token)
        .end((err, res) => {
            if(err) done(err)
                    
            //assert
            expect(res.statusCode).toEqual(200)
            expect(typeof res.body).toEqual('object')
            expect(res.body).toHaveProperty('messages')
            expect(typeof res.body.messages).toEqual('string')

            done()
        })
    })
})
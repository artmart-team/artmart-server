// describe DELETE /artists/:artistId/reviews/:reviewId
// -- it success
// -- it error ratings id not found
// -- it error not login user


const request = require('supertest')
const { User, Review } = require('../../models')
const { beforeAll } = require("@jest/globals")
const app = require('../../app')  

// ===================================================================================
// ==========================  DELETE /users/:userId/reviews/:reviewId
// ==================================================================================

describe('DELETE /users/:userId/reviews/:reviewId',function() {
    let userId
    let reviewId

    beforeAll(done => {
        User.findOne({where : {email : "user@mail.com"}})
        .then(data => {
            userId = data.id
        })
        .catch(err => {
            console.log(err)
        })

        Review.findOne({where : {title : "buat test delete review"}})
        .then(data => {
            reviewId = data.id

            if(userId && reviewId) {
                done()
            }
        })
        .catch(err => {
            console.log(err)
        })
    })


    // ======================== error reviews id not found ==========================
    it('should status 404, error reviews id not found' ,function (done) {
        //setup
        const id = 9999999

        //excecute
        request(app) 
        .delete(`/users/${userId}/reviews/${id}`)
        .set('access_token', access_token)
        .end((err, res) => {
            if(err) done(err)
                    
            //assert
            expect(res.statusCode).toEqual(404)
            expect(typeof res.body).toEqual('Object')
            expect(res.body).toHaveProperty('message')
            expect(res.body).toEqual({
                message : expect.any(String),
            })
            done()
        })
    })


    // ======================== error user not login ==========================
    it('should status 403, error edit user not login' ,function (done) {
        //setup

        //excecute
        request(app) 
        .delete(`/users/${userId}/reviews/${reviewId}`)
        .end((err, res) => {
            if(err) done(err)
                    
            //assert
            expect(res.statusCode).toEqual(403)
            expect (typeof res.body).toEqual('object')
            expect(res.body).toHaveProperty('message')
            expect(typeof res.body.message).toEqual('string')

            done()
        })
    })

    // ======================== successfull delete reviews ==========================
    it('should status 200, successfull delete reviews' ,function (done) {
        //setup

        //excecute
        request(app) 
        .delete(`/users/${userId}/reviews/${reviewId}`)
        .set('access_token', access_token)
        .end((err, res) => {
            if(err) done(err)
                    
            //assert
            expect(res.statusCode).toEqual(200)
            expect(typeof res.body).toEqual('object')
            expect(res.body).toHaveProperty('message')
            expect(typeof res.body.message).toEqual('string')

            done()
        })
    })
})
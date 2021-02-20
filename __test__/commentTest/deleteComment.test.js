// describe DELETE /artists/:artistId/comments/:commentId
// -- it success
// -- it error comment id not found
// -- it error not login user

const request = require('supertest')
const { User, Comment } = require('../../models')
const { beforeAll } = require("@jest/globals")
const app = require('../../app')  

// ===================================================================================
// ==========================  DELETE /users/:userId/comments/:commentId
// ==================================================================================

describe('DELETE /users/:userId/comments/:commentId',function() {
    let userId
    let commentId

    beforeAll(done => {
        User.findOne({where : {email : "user@mail.com"}})
        .then(data => {
            userId = data.id
        })
        .catch(err => {
            console.log(err)
        })

        Comment.findOne({where : {description : "buat test delete comment"}})
        .then(data => {
            commentId = data.id

            if(userId && commentId) {
                done()
            }
        })
        .catch(err => {
            console.log(err)
        })
    })


    // ======================== error comments id not found ==========================
    it('should status 404, error comment id not found' ,function (done) {
        //setup
        const id = 9999999

        //excecute
        request(app) 
        .delete(`/artists/${userId}/comments/${id}`)
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
        .delete(`/artists/${userId}/comments/${commentId}`)
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

    // ======================== successfull delete comments ==========================
    it('should status 200, successfull delete COmment' ,function (done) {
        //setup

        //excecute
        request(app) 
        .delete(`/users/${userId}/comments/${commentId}`)
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
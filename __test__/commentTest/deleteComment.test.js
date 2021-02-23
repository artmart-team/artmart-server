// describe DELETE /artists/:artistId/comments/:commentId
// -- it success
// -- it error comment id not found
// -- it error not login user

const request = require('supertest')
const { User, Artist, Comment } = require('../../models')
const { beforeAll } = require("@jest/globals")
const app = require('../../app')  
const { generateToken } = require('../../helpers/jwt')

// ===================================================================================
// ==========================  DELETE /users/:userId/comments/:commentId
// ==================================================================================

describe('DELETE /users/:userId/comments/:commentId',function() {
    let artistId = null
    let userId = null
    let commentId = null
    let access_token = null

    beforeAll(done => {
        User.create({ 
            username : "userCommentDelete",
            firstName : "artist",
            lastName : "idsearch",
            email : "userCommentDelete@mail.com",
            password : '123456',
            profilePicture : ""
        })
        .then(data => {
            userId = data.id

            const payload = {
                id : data.id,
                username : data.username,
                profilePicture : data.profilePicture
            }

            access_token = generateToken(payload)

            return Artist.create({
                username : "artistCommentDelete",
                firstName : "artist",
                lastName : "idsearch",
                email : "artistCommentDelete@mail.com",
                password : '123456',
                profilePicture : "link.google.com",
                completeDuration : 48,
                bankAccount : 230230230,
                defaultPrice : 100000
            })
        })
        .then(datas => {
            artistId = datas.id
            return Comment.create({
                description: "testingDeleteComment",
                UserId: userId,
                ArtistId: artistId
            })
        })
        .then(res => {
            commentId = res.id
            done()
        })
    })

    // ======================== error comments id not found ==========================
    it('should status 404, error comment id not found' ,function (done) {
        //setup
        const id = 9999999

        //excecute
        request(app) 
        .delete(`/users/${userId}/artists/${artistId}/comments/${id}`)
        .set('access_token', access_token)
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

        //excecute
        request(app) 
        .delete(`/users/${userId}/artists/${artistId}/comments/${commentId}`)
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
    // it('should status 500, error comment id not found' ,function (done) {
    //     //setup
    //     const id = "sekat error"
    
    //     //excecute
    //     request(app) 
    //     .delete(`/artists/${userId}/artists/${artistId}/comments/${id}`)
    //     .set('access_token', access_token)
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

    // ======================== successfull delete comments ==========================
    it('should status 200, successfull delete COmment' ,function (done) {
        //setup

        //excecute
        request(app) 
        .delete(`/users/${userId}/artists/${artistId}/comments/${commentId}`)
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
// describe DELETE /artists/:artistId/reviews/:reviewId
// -- it success
// -- it error ratings id not found
// -- it error not login user


const request = require('supertest')
const { User, Artist,Review } = require('../../models')
const { beforeAll } = require("@jest/globals")
const app = require('../../app')  
const { generateToken } = require('../../helpers/jwt')

// ===================================================================================
// ==========================  DELETE /users/:userId/reviews/:reviewId
// ==================================================================================

describe('DELETE /users/:userId/reviews/:reviewId',function() {
    let userId = null
    let access_token = null
    let reviewId = null
    let artistId = null

    beforeAll(done => {
        User.create({ 
            username : "deleteReviewByUser",
            firstName : "users",
            lastName : "idsearch",
            email : "deleteReviewByUser@mail.com",
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
                username : "deleteReviewByArtist",
                firstName : "artist",
                lastName : "idsearch",
                email : "deleteReviewByArtist@mail.com",
                password : '123456',
                profilePicture : "link.google.com",
                completeDuration : 48,
                bankAccount : 230230230,
                defaultPrice : 100000
            })
        })
        .then(datas => {
            artistId = datas.id

            return Review.create({
                title : "deleteReviewForTesting",
                description : "deleteReviewForTesting",
                UserId : userId,
                ArtistId : artistId
            })
        })
        .then(res => {
            reviewId = res.id
            done()
        })
    })

    // ======================== error reviews id not found ==========================
    it('should status 500, error reviews id not found' ,function (done) {
        //setup
        const id = 99

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
        const id = "asd"

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
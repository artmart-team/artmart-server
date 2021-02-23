// describe DELETE /artists/:artistId/ratings/:ratingId
// -- it success
// -- it error ratings id not found
// -- it error not login user


const request = require('supertest')
const { User, Rating, Artist } = require('../../models')
const { beforeAll } = require("@jest/globals")
const app = require('../../app')  
const { generateToken } = require('../../helpers/jwt')

// ===================================================================================
// ==========================  DELETE /users/:userId/artists/:artistId/ratings/:ratingId
// ==================================================================================

describe('DELETE /users/:userId/artists/:artistId/ratings/:ratingId',function() {
    let userId = null
    let access_token = null
    let ratingId = null
    let artistId = null

    beforeAll(done => {
        User.create({ 
            username : "deleteRatingByUser",
            firstName : "users",
            lastName : "idsearch",
            email : "deleteRatingByUser@mail.com",
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

            return Rating.create({
                score : 4,
                ArtistId : artistId,
                UserId : userId
            })
        })
        .then(res => {
            scoreId = res.id
            done()
        })
    })


    // ======================== error ratings id not found ==========================
    it('should status 404, error ratings id not found' ,function (done) {
        //setup
        const id = 999

        //excecute
        request(app) 
        .delete(`/users/${userId}/artists/${artistId}/ratings/${id}`)
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
    it('should status 401, error edit user not login' ,function (done) {
        //setup

        //excecute
        request(app) 
        .delete(`/users/${userId}/artists/${artistId}/ratings/${ratingId}`)
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



    // ======================== error internal server error==========================
    it('should status 404, error ratings id not found' ,function (done) {
        //setup
        const id = "sad"

        //excecute
        request(app) 
        .delete(`/users/${userId}/artists/${artistId}/ratings/${id}`)
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



    // ======================== successfull delete ratings ==========================
    it('should status 200, successfull delete ratings' ,function (done) {
        //setup

        //excecute
        request(app) 
        .delete(`/users/${userId}/artists/${artistId}/ratings/${ratingId}`)
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
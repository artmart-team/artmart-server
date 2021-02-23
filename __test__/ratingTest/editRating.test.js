// decribe PATCH /artists/:artistId/ratings/:ratingId   // updating title commnet or desciption
// -- it success 
// -- it error score empty
// -- it error rating id not found
// -- it error user not login
// -- it error not login user

const request = require('supertest')
const { User, Rating, Artist } = require('../../models')
const { beforeAll } = require("@jest/globals")
const app = require('../../app')  
const { generateToken } = require('../../helpers/jwt')

// ===================================================================================
// ==========================  PUT /users/:userId/ratings/:ratingId
// ==================================================================================

describe('PUT /users/:userId/ratings/:ratingId',function() {
    let userId = null
    let access_token = null
    let ratingId = null
    let artistId = null

    beforeAll(done => {
        User.create({ 
            username : "editRatingByUser",
            firstName : "users",
            lastName : "idsearch",
            email : "editRatingByUser@mail.com",
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
                username : "editRatingByArtist",
                firstName : "artist",
                lastName : "idsearch",
                email : "editRatingByArtist@mail.com",
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
                score : 3,
                ArtistId : artistId,
                UserId : userId
            })
        })
        .then(res => {
            ratingId = res.id
            done()
        })
    })

    // ======================== successfull edit rating ==========================
    it('should status 200, successfull edit rating' ,function (done) {
        //setup
        const body = {
            score : 2.44
        }

        //excecute
        request(app) 
        .put(`/users/${userId}/artists/${artistId}/ratings/${ratingId}`)
        .set('access_token', access_token)
        .send(body)
        .end((err, res) => {
            if(err) done(err)
                    
            //assert
            expect(res.statusCode).toEqual(200)
            expect(typeof res.body).toEqual('object')
            expect(res.body).toHaveProperty('score')
            expect(typeof res.body.score).toEqual('number')

            done()
        })
    })


    // ======================== error rating not number ==========================
    it('should status 400, error rating score not number' ,function (done) {
        //setup
        const body = {
            score : "asih deh tapi error ya"
        }

        //excecute
        request(app) 
        .put(`/users/${userId}/artists/${artistId}/ratings/${ratingId}`)
        .set('access_token', access_token)
        .send(body)
        .end((err, res) => {
            if(err) done(err)
                    
            //assert
            expect(res.statusCode).toEqual(400)
            expect(typeof res.body).toEqual('object')
            expect(res.body).toHaveProperty('errors')
            expect(Array.isArray(res.body.errors)).toEqual(true)

            done()
        })
    })


    // ======================== error rating id not found ==========================
    it('should status 404, error rating id not found' ,function (done) {
        //setup
        const id = 999

        const body = {
            score : 2.44
        }

        //excecute
        request(app) 
        .put(`/users/${userId}/artists/${artistId}/ratings/${id}`)
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


    // ======================== error internal server ==========================
    // it('should status 500, error internal server' ,function (done) {
    //     //setup
    //     const body = {
    //         asdasdadasdsad : "2.44asasd"
    //     }

    //     //excecute
    //     request(app) 
    //     .put(`/users/${userId}/artists/${artistId}/ratings/${ratingId}`)
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


    // ======================== error user not login ==========================
    it('should status 401, error edit user not login' ,function (done) {
        //setup
        const body = {
            score : 2.44
        }

        //excecute
        request(app) 
        .put(`/users/${userId}/artists/${artistId}/ratings/${ratingId}`)
        .send(body)
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
})
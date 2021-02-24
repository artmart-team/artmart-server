// descibe GET /artists/:artistId/ratings/:ratingId
// -- it success
// -- it error rating id not found 

const request = require('supertest')
const { User, Rating, Artist } = require('../../models')
const { beforeAll } = require("@jest/globals")
const app = require('../../app')  
const { generateToken } = require('../../helpers/jwt')

// ===================================================================================
// ==========================  GET /users/:userId/ratings/:ratingId
// ==================================================================================

describe('GET /users/:userId/ratings/:ratingId',function() {
    let userId = null
    let access_token = null
    let ratingId = null
    let artistId = null

    beforeAll(done => {
        User.create({ 
            username : "getByIdRatingUser",
            firstName : "users",
            lastName : "idsearch",
            email : "getByIdRatingUser@mail.com",
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
                username : "getByIdRatingArtist",
                firstName : "artist",
                lastName : "idsearch",
                email : "getByIdRatingArtist@mail.com",
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
            ratingId = res.id
            done()
        })
    })

    afterAll(done => {
        Rating.destroy({ where : { id : ratingId}})
        .then(data => {
            return Artist.destroy({ where : { id : artistId}})
        })
        .then(dat => {
            return User.destroy({ where : {id : userId}})
        })
        .then(res => {
            done()
        })
    })

    // ======================== successfull get rating ==========================
    it('should status 200, successfull get rating id' ,function (done) {
        //setup

        //excecute
        request(app) 
        .get(`/users/${userId}/ratings/${ratingId}`)
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


    // ======================== error comments id not found ==========================
    it('should status 404, error comment id not found' ,function (done) {
        //setup
        const id = 999

        //excecute
        request(app) 
        .get(`/users/${userId}/ratings/${id}`)
        .end((err, res) => {
            if(err) done(err)
                    
            //assert
            expect(res.statusCode).toEqual(404)
            expect(typeof res.body).toEqual('object')
            expect(res.body).toHaveProperty('messages')
            expect(typeof res.body.messages).toEqual('string')

            done()
        })
    })


    // ======================== successfull get rating ==========================
    it('should status 200, successfull get rating id' ,function (done) {
        //setup

        //excecute
        request(app) 
        .get(`/artists/${artistId}/ratings/${ratingId}`)
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


    // ======================== error comments id not found ==========================
    it('should status 404, error comment id not found' ,function (done) {
        //setup
        const id = 99

        //excecute
        request(app) 
        .get(`/artists/${artistId}/ratings/${id}`)
        .end((err, res) => {
            if(err) done(err)
                    
            //assert
            expect(res.statusCode).toEqual(404)
            expect(typeof res.body).toEqual('object')
            expect(res.body).toHaveProperty('messages')
            expect(typeof res.body.messages).toEqual('string')

            done()
        })
    })


    // ======================== error internal server ==========================
    it('should status 500, error internal server' ,function (done) {
        //setup
        const id = "ad"

        //excecute
        request(app) 
        .get(`/artists/${artistId}/ratings/${id}`)
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
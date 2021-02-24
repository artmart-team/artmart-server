// describe GET /artists/:artistId/ratings  //comment artisnya
// -- it success
// -- it error not found 


const request = require('supertest')

const { beforeAll } = require("@jest/globals")

const { User, Artist, Rating} = require('../../models')

const app = require('../../app')  
const { generateToken } = require('../../helpers/jwt')
// const { disable } = require('../../app')

// ===================================================================================
// ==========================  GET /users/:userId/ratings
// ==================================================================================

describe('GET /users/:userId/ratings',function() {
    let userId = null
    let access_token = null
    let ratingId = null
    let artistId = null

    beforeAll(done => {
        User.create({ 
            username : "getAllRatingUser",
            firstName : "users",
            lastName : "idsearch",
            email : "getAllRatingUser@mail.com",
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
                username : "getAllRatingByArtist",
                firstName : "artist",
                lastName : "idsearch",
                email : "getAllRatingByArtist@mail.com",
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
                score : 1,
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

    // ======================== successfull get all ratings ==========================
    it('should status 200, successfull get all ratings' ,function (done) {
        //setup

        //excecute
        request(app) 
        .get(`/users/${userId}/ratings`)
        .end((err, res) => {
            if(err) done(err)
                    
            //assert
            expect(res.statusCode).toEqual(200)
            expect(Array.isArray (res.body)).toEqual(true)
            res.body.forEach(rating => {
                expect (typeof rating).toEqual('object')
                expect (rating).toHaveProperty('score')
            })

            done()
        })
    })


    // ======================== error internal server ==========================
    it('should status 500, error internal server' ,function (done) {
        //setup

        let idUser = "ad"

        //excecute
        request(app) 
        .get(`/users/${idUser}/ratings`)
        .end((err, res) => {
            if(err) done(err)
                    
            //assert
            expect(res.statusCode).toEqual(500)
            expect (typeof res.body).toEqual('object')
            expect (typeof res.body.messages).toEqual('string')

            done()
        })
    })


    // ======================== successfull get all ratings ==========================
    it('should status 200, successfull get all ratings' ,function (done) {
        //setup

        //excecute
        request(app) 
        .get(`/artists/${artistId}/ratings`)
        .end((err, res) => {
            if(err) done(err)
                    
            //assert
            expect(res.statusCode).toEqual(200)
            expect(Array.isArray (res.body)).toEqual(true)
            res.body.forEach(rating => {
                expect (typeof rating).toEqual('object')
                expect (rating).toHaveProperty('score')
            })

            done()
        })
    })

    // ======================== error internal server ==========================
    it('should status 500, error internal server' ,function (done) {
        //setup

        let idArt = "ad"

        //excecute
        request(app) 
        .get(`/artists/${idArt}/ratings`)
        .end((err, res) => {
            if(err) done(err)
                    
            //assert
            expect(res.statusCode).toEqual(500)
            expect (typeof res.body).toEqual('object')
            expect (typeof res.body.messages).toEqual('string')

            done()
        })
    })

    // ================ successfull average rating ===================
    it('should status 200, success average ratings' ,function (done) {
        //setup

        //excecute
        request(app) 
        .get(`/artists/${artistId}/ratings/average`)
        .end((err, res) => {
            if(err) done(err)
                    
            //assert
            expect(res.statusCode).toEqual(200)
            expect(Array.isArray (res.body)).toEqual(false)
            expect(res.body).toHaveProperty("ArtistId")
            expect(res.body).toHaveProperty("averageRating")

            done()
        })
    })

    // ======================== error internal server ==========================
    it('should status 500, error internal server' ,function (done) {
        //setup

        let idArt = "ad"

        //excecute
        request(app) 
        .get(`/artists/${idArt}/ratings/average`)
        .end((err, res) => {
            if(err) done(err)
                    
            //assert
            expect(res.statusCode).toEqual(500)
            expect (typeof res.body).toEqual('object')
            expect (typeof res.body.messages).toEqual('string')

            done()
        })
    })
})

// describe GET /artists/:artistId/reviews  //comment artisnya
// -- it success
// -- it error not found 

const request = require('supertest')

const { beforeAll } = require("@jest/globals")

const { generateToken } = require('../../helpers/jwt')

const { User, Artist, Review } = require('../../models')

const app = require('../../app')  

describe('GET /users/:userId/reviews',function() {
    let userId = null
    let artistId = null

    beforeAll(done => {
        User.create({ 
            username : "addReviewUserTesting",
            firstName : "artist",
            lastName : "idsearch",
            email : "addReviewUserTesting@mail.com",
            password : '123456',
            profilePicture : ""
        })
        .then(data => {
            userId = data.id

            // const payload = {
            //     id : res.id,
            //     username : res.username,
            //     profilePicture : res.profilePicture
            // }

            // access_token = generateToken(payload)

            return Artist.create({
                username : "addReviewArtistTest",
                firstName : "artist",
                lastName : "idsearch",
                email : "addReviewArtistTest@mail.com",
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
                title : "GetReviewAlldata",
                description : "GetReviewAlldata",
                UserId : userId,
                ArtistId : artistId
            })
        })
        .then(res => {
            done()
        })
    })

    // ======================== successfull get all reviews ==========================
    it('should status 200, successfull get all reviews' ,function (done) {
        //setup

        //excecute
        request(app) 
        .get(`/users/${userId}/reviews`)
        .end((err, res) => {
            if(err) done(err)
                    
            //assert
            expect(res.statusCode).toEqual(200)
            expect(Array.isArray (res.body)).toEqual(true)
            res.body.forEach(review => {
                expect (typeof review).toEqual('object')
                expect (review).toHaveProperty('title')
                expect (review).toHaveProperty('description')
                expect (typeof review.title).toEqual('string')
                expect (typeof review.description).toEqual('string')
            })

            done()
        })
    })


    
    // ======================== error internal server ==========================
    it('should status 500, error internal server' ,function (done) {
        //setup
        const idUser = "asd"
        //excecute
        request(app) 
        .get(`/users/${idUser}/reviews`)
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

describe('GET /users/:userId/reviews',function() {
    let artistId = 1

    // ======================== successfull get all reviews ==========================
    it('should status 200, successfull get all reviews' ,function (done) {
        //setup

        //excecute
        request(app) 
        .get(`/artists/${artistId}/reviews`)
        .end((err, res) => {
            if(err) done(err)
                    
            //assert
            expect(res.statusCode).toEqual(200)
            expect(Array.isArray (res.body)).toEqual(true)
            res.body.forEach(review => {
                expect (typeof review).toEqual('object')
                expect (review).toHaveProperty('title')
                expect (review).toHaveProperty('description')
                expect (typeof review.title).toEqual('string')
                expect (typeof review.description).toEqual('string')
            })

            done()
        })
    })


    // ======================== error internal server ==========================
    it('should status 500, error internal server' ,function (done) {
        //setup
        const idArt = "asd"
        //excecute
        request(app) 
        .get(`/artists/${idArt}/reviews`)
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


// descibe GET /artists/:artistId/reviews/:reviewId
// -- it success
// -- it error user not login
// -- it error rating id not found 

const request = require('supertest')
const { User, Review, Artist } = require('../../models')
const { beforeAll } = require("@jest/globals")
const app = require('../../app')  

// ===================================================================================
// ====  GET /users/:userId/artists/:artistId/orders/:orderId/reviews/:reviewId
// ==================================================================================

describe('GET /users/:userId/reviews/:reviewId',function() {
    let userId = null
    let artistId = null
    let reviewId = null

    beforeAll(done => {
        User.create({ 
            username : "getReviewUserTest",
            firstName : "users",
            lastName : "idsearch",
            email : "getReviewUserTest@mail.com",
            password : '123456',
            profilePicture : ""
        })
        .then(data => {
            userId = data.id

            return Artist.create({
                username : "getReviewIdtestArtist",
                firstName : "artist",
                lastName : "idsearch",
                email : "getReviewIdtestArtist@mail.com",
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
                title : "getReviewById",
                description : "getReviewById",
                UserId : userId,
                ArtistId : artistId
            })
        })
        .then(res => {
            reviewId = res.id
            done()
        })
    })

    afterAll(done => {
        Review.destroy({ where : {id : reviewId}})
        .then(dat => {
            return Artist.destroy({ where : {id : artistId}})
        })
        .then(data => {
            return User.destroy({ where : { id : userId}})
        })
        .then(res => {
            done()
        })
    })

    // ======================== successfull get reviews ==========================
    it('should status 200, successfull get reviews id' ,function (done) {
        //setup

        //excecute
        request(app) 
        .get(`/users/${userId}/reviews/${reviewId}`)
        .end((err, res) => {
            if(err) done(err)
                    
            //assert
            expect(res.statusCode).toEqual(200)
            expect(typeof res.body).toEqual('object')
            expect(res.body).toHaveProperty('title')
            expect(res.body).toHaveProperty('description')
            expect(typeof res.body.title).toEqual('string')
            expect(typeof res.body.description).toEqual('string')

            done()
        })
    })


    // ======================== error comments id not found ==========================
    it('should status 404, error comment id not found' ,function (done) {
        //setup
        const id = 999

        //excecute
        request(app) 
        .get(`/users/${userId}/reviews/${id}`)
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
        const id = "asda"

        //excecute
        request(app) 
        .get(`/users/${userId}/reviews/${id}`)
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


        // ======================== successfull get reviews ==========================
        it('should status 200, successfull get reviews id' ,function (done) {
            //setup
    
            //excecute
            request(app) 
            .get(`/artists/${artistId}/reviews/${reviewId}`)
            .end((err, res) => {
                if(err) done(err)
                        
                //assert
                expect(res.statusCode).toEqual(200)
                expect(typeof res.body).toEqual('object')
                expect(res.body).toHaveProperty('title')
                expect(res.body).toHaveProperty('description')
                expect(typeof res.body.title).toEqual('string')
                expect(typeof res.body.description).toEqual('string')
    
                done()
            })
        })
    
    
        // ======================== error comments id not found ==========================
        it('should status 404, error comment id not found' ,function (done) {
            //setup
            const id = 999
    
            //excecute
            request(app) 
            .get(`/artists/${artistId}/reviews/${id}`)
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
            const id = "ads"
    
            //excecute
            request(app) 
            .get(`/artists/${artistId}/reviews/${id}`)
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


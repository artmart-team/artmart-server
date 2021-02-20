// descibe GET /artists/:artistId/reviews/:reviewId
// -- it success
// -- it error user not login
// -- it error rating id not found 

const request = require('supertest')
const { User, Review, Artist } = require('../../models')
const { beforeAll } = require("@jest/globals")
const app = require('../../app')  

// ===================================================================================
// ==========================  GET /users/:userId/reviews/:reviewId
// ==================================================================================

describe('GET /users/:userId/reviews/:reviewId',function() {
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

        Review.findOne({where : {title : "buat test get title by id"}})
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
        const id = 9999999

        //excecute
        request(app) 
        .get(`/users/${userId}/reviews/${id}`)
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
})




// ===================================================================================
// ==========================  GET /users/:userId/reviews/:reviewId
// ==================================================================================

describe('GET /artists/:artistId/reviews/:reviewId',function() {
    let artistId
    let reviewId

    beforeAll(done => {
        Artist.findOne({where : {email : "user@mail.com"}})
        .then(data => {
            artistId = data.id
        })
        .catch(err => {
            console.log(err)
        })

        Review.findOne({where : {title : "buat test get title by id"}})
        .then(data => {
            reviewId = data.id

            if(artistId && reviewId) {
                done()
            }
        })
        .catch(err => {
            console.log(err)
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
})
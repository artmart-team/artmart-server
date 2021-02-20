// descibe GET /artists/:artistId/ratings/:ratingId
// -- it success
// -- it error rating id not found 

const request = require('supertest')
const { User, Rating, Artist } = require('../../models')
const { beforeAll } = require("@jest/globals")
const app = require('../../app')  

// ===================================================================================
// ==========================  GET /users/:userId/ratings/:ratingId
// ==================================================================================

describe('GET /users/:userId/ratings/:ratingId',function() {
    let userId
    let ratingId

    beforeAll(done => {
        User.findOne({where : {email : "user@mail.com"}})
        .then(data => {
            userId = data.id
        })
        .catch(err => {
            console.log(err)
        })

        Rating.findOne({where : { score : 1 }})
        .then(data => {
            ratingId = data.id

            if(userId && ratingId) {
                done()
            }
        })
        .catch(err => {
            console.log(err)
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
            expect(res.body).toHaveProperty('description')
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
        .get(`/users/${userId}/ratings/${id}`)
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
// ==========================  GET /artists/:artistId/ratings/:ratingId
// ==================================================================================


describe('GET /artists/:artistId/ratings/:ratingId',function() {
    let artistId
    let ratingId

    beforeAll(done => {
        Artist.findOne({where : {email : "user@mail.com"}})
        .then(data => {
            artistId = data.id
        })
        .catch(err => {
            console.log(err)
        })

        Rating.findOne({where : { score : 1 }})
        .then(data => {
            ratingId = data.id

            if(artistId && ratingId) {
                done()
            }
        })
        .catch(err => {
            console.log(err)
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
            expect(res.body).toHaveProperty('description')
            expect(typeof res.body.description).toEqual('string')

            done()
        })
    })
})
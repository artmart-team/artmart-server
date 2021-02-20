// descibe GET /artists/:artistId/reviews/:reviewId
// -- it success
// -- it error user not login
// -- it error rating id not found 

const request = require('supertest')
const { User, Review, Artist, Order } = require('../../models')
const { beforeAll } = require("@jest/globals")
const app = require('../../app')  

// ===================================================================================
// ==========================  GET /users/:userId/reviews/:reviewId
// ==================================================================================

describe('GET /users/:userId/reviews/:reviewId',function() {
    let userId, reviewId, artistId, orderId

    beforeAll(done => {
        User.findOne({where : {email : "user@mail.com"}})
        .then(data => {
            userId = data.id

            return Artist.findOne({ where : { email : "user@mail.com"}})
        })
        .then(res => {
            artistId = res.id

            return Order.findOne({ where : { title : "testingforOrder"}})
        })
        then(response => {
            orderId = response.id

            return Review.findOne({ where : { title : "getIdReviewTesting"}})
        })
        then(rev => {
            reviewId = rev.id

            done()
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
        .get(`/users/${userId}/artist/${artistId}/orders/${orderId}/reviews/${reviewId}`)
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
        .get(`/users/${userId}/artist/${artistId}/orders/${orderId}/reviews/${id}`)
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


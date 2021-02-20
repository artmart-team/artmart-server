// descibe GET /artists/:artistId/ratings/:ratingId
// -- it success
// -- it error rating id not found 

const request = require('supertest')
const { User, Rating, Artist, Order } = require('../../models')
const { beforeAll } = require("@jest/globals")
const app = require('../../app')  

// ===================================================================================
// ==========================  GET /users/:userId/ratings/:ratingId
// ==================================================================================

describe('GET /users/:userId/ratings/:ratingId',function() {
    let userId, ratingId, artistId, orderId

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

            return Rating.findOne({ where : { score : 2}})
        })
        then(rating => {
            ratingId = rating.id

            done()
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
        .get(`/users/${userId}/artist/${artistId}/orders/${orderId}/ratings/${ratingId}`)
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
        .get(`/users/${userId}/artist/${artistId}/orders/${orderId}/ratings/${id}`)
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

// describe GET /artists/:artistId/reviews  //comment artisnya
// -- it success
// -- it error not found 

const request = require('supertest')

const { beforeAll } = require("@jest/globals")

const { User, Artist, Order } = require('../../models')

const app = require('../../app')  

describe('GET /users/:userId/artists/:artistId/orders/:orderId/reviews',function() {
    let userId, artistId, orderId

    beforeAll(done => {
        User.findOne({where : {email : "user@mail.com"}})
        .then(data => {
            userId = data.id

            const payload = {
                id : data.id,
                username : data.username
            }

            access_token = generateToken(payload)


            return Artist.findOne({ where : { email : "user@mail.com"}})
        })
        .then(res => {
            artistId = res.id

            return Order.findOne({ where : { title : "testingforOrder"}})
        })
        then(response => {
            orderId = response.id

            done()
        })
        .catch(err => {
            console.log(err)
        })
    })

    // ======================== successfull get all reviews ==========================
    it('should status 200, successfull get all reviews' ,function (done) {
        //setup

        //excecute
        request(app) 
        .get(`/users/${userId}/artist/${artistId}/orders/${orderId}/reviews`)
        .end((err, res) => {
            if(err) done(err)
                    
            //assert
            expect(res.statusCode).toEqual(200)
            res.body(Array.isArray (res.body)).toEqual(true)
            res.body.forEach(review => {
                expect (typeof review).toEqual('Object')
                expect (review).toHaveProperty('title')
                expect (review).toHaveProperty('description')
                expect (typeof review.title).toHaveProperty('string')
                expect (typeof review.description).toHaveProperty('string')
            })

            done()
        })
    })
})


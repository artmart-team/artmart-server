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
    let userId = null
    let ratingId = 2
    let artistId = 1 
    let orderId =  1

    beforeAll(done => {
        User.findOne({where : {email : "user@mail.com"}})
        .then(data => {
            userId = data.id
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
            expect(typeof res.body).toEqual('object')
            expect(res.body).toHaveProperty('messages')
            expect(typeof res.body.messages).toEqual('string')

            done()
        })
    })
})

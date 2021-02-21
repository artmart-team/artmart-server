// describe GET /artists/:artistId/ratings  //comment artisnya
// -- it success
// -- it error not found 


const request = require('supertest')

const { beforeAll } = require("@jest/globals")

const { User } = require('../../models')

const app = require('../../app')  
const { generateToken } = require('../../helpers/jwt')

// ===================================================================================
// ==========================  GET /users/:userId/ratings
// ==================================================================================

describe('GET /users/:userId/ratings',function() {
    let artistId = 1 
    let orderId = 1 
    let access_token = null
    let userId = null

    beforeAll(done => {
        User.findOne({where : {email : "user@mail.com"}})
        .then(data => {
            userId = data.id

            const payload = {
                id : data.id,
                username : data.username
            }

            access_token = generateToken(payload)
            done()
        })
        .catch(err => {
            console.log(err)
        })
    })

    // ======================== successfull get all ratings ==========================
    it('should status 200, successfull get all ratings' ,function (done) {
        //setup

        //excecute
        request(app) 
        .get(`/users/${userId}/artist/${artistId}/orders/${orderId}/ratings`)
        .end((err, res) => {
            if(err) done(err)
                    
            //assert
            expect(res.statusCode).toEqual(200)
            expect(Array.isArray (res.body)).toEqual(true)
            res.body.forEach(rating => {
                expect (typeof rating).toEqual('Object')
                expect (rating).toHaveProperty('score')
                expect (typeof rating.score).toHaveProperty('number')
            })

            done()
        })
    })
})
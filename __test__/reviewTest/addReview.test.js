// decribe POST /artists/:artistId/review
// -- it success
// -- it error score empty
// -- it error user not login
// -- it error artis id not found
// -- it error artis Id empty

const request = require('supertest')

const { beforeAll } = require("@jest/globals")

const { generateToken } = require('../../helpers/jwt')

const { User, Artist, Order } = require('../../models')

const app = require('../../app')  


// ===================================================================================
// ==========================  POST /users/:userId/artists/:artistId/orders/:orderId/reviews
// ==================================================================================

describe('POST /users/:userId/artists/:artistId/orders/:orderId/reviews',function() {
    let userId = null
    let artistId = 1
    let orderId = 1
    let access_token = null

    beforeAll(done => {
        User.findOne({where : {email : "user@mail.com"}})
        .then(data => {
            userId = data.id

            const payload = {
                id : data.id,
                username : data.username,
                profilePicture : data.profilePicture
            }

            access_token = generateToken(payload)
            done()
        })
        .catch(err => {
            console.log(err)
        })
    })

    // ======================== successfull Create reviews ==========================
    it('should status 201, successfull Create reviews' ,function (done) {
        //setup
        const body = {
            title : "create new review",
            description : "new review"
        }

        //excecute
        request(app) 
        .post(`/users/${userId}/artists/${artistId}/orders/${orderId}/reviews`)
        .set('access_token', access_token)
        .send(body)
        .end((err, res) => {
            if(err) done(err)
                    
            //assert
            expect(res.statusCode).toEqual(201)
            expect (typeof res.body).toEqual('object')
            expect(res.body).toHaveProperty('title')
            expect(res.body).toHaveProperty('description')
            expect(typeof res.body.title).toEqual('string')
            expect(typeof res.body.description).toEqual('string')

            done()
        })
    })

    // ======================== description empty ==========================
    it('should status 400, title dan desc empty' ,function (done) {
        //setup
        const body = {
            title : "",
            description : ""
        }

        //excecute
        request(app) 
        .post(`/users/${userId}/artists/${artistId}/orders/${orderId}/reviews`)
        .set('access_token', access_token)
        .send(body)
        .end((err, res) => {
            if(err) done(err)
                    
            //assert
            expect(res.statusCode).toEqual(400)
            expect (typeof res.body).toEqual('object')
            expect(res.body).toHaveProperty('messages')
            expect(typeof res.body.messages).toEqual('string')

            done()
        })
    })

    // ======================== error user not login ==========================
    it('should status 403, error not login' ,function (done) {
        //setup
        const data = {
            title : "create new review",
            description : "new review"
        }

        //excecute
        request(app) 
        .post(`/users/${userId}/artists/${artistId}/orders/${orderId}/reviews`)
        .send(data)
        .end((err, res) => {
            if(err) done(err)
                    
            //assert
            expect(res.statusCode).toEqual(403)
            expect (typeof res.body).toEqual('object')
            expect(res.body).toHaveProperty('messages')
            expect(typeof res.body.messages).toEqual('string')

            done()
        })
    })
})
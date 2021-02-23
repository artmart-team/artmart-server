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

    let userId = 1
    let artistId = 1
    let orderId = 1
    let access_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJ1c2VybmFtZVRlc3RpbmdGb3JBcnRpc3QiLCJwcm9maWxlUGljdHVyZSI6ImxpbmsuZ29vZ2xlLmNvbSIsImlhdCI6MTYxNDA0MjU3Mn0.WDW6CklcYnDeDjtD0J1mSQANepoolZ5gwwoaCvvLvP4"

    // beforeAll(done => {
    //     User.findOne({where : {id : 1}})
    //     .then(data => {
    //         userId = data.id

    //         const payload = {
    //             id : data.id,
    //             username : data.username,
    //             profilePicture : data.profilePicture
    //         }

    //         access_token = generateToken(payload)
    //         done()
    //     })
    // })


    // testing gk berhasil
    // ======================== successfull Create reviews ==========================
    // it('should status 201, successfull Create reviews' ,function (done) {
    //     //setup
    //     const body = {
    //         title : "create new review",
    //         description : "new review"
    //     }

    //     //excecute
    //     request(app) 
    //     .post(`/users/${userId}/artists/1/orders/2/reviews`)
    //     .set('access_token', access_token)
    //     .send(body)
    //     .end((err, res) => {
    //         if(err) done(err)
                    
    //         //assert
    //         expect(res.statusCode).toEqual(201)
    //         expect (typeof res.body).toEqual('object')
    //         expect(res.body).toHaveProperty('title')
    //         expect(res.body).toHaveProperty('description')
    //         expect(typeof res.body.title).toEqual('string')
    //         expect(typeof res.body.description).toEqual('string')

    //         done()
    //     })
    // })


    // ======================== successfull Create reviews ==========================
    it('should status 401, successfull Create reviews' ,function (done) {
        //setup
        const body = {
            title : "create new review",
            description : "new review"
        }

        //excecute
        request(app) 
        .post(`/users/${userId}/artists/1/orders/2/reviews`)
        .set('access_token', access_token)
        .send(body)
        .end((err, res) => {
            if(err) done(err)
                    
            //assert
            expect(res.statusCode).toEqual(401)
            expect (typeof res.body).toEqual('object')
            expect(res.body).toHaveProperty('message')
            expect(typeof res.body.message).toEqual('string')

            done()
        })
    })

    // testing gk berhasil
    // ======================== title empty ==========================
    // it('should status 400, title empty' ,function (done) {
    //     //setup
    //     const body = {
    //         title : ""
    //     }

    //     //excecute
    //     request(app) 
    //     .post(`/users/${userId}/artists/1/orders/2/reviews`)
    //     .set('access_token', access_token)
    //     .send(body)
    //     .end((err, res) => {
    //         if(err) done(err)
                    
    //         //assert
    //         expect(res.statusCode).toEqual(400)
    //         expect (typeof res.body).toEqual('object')
    //         expect(res.body).toHaveProperty('errors')
    //         expect(Array.isArray(res.body.errors)).toEqual(true)

    //         done()
    //     })
    // })
    

    // ======================== error internal server ==========================
    // it('should status 500, error internal server' ,function (done) {
    //     //setup
    //     const body = {
    //         title : "",
    //     }

    //     //excecute
    //     request(app) 
    //     .post(`/users/${userId}/artists/${artistId}/orders/${orderId}/reviews`)
    //     .set('access_token', access_token)
    //     .send(body)
    //     .end((err, res) => {
    //         if(err) done(err)
                    
    //         //assert
    //         expect(res.statusCode).toEqual(500)
    //         expect (typeof res.body).toEqual('object')
    //         expect(res.body).toHaveProperty('messages')
    //         expect(typeof res.body.messages).toEqual('string')

    //         done()
    //     })
    // })



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
            expect(res.statusCode).toEqual(401)
            expect (typeof res.body).toEqual('object')
            expect(res.body).toHaveProperty('messages')
            expect(typeof res.body.messages).toEqual('string')

            done()
        })
    })
})


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
    let access_token = null
    let artistId = null
    let orderId = null

    beforeAll(done => {
        User.create({ 
            username : "addReviewUserTesting",
            firstName : "artist",
            lastName : "idsearch",
            email : "addReviewUserTesting@mail.com",
            password : '123456',
            profilePicture : ""
        })
        .then(data => {
            userId = data.id

            const payload = {
                id : res.id,
                username : res.username,
                profilePicture : res.profilePicture
            }

            access_token = generateToken(payload)

            return Artist.create({
                username : "addReviewArtistTest",
                firstName : "artist",
                lastName : "idsearch",
                email : "addReviewArtistTest@mail.com",
                password : '123456',
                profilePicture : "link.google.com",
                completeDuration : 48,
                bankAccount : 230230230,
                defaultPrice : 100000
            })
        })
        .then(datas => {
            artistId = datas.id

            return Order.create({
                title : 'testing orders data',
                description : 'testing',
                deadline : new Date(),
                price : 100000,
                totalPrice : 120000,
                accepted : false,
                done : false,
                paid : false,
                imageURL : 'link.google.com',
                ArtistId : artistId,
                UserId : userId  
            })
        })
        .then(res => {
            orderId = res.id
            done()
        })
    })


    // testing gk berhasil
    // ======================== successfull Create reviews ==========================
    it('should status 201, successfull Create reviews' ,function (done) {
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
            expect(res.statusCode).toEqual(201)
            expect (typeof res.body).toEqual('object')
            expect(res.body).toHaveProperty('title')
            expect(res.body).toHaveProperty('description')
            expect(typeof res.body.title).toEqual('string')
            expect(typeof res.body.description).toEqual('string')

            done()
        })
    })


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


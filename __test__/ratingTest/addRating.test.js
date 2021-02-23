// decribe POST /artists/:artistId/ratings
// -- it success
// -- it error score empty
// -- it error user not login
// -- it error artis id not found
// -- it error artis Id empty


const request = require('supertest')

const { beforeAll } = require("@jest/globals")

const { generateToken } = require('../../helpers/jwt')

const { User } = require('../../models')

const app = require('../../app')  

// ===================================================================================
// ==========================  POST /users/:userId/artists/:artistId/orders:orderId/ratings
// ==================================================================================

describe('POST /users/:userId/artists/:artistId/orders/:orderId/ratings',function() {
    let userId = null
    let access_token = null
    let artistId = null
    let orderId = null

    beforeAll(done => {
        User.create({ 
            username : "addRatingByUser",
            firstName : "artist",
            lastName : "idsearch",
            email : "addRatingByUser@mail.com",
            password : '123456',
            profilePicture : ""
        })
        .then(data => {
            userId = data.id

            const payload = {
                id : data.id,
                username : data.username,
                profilePicture : data.profilePicture
            }

            access_token = generateToken(payload)

            return Artist.create({
                username : "addRatingByArtist",
                firstName : "artist",
                lastName : "idsearch",
                email : "addRatingByArtist@mail.com",
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
                title : 'testingAddRatingData',
                description : 'testingAddRatingData',
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

    // ======================== successfull Create ratings ==========================
    it('should status 201, successfull Create ratings' ,function (done) {
        //setup
        const data = {
            score : 5
        }

        //excecute
        request(app) 
        .post(`/users/${userId}/artists/${artistId}/orders/${orderId}/ratings`)
        .set('access_token', access_token)
        .send(data)
        .end((err, res) => {
            if(err) done(err)
                    
            //assert
            expect(res.statusCode).toEqual(201)
            expect (typeof res.body).toEqual('object')
            expect(res.body).toHaveProperty('score')
            expect(typeof res.body.score).toEqual('number')

            done()
        })
    })


    // ======================== error user not login ==========================
    it('should status 401, successfull Create rating' ,function (done) {
        //setup
        const data = {
            score : 5
        }

        //excecute
        request(app) 
        .post(`/users/${userId}/artists/${artistId}/orders/${orderId}/ratings`)
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

    // ======================== error internal server  ==========================
    // it('should status 500, successfull Create rating' ,function (done) {
    //     //setup
    //     const data = {
    //         ssssss : "assasasaasa"
    //     }

    //     //excecute
    //     request(app) 
    //     .post(`/users/${userId}/artists/${artistId}/orders/${orderId}/ratings`)
    //     .set('access_token', access_token)
    //     .send(data)
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
})
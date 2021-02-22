// decribe PATCH /artists/:artistId/reviews/:reviewId   // updating title commnet or desciption
// -- it success 
// -- it error score empty
// -- it error rating id not found
// -- it error user not login
// -- it error not login user

const request = require('supertest')
const { User, Review, Order, Artist} = require('../../models')
const { beforeAll } = require("@jest/globals")
const app = require('../../app')  
const { generateToken } = require('../../helpers/jwt')


describe('PUT /users/:userId/artist/:artistId/reviews/:reviewId',function() {
    let userId = null
    let access_token = null
    let reviewId = 3 
    let artistId = 1

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

    // ======================== successfull edit reviews ==========================
    it('should status 200, successfull edit reviews' ,function (done) {
        //setup
        const body = {
            title : "edit berhasil"
        }

        //excecute
        request(app) 
        .put(`/users/${userId}/artists/${artistId}/reviews/${reviewId}`)
        .set('access_token', access_token)
        .send(body)
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


    // ======================== error title review empty ==========================
    it('should status 400, error title review empty' ,function (done) {
        //setup
        const body = {
            title : ""
        }

        //excecute
        request(app) 
        .put(`/users/${userId}/artists/${artistId}/reviews/${reviewId}`)
        .set('access_token', access_token)
        .send(body)
        .end((err, res) => {
            if(err) done(err)
                    
            //assert
            expect(res.statusCode).toEqual(400)
            expect(typeof res.body).toEqual('object')
            expect(res.body).toHaveProperty('errors')
            expect(Array.isArray(res.body.errors)).toEqual(true)

            done()
        })
    })


    // ======================== error reviews id not found ==========================
    it('should status 404, error reviews id not found' ,function (done) {
        //setup
        const id = 9999999

        const data = {
            title : 'tidak berhasil edit'
        }

        //excecute
        request(app) 
        .put(`/users/${userId}/artists/${artistId}/reviews/${id}`)
        .set('access_token', access_token)
        .send(data)
        .end((err, res) => {
            if(err) done(err)
                    
            //assert
            expect(res.statusCode).toEqual(500)
            expect(typeof res.body).toEqual('object')
            // expect(res.body).toHaveProperty('messages')
            // expect(typeof res.body.messages).toEqual('string')

            done()
        })
    })


    // ======================== error user not login ==========================
    it('should status 401, error edit user not login' ,function (done) {
        //setup
        const data = {
            title : "tidak berhasil edit"
        }

        //excecute
        request(app) 
        .put(`/users/${userId}/artists/${artistId}/reviews/${reviewId}`)
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


    // ======================== error internal server ==========================
    // it('should status 400, error title review empty' ,function (done) {
    //     //setup
    //     const body = {
    //         asdasdsadasdasdas : "hfghg"
    //     }

    //     //excecute
    //     request(app) 
    //     .put(`/users/${userId}/artists/${artistId}/reviews/${reviewId}`)
    //     .set('access_token', access_token)
    //     .send(body)
    //     .end((err, res) => {
    //         if(err) done(err)
                    
    //         //assert
    //         expect(res.statusCode).toEqual(500)
    //         expect(typeof res.body).toEqual('object')
    //         expect(res.body).toHaveProperty('messages')
    //         expect(typeof res.body.messages).toEqual('string')

    //         done()
    //     })
    // })
})
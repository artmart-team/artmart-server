// describe DELETE /artists/:artistId/ratings/:ratingId
// -- it success
// -- it error ratings id not found
// -- it error not login user


const request = require('supertest')
const { User, Rating, Order, Artist } = require('../../models')
const { beforeAll } = require("@jest/globals")
const app = require('../../app')  
const { generateToken } = require('../../helpers/jwt')

// ===================================================================================
// ==========================  DELETE /users/:userId/artists/:artistId/ratings/:ratingId
// ==================================================================================

describe('DELETE /users/:userId/artists/:artistId/ratings/:ratingId',function() {
    let userId = null
    let access_token = null
    let ratingId = 4
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


    // ======================== error ratings id not found ==========================
    it('should status 404, error ratings id not found' ,function (done) {
        //setup
        const id = 9999999

        //excecute
        request(app) 
        .delete(`/users/${userId}/artists/${artistId}/ratings/${id}`)
        .set('access_token', access_token)
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

        //excecute
        request(app) 
        .delete(`/users/${userId}/artists/${artistId}/ratings/${ratingId}`)
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



    // ======================== error internal server error==========================
    it('should status 404, error ratings id not found' ,function (done) {
        //setup
        const id = "sadasdasd"

        //excecute
        request(app) 
        .delete(`/users/${userId}/artists/${artistId}/ratings/${id}`)
        .set('access_token', access_token)
        .end((err, res) => {
            if(err) done(err)
                    
            //assert
            expect(res.statusCode).toEqual(500)
            expect(typeof res.body).toEqual('object')
            expect(res.body).toHaveProperty('messages')
            expect(typeof res.body.messages).toEqual('string')

            done()
        })
    })



    // ======================== successfull delete ratings ==========================
    it('should status 200, successfull delete ratings' ,function (done) {
        //setup

        //excecute
        request(app) 
        .delete(`/users/${userId}/artists/${artistId}/ratings/${ratingId}`)
        .set('access_token', access_token)
        .end((err, res) => {
            if(err) done(err)
                    
            //assert
            expect(res.statusCode).toEqual(200)
            expect(typeof res.body).toEqual('object')
            expect(res.body).toHaveProperty('messages')
            expect(typeof res.body.messages).toEqual('string')

            done()
        })
    })
})
// describe DELETE /artists/:artistId/ratings/:ratingId
// -- it success
// -- it error ratings id not found
// -- it error not login user


const request = require('supertest')
const { User, Rating } = require('../../models')
const { beforeAll } = require("@jest/globals")
const app = require('../../app')  

// ===================================================================================
// ==========================  DELETE /users/:userId/ratings/:ratingId
// ==================================================================================

describe('DELETE /users/:userId/ratings/:ratingId',function() {
    let userId
    let ratingId

    beforeAll(done => {
        User.findOne({where : {email : "user@mail.com"}})
        .then(data => {
            userId = data.id
        })
        .catch(err => {
            console.log(err)
        })

        Rating.findOne({where : {score : 4}})
        .then(data => {
            ratingId = data.id

            if(userId && ratingId) {
                done()
            }
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
        .delete(`/artists/${userId}/ratings/${id}`)
        .set('access_token', access_token)
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


    // ======================== error user not login ==========================
    it('should status 403, error edit user not login' ,function (done) {
        //setup

        //excecute
        request(app) 
        .delete(`/artists/${userId}/ratings/${ratingId}`)
        .end((err, res) => {
            if(err) done(err)
                    
            //assert
            expect(res.statusCode).toEqual(403)
            expect (typeof res.body).toEqual('object')
            expect(res.body).toHaveProperty('message')
            expect(typeof res.body.message).toEqual('string')

            done()
        })
    })

    // ======================== successfull delete ratings ==========================
    it('should status 200, successfull delete ratings' ,function (done) {
        //setup

        //excecute
        request(app) 
        .delete(`/users/${userId}/ratings/${ratingId}`)
        .set('access_token', access_token)
        .end((err, res) => {
            if(err) done(err)
                    
            //assert
            expect(res.statusCode).toEqual(200)
            expect(typeof res.body).toEqual('object')
            expect(res.body).toHaveProperty('message')
            expect(typeof res.body.message).toEqual('string')

            done()
        })
    })
})
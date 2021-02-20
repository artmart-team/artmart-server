// decribe PATCH /artists/:artistId/ratings/:ratingId   // updating title commnet or desciption
// -- it success 
// -- it error score empty
// -- it error rating id not found
// -- it error user not login
// -- it error not login user

const request = require('supertest')
const { User, Rating } = require('../../models')
const { beforeAll } = require("@jest/globals")
const app = require('../../app')  

// ===================================================================================
// ==========================  PUT /users/:userId/ratings/:ratingId
// ==================================================================================

describe('PUT /users/:userId/ratings/:ratingId',function() {
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

        Rating.findOne({where : {score : 3}})
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

    // ======================== successfull edit rating ==========================
    it('should status 200, successfull edit rating' ,function (done) {
        //setup
        const body = {
            score : 2.44
        }

        //excecute
        request(app) 
        .put(`/users/${userId}/ratings/${ratingId}`)
        .set('access_token', access_token)
        .send(body)
        .end((err, res) => {
            if(err) done(err)
                    
            //assert
            expect(res.statusCode).toEqual(200)
            expect(typeof res.body).toEqual('object')
            expect(res.body).toHaveProperty('score')
            expect(typeof res.body.description).toEqual('number')

            done()
        })
    })


    // ======================== error rating not number ==========================
    it('should status 400, error rating score not number' ,function (done) {
        //setup
        const body = {
            score : "asih deh tapi error ya"
        }

        //excecute
        request(app) 
        .put(`/users/${userId}/ratings/${ratingId}`)
        .set('access_token', access_token)
        .send(body)
        .end((err, res) => {
            if(err) done(err)
                    
            //assert
            expect(res.statusCode).toEqual(400)
            expect(typeof res.body).toEqual('object')
            expect(res.body).toHaveProperty('message')
            expect(typeof res.body.message).toEqual('string')

            done()
        })
    })


    // ======================== error rating id not found ==========================
    it('should status 404, error rating id not found' ,function (done) {
        //setup
        const id = 9999999

        const body = {
            score : 2.44
        }

        //excecute
        request(app) 
        .put(`/users/${userId}/ratings/${id}`)
        .set('access_token', access_token)
        .send(body)
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
        const body = {
            score : 2.44
        }

        //excecute
        request(app) 
        .put(`/users/${userId}/ratings/${ratingId}`)
        .send(body)
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
})
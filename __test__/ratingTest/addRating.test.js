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
// ==========================  POST /users/:userId/ratings
// ==================================================================================

describe('POST /users/:userId/ratings',function() {
    let userId, access_token

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

    // ======================== successfull Create ratings ==========================
    it('should status 201, successfull Create ratings' ,function (done) {
        //setup
        const data = {
            score : 5
        }

        //excecute
        request(app) 
        .post(`/users/${userId}/ratings`)
        .set('access_token', access_token)
        .send(data)
        .end((err, res) => {
            if(err) done(err)
                    
            //assert
            expect(res.statusCode).toEqual(201)
            expect (typeof res.body).toEqual('object')
            expect(res.body).toHaveProperty('score')
            expect(typeof res.body.description).toEqual('number')

            done()
        })
    })

    // ======================== score not number ==========================
    it('should status 400, score not number ' ,function (done) {
        //setup
        const data = {
            score : ""
        }

        //excecute
        request(app) 
        .post(`/users/${userId}/ratings`)
        .set('access_token', access_token)
        .send(data)
        .end((err, res) => {
            if(err) done(err)
                    
            //assert
            expect(res.statusCode).toEqual(400)
            expect (typeof res.body).toEqual('object')
            expect(res.body).toHaveProperty('errors')
            expect(typeof res.body.errors).toEqual('string')

            done()
        })
    })

    // ======================== error user not login ==========================
    it('should status 403, successfull Create Comment' ,function (done) {
        //setup
        const data = {
            score : 5
        }

        //excecute
        request(app) 
        .post(`/users/${userId}/ratings`)
        .send(data)
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
const request = require('supertest')

const { beforeAll } = require("@jest/globals")

const { generateToken } = require('../../helpers/jwt')

const { Artist } = require('../../models')

const app = require('../../app')  

// ===================================================================================
// ==========================  POST /artists/:artisId/options
// ==================================================================================

describe('POST /artists/:artisId/options',function() {
    let artistId = null
    let access_token = null

    beforeAll(done => {
        Artist.findOne({where : {email : "user@mail.com"}})
        .then(data => {
            artistId = data.id

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

    // ======================== successfull Create option ==========================
    it('should status 201, successfull Create option' ,function (done) {
        //setup
        const body = {
            title : "create new option",
            extraPrice : 10000
        }

        //excecute
        request(app) 
        .post(`/artists/${artistId}/options`)
        .set('access_token', access_token)
        .send(body)
        .end((err, res) => {
            if(err) done(err)
                    
            //assert
            expect(res.statusCode).toEqual(201)
            expect (typeof res.body).toEqual('object')
            expect(res.body).toHaveProperty('title')
            expect(res.body).toHaveProperty('extraPrice')
            expect(typeof res.body.title).toEqual('string')
            expect(typeof res.body.extraPrice).toEqual('number')

            done()
        })
    })

    // ======================== extra empty ==========================
    it('should status 400, title dan extra empty' ,function (done) {
        //setup
        const body = {
            title : "",
            extraPrice : ""
        }

        //excecute
        request(app) 
        .post(`/artists/${artistId}/options`)
        .set('access_token', access_token)
        .send(body)
        .end((err, res) => {
            if(err) done(err)
                    
            //assert
            expect(res.statusCode).toEqual(400)
            expect (typeof res.body).toEqual('object')
            expect(res.body).toHaveProperty('errors')
            expect(Array.isArray(res.body.errors)).toEqual(true)

            done()
        })
    })

    // ======================== error user not login ==========================
    it('should status 401, error not login' ,function (done) {
        //setup
        const data = {
            title : "create new review",
            extraPrice : 10000
        }

        //excecute
        request(app) 
        .post(`/artists/${artistId}/options`)
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
    it('should status 500, internal server error' ,function (done) {
        //setup
        const body = {
            ssss : "sadsadasd",
            sssdsadasd : ""
        }

        //excecute
        request(app) 
        .post(`/artists/${artistId}/options`)
        .set('access_token', access_token)
        .send(body)
        .end((err, res) => {
            if(err) done(err)
                    
            //assert
            expect(res.statusCode).toEqual(500)
            expect (typeof res.body).toEqual('object')
            expect(res.body).toHaveProperty('messages')
            expect(typeof res.body.messages).toEqual("string")

            done()
        })
    })
})
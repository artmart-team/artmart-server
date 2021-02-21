// decribe POST /artists/:artistId/comments
// -- it success
// -- it error description empty
// -- it error user not login

// error masalah routingan

const request = require('supertest')

const { beforeAll } = require("@jest/globals")

const { generateToken } = require('../../helpers/jwt')

const { User } = require('../../models')

const app = require('../../app')  

// ===================================================================================
// ==========================  POST /users/:userId/comments
// ==================================================================================

describe('POST /users/:userId/comments',function() {
    let userId = null 
    let access_token = null

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

    // ======================== successfull Create Comment ==========================
    it('should status 201, successfull Create Comment' ,function (done) {
        //setup
        const data = {
            description : "sepertinya keren nih"
        }

        //excecute
        request(app) 
        .post(`/users/${userId}/comments`)
        .set('access_token', access_token)
        .send(data)
        .end((err, res) => {
            if(err) done(err)
                    
            //assert
            expect(res.statusCode).toEqual(201)
            expect (typeof res.body).toEqual('object')
            expect(res.body).toHaveProperty('description')
            expect(typeof res.body.description).toEqual('string')

            done()
        })
    })

    // ======================== description empty ==========================
    it('should status 400, Description empty' ,function (done) {
        //setup
        const data = {
            description : ""
        }

        //excecute
        request(app) 
        .post(`/users/${userId}/comments`)
        .set('access_token', access_token)
        .send(data)
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
    it('should status 403, successfull Create Comment' ,function (done) {
        //setup
        const data = {
            description : "sepertinya keren nih"
        }

        //excecute
        request(app) 
        .post(`/users/${userId}/comments`)
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
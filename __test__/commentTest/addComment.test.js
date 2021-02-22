// decribe POST /artists/:artistId/comments
// -- it success
// -- it error description empty
// -- it error user not login

// error masalah routingan

const request = require('supertest')

const { generateToken } = require('../../helpers/jwt')

const { User } = require('../../models')

const app = require('../../app')  
const { beforeAll } = require('@jest/globals')

// ===================================================================================
// ==========================  POST /users/:userId/comments
// ==================================================================================





describe('POST /users/:userId/comments',function() {

    let userId = 1
    let access_token = null
    let artistId = 1

    beforeAll(done => {
        User.findOne({where : {id : 1}})
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

    // ======================== successfull Create Comment ==========================
    it('should status 201, successfull Create Comment' ,function (done) {
        //setup
        const data = {
            description : "sepertinya keren nih"
        }

        //excecute
        request(app) 
        .post(`/users/${userId}/artists/${artistId}/comments`)
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
        .post(`/users/${userId}/artists/${artistId}/comments`)
        .set('access_token', access_token)
        .send(data)
        .end((err, res) => {
            if(err) done(err)
                    
            //assert
            expect(res.statusCode).toEqual(400)
            expect (typeof res.body).toEqual('object')
            expect(res.body).toHaveProperty('errors')
            // expect(typeof res.body.messages).toEqual('string')

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
        .post(`/users/${userId}/artists/${artistId}/comments`)
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
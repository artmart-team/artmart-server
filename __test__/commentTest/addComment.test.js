// decribe POST /artists/:artistId/comments
// -- it success
// -- it error description empty
// -- it error user not login

// error masalah routingan

const request = require('supertest')

const { generateToken } = require('../../helpers/jwt')

const { User, Artist } = require('../../models')

const app = require('../../app')  
const { beforeAll } = require('@jest/globals')
const ArtistController = require('../../controllers/ArtistController')

// ===================================================================================
// ==========================  POST /users/:userId/comments
// ==================================================================================
describe('POST /users/:userId/comments',function() {

    let userId = null
    let access_token = null
    let artistId = null

    beforeAll(done => {
        User.create({ 
            username : "userTestAddComment",
            firstName : "artist",
            lastName : "idsearch",
            email : "userTestAddComment@mail.com",
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
                username : "artistTestAddComment",
                firstName : "artist",
                lastName : "idsearch",
                email : "artistTestAddComment@mail.com",
                password : '123456',
                profilePicture : "link.google.com",
                completeDuration : 48,
                bankAccount : 230230230,
                defaultPrice : 100000
            })
        })
        .then(datas => {
            artistId = datas.id
            done()
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


    // ======================== error internal server ==========================
    // it('should status 500, error internal server' ,function (done) {
    //     //setup
    //     const data = {
    //         ssssss : "sdsad"
    //     }

    //     //excecute
    //     request(app) 
    //     .post(`/users/${userId}/artists/${artistId}/comments`)
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
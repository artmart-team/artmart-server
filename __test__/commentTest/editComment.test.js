// decribe PATCH /artists/:artistId/comments/:commentId   // updating title commnet or desciption
// -- it success 
// -- it error description empty
// -- it comment id not found
// -- it error not login user

const request = require('supertest')
const { User, Artist, Comment } = require('../../models')
const { beforeAll } = require("@jest/globals")
const app = require('../../app')  
const { generateToken } = require('../../helpers/jwt')

// ===================================================================================
// ==========================  PUT /users/:userId/comments/:commentId
// ==================================================================================

describe('PUT /users/:userId/comments/:commentId',function() {
    let artistId = null
    let userId = null
    let commentId = null
    let access_token = null

    beforeAll(done => {
        User.create({ 
            username : "userCommentEdit",
            firstName : "artist",
            lastName : "idsearch",
            email : "userCommentEdit@mail.com",
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
                username : "artistCommentEdit",
                firstName : "artist",
                lastName : "idsearch",
                email : "artistCommentEdit@mail.com",
                password : '123456',
                profilePicture : "link.google.com",
                completeDuration : 48,
                bankAccount : 230230230,
                defaultPrice : 100000
            })
        })
        .then(datas => {
            artistId = datas.id
            return Comment.create({
                description: "testingEditComment",
                UserId: userId,
                ArtistId: artistId
            })
        })
        .then(res => {
            commentId = res.id
            done()
        })
    })


    afterAll(done => {
        Comment.destroy({ where : { description : "testingEditComment"}})
        .then(data => {
            done()
        })
    })

    beforeAll(done => {
        User.findOne({where : {email : "user@mail.com"}})
        .then(data => {
            userId = data.id

            const decoded = {
                id : data.id,
                username : data.username,
                profilePicture : data.profilePicture
            }
            
            access_token = generateToken(decoded)
            done()
        })
        .catch(err => {
            console.log(err)
        })

    })

    // ======================== successfull edit comments ==========================
    it('should status 200, successfull edit COmment' ,function (done) {
        //setup
        const body = {
            description : "edit berhasil"
        }

        //excecute
        request(app) 
        .patch(`/users/${userId}/artists/${artistId}/comments/${commentId}`)
        .set('access_token', access_token)
        .send(body)
        .end((err, res) => {
            if(err) done(err)
                    
            //assert
            expect(res.statusCode).toEqual(200)
            expect(typeof res.body).toEqual('object')
            expect(res.body).toHaveProperty('description')
            expect(typeof res.body.description).toEqual('string')

            done()
        })
    })


    // ======================== error Desc comments epmty ==========================
    it('should status 400, error Desc comment empty' ,function (done) {
        //setup
        const body = {
            description : ""
        }

        //excecute
        request(app) 
        .patch(`/users/${userId}/artists/${artistId}/comments/${commentId}`)
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


    // ======================== error comments id not found ==========================
    it('should status 404, error comment id not found' ,function (done) {
        //setup
        const id = 999

        const body = {
            description : 'tidak berhasil edit'
        }

        //excecute
        request(app) 
        .patch(`/users/${userId}/artists/${artistId}/comments/${id}`)
        .set('access_token', access_token)
        .send(body)
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
        const body = {
            description : "tidak berhasil edit"
        }

        //excecute
        request(app) 
        .patch(`/users/${userId}/artists/${artistId}/comments/${commentId}`)
        .send(body)
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
    //     const body = {
    //         ssssss : "sadads"
    //     }

    //     //excecute
    //     request(app) 
    //     .put(`/users/${userId}/artists/${artistId}/comments/${commentId}`)
    //     .set('access_token', access_token)
    //     // .send(body)
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
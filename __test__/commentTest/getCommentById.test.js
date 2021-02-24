// describe GET /artists/:artistId/comments/:commentId
// -- it success
// -- it error comment id not found 


const request = require('supertest')
const { User, Artist, Comment } = require('../../models')
const { beforeAll } = require("@jest/globals")
const app = require('../../app')  

// ===================================================================================
// ==========================  GET /users/:userId/comments/:commentId
// ==================================================================================

describe('GET /users/:userId/comments/:commentId',function() {
    let artistId = null
    let userId = null
    let commentId = null

    beforeAll(done => {
        User.create({ 
            username : "userCommentGetId",
            firstName : "artist",
            lastName : "idsearch",
            email : "userCommentGetId@mail.com",
            password : '123456',
            profilePicture : ""
        })
        .then(data => {
            userId = data.id

            return Artist.create({
                username : "artistCommentGetId",
                firstName : "artist",
                lastName : "idsearch",
                email : "artistCommentGetId@mail.com",
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
                description: "testingGetCommentId",
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
        Comment.destroy({ where : { id : commentId}})
        .then(data => {
            return Artist.destroy({ where : {id : artistId}})
        })
        .then(dat => {
            return User.destroy({ where : { id : userId}})
        })
        .then(datas => {
            done()
        })
    })

    // ======================== successfull get comments ==========================
    it('should status 200, successfull get comments id' ,function (done) {
        //setup

        //excecute
        request(app) 
        .get(`/users/${userId}/comments/${commentId}`)
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


    // ======================== error comments id not found ==========================
    it('should status 404, error comment id not found' ,function (done) {
        //setup
        const id = 9999999

        //excecute
        request(app) 
        .get(`/users/${userId}/comments/${id}`)
        .end((err, res) => {
            if(err) done(err)
                    
            //assert
            expect(res.statusCode).toEqual(404)
            expect(typeof res.body).toEqual('object')
            expect(res.body).toHaveProperty('messages')
            expect(typeof res.body.messages).toEqual('string')

            done()
        })
    })

    // ======================== error internal server ==========================
    it('should status 500, error internal server' ,function (done) {
        //setup
        const id = "sdadsadasd"

        //excecute
        request(app) 
        .get(`/users/${userId}/comments/${id}`)
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

// ===================================================================================
// ==========================  GET /artists/:artistId/comments/:commentId
// ==================================================================================


    // ======================== successfull get comments ==========================
    it('should status 200, successfull get comments id' ,function (done) {
        //setup

        //excecute
        request(app) 
        .get(`/artists/${artistId}/comments/${commentId}`)
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


    // ======================== error comments id not found ==========================
    it('should status 404, error comment id not found' ,function (done) {
        //setup
        const id = 9999999

        //excecute
        request(app) 
        .get(`/artists/${artistId}/comments/${id}`)
        .end((err, res) => {
            if(err) done(err)
                    
            //assert
            expect(res.statusCode).toEqual(404)
            expect(typeof res.body).toEqual('object')
            expect(res.body).toHaveProperty('messages')
            expect(typeof res.body.messages).toEqual('string')

            done()
        })
    })

    // ======================== error internal server ==========================
    it('should status 500, error internal server' ,function (done) {
        //setup
        const id = "sdadsadasd"

        //excecute
        request(app) 
        .get(`/artists/${artistId}/comments/${id}`)
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
})

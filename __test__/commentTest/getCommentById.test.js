// describe GET /artists/:artistId/comments/:commentId
// -- it success
// -- it error comment id not found 


const request = require('supertest')
const { User, Comment, Artist } = require('../../models')
const { beforeAll } = require("@jest/globals")
const app = require('../../app')  

// ===================================================================================
// ==========================  GET /users/:userId/comments/:commentId
// ==================================================================================

describe('GET /users/:userId/comments/:commentId',function() {
    let userId
    let commentId

    beforeAll(done => {
        User.findOne({where : {email : "user@mail.com"}})
        .then(data => {
            userId = data.id

            return Comment.findOne({where : {description : "buat test get comment by id"}})
        })
        then(res => {
            commentId = res.id
        })
        .catch(err => {
            console.log(err)
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
            expect(typeof res.body).toEqual('Object')
            expect(res.body).toHaveProperty('message')
            expect(res.body).toEqual({
                message : expect.any(String),
            })
            done()
        })
    })
})


// ===================================================================================
// ==========================  GET /users/:artistId/comments/:commentId
// ==================================================================================

describe('GET /artists/:artistId/comments/:commentId',function() {
    let artistId
    let commentId

    beforeAll(done => {
        Artist.findOne({where : {email : "user@mail.com"}})
        .then(data => {
            artistId = data.id
            return Comment.findOne({where : {description : "buat test get comment by id"}})
        })
        then(res => {
            commentId = res.id
        })
        .catch(err => {
            console.log(err)
        })
    })

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
})
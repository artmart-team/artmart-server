// describe GET /artists/:artistId/comments   //comment artisnya
// -- it success

const request = require('supertest')

const { beforeAll } = require("@jest/globals")

const { User, Artist } = require('../../models')

const app = require('../../app')  

// ===================================================================================
// ==========================  GET /users/:userId/comments
// ==================================================================================

describe('GET /users/:userId/comments',function() {
    let userId

    beforeAll(done => {
        User.findOne({where : {email : "user@mail.com"}})
        .then(data => {
            userId = data.id
            done()
        })
        .catch(err => {
            console.log(err)
        })
    })

    // ======================== successfull get all comments ==========================
    it('should status 200, successfull get all comments' ,function (done) {
        //setup

        //excecute
        request(app) 
        .get(`/users/${userId}/comments`)
        .end((err, res) => {
            if(err) done(err)
                    
            //assert
            expect(res.statusCode).toEqual(200)
            res.body(Array.isArray (res.body)).toEqual(true)
            res.body.forEach(comment => {
                expect (typeof comment).toEqual('Object')
                expect (comment).toHaveProperty('description')
                expect (typeof comment.description).toHaveProperty('string')
            })

            done()
        })
    })
})


// ===================================================================================
// ==========================  GET /artists/:artistId/comments
// ==================================================================================

describe('GET /artists/:artistId/comments',function() {
    let artistId

    beforeAll(done => {
        Artist.findOne({where : {email : "user@mail.com"}})
        .then(data => {
            artistId = data.id
            done()
        })
        .catch(err => {
            console.log(err)
        })
    })

    // ======================== successfull get all comments ==========================
    it('should status 200, successfull get all comments' ,function (done) {
        //setup

        //excecute
        request(app) 
        .get(`/artists/${artistId}/comments`)
        .end((err, res) => {
            if(err) done(err)
                    
            //assert
            expect(res.statusCode).toEqual(200)
            res.body(Array.isArray (res.body)).toEqual(true)
            res.body.forEach(comment => {
                expect (typeof comment).toEqual('Object')
                expect (comment).toHaveProperty('description')
                expect (typeof comment.description).toHaveProperty('string')
            })

            done()
        })
    })
})
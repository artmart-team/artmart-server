// describe GET /artists/:artistId/comments   //comment artisnya
// -- it success

const request = require('supertest')

const app = require('../../app')  

// ===================================================================================
// ==========================  GET /users/:userId/comments
// ==================================================================================

describe('GET /users/:userId/comments',function() {
    let userId = 1

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
            expect(Array.isArray (res.body)).toEqual(true)
            res.body.forEach(comment => {
                expect (typeof comment).toEqual('object')
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
    let artistId = 1

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
            expect(Array.isArray (res.body)).toEqual(true)
            res.body.forEach(comment => {
                expect (typeof comment).toEqual('object')
                expect (comment).toHaveProperty('description')
                expect (typeof comment.description).toEqual('string')
            })

            done()
        })
    })
})
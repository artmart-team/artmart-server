// describe GET /users/:userId
// -- it success
// -- it error id not found 

//2 testing, 1 success, 1 error test

const request = require('supertest')

const { Picture, Artist } = require('../../models')

const { beforeAll, afterAll } = require("@jest/globals")

const app = require('../../app')  

// ===================================================================================
// ==========================    GET /artists/:artistId/images
// ==================================================================================

describe('GET /artists/:artistId/images/:imageId',function() {
    let artId, pictId

    beforeAll(done => {
        Artist.findOne({ where  : { email : "user@mail.com"}})
        .then(data => {
            artId = data.id
            return Picture.findOne({ where : { name : "getId picture testing"}})
        })
        .then(res => {
            pictid = res.id
            done()
        })
        .catch(err => {
            console.log(err, "<< err getPictById.test.js")
        })

    })
    
    // ======================== successfull get image ==========================
    it('should status 200, successfull get all Image' ,function (done) {
        //setup

        //excecute
        request(app) 
        .get(`/artists/${artId}/images/${pictId}`)
        .end((err, res) => {
            if(err) done(err)
                    
            //assert
            expect(res.statusCode).toEqual(200)
            expect(typeof res.body).toEqual('Object')
            expect(res.body).toHaveProperty('name')
            expect(res.body).toHaveProperty('description')
            expect(res.body).toHaveProperty('price')
            expect(res.body).toHaveProperty('link')
            expect(res.body).toEqual({
                name : expect.any(String),
                description : expect.any(String),
                price : expect.any(Number),
                link : expect.any(String),

            })
            done()
        })
    })

    // ======================== error image id not found ==========================
    it('should status 404, error image id not found' ,function (done) {
        //setup
        const idImage = 9999999

        //excecute
        request(app) 
        .get(`/artists/${artId}/images/${idImage}`)
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
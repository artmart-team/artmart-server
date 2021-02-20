// describe GET /users/:userId
// -- it success
// -- it error id not found 

// 1 testting, 1 success test

const request = require('supertest')

const { Picture, Artist, Category, User } = require('../../models')

const { beforeAll, afterAll } = require("@jest/globals")

const app = require('../../app')  

// ===================================================================================
// ==========================    GET /artists/:artistId/pictures
// ==================================================================================

describe('GET /artists/:artistId/pictures',function() {
    let artId 

    beforeAll(done => {
        Artist.create({ where : {email : 'user@mail.com'}})
        .then(data => {
            artId = data.id
            done()
        })
        .catch(err => {
            console.log(err, "<< err create artist getPict.test.js")
        })   
    })

    
    // ======================== successfull get image ==========================
    it('should status 200, successfull get all Image' ,function (done) {
        //setup
        const id = artId

        //excecute
        request(app) 
        .get(`/artists/${id}/pictures`)
        .end((err, res) => {
            if(err) done(err)
                    
            //assert
            expect(res.statusCode).toEqual(200)
            res.body(Array.isArray (res.body)).toEqual(true)
            res.body.forEach(picture => {
                expect (typeof picture).toEqual('Object')
                expect (picture).toHaveProperty('name')
                expect (picture).toHaveProperty('description')
                expect (picture).toHaveProperty('price')
                expect (picture).toHaveProperty('link')

                expect (typeof picture.name).toHaveProperty('string')
                expect (typeof picture.description).toHaveProperty('string')
                expect (typeof picture.price).toHaveProperty('number')
                expect (typeof picture.link).toHaveProperty('string')
            })

            done()
        })
    })
})
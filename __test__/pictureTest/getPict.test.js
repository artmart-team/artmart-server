// describe GET /users/:userId
// -- it success
// -- it error id not found 

// 1 testting, 1 success test

const request = require('supertest')

const { Picture, Artist, Category, User } = require('../../models')

const { beforeAll } = require("@jest/globals")

const app = require('../../app')  

// ===================================================================================
// ==========================    GET /artists/:artistId/pictures
// ==================================================================================

describe('GET /artists/:artistId/pictures',function() {
    let artId = null
    let userId = null
    let catId = null

    beforeAll(done => {
        Artist.create({
            username : "PictureArtistTestGet",
            firstName : "artist",
            lastName : "idsearch",
            email : "PictureArtistTestGet@mail.com",
            password : '123456',
            profilePicture : "link.google.com",
            completeDuration : 48,
            bankAccount : 230230230,
            defaultPrice : 100000
        })
        .then(artis => {
            artId = artis.id

            return Category.create({
                name: "testGetPictAll"
            })
        })
        .then(cat => {
            catId = cat.id

            return User.create({
                username : "getUserforPictGet",
                firstName : "artist",
                lastName : "idsearch",
                email : "getUserforPictGet@mail.com",
                password : '123456',
                profilePicture : "link.google.com"
            })
        })
        .then(data => {
            userId = data.id
            return Picture.create({
                name : 'testing nih buat get',
                description : 'asik pokoknya',
                price : 100000,
                link : 'www.google.com',
                hidden : false,
                CategoryId : catId,
                ArtistId : artId,
                UserId : ""
            })
        })
        .then(res => {
            done()
        })
    })

    
    // ======================== successfull get image ==========================
    it('should status 200, successfull get all Image' ,function (done) {
        //setup

        //excecute
        request(app) 
        .get(`/artists/${artId}/pictures`)
        .end((err, res) => {
            if(err) done(err)
                    
            //assert
            expect(res.statusCode).toEqual(200)
            expect(Array.isArray (res.body)).toEqual(true)
            expect(res.body[0]).toHaveProperty('name')
            expect(res.body[0]).toHaveProperty('description')
            expect(res.body[0]).toHaveProperty('price')
            expect(res.body[0]).toHaveProperty('link')
            expect(typeof res.body[0].description).toEqual('string')
            expect(typeof res.body[0].price).toEqual('number')
            expect(typeof res.body[0].link).toEqual('string')

            done()
        })
    })

    // ======================== error internal server ==========================
    it('should status 500, error internal server' ,function (done) {
        //setup
        const idArt = "asd"


        //excecute
        request(app) 
        .get(`/artists/${idArt}/pictures`)
        .end((err, res) => {
            if(err) done(err)
                    
            //assert
            expect(res.statusCode).toEqual(500)
            expect (typeof res.body).toEqual('object')
            expect (res.body).toHaveProperty('messages')
            expect (typeof res.body.messages).toEqual('string')

            done()
        })
    })


    // =====================
    // testing get by user
    // =======================

     // ======================== successfull get image ==========================
     it('should status 200, successfull get all Image' ,function (done) {
        //setup

        //excecute
        request(app) 
        .get(`/users/${userId}/pictures`)
        .end((err, res) => {
            if(err) done(err)
                    
            //assert
            expect(res.statusCode).toEqual(200)
            expect(Array.isArray (res.body)).toEqual(true)
            expect(res.body[0]).toHaveProperty('name')
            expect(res.body[0]).toHaveProperty('description')
            expect(res.body[0]).toHaveProperty('price')
            expect(res.body[0]).toHaveProperty('link')
            expect(typeof res.body[0].description).toEqual('string')
            expect(typeof res.body[0].price).toEqual('number')
            expect(typeof res.body[0].link).toEqual('string')

            done()
        })
    })


    // ======================== error internal server ==========================
    it('should status 500, error internal server' ,function (done) {
        //setup
        const idUser = "asdadasd"


        //excecute
        request(app) 
        .get(`/users/${idUser}/pictures`)
        .end((err, res) => {
            if(err) done(err)
                    
            //assert
            expect(res.statusCode).toEqual(500)
            expect (typeof res.body).toEqual('object')
            expect (res.body).toHaveProperty('messages')
            expect (typeof res.body.messages).toEqual('string')

            done()
        })
    })
})
// describe GET /users/:userId
// -- it success
// -- it error id not found 

//2 testing, 1 success, 1 error test

const request = require('supertest')

const { Picture, Artist, Category, User } = require('../../models')

const app = require('../../app')  

// ===================================================================================
// ==========================    GET /artists/:artistId/pictures
// ==================================================================================

describe('GET /artists/:artistId/pictures/:pictureId',function() {
    let artId = null
    let userId = null
    let catId = null
    let pictId = null

    beforeAll(done => {
        //dummy Artist login
        Artist.create({
            username : "pictIdgetTesting",
            firstName : "artist",
            lastName : "idsearch",
            email : "pictIdgetTesting@mail.com",
            password : '123456',
            profilePicture : "link.google.com",
            completeDuration : 48,
            bankAccount : 230230230,
            defaultPrice : 100000
        })
        .then(artis => {
            artId = artis.id

            return Category.create({
                name: "PictIdgetTesting"
            }) 
        })
        .then(cat => {
            catId = cat.id
            return User.create({
                username : "getTestPictureUser",
                firstName : "artist",
                lastName : "idsearch",
                email : "getTestPictureUser@mail.com",
                password : '123456',
                profilePicture : "link.google.com"
            })
        })
        .then(user => {
            userId = user.id
            return Picture.create({
                name : 'testing buat get Id',
                description : 'asik pokoknya',
                price : 100000,
                link : 'www.google.com',
                hidden : false,
                CategoryId : catId,
                ArtistId : artId,
                UserId : userId
            })
        })
        .then(res => {
            pictId = res.id
            done()
        })
    })

    // ======================== successfull get image ==========================
    it('should status 200, successfull get all Image' ,function (done) {
        //setup

        //excecute
        request(app) 
        .get(`/artists/${artId}/pictures/${pictId}`)
        .end((err, res) => {
            if(err) done(err)
                    
            //assert
            expect(res.statusCode).toEqual(200)
            expect(typeof res.body).toEqual('object')
            expect(res.body).toHaveProperty('name')
            expect(res.body).toHaveProperty('description')
            expect(res.body).toHaveProperty('price')
            expect(res.body).toHaveProperty('link')
            expect(typeof res.body.name).toEqual('string')
            expect(typeof res.body.description).toEqual('string')
            expect(typeof res.body.price).toEqual('number')
            expect(typeof res.body.link).toEqual('string')
            
            done()
        })
    })

    // ======================== error image id not found ==========================
    it('should status 404, error image id not found' ,function (done) {
        //setup
        const idImage = 999

        //excecute
        request(app) 
        .get(`/artists/${artId}/pictures/${idImage}`)
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
        const idImage = "szz"

        //excecute
        request(app) 
        .get(`/artists/${artId}/pictures/${idImage}`)
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



    // ====================================================
    // testing for user pict id
    // ====================================================

    // ======================== successfull get image ==========================
    it('should status 200, successfull get all Image' ,function (done) {
        //setup

        //excecute
        request(app) 
        .get(`/users/${userId}/pictures/${pictId}`)
        .end((err, res) => {
            if(err) done(err)
                    
            //assert
            expect(res.statusCode).toEqual(200)
            expect(typeof res.body).toEqual('object')
            expect(res.body).toHaveProperty('name')
            expect(res.body).toHaveProperty('description')
            expect(res.body).toHaveProperty('price')
            expect(res.body).toHaveProperty('link')
            expect(typeof res.body.name).toEqual('string')
            expect(typeof res.body.description).toEqual('string')
            expect(typeof res.body.price).toEqual('number')
            expect(typeof res.body.link).toEqual('string')
            
            done()
        })
    })

    // ======================== error image id not found ==========================
    it('should status 404, error image id not found' ,function (done) {
        //setup
        const idImage = 999

        //excecute
        request(app) 
        .get(`/users/${userId}/pictures/${idImage}`)
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
        const idImage = "sad"

        //excecute
        request(app) 
        .get(`/users/${userId}/pictures/${idImage}`)
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
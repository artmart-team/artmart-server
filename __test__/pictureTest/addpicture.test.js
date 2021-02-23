// decribe POST /artists/:artistId/pictures
// -- it success
// -- it error name empty
// -- it error description empty
// -- it error price empty
// -- it error link empty
// -- it error artis Id empty // not login


// 5 testing, 1 success , 4 error testing

const request = require('supertest')

const { Artist, Category } = require('../../models')

const { beforeAll } = require("@jest/globals")

const app = require('../../app')  
const { generateToken } = require('../../helpers/jwt')
const { stack } = require('../../routes/catRouter')

// ===================================================================================
// ==========================    POST /artists/:artistId/pictures
// ==================================================================================

describe('POST /artists/:artistId/pictures', function() {
    let artId = null
    let access_token = null
    let catId = null

    beforeAll(done => {
        Artist.create({
            username : "testingPictureAkunArtist",
            firstName : "artist",
            lastName : "idsearch",
            email : "testingPictureAkunArtist@mail.com",
            password : '123456',
            profilePicture : "link.google.com",
            completeDuration : 48,
            bankAccount : 230230230,
            defaultPrice : 100000
        })
        .then(artis => {
            artId = artis.id

            const payload = {
                id : artis.id,
                username : artis.username,
                profilePicture : artis.profilePicture
            }

            access_token = generateToken(payload)

            return Category.create({
                name: "theTestPictureAdd"
            })
            
        })
        .then(data => {
            catId = data.id
            done()
        })
    })

    // ======================== successfull add Picture ==========================
    it('should status 201, successfull create picture' ,function (done) {
        //setup
        const body = {
            name : 'asik nih',
            description : '',
            price : 100000,
            link : 'www.google.com',
            CategoryId : catId,
            UserId : ""      
        }
    
        //excecute
        request(app) 
        .post(`/artists/${artId}/pictures`)
        .set("access_token", access_token)
        .send(body)
        .end((err, res) => {
            if(err) done(err)
                    
            //assert
            expect(res.statusCode).toEqual(201)
            expect(typeof res.body).toEqual('object')
            expect(res.body).toHaveProperty('name')
            expect(res.body).toHaveProperty('description')
            expect(res.body).toHaveProperty('price')
            expect(res.body).toHaveProperty('link')
            expect(res.body).toHaveProperty('CategoryId')
            expect(res.body).toHaveProperty('ArtistId')
            expect(typeof res.body.name).toEqual('string')
            expect(typeof res.body.description).toEqual('string')
            expect(typeof res.body.price).toEqual('number')
            expect(typeof res.body.link).toEqual('string')


            done()
        })
    })

    // ==========================  name diisi kosong  ===============================
    it('should status 400, error input picture name empty / null' ,function (done) {
        //setup
        const body = {
            name : '',
            description : '',
            price : 100000,
            link : 'www.google.com',
            CategoryId : catId,
            UserId : ""       
        }
    
        //excecute
        request(app) 
        .post(`/artists/${artId}/pictures`)
        .set("access_token", access_token)
        .send(body)
        .end((err, res) => {
            if(err) done(err)
                    
            //assert
            expect(res.statusCode).toEqual(400)
            expect(typeof res.body).toEqual('object')
            expect(res.body).toHaveProperty('errors')

            done()
        })
    })


    // ====================== price diisi kosong ===========================
    it('should status 400, error input price empty / null' ,function (done) {
        //setup
        const body = {
            name : '',
            description : '',
            price : "",
            link : 'www.google.com',
            CategoryId : catId,
            UserId : ""       
        }
    
        //excecute
        request(app) 
        .post(`/artists/${artId}/pictures`)
        .set("access_token", access_token)
        .send(body)
        .end((err, res) => {
            if(err) done(err)
                    
            //assert
            expect(res.statusCode).toEqual(400)
            expect(typeof res.body).toEqual('object')
            expect(res.body).toHaveProperty('errors')

            done()
        })
    })


    // ====================== link diisi kosong ===========================
    it('should status 400, error input lastname empty / null' ,function (done) {
        //setup
        const body = {
            name : 'asdasdasds',
            description : '',
            price : 100000,
            link : '',
            CategoryId : catId,
            UserId : ""       
        }
    
        //excecute
        request(app) 
        .post(`/artists/${artId}/pictures`)
        .set("access_token", access_token)
        .send(body)
        .end((err, res) => {
            if(err) done(err)
                    
            //assert
            expect(res.statusCode).toEqual(400)
            expect(typeof res.body).toEqual('object')
            expect(res.body).toHaveProperty('errors')

            done()
        })
    })


    // ====================== artist not login ===========================
    it('should status 403, error not login ' ,function (done) {
        //setup
        const body = {
            name : 'asdsadsa',
            description : 'asdsadsa',
            price : 100000,
            link : 'www.google.com',
            CategoryId : catId,
            ArtistId : artId,
            UserId : ""       
        }
    
        //excecute
        request(app) 
        .post(`/artists/${artId}/pictures`)
        .send(body)
        .end((err, res) => {
            if(err) done(err)
                    
            //assert
            expect(res.statusCode).toEqual(401)
            expect(typeof res.body).toEqual('object')
            expect(res.body).toHaveProperty('messages')
            expect(typeof res.body.messages).toEqual('string')

            done()
        })
    })


    // ====================== error internal server ===========================
    // it('should status 500, error internal server' ,function (done) {
    //     //setup
    //     const body = {
    //         adadasd : 'asdasdasds',
    //         asdasdasdsa : '',
    //         asdsadasdsa : 100000,
    //         liasdsadnk : ''       
    //     }
    //     //excecute
    //     request(app) 
    //     .post(`/artists/${artId}/pictures`)
    //     .set("access_token", access_token)
    //     .send(body)
    //     .end((err, res) => {
    //         if(err) done(err)
                    
    //         //assert
    //         expect(res.statusCode).toEqual(500)
    //         expect(typeof res.body).toEqual('object')
    //         expect(res.body).toHaveProperty('messages')
    //         expect(typeof res.body.messages).toHaveProperty('string')

    //         done()
    //     })
    // })
})
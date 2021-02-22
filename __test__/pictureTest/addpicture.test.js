// decribe POST /artists/:artistId/pictures
// -- it success
// -- it error name empty
// -- it error description empty
// -- it error price empty
// -- it error link empty
// -- it error artis Id empty // not login


// 5 testing, 1 success , 4 error testing

const request = require('supertest')

const { Artist } = require('../../models')

const { beforeAll } = require("@jest/globals")

const app = require('../../app')  
const { generateToken } = require('../../helpers/jwt')

// ===================================================================================
// ==========================    POST /artists/:artistId/pictures
// ==================================================================================

describe('POST /artists/:artistId/pictures', function() {
    let artId = null
    let access_token = null
    let catId = 1
    let idUser = 1

    beforeAll(done => {
        //dummy Artist login
        Artist.findOne( { where : { email : "user@mail.com"}})
        .then(artis => {
            artId = artis.id

            const payload = {
                id : artist.id,
                username : artist.username,
                profilePicture : artist.profilePicture
            }

            access_token = generateToken(payload)

            if(artId && catId && idUser) {
                done()
            }
        })
        .catch(err => {
            console.log(err, "<< err beforeAll get token putUser.test.js")
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
            UserId : idUser       
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
            expect(res.body).toHaveProperty('UserId')
            expect(res.body).toEqual({
                name : expect.any(String),
                price : expect.any(Number),
                link : expect.any(String),
                description : expect.any(String),
            })

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
            UserId : idUser       
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
            UserId : idUser       
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
            UserId : idUser       
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
            UserId : idUser       
        }
    
        //excecute
        request(app) 
        .post(`/artists/${artId}/pictures`)
        .send(body)
        .end((err, res) => {
            if(err) done(err)
                    
            //assert
            expect(res.statusCode).toEqual(403)
            expect(typeof res.body).toEqual('object')
            expect(res.body).toHaveProperty('message')
            expect(typeof res.body.message).toHaveProperty('string')

            done()
        })
    })
})
// decribe POST /artists/:artistId/pictures
// -- it success
// -- it error name empty
// -- it error description empty
// -- it error price empty
// -- it error link empty
// -- it error artis Id empty // not login


// 5 testing, 1 success , 4 error testing

const request = require('supertest')

const { Artist, Category, User } = require('../../models')

const { beforeAll, afterAll } = require("@jest/globals")

const app = require('../../app')  

// ===================================================================================
// ==========================    POST /artists/:artistId/pictures
// ==================================================================================

describe('POST /artists/:artistId/pictures', function() {
    let artId, catId, idUser, access_token

    beforeAll(done => {
        Artist.create({
            username : 'username',
            firstName : 'user',
            lastName : 'name',
            email : 'user@mail.com',
            password : '123456',
            bankAccount : 230230230,
            profilePicture : "link.google.com",
            completeDuration: 48
        })
        .then(data => {
            artId = data.id
        })
        .catch(err => {
            console.log(err, "<< err create artist image test")
        })

        User.create({
            username : 'username',
            firstName : 'user',
            lastName : 'name',
            email : 'user@mail.com',
            password : '123456',
            profilePicture : "link.google.com"
        })
        .then(data => {
            idUser = data.id
        })
        .catch(err => {
            console.log(err, "<< err create artist image test")
        })

        Category.create({
            name : 'image'
        })
        .then(data => {
            catId = data.id

        })
        .catch(err => {
            console.log(err, "<< err create image category test")
        })


        //dummy Artist login
        Artist.findOne( { where : { email : "user@mail.com"}})
        .then(artis => {
            const payload = {
                id : artis.id,
                username : artis.username
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

    afterAll(done => {
        Picture.destroy()
        .then(() => {
        })
        .catch(err => {
            console.log(err, "<< err delete Image test")
        })

        Category.destroy()
        .then(() => {
        })
        .catch(err => {
            console.log(err, "<< err delete category create image test")
        })

        Artist.destroy()
        .then(() => {
        })
        .catch(err => {
            console.log(err, "<< err delete category create image test")
        })
        User.destroy()
        .then(() => {
            done()
        })
        .catch(err => {
            console.log(err, "<< err delete category create image test")
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
            expect(res.statusCode).toEqual(302)
            expect(typeof res.body).toEqual('object')
            expect(res.body).toHaveProperty('message')
            expect(typeof res.body.message).toHaveProperty('string')

            done()
        })
    })
})
// decribe PATCH /artists/:artistId/images/:imageId   // updating title commnet or desciption
// -- it success 
// -- it error name empty
// -- it error artis Id empty // not login 
// -- it error image id not found

const request = require('supertest')

const { Picture, Artist, Category, User } = require('../../models')

const { beforeAll, afterAll } = require("@jest/globals")

const app = require('../../app')  

// ===================================================================================
// ==========================    PUT /artists/:artistId/images
// ==================================================================================

describe('PATCH /artists/:artistId/images/:imageId',function() {
    let artId, catId, pictId, idUser, access_token

    beforeAll(done => {
        Artist.create({
            username : 'username',
            firstName : 'user',
            lastName : 'name',
            email : 'user@mail.com',
            password : '123456',
            profilePicture : 'link.google.com',
            bankAccount : 23023023,
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
            profilePicture : 'link.google.com'
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

        Picture.create({
            name : 'asik nih',
            description : '',
            price : 100000,
            link : 'www.google.com',
            CategoryId : catId,
            ArtistId : artId,
            UserId : idUser
        })
        .then(data => {
            pictId = data.id
            done()
        })
        .catch(err => {
            console.log(err, "<< err create image test") 
        })


        //dummy Artist login
        Artist.findOne( { where : { email : "user@mail.com"}})
        .then(artis => {
            const payload = {
                id : artis.id,
                username : artis.username
            }

            access_token = generateToken(payload)

            done()
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
    
    // ======================== successfull update image ==========================
    it('should status 200, successfull get all Image' ,function (done) {
        //setup
        const body = {
            name : 'foto keren abis'
        }

        //excecute
        request(app) 
        .put(`/artists/${artId}/images/${pictId}`)
        .set('access_token', access_token)
        .send(body)
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

        // ======================== error name empty ==========================
        it('should status 400, error name required' ,function (done) {
            //setup
            const body = {
                name = ""
            }
    
            //excecute
            request(app) 
            .put(`/artists/${artId}/images/${pictId}`)
            .set('access_token', access_token)
            .send(body)
            .end((err, res) => {
                if(err) done(err)
                        
                //assert
                expect(res.statusCode).toEqual(400)
                expect(typeof res.body).toEqual('Object')
                expect(res.body).toHaveProperty('message')
                expect(res.body).toEqual({
                    message : expect.any(String),
                })
                done()
            })
        })

    // ======================== error image id not found ==========================
    it('should status 404, error image id not found' ,function (done) {
        //setup
        const idImage = 9999999

        const body = {
            name = "keren deh"
        }

        //excecute
        request(app) 
        .put(`/artists/${artId}/images/${idImage}`)
        .set('access_token', access_token)
        .send(body)
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


    // ======================== error artist not login ==========================
    it('should status 403, error Artist id not login' ,function (done) {
        //setup
        const body = {
            name = "keren deh"
        }

        //excecute
        request(app) 
        .put(`/artists/${artId}/images/${pictId}`)
        .send(body)
        .end((err, res) => {
            if(err) done(err)
                    
            //assert
            expect(res.statusCode).toEqual(403)
            expect(typeof res.body).toEqual('Object')
            expect(res.body).toHaveProperty('message')
            expect(res.body).toEqual({
                message : expect.any(String),
            })
            done()
        })
    })
})


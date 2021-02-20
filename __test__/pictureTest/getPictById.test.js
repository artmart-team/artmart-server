// describe GET /users/:userId
// -- it success
// -- it error id not found 

//2 testing, 1 success, 1 error test

const request = require('supertest')

const { Picture, Artist, Category, User } = require('../../models')

const { beforeAll, afterAll } = require("@jest/globals")

const app = require('../../app')  

// ===================================================================================
// ==========================    GET /artists/:artistId/images
// ==================================================================================

describe('GET /artists/:artistId/images/:imageId',function() {
    let artId, catId, pictId, idUser

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
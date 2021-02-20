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
    let catId
    let idUser

    beforeAll(done => {
        Artist.create({
            username : 'username',
            firstName : 'user',
            lastName : 'name',
            email : 'user@mail.com',
            password : '123456',
            profilePicture : "link.google.com",
            bankAccount : 230230230,
            completeDuration: 48
        })
        .then(data => {
            artId = data.id
        })
        .catch(err => {
            console.log(err, "<< err create artist getPict.test.js")
        })

        User.create({
            username : 'username',
            firstName : 'user',
            lastName : 'name',
            email : 'user@mail.com',
            password : '123456',
            profilePicture : "link.google.com",

        })
        .then(data => {
            idUser = data.id
        })
        .catch(err => {
            console.log(err, "<< err create user getPict.test.js")
        })

        Category.create({
            name : 'image'
        })
        .then(data => {
            catId = data.id
        })
        .catch(err => {
            console.log(err, "<< err create category getPict.test.js")
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
        .then(() => {
            done()
        })
        .catch(err => {
            console.log(err, "<< err create picture getPict.test.js") 
        })
    })

    afterAll(done => {
        Picture.destroy()
        .then(() => {
        })
        .catch(err => {
            console.log(err, "<< err delete picture getPict.test.js")
        })

        Category.destroy()
        .then(() => {
        })
        .catch(err => {
            console.log(err, "<< err delete category getPict.test.js")
        })

        Artist.destroy()
        .then(() => {
        })
        .catch(err => {
            console.log(err, "<< err delete Artist  getPict.test.js")
        })

        User.destroy()
        .then(() => {
            done()
        })
        .catch(err => {
            console.log(err, "<< err delete User  getPict.test.js")
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
// describe GET /images
// -- it success


// 1 success test

const request = require('supertest')

const { Picture, Artist, Category, User } = require('../../models')

const { beforeAll, afterAll } = require("@jest/globals")

const app = require('../../app')  

// ===================================================================================
// ==========================    GET /images
// ==================================================================================

describe('GET /images',function() {
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

        Image.create({
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
            console.log(err, "<< err create image test") 
        })
    })

    afterAll(done => {
        Image.destroy()
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
        .get(`/images`)
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
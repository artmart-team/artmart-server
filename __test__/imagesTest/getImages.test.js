// describe GET /users/:userId
// -- it success
// -- it error id not found 

const request = require('supertest')

const { Image, Artist, Category } = require('../models')

const { beforeAll, afterAll } = require("@jest/globals")

const app = require('../app')  

// ===================================================================================
// ==========================    GET /users/:userId
// ==================================================================================

describe('GET /artists/:artistId/images',function() {
    let artId 
    let catId

    beforeAll(done => {
        Artist.create({
            username : 'username',
            firstName : 'user',
            lastName : 'name',
            email : 'user@mail.com',
            password : '123456',
        })
        .then(data => {
            artId = data.id
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
            hidden: false,
            categoryId : catId,
            artistId : artId
        })
        .then(() => {
            done()
        })
        .catch(err => {
            console.log(err, "<< err create image test") 
        })
    })

    afterAll(done => {
        Image.delete()
        .then(() => {
        })
        .catch(err => {
            console.log(err, "<< err delete Image test")
        })

        Category.delete()
        .then(() => {
        })
        .catch(err => {
            console.log(err, "<< err delete category create image test")
        })

        Artist.delete()
        .then(() => {
            done()
        })
        .catch(err => {
            console.log(err, "<< err delete category create image test")
        })
        
    })
    
    // ======================== successfull login ==========================
    it('should status 200, successfull get all Image' ,function (done) {
        //setup
        const id = userId

        //excecute
        request(app) 
        .get(`/artists/${artId}/images`)
        .end((err, res) => {
            if(err) done(err)
                    
            //assert
            expect(res.statusCode).toEqual(200)
            expect(typeof res.body).toEqual('Object')
            expect(res.body).toHaveProperty('name')
            expect(res.body).toHaveProperty('description')
            expect(res.body).toHaveProperty('price')
            expect(res.body).toHaveProperty('link')
            expect(res.body).toHaveProperty('hidden')
            expect(res.body).toHaveProperty('CategoryId')
            expect(res.body).toHaveProperty('ArtistId')
            expect(res.body).toEqual({
                name : expect.any(String),
                description : expect.any(String),
                price : expect.any(Number),
                link : expect.any(String),
                hidden : expect.any(Boolean)
            })
            done()
        })
    })

    // ==========================  error artist belom login   ===============================
    it('should status 401, error artist not login' ,function (done) {
        //setup
        const id = 9999999
    
        //excecute
        request(app) 
        .get(`/artists/${artId}/image`)
        // .end((err, res) => {
        //     if(err) done(err)
                    
        //     //assert
        //     expect(res.statusCode).toEqual(404)
        //     expect(typeof res.body).toEqual('object')
        //     expect(res.body).toHaveProperty('message')
        //     expect(res.body.message).toEqual('artists id not found')
        //     done()
        // })
    })
})
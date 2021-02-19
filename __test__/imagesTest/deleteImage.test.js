// describe DELETE /artists/:artistId/images/:imageId
// -- it success
// -- it error images id not found

const request = require('supertest')

const { Image, Artist, Category } = require('../models')

const { beforeAll, afterAll } = require("@jest/globals")

const app = require('../app')  

// ===================================================================================
// ==========================    DELETE /artists/:artistId/images/:imageId
// ==================================================================================

describe('DELETE /artists/:artistId/images/:imageId',function() {
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
    
    // ======================== successfull get image ==========================
    it('should status 200, successfull get all Image' ,function (done) {
        //setup
        const id = artId

        //excecute
        request(app) 
        .get(`/artists/${id}/images`)
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
})
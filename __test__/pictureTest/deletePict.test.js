// describe DELETE /artists/:artistId/pictures/:pictureId
// -- it success
// -- it error pictures id not found

const request = require('supertest')

const { Picture, Artist, Category } = require('../models')

const { beforeAll, afterAll } = require("@jest/globals")

const app = require('../app')  

// ===================================================================================
// ==========================    DELETE /artists/:artistId/pictures/:pictureId
// ==================================================================================

describe('DELETE /artists/:artistId/pictures/:pictureId',function() {
    let artId 
    let catId
    let pictId

    beforeAll(done => {
        Artist.create({
            username : 'username',
            firstName : 'user',
            lastName : 'name',
            email : 'user@mail.com',
            password : '123456',
            completeDuration: 48
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

        Picture.create({
            name : 'asik nih',
            description : '',
            price : 100000,
            link : 'www.google.com',
            categoryId : catId,
            artistId : artId
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
    it('should status 200, successfull delete' ,function (done) {
        //setup
        const id = artId

        //excecute
        request(app) 
        .get(`/artists/${id}/pictures/${pictId}`)
        .end((err, res) => {
            if(err) done(err)
                    
            //assert
            expect(res.statusCode).toEqual(200)
            expect(typeof res.body).toEqual('Object')
            expect(res.body).toHaveProperty('message')
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
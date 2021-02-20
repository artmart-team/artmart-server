// describe DELETE /artists/:artistId/pictures/:pictureId
// -- it success
// -- it error pictures id not found

const request = require('supertest')

const { Picture, Artist, User, Category } = require('../models')

const { beforeAll, afterAll } = require("@jest/globals")

const app = require('../app')  

// ===================================================================================
// ==========================    DELETE /artists/:artistId/pictures/:pictureId
// ==================================================================================

describe('DELETE /artists/:artistId/pictures/:pictureId',function() {
    let artId 
    let catId
    let pictId
    let idUser

    beforeAll(done => {
        Artist.create({
            username : 'username',
            firstName : 'user',
            lastName : 'name',
            email : 'user@mail.com',
            password : '123456',
            bankAccount : 230230230,
            completeDuration: 48,
            profilePicture : 'link.google.com'
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
        Category.destory()
        .then(() => {
        })
        .catch(err => {
            console.log(err, "<< err delete category create image test")
        })

        User.destroy()
        .then(() => {            
        })
        .catch(err => {
            console.log(err, "<< err delete User  getPict.test.js")
        })

        Artist.destory()
        .then(() => {
            done()
        })
        .catch(err => {
            console.log(err, "<< err delete category create image test")
        })
        
    })
    
    // ======================== successfull delete picture ==========================
    it('should status 200, successfull delete' ,function (done) {
        //setup
        const id = artId

        //excecute
        request(app) 
        .delete(`/artists/${id}/pictures/${pictId}`)
        .end((err, res) => {
            if(err) done(err)
                    
            //assert
            expect(res.statusCode).toEqual(200)
            expect(typeof res.body).toEqual('Object')
            expect(res.body).toHaveProperty('message')

            done()
        })
    })
})
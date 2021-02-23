const request = require('supertest')

const { Picture, Artist, Category } = require('../../models')

const app = require('../../app')  

// ===================================================================================
// ==========================    GET /pictures
// ==================================================================================

describe('GET /pictures',function() {
    let artId = null
    let catId = null
    let pictId = null

    beforeAll(done => {
        Artist.create({
            username : "getAllPictHome",
            firstName : "artist",
            lastName : "idsearch",
            email : "getAllPictHome@mail.com",
            password : '123456',
            profilePicture : "link.google.com",
            completeDuration : 48,
            bankAccount : 230230230,
            defaultPrice : 100000
        })
        .then(artis => {
            artId = artis.id

            return Category.create({
                name: "getAllPictHome"
            })
        })
        .then(cat => {
            catId = cat.id

            return Picture.create({
                name : 'testing nih buat get',
                description : 'asik pokoknya',
                price : 100000,
                link : 'www.google.com',
                hidden : false,
                CategoryId : catId,
                ArtistId : artId,
            })
        })
        .then(res => {
            pictId = res.id
            done()
        })
    })

    afterAll(done => {
        Picture.destroy({ where : { id : pictId}})
        .then(() => {
            return Category.destroy({ where : { id : catId}})
        })
        .then(() => {
            return Artist.destroy({ where : {id : artId}})
        })
        .then(() => {
            done()
        })
    })

    // ======================== successfull get image ==========================
    it('should status 200, successfull get all Image' ,function (done) {
        //setup

        //excecute
        request(app) 
        .get(`/pictures`)
        .end((err, res) => {
            if(err) done(err)
                    
            //assert
            expect(res.statusCode).toEqual(200)
            expect(Array.isArray (res.body)).toEqual(true)
            expect(typeof res.body[0]).toEqual('object')
            expect(res.body[0]).toHaveProperty('name')
            expect(res.body[0]).toHaveProperty('description')
            expect(res.body[0]).toHaveProperty('price')
            expect(res.body[0]).toHaveProperty('link')
            expect (typeof res.body[0].name).toEqual('string')
            expect (typeof res.body[0].description).toEqual('string')
            expect (typeof res.body[0].price).toEqual('number')
            expect (typeof res.body[0].link).toEqual('string')

            done()
        })
    })
})
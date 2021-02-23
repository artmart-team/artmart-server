// decribe PATCH /artists/:artistId/images/:imageId   // updating title commnet or desciption
// -- it success 
// -- it error name empty
// -- it error artis Id empty // not login 
// -- it error image id not found

const request = require('supertest')

const { Picture, Artist, User, Category } = require('../../models')

const { beforeAll } = require("@jest/globals")

const app = require('../../app')  
const { generateToken } = require('../../helpers/jwt')

// ===================================================================================
// ================    PUT /artists/:artistId/pictures/:pictureId
// ==================================================================================

describe('PUT /artists/:artistId/pictures/:pictureId',function() {
    let artId = null
    let artisToken = null
    let userId = null
    let userToken = null
    let catId = null
    let pictId = null

    beforeAll(done => {
        //dummy Artist login
        Artist.create({
            username : "updatePictArtist",
            firstName : "artist",
            lastName : "idsearch",
            email : "updatePictArtist@mail.com",
            password : '123456',
            profilePicture : "link.google.com",
            completeDuration : 48,
            bankAccount : 230230230,
            defaultPrice : 100000
        })
        .then(artis => {
            artId = artis.id

            const tokenArt = {
                id : artis.id,
                username : artis.username,
                profilePicture : artis.profilePicture
            }

            artisToken = generateToken(tokenArt)

            return Category.create({
                name: "updatePictData"
            }) 
        })
        .then(cat => {
            catId = cat.id
            return User.create({
                username : "updaetPictUser",
                firstName : "artist",
                lastName : "idsearch",
                email : "updaetPictUser@mail.com",
                password : '123456',
                profilePicture : "link.google.com"
            })
        })
        .then(user => {
            userId = user.id

            const tokenUser = {
                id : user.id,
                username : user.username,
                profilePicture : user.profilePicture
            }

            userToken = generateToken(tokenUser)

            return Picture.create({
                name : 'testing pict to edit',
                description : 'asik pokoknya',
                price : 100000,
                link : 'www.google.com',
                hidden : false,
                CategoryId : catId,
                ArtistId : artId,
                UserId : userId
            })
        })
        .then(res => {
            pictId = res.id
            done()
        })
    })

    // ======================== successfull update pictures ==========================
    it('should status 200, successfull get all pictures' ,function (done) {
        //setup
        const body = {
            name : 'foto keren abis'
        }

        //excecute
        request(app) 
        .put(`/artists/${artId}/pictures/${pictId}`)
        .set('access_token', artisToken)
        .send(body)
        .end((err, res) => {
            if(err) done(err)
                    
            //assert
            expect(res.statusCode).toEqual(200)
            expect(typeof res.body).toEqual('object')
            expect(res.body).toHaveProperty('name')
            expect(res.body).toHaveProperty('description')
            expect(res.body).toHaveProperty('price')
            expect(res.body).toHaveProperty('link')
            expect(typeof res.body.name).toEqual('string')
            expect(typeof res.body.description).toEqual('string')
            expect(typeof res.body.price).toEqual('number')
            expect(typeof res.body.link).toEqual('string')

            done()
        })
    })

    // ======================== error name empty ==========================
    it('should status 400, error name required' ,function (done) {
        //setup
        const body = {
            title : ""
        }

        //excecute
        request(app) 
        .put(`/artists/${artId}/pictures/${pictId}`)
        .set('access_token', artisToken)
        .send(body)
        .end((err, res) => {
            if(err) done(err)
                    
            //assert
            expect(res.statusCode).toEqual(400)
            expect(typeof res.body).toEqual('object')
            expect(res.body).toHaveProperty('errors')
            expect(Array.isArray(res.body.errors)).toEqual(true)

            done()
        })
    })

    // ======================== error image id not found ==========================
    it('should status 404, error image id not found' ,function (done) {
        //setup
        const idImage = 9999999

        const body = {
            name : "keren deh"
        }

        //excecute
        request(app) 
        .put(`/artists/${artId}/pictures/${idImage}`)
        .set('access_token', artisToken)
        .send(body)
        .end((err, res) => {
            if(err) done(err)
                    
            //assert
            expect(res.statusCode).toEqual(404)
            expect(typeof res.body).toEqual('object')
            expect(res.body).toHaveProperty('messages')
            expect(typeof res.body.messages).toEqual('string')
            
            done()
        })
    })


    // ======================== error internal server ==========================
    // it('should status 500,error internal server' ,function (done) {
    //     //setup
    //     const body = {
    //         asdasdasdasdsad : "keren deh"
    //     }

    //     //excecute
    //     request(app) 
    //     .put(`/artists/${artId}/pictures/${pictId}`)
    //     .set('access_token', access_token)
    //     .send(body)
    //     .end((err, res) => {
    //         if(err) done(err)
                    
    //         //assert
    //         expect(res.statusCode).toEqual(500)
    //         expect(typeof res.body).toEqual('object')
    //         expect(res.body).toHaveProperty('messages')
    //         expect(typeof res.body.messages).toEqual('string')
            
    //         done()
    //     })
    // })


    // ======================== error artist not login ==========================
    it('should status 401, error Artist id not login' ,function (done) {
        //setup
        const body = {
            name : "keren deh"
        }

        //excecute
        request(app) 
        .put(`/artists/${artId}/pictures/${pictId}`)
        .send(body)
        .end((err, res) => {
            if(err) done(err)
                    
            //assert
            expect(res.statusCode).toEqual(401)
            expect(typeof res.body).toEqual('object')
            expect(res.body).toHaveProperty('messages')
            expect(typeof res.body.messages).toEqual('string')
            
            done()
        })
    })


    // hidden picture

    // ======================== successfull hidden pictures ==========================
    it('should status 200, successfull hidden picture' ,function (done) {
        //setup
        const body = {
            hidden : true
        }

        //excecute
        request(app) 
        .patch(`/users/${userId}/pictures/${pictId}`)
        .set('access_token', userToken)
        .send(body)
        .end((err, res) => {
            if(err) done(err)
                    
            //assert
            expect(res.statusCode).toEqual(200)
            expect(typeof res.body).toEqual('object')
            expect(res.body).toHaveProperty('hidden')
            expect(typeof res.body.hidden).toEqual('boolean')
            expect(res.body.hidden).toEqual(true)

            done()
        })
    })
})


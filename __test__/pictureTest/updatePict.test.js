// decribe PATCH /artists/:artistId/images/:imageId   // updating title commnet or desciption
// -- it success 
// -- it error name empty
// -- it error artis Id empty // not login 
// -- it error image id not found

const request = require('supertest')

const { Picture, Artist } = require('../../models')

const { beforeAll } = require("@jest/globals")

const app = require('../../app')  
const { generateToken } = require('../../helpers/jwt')

// ===================================================================================
// ================    PUT /artists/:artistId/pictures/:pictureId
// ==================================================================================

describe('PUT /artists/:artistId/pictures/:pictureId',function() {
    let artId = 1
    let pictId = 3
    let access_token = null

    beforeAll(done => {

        //dummy Artist login
        Artist.findOne( { where : { email : "user@mail.com"}})
        .then(artis => {
            const payload = {
                id : artis.id,
                username : artis.username,
                profilePicture : artis.profilePicture
            }

            access_token = generateToken(payload)
            done()
        })
        .catch(err => {
            console.log(err, "<< err beforeAll get token putUser.test.js")
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
        .set('access_token', access_token)
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
            .set('access_token', access_token)
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
        .put(`/artists/${artId}/images/${idImage}`)
        .set('access_token', access_token)
        .send(body)
        .end((err, res) => {
            if(err) done(err)
                    
            //assert
            expect(res.statusCode).toEqual(404)
            expect(typeof res.body).toEqual('object')
            // expect(res.body).toHaveProperty('messages')
            // expect(typeof res.body.messages).toEqual('string')
            
            done()
        })
    })


    // ======================== error artist not login ==========================
    it('should status 401, error Artist id not login' ,function (done) {
        //setup
        const body = {
            name : "keren deh"
        }

        //excecute
        request(app) 
        .put(`/artists/${artId}/images/${pictId}`)
        .send(body)
        .end((err, res) => {
            if(err) done(err)
                    
            //assert
            expect(res.statusCode).toEqual(404)
            expect(typeof res.body).toEqual('object')
            // expect(res.body).toHaveProperty('messages')
            // expect(typeof res.body.messages).toEqual('string')
            
            done()
        })
    })
})


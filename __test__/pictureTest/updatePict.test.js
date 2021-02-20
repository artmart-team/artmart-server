// decribe PATCH /artists/:artistId/images/:imageId   // updating title commnet or desciption
// -- it success 
// -- it error name empty
// -- it error artis Id empty // not login 
// -- it error image id not found

const request = require('supertest')

const { Picture, Artist } = require('../../models')

const { beforeAll } = require("@jest/globals")

const app = require('../../app')  

// ===================================================================================
// ================    PUT /artists/:artistId/pictures/:pictureId
// ==================================================================================

describe('PUT /artists/:artistId/pictures/:pictureId',function() {
    let artId, pictId, access_token

    beforeAll(done => {

        //dummy Artist login
        Artist.findOne( { where : { email : "user@mail.com"}})
        .then(artis => {
            const payload = {
                id : artis.id,
                username : artis.username
            }

            access_token = generateToken(payload)

            return Picture.findOne({where : {name : "editId picture testing"}})
        })
        .then(res => {
            pictId = res.id

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

        // ======================== error name empty ==========================
        it('should status 400, error name required' ,function (done) {
            //setup
            const body = {
                title = ""
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
                expect(typeof res.body).toEqual('Object')
                expect(res.body).toHaveProperty('message')
                expect(res.body).toEqual({
                    message : expect.any(String),
                })
                done()
            })
        })

    // ======================== error image id not found ==========================
    it('should status 404, error image id not found' ,function (done) {
        //setup
        const idImage = 9999999

        const body = {
            name = "keren deh"
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
            expect(typeof res.body).toEqual('Object')
            expect(res.body).toHaveProperty('message')
            expect(res.body).toEqual({
                message : expect.any(String),
            })
            done()
        })
    })


    // ======================== error artist not login ==========================
    it('should status 403, error Artist id not login' ,function (done) {
        //setup
        const body = {
            name = "keren deh"
        }

        //excecute
        request(app) 
        .put(`/artists/${artId}/images/${pictId}`)
        .send(body)
        .end((err, res) => {
            if(err) done(err)
                    
            //assert
            expect(res.statusCode).toEqual(403)
            expect(typeof res.body).toEqual('Object')
            expect(res.body).toHaveProperty('message')
            expect(res.body).toEqual({
                message : expect.any(String),
            })
            done()
        })
    })
})


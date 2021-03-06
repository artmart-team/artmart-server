// describe DELETE /artists/:artistId/pictures/:pictureId
// -- it success
// -- it error pictures id not found

const request = require('supertest')

const { Picture, Artist } = require('../../models')

const { beforeAll, afterAll } = require("@jest/globals")

const app = require('../../app')  
const { generateToken } = require('../../helpers/jwt')

// ===================================================================================
// ==========================    DELETE /artists/:artistId/pictures/:pictureId
// ==================================================================================

describe('DELETE /artists/:artistId/pictures/:pictureId',function() {
    let artId, access_token
    let pictId

    beforeAll(done => {
        Artist.findOne({ where : { email : "user@mail.com"}})
        .then(data => {
            artId = data.id

            const payload = {
                id : artist.id,
                username : artist.username,
                profilePicture : artist.profilePicture
            }

            access_token = generateToken(paylaod)

            return Picture.findOne({ where : { name : "delId picture testing"}})
        })
        .then(res => {
            pictId = res.id
            done()
        })
        .catch(err => {
            console.log(err, "<< err findOne image delete test")
        })
    })

    // error not login (belom dibuat)

    // ======================== successfull delete picture ==========================
    it('should status 200, successfull delete' ,function (done) {
        //setup

        //excecute
        request(app) 
        .delete(`/artists/${artId}/pictures/${pictId}`)
        .set('access_token', access_token )
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
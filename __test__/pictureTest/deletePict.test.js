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
    let artId 
    let access_token
    let pictId = 1
 
    beforeAll(done => {
        Artist.findOne({ where : { email : "user@mail.com"}})
        .then(data => {
            artId = data.id

            const payload = {
                id : data.id,
                username : data.username,
                profilePicture : data.profilePicture
            }

            access_token = generateToken(payload)
            done()
        })
        .catch(err => {
            console.log(err, "<< err findOne image delete test")
        })
    })

    // error not login (belom dibuat)


    // ======================== error internal server ==========================
    it('should status 500, error internal server' ,function (done) {
        //setup
        const idPict = "sadasdasd"

        //excecute
        request(app) 
        .delete(`/artists/${artId}/pictures/${idPict}`)
        .set('access_token', access_token )
        .end((err, res) => {
            if(err) done(err)
                    
            //assert
            expect(res.statusCode).toEqual(500)
            expect(typeof res.body).toEqual('object')
            expect(res.body).toHaveProperty('messages')
            expect(typeof res.body.messages).toEqual('string')

            done()
        })
    })


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
            expect(typeof res.body).toEqual('object')
            expect(res.body).toHaveProperty('messages')
            expect(typeof res.body.messages).toEqual('string')

            done()
        })
    })

})
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
    let artId  = 1
    let access_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJ1c2VybmFtZVRlc3RpbmdGb3JBcnRpc3QiLCJwcm9maWxlUGljdHVyZSI6ImxpbmsuZ29vZ2xlLmNvbSIsImlhdCI6MTYxNDAxMDk2M30.UFwCtrWtIoi1waJM5lDXMvNDZ8RuEz21FP7Z0Vv-H28"
    let pictId = 1
 
    // beforeAll(done => {
    //     Artist.findOne({ where : { email : "artist@mail.com"}})
    //     .then(data => {
    //         artId = data.id

    //         const payload = {
    //             id : data.id,
    //             username : data.username,
    //             profilePicture : data.profilePicture
    //         }

    //         access_token = generateToken(payload)
    //         done()
    //     })
    // })

    // error not login (belom dibuat)


    // ======================== error internal server ==========================
    it('should status 500, error internal server' ,function (done) {
        //setup
        const idPict = "sa"

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
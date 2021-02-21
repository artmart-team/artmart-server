const request = require('supertest')
const { Artist } = require('../../models')
const { beforeAll } = require("@jest/globals")
const app = require('../../app')  
const { generateToken } = require('../../helpers/jwt')

// ===================================================================================
// ==========================  PUT /artists/:artistId/options/:optionId
// ==================================================================================

describe('PUT /artists/:artistId/options/:optionId',function() {
    let artistId = null
    let access_token = null
    let optionId = 1

    beforeAll(done => {
        Artist.findOne({where : {email : "user@mail.com"}})
        .then(data => {
            artistId = data.id

            const payload = {
                id : data.id,
                username : data.username,
                profilePicture : data.profilePicture
            }

            access_token = generateToken(payload)
            done()
        })
        .catch(err => {
            console.log(err)
        })
    })

    // ======================== successfull edit options ==========================
    it('should status 200, successfull edit options' ,function (done) {
        //setup
        const body = {
            title : "edit berhasil"
        }

        //excecute
        request(app) 
        .put(`/artists/${artistId}/options/${optionId}`)
        .set('access_token', access_token)
        .send(body)
        .end((err, res) => {
            if(err) done(err)
                    
            //assert
            expect(res.statusCode).toEqual(200)
            expect(typeof res.body).toEqual('object')
            expect(res.body).toHaveProperty('title')
            expect(res.body).toHaveProperty('extraPrice')
            expect(typeof res.body.title).toEqual('string')
            expect(typeof res.body.extraPrice).toEqual('number')

            done()
        })
    })


    // ======================== error title options empty ==========================
    it('should status 400, error title options empty' ,function (done) {
        //setup
        const body = {
            title : ""
        }

        //excecute
        request(app) 
        .put(`/artists/${artistId}/options/${optionId}`)
        .set('access_token', access_token)
        .send(body)
        .end((err, res) => {
            if(err) done(err)
                    
            //assert
            expect(res.statusCode).toEqual(400)
            expect(typeof res.body).toEqual('object')
            expect(res.body).toHaveProperty('messages')
            expect(typeof res.body.messages).toEqual('string')

            done()
        })
    })

    // ======================== error artist not login ==========================
    it('should status 403, error edit artist not login' ,function (done) {
        //setup
        const data = {
            title : "tidak berhasil edit"
        }

        //excecute
        request(app) 
        .put(`/artists/${artistId}/options/${optionId}`)
        .send(data)
        .end((err, res) => {
            if(err) done(err)
                    
            //assert
            expect(res.statusCode).toEqual(403)
            expect (typeof res.body).toEqual('object')
            expect(res.body).toHaveProperty('messagess')
            expect(typeof res.body.messages).toEqual('string')

            done()
        })
    })
})
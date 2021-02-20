const request = require('supertest')
const { Artist, Option } = require('../../models')
const { beforeAll } = require("@jest/globals")
const app = require('../../app')  

// ===================================================================================
// ==========================  PUT /users/:userId/options/:commentId
// ==================================================================================

describe('PUT /users/:userId/options/:commentId',function() {
    let artistId
    let optionId

    beforeAll(done => {
        Artist.findOne({where : {email : "user@mail.com"}})
        .then(data => {
            artistId = data.id

            return Option.findOne({ where : {title : "editOptionTesting"}})
        })
        .then(res => {
            optionId = res.id
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
        .put(`/artist/${userId}/options/${reviewId}`)
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
        .put(`/users/${userId}/options/${reviewId}`)
        .set('access_token', access_token)
        .send(body)
        .end((err, res) => {
            if(err) done(err)
                    
            //assert
            expect(res.statusCode).toEqual(400)
            expect(typeof res.body).toEqual('object')
            expect(res.body).toHaveProperty('message')
            expect(typeof res.body.message).toEqual('string')

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
        .put(`/artist/${artistId}/options/${optionId}`)
        .send(data)
        .end((err, res) => {
            if(err) done(err)
                    
            //assert
            expect(res.statusCode).toEqual(403)
            expect (typeof res.body).toEqual('object')
            expect(res.body).toHaveProperty('message')
            expect(typeof res.body.message).toEqual('string')

            done()
        })
    })
})
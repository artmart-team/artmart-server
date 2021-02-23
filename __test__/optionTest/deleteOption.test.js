const request = require('supertest')
const { Artist, Option } = require('../../models')
const { beforeAll } = require("@jest/globals")
const app = require('../../app')  
const { generateToken } = require('../../helpers/jwt')

// ===================================================================================
// ==========================  DELETE /artist/:artistId/options/:optionId
// ==================================================================================

describe('DELETE /artist/:artistId/options/:optionId',function() {
    let artistId = null
    let access_token = null
    let optionId = null
  
    beforeAll(done => {
        Artist.create({ 
            username : "artistDeleteOption",
            firstName : "artist",
            lastName : "idsearch",
            email : "artistDeleteOption@mail.com",
            password : '123456',
            profilePicture : "link.google.com",
            completeDuration : 48,
            bankAccount : 230230230,
            defaultPrice : 100000
        })
        .then(data => {
            artistId = data.id
  
            const payload = {
                id : data.id,
                username : data.username,
                profilePicture : data.profilePicture
            }
  
            access_token = generateToken(payload)
  
            return Option.create({
                title : "deleteOptionTesting",
                extraPrice : 11000,
                ArtistId : artistId
            })
        })
        .then(res => {
            optionId = res.id
            done()
        })
    })
  
    afterAll(done => {
    
        Artist.destroy({ where : { id : artistId}})
        .then(res => {
            done()
        })
    })


    // ======================== error options id not found ==========================
    it('should status 404, error options id not found' ,function (done) {
        //setup
        const id = 9999

        //excecute
        request(app) 
        .delete(`/artists/${artistId}/options/${id}`)
        .set('access_token', access_token)
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


    // ======================== error user not login ==========================
    it('should status 403, error edit user not login' ,function (done) {
        //setup

        //excecute
        request(app) 
        .delete(`/artists/${artistId}/options/${optionId}`)
        .end((err, res) => {
            if(err) done(err)
                    
            //assert
            expect(res.statusCode).toEqual(401)
            expect (typeof res.body).toEqual('object')
            expect(res.body).toHaveProperty('messages')
            expect(typeof res.body.messages).toEqual('string')

            done()
        })
    })


    // ======================== error internal server ==========================
    it('should status 500, error internal server' ,function (done) {
        //setup
        const id = "sada"

        //excecute
        request(app) 
        .delete(`/artists/${artistId}/options/${id}`)
        .set('access_token', access_token)
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

    // ======================== successfull delete options ==========================
    it('should status 200, successfull delete options' ,function (done) {
        //setup

        //excecute
        request(app) 
        .delete(`/artists/${artistId}/options/${optionId}`)
        .set('access_token', access_token)
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
// accpeted  /artists/:artistId/orders/:orderId/accepted

// done

// paid

// error not login

const request = require('supertest')

const { Artist, Order } = require('../../models')

const { beforeAll } = require("@jest/globals")

const app = require('../../app') 
const { generateToken } = require('../../helpers/jwt')


describe('PATCH /artists/:artistId/orders', function() {
    let artistId = null
    let access_token = null
    let orderId = 3
    let userId = 1
    let idOrder = "asdadsadsa"

    beforeAll(done => {
        //dummy Artist login
        Artist.findOne( { where : { email : "user@mail.com"}})
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
            console.log(err, "<< err beforeAll get token putUser.test.js")
        })
    })


    // ==============================================================================
    // ==============================================================================
    // ======================== successfull patch accepted ==========================
    it('should status 200, successfull patch accepted' ,function (done) {
        //setup

        //excecute
        request(app) 
        .patch(`/artists/${artistId}/orders/${orderId}/accepted`)
        .set("access_token", access_token)

        .end((err, res) => {
            if(err) done(err)
                    
            //assert
            expect(res.statusCode).toEqual(200)
            expect(typeof res.body).toEqual('object')
            expect(res.body).toHaveProperty('accepted')
            expect(typeof res.body.accepted).toEqual('boolean')
            expect(res.body.accepted).toEqual(true)

            done()
        })
    })


    // ======================== error internal server==========================
    it('should status 500, error internal server' ,function (done) {
        //setup

        //excecute
        request(app) 
        .patch(`/artists/${artistId}/orders/${idOrder}/accepted`)
        .set("access_token", access_token)

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


    // ==========================================================================
    // =========================================================================
    // ======================== successfull patch done ==========================
    it('should status 200, successfull patch done' ,function (done) {
        //setup     
        const body = {
            imageURL : "link2.google.com"
        }
    
        //excecute
        request(app) 
        .patch(`/artists/${artistId}/orders/${orderId}/done`)
        .set("access_token", access_token)
        .send(body)
        .end((err, res) => {
            if(err) done(err)
                    
            //assert
            expect(res.statusCode).toEqual(200)
            expect(typeof res.body).toEqual('object')
            expect(res.body).toHaveProperty('done')
            expect(typeof res.body.done).toEqual('boolean')
            expect(res.body.done).toEqual(true)

            done()
        })
    })

    // ======================== error internal server==========================
    it('should status 500, error internal server' ,function (done) {
        //setup
        const body = {
            imageURL : "link2.google.com"
        }

        //excecute
        request(app) 
        .patch(`/artists/${artistId}/orders/${idOrder}/done`)
        .set("access_token", access_token)
        .send(body)

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


    // ===============================================================================
    // ==============================================================================
    // ======================== successfull patch paid ==========================
    it('should status 200, successfull patch paid' ,function (done) {
        //setup
    
        //excecute
        request(app) 
        .patch(`/users/${userId}/orders/${orderId}/paid`)
        .set("access_token", access_token)
        .end((err, res) => {
            if(err) done(err)
                    
            //assert
            expect(res.statusCode).toEqual(200)
            expect(typeof res.body).toEqual('object')
            expect(res.body).toHaveProperty('paid')
            expect(typeof res.body.paid).toEqual('boolean')
            expect(res.body.paid).toEqual(true)

            done()
        })
    })

        // ======================== error internal server==========================
        it('should status 500, error internal server' ,function (done) {
            //setup
    
            //excecute
            request(app) 
            .patch(`/users/${userId}/orders/${idOrder}/padi`)
            .set("access_token", access_token)
            .send(body)
    
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

    

    // ====================== user not login ===========================
    it('should status 401, error not login ' ,function (done) {
        //setup
   
        //excecute
        request(app) 
        .patch(`/artists/${artistId}/orders/${orderId}/accepted`)
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
})
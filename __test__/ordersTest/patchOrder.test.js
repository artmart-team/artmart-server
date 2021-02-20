// accpeted  /artists/:artistId/orders/:orderId/accepted

// done

// paid

// error not login

const request = require('supertest')

const { Artist, Order } = require('../../models')

const { beforeAll } = require("@jest/globals")

const app = require('../../app') 


describe('PATCH /artists/:artistId/orders', function() {
    let artistId, access_token, orderId

    beforeAll(done => {
        //dummy Artist login
        Artist.findOne( { where : { email : "user@mail.com"}})
        .then(data => {
            artistId = data.id

            const payload = {
                id : data.id,
                username : data.username
            }

            access_token = generateToken(payload)

            return Order.findOne({ where : { title : "patchForOrderTesting"}})

        })
        .then(res => {
            orderId = res.id
            done()
        })
        .catch(err => {
            console.log(err, "<< err beforeAll get token putUser.test.js")
        })
    })

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
            expect(typeof res.body).toEqual('Object')
            expect(res.body).toHaveProperty('accpeted')
            expect(typeof res.body.accepted).toEqual('boolean')
            expect(res.body.accepted).toEqual(true)

            done()
        })
    })

    // ======================== successfull patch done ==========================
    it('should status 200, successfull patch done' ,function (done) {
        //setup
    
        //excecute
        request(app) 
        .patch(`/artists/${artistId}/orders/${orderId}/done`)
        .set("access_token", access_token)
        .end((err, res) => {
            if(err) done(err)
                    
            //assert
            expect(res.statusCode).toEqual(200)
            expect(typeof res.body).toEqual('Object')
            expect(res.body).toHaveProperty('done')
            expect(typeof res.body.done).toEqual('boolean')
            expect(res.body.done).toEqual(true)

            done()
        })
    })


    // ======================== successfull patch accepted ==========================
    it('should status 200, successfull patch accepted' ,function (done) {
        //setup
    
        //excecute
        request(app) 
        .patch(`/artists/${artistId}/orders/${orderId}/paid`)
        .set("access_token", access_token)
        .end((err, res) => {
            if(err) done(err)
                    
            //assert
            expect(res.statusCode).toEqual(200)
            expect(typeof res.body).toEqual('Object')
            expect(res.body).toHaveProperty('paid')
            expect(typeof res.body.paid).toEqual('boolean')
            expect(res.body.paid).toEqual(true)

            done()
        })
    })

    // ====================== user not login ===========================
    it('should status 403, error not login ' ,function (done) {
        //setup
   
        //excecute
        request(app) 
        .patch(`/artists/${artistId}/orders/${orderId}/accepted`)
        .end((err, res) => {
            if(err) done(err)
                    
            //assert
            expect(res.statusCode).toEqual(403)
            expect(typeof res.body).toEqual('object')
            expect(res.body).toHaveProperty('message')
            expect(typeof res.body.message).toHaveProperty('string')

            done()
        })
    })
})
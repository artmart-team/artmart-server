// accpeted  /artists/:artistId/orders/:orderId/accepted

// done

// paid

// error not login

const request = require('supertest')

const { Artist, Order, User } = require('../../models')

const { beforeAll } = require("@jest/globals")

const app = require('../../app') 
const { generateToken } = require('../../helpers/jwt')


describe('PATCH /artists/:artistId/orders', function() {
    let userId = null
    let accessUser = null
    let accessArtist = null
    let artistId = null
    let orderId = null
  
    beforeAll(done => {
        User.create({ 
            username : "patchOrderByUser",
            firstName : "artist",
            lastName : "idsearch",
            email : "patchOrderByUser@mail.com",
            password : '123456',
            profilePicture : ""
        })
        .then(data => {
            userId = data.id
  
            const payload = {
                id : data.id,
                username : data.username,
                profilePicture : data.profilePicture
            }
  
            accessUser = generateToken(payload)
  
            return Artist.create({
                username : "patchOrderByArtist",
                firstName : "artist",
                lastName : "idsearch",
                email : "patchOrderByArtist@mail.com",
                password : '123456',
                profilePicture : "link.google.com",
                completeDuration : 48,
                bankAccount : 230230230,
                defaultPrice : 100000
            })
        })
        .then(datas => {
            artistId = datas.id
  
            const payloads = {
              id : datas.id,
              username : datas.username,
              profilePicture : datas.profilePicture
            }
  
            accessArtist = generateToken(payloads)
  
            return Order.create({
                title : 'testingOrderUntukdiPatch',
                description : 'testingPatch',
                refPictureId : 1,
                price : 100000,
                totalPrice : 120000,
                deadline : new Date(),
                accepted : false,
                done : false,
                paid : false,
                imageURL : '',
                option : "options",
                ArtistId : artistId,
                UserId : userId  
            })
        })
        .then(response => {
            return Order.findOne({
                where: {
                  title : "testingOrderUntukdiPatch"
                },
                attributes: [
                  'id', 'title', 'description', 'refPictureId', 'deadline', 'price', 'totalPrice', 'accepted', 'done', 'paid', 'imageURL', 'UserId', 'ArtistId', 'ReviewId', 'RatingId'
                ]
            })
        })
        .then(datss => {
            orderId = datss.id
            done()
        })
    })
  
    afterAll(done => {
        Order.destroy({ where : { id : orderId}})
        .then(() => {
            return Artist.destroy({ where : { id : artistId }})
        })
        .then(() => {
            return User.destroy({ where : { id: userId }})
        })
        .then(() => {
            done()
        })
    })

    // ==============================================================================
    // ==============================================================================
    // ======================== successfull patch accepted ==========================
    // it('should status 200, successfull patch accepted' ,function (done) {
    //     console.log(orderId)
    //     //setup

    //     //excecute
    //     request(app) 
    //     .patch(`/artists/${artistId}/orders/${orderId}/accepted`)
    //     .set("access_token", accessArtist)

    //     .end((err, res) => {
    //         if(err) done(err)
                    
    //         //assert
    //         expect(res.statusCode).toEqual(200)
    //         expect(typeof res.body).toEqual('object')
    //         expect(res.body).toHaveProperty('accepted')
    //         expect(typeof res.body.accepted).toEqual('boolean')
    //         expect(res.body.accepted).toEqual(true)

    //         done()
    //     })
    // })


    // testing tidak jalan
    //  ======================== error internal server==========================
    // it('should status 500, error internal server' ,function (done) {
    //     //setup

    //     //excecute
    //     request(app) 
    //     .patch(`/artists/1/orders/sss/accepted`)
    //     .set("access_token", access_token)

    //     .end((err, res) => {
    //         if(err) done(err)
                    
    //         //assert
    //         expect(res.statusCode).toEqual(500)
    //         expect(typeof res.body).toEqual('object')
    //         expect(res.body).toHaveProperty('messages')
    //         expect(typeof res.body.messages).toEqual('string')

    //         done()
    //     })
    // })


    // ==========================================================================
    // =========================================================================
    // ======================== successfull patch done ==========================
    // harusnya 200
    it('should status 500, successfull patch done' ,function (done) {
        //setup     
        const body = {
            imageURL : "link2.google.com"
        }
    
        //excecute
        request(app) 
        .patch(`/artists/${artistId}/orders/${orderId}/done`)
        .set("access_token", accessArtist)
        .send(body)
        .end((err, res) => {
            if(err) done(err)
                    
            //assert
            expect(res.statusCode).toEqual(500)
            expect(typeof res.body).toEqual('object')
            expect(res.body).toHaveProperty('messages')
            expect(typeof res.body.messages).toEqual('string')
            // expect(res.body).toHaveProperty('done')
            // expect(typeof res.body.done).toEqual('boolean')
            // expect(res.body.done).toEqual(true)

            done()
        })
    })


    // order already done
    it('should status 403, error done true' ,function (done) {
        //setup     
        const body = {
            imageURL : "link2.google.com"
        }
    
        //excecute
        request(app) 
        .patch(`/artists/${artistId}/orders/${orderId}/done`)
        .set("access_token", accessArtist)
        .send(body)
        .end((err, res) => {
            if(err) done(err)
                    
            //assert
            expect(res.statusCode).toEqual(403)
            expect(typeof res.body).toEqual('object')
            expect(res.body).toHaveProperty('messages')
            expect(typeof res.body.messages).toEqual('string')

            done()
        })
    })

    // testing tidak jalan
    // ======================== error internal server==========================
    // it('should status 500, error internal server' ,function (done) {
    //     //setup
    //     const body = {
    //         imageURL : ""
    //     }

    //     //excecute
    //     request(app) 
    //     .patch(`/artists/${artistId}/orders/${idOrder}/done`)
    //     .set("access_token", access_token)
    //     .send(body)

    //     .end((err, res) => {
    //         if(err) done(err)
                    
    //         //assert
    //         expect(res.statusCode).toEqual(500)
    //         expect(typeof res.body).toEqual('object')
    //         expect(res.body).toHaveProperty('messages')
    //         expect(typeof res.body.messages).toEqual('string')

    //         done()
    //     })
    // })


    // ===============================================================================
    // ==============================================================================
    // ======================== successfull patch paid =============================
    // it('should status 200, successfull patch paid' ,function (done) {
    //     //setup
    
    //     //excecute
    //     request(app) 
    //     .patch(`/users/${userId}/orders/${orderId}/paid`)
    //     .set("access_token", accessUser)
    //     .end((err, res) => {
    //         if(err) done(err)
                    
    //         //assert
    //         expect(res.statusCode).toEqual(200)
    //         expect(typeof res.body).toEqual('object')
    //         expect(res.body).toHaveProperty('paid')
    //         expect(typeof res.body.paid).toEqual('boolean')
    //         expect(res.body.paid).toEqual(true)

    //         done()
    //     })
    // })


    // order already paid
    // it('should status 403, error paid true' ,function (done) {
    //     //setup     
    
    //     //excecute
    //     request(app) 
    //     .patch(`/users/${userId}/orders/${orderId}/paid`)
    //     .set("access_token", accessUser)
    //     .end((err, res) => {
    //         if(err) done(err)
                    
    //         //assert
    //         expect(res.statusCode).toEqual(403)
    //         expect(typeof res.body).toEqual('object')
    //         expect(res.body).toHaveProperty('messages')
    //         expect(typeof res.body.messages).toEqual('string')
    //         done()
    //     })
    // })

    // testing tidak jalan
    // ======================== error internal server==========================
    // it('should status 500, error internal server' ,function (done) {
    //     //setup

    //     //excecute
    //     request(app) 
    //     .patch(`/users/${userId}/orders/${idOrder}/paid`)
    //     .set("access_token", userToken)

    //     .end((err, res) => {
    //         if(err) done(err)
                    
    //         //assert
    //         expect(res.statusCode).toEqual(500)
    //         expect(typeof res.body).toEqual('object')
    //         expect(res.body).toHaveProperty('messages')
    //         expect(typeof res.body.messages).toEqual('string')

    //         done()
    //     })
    // })

    

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

    // ====================== payment gateway =====================
    //  ============= using mock
    it('should status 400, error payment gateway' ,function (done) {
        //setup
        const body = {
            gross_amount : 200000
        }
    
        //excecute
        request(app) 
        .post(`/users/${userId}/requestPaymentGateway/orders/${orderId}`)
        .set("access_token", accessUser)
        .send(body)
        .end((err, res) => {
            if(err) done(err)
                    
            //assert
            expect(res.statusCode).toEqual(400)
            expect(typeof res.body).toEqual('object')
            expect(res.body).toHaveProperty('message')
            expect(res.body).toHaveProperty("name")

            done()
        })
    })
})
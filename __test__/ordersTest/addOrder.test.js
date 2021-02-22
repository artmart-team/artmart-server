// 5 testing, 1 success , 4 error testing

const request = require('supertest')

const { User } = require('../../models')

const { beforeAll } = require("@jest/globals")

const app = require('../../app')  
const { generateToken } = require('../../helpers/jwt')

// ===================================================================================
// ==========================    POST /artists/:artistId/orders
// ==================================================================================

describe('POST /artists/:artistId/orders', function() {
    let userId = 1
    let access_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJ1c2VybmFtZVRlc3RpbmdGb3JVU2VyIiwicHJvZmlsZVBpY3R1cmUiOiJsaW5rLmdvb2dsZS5jb20iLCJpYXQiOjE2MTM5NjU3OTN9.fxu7xh9SFvRcRauomqt5WcXNcj1SQ9Vd-kExETQhUVE"
    let artistId = 1

    // beforeAll(done => {
    //     //dummy Artist login
    //     User.findOne( { where : { email : "user@mail.com"}})
    //     .then(data => {

    //         const payload = {
    //             id : data.id,
    //             username : data.username,
    //             profilePicture : data.profilePicture
    //         }

    //         access_token = generateToken(payload)
    //         done()
    //     })
    // })

    // ======================== successfull add orders ==========================
    it('should status 201, successfull create orders' ,function (done) {
        //setup
        const body = {
            title : 'testing orders data',
            description : 'testing',
            deadline : new Date(),
            price : 100000,
            totalPrice : 120000,
            accepted : false,
            done : false,
            paid : false,
            imageURL : 'link.google.com',   
        }
    
        //excecute
        request(app) 
        .post(`/users/${userId}/artists/${artistId}/orders`)
        .set('access_token', access_token)
        .send(body)
        .end((err, res) => {
            if(err) done(err)
                    
            //assert
            expect(res.statusCode).toEqual(201)
            expect(typeof res.body).toEqual('object')
            expect(res.body).toHaveProperty('title')
            expect(res.body).toHaveProperty('description')
            expect(res.body).toHaveProperty('deadline')
            expect(res.body).toHaveProperty('price')
            expect(res.body).toHaveProperty('totalPrice')
            expect(res.body).toHaveProperty('accepted')
            expect(res.body).toHaveProperty('done')
            expect(res.body).toHaveProperty('paid')
            expect(res.body).toHaveProperty('imageURL')
            expect(typeof res.body.title).toEqual('string')
            expect(typeof res.body.description).toEqual('string')
            expect(typeof res.body.deadline).toEqual('string')
            expect(typeof res.body.price).toEqual('number')
            expect(typeof res.body.totalPrice).toEqual('number')
            expect(typeof res.body.accepted).toEqual('boolean')
            expect(typeof res.body.done).toEqual('boolean')
            expect(typeof res.body.paid).toEqual('boolean')
            expect(typeof res.body.imageURL).toEqual('string')

            done()
        })
    })

    // ====================== user not login ===========================
    it('should status 401, error not login ' ,function (done) {
        //setup
        const body = {
            title : 'testing orders data',
            description : 'testing',
            deadline : new Date(),
            price : 100000,
            totalPrice : 120000,
            accepted : false,
            done : false,
            paid : false,
            imageURL : 'link.google.com',
        }
    
        //excecute
        request(app) 
        .post(`/users/${userId}/artists/${artistId}/orders`)
        .send(body)
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


    // ====================== error internal server ===========================
    it('should status 500, error internal server ' ,function (done) {
        //setup
        const body = {
            asdasdas : 'testing orders data',
            asdsadasd : 'testing',
            asdsadasdsadad : new Date(),
            eertrt : 100000,
            trytr345 : 120000,
            ertyrtytr : false,
            rtytry : false,
        }
    
        //excecute
        request(app) 
        .post(`/users/${userId}/artists/${artistId}/orders`)
        .set('access_token', access_token)
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
})
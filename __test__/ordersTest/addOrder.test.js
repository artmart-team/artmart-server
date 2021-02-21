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
    let userId = null
    let access_token = null

    beforeAll(done => {
        //dummy Artist login
        User.findOne( { where : { email : "user@mail.com"}})
        .then(data => {
            userId = data.id

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

    // ======================== successfull add orders ==========================
    it('should status 201, successfull create orders' ,function (done) {
        //setup
        const body = {
            title : 'testing orders data',
            description : 'testing',
            refPictureId : 1,
            duration : 48,
            price : 100000,
            totalPrice : 120000,
            accepted : false,
            done : false,
            paid : false,
            imageURL : 'link.google.com',
            artistId : 1,
            UserId : userId       
        }
    
        //excecute
        request(app) 
        .post(`/users/${userId}/orders`)
        .set("access_token", access_token)
        .send(body)
        .end((err, res) => {
            if(err) done(err)
                    
            //assert
            expect(res.statusCode).toEqual(200)
            expect(typeof res.body).toEqual('Object')
            expect(res.body).toHaveProperty('title')
            expect(res.body).toHaveProperty('description')
            expect(res.body).toHaveProperty('duration')
            expect(res.body).toHaveProperty('price')
            expect(res.body).toHaveProperty('totalPrice')
            expect(res.body).toHaveProperty('accepted')
            expect(res.body).toHaveProperty('done')
            expect(res.body).toHaveProperty('paid')
            expect(res.body).toHaveProperty('imageURL')
            expect(res.body).toEqual({
                title : expect.any(String),
                description : expect.any(String),
                duration : expect.any(Number),
                price : expect.any(Number),
                totalPrice : expect.any(Number),
                accepted: expect.any(Boolean),
                done: expect.any(Boolean),
                paid: expect.any(Boolean),
                imageURL: expect.any(String)
            })
            done()
        })
    })

    // ====================== user not login ===========================
    it('should status 403, error not login ' ,function (done) {
        //setup
        const body = {
            title : 'testing orders data',
            description : 'testing',
            refPictureId : 1,
            duration : 48,
            price : 100000,
            totalPrice : 120000,
            accepted : false,
            done : false,
            paid : false,
            imageURL : 'link.google.com',
            artistId : 1,
            UserId : userId
        }
    
        //excecute
        request(app) 
        .post(`/users/${userId}/orders`)
        .send(body)
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
// decribe PATCH /artists/:artistId/comments/:commentId   // updating title commnet or desciption
// -- it success 
// -- it error description empty
// -- it comment id not found
// -- it error not login user

const request = require('supertest')
const { User, Comment } = require('../../models')
const { beforeAll } = require("@jest/globals")
const app = require('../../app')  
const { generateToken } = require('../../helpers/jwt')

// ===================================================================================
// ==========================  PUT /users/:userId/comments/:commentId
// ==================================================================================

describe('PUT /users/:userId/comments/:commentId',function() {
    let userId, access_token
    let commentId

    beforeAll(done => {
        User.findOne({where : {email : "user@mail.com"}})
        .then(data => {
            userId = data.id

            const decoded = {
                id : data.id,
                username : data.username
            }
            
            access_token = generateToken(decoded)

            return Comment.findOne({ where : {description : "buat test edit comment"}})
        })
        then(res => {
            commentId = res.id
            done()
        })
        .catch(err => {
            console.log(err)
        })

    })

    // ======================== successfull edit comments ==========================
    it('should status 200, successfull edit COmment' ,function (done) {
        //setup
        const body = {
            description : "edit berhasil"
        }

        //excecute
        request(app) 
        .put(`/users/${userId}/comments/${commentId}`)
        .set('access_token', access_token)
        .send(body)
        .end((err, res) => {
            if(err) done(err)
                    
            //assert
            expect(res.statusCode).toEqual(200)
            expect(typeof res.body).toEqual('object')
            expect(res.body).toHaveProperty('description')
            expect(typeof res.body.description).toEqual('string')

            done()
        })
    })


    // ======================== error Desc comments epmty ==========================
    it('should status 400, error Desc comment empty' ,function (done) {
        //setup
        const body = {
            description : ""
        }

        //excecute
        request(app) 
        .put(`/users/${userId}/comments/${commentId}`)
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


    // ======================== error comments id not found ==========================
    it('should status 404, error comment id not found' ,function (done) {
        //setup
        const id = 9999999

        const body = {
            description : 'tidak berhasil edit'
        }

        //excecute
        request(app) 
        .put(`/users/${userId}/comments/${id}`)
        .set('access_token', access_token)
        .send(body)
        .end((err, res) => {
            if(err) done(err)
                    
            //assert
            expect(res.statusCode).toEqual(404)
            expect(typeof res.body).toEqual('Object')
            expect(res.body).toHaveProperty('message')
            expect(res.body).toEqual({
                message : expect.any(String),
            })
            done()
        })
    })


    // ======================== error user not login ==========================
    it('should status 403, error edit user not login' ,function (done) {
        //setup
        const body = {
            description : "tidak berhasil edit"
        }

        //excecute
        request(app) 
        .put(`/users/${userId}/comments/${commentId}`)
        .send(body)
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
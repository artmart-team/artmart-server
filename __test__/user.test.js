// const request = require('supertest')

// const app = require('../app') // using jwt 






// describe POST /users/register
// -- it success
// -- it firstname empty
// -- it lastname empty
// -- it error username empty
// -- it error email empty
// -- it error email not email format
// -- it password empty

// describe POST /users/login
// -- it success
// -- it error email / password empty
// -- it error id not found
// -- it error email and password error

// describe GET /users/:userId
// -- it success
// -- it error id not found 

// decribe PATCH /users/:userId -- edit username or email or password
// -- it success
// -- it edit first name empty
// -- it edit last name empty
// -- it edit error username empty
// -- it edit error email empty
// -- it edit error email not email format
// -- it edit password empty


describe('POST /login',function() {

        // ======================== successfull login ==========================
        it('should status 200, successfull login' ,function (done) {
            //setup
            const body = {
                email : 'admin@mail.com',
                password : '123456',         
            }
        
            //excecute
            request(app) 
            .post('/login')
            .send(body)
            .end((err, res) => {
                if(err) done(err)
                        
                //assert
                expect(res.statusCode).toEqual(200)
                expect(typeof res.body).toEqual('object')
                expect(res.body).toHaveProperty('access_token')
                expect(res.body).toEqual({
                    access_token : expect.any(String)
                })


                done()
            })
        })

        // ==========================  error in password  ===============================
        it('should status 401, invalid for password / not found in database' ,function (done) {
            //setup
            const body = {
                email : 'admin@mail.com',
                password : '12345678910',         
            }
        
            //excecute
            request(app) 
            .post('/login')
            .send(body)
            .end((err, res) => {
                if(err) done(err)
                        
                //assert
                expect(res.statusCode).toEqual(401)
                expect(typeof res.body).toEqual('object')
                expect(res.body).toHaveProperty('message')
                expect(res.body.message).toEqual('Invalid email / password')
                done()
            })
        })


        // ====================== email tidak ada di db ===========================
        it('should status 401, invalid for email / not found in database' ,function (done) {
            //setup
            const body = {
                email : 'administrator@mail.com',
                password : '123456',         
            }
        
            //excecute
            request(app) 
            .post('/login')
            .send(body)
            .end((err, res) => {
                if(err) done(err)
                        
                //assert
                expect(res.statusCode).toEqual(500)
                expect(typeof res.body).toEqual('object')
                expect(res.body).toHaveProperty('message')

                done()
            })
        })


        // ====================== email, pass not fill ===========================
        it('should status 400, email and pass must be filled' ,function (done) {
            //setup
            const body = {
                email : '',
                password : '',         
            }
        
            //excecute
            request(app) 
            .post('/login')
            .send(body)
            .end((err, res) => {
                if(err) done(err)
                        
                //assert
                expect(res.statusCode).toEqual(400)
                expect(typeof res.body).toEqual('object')
                expect(res.body).toHaveProperty('message')
                expect(res.body.message).toEqual('Email / Password must be filled')

                done()
            })
        })
})
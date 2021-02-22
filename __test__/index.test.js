const request = require('supertest')

const app = require('../../app')  

describe('GET /', function() {
    it('should status 200, get home db server', function (done) {
        request(app)
        .get('/')
        .end((err, res) => {
            if(err) done(err)
                    
            //assert
            expect(res.statusCode).toEqual(200)
            expect (typeof res.body).toEqual('object')
            expect(res.body).toHaveProperty('messages')
            expect(typeof res.body.messages).toEqual('string')

            done()
        })
    })
})
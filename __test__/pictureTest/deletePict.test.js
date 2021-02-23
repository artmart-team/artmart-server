// describe DELETE /artists/:artistId/pictures/:pictureId
// -- it success
// -- it error pictures id not found

const request = require('supertest')

const { Picture, Artist, Category} = require('../../models')

const { beforeAll, afterAll } = require("@jest/globals")

const app = require('../../app')  
const { generateToken } = require('../../helpers/jwt')

// ===================================================================================
// ==========================    DELETE /artists/:artistId/pictures/:pictureId
// ==================================================================================

describe('DELETE /artists/:artistId/pictures/:pictureId',function() {
    let artId = null
    let access_token = null
    let catId = null
    let pictId = null

    beforeAll(done => {
        //dummy Artist login
        Artist.create({
            username : "deleteTestingPcitArtist",
            firstName : "artist",
            lastName : "idsearch",
            email : "deleteTestingPcitArtist@mail.com",
            password : '123456',
            profilePicture : "link.google.com",
            completeDuration : 48,
            bankAccount : 230230230,
            defaultPrice : 100000
        })
        .then(artis => {
            artId = artis.id

            const payload = {
                id : artis.id,
                username : artis.username,
                profilePicture : artis.profilePicture
            }

            access_token = generateToken(payload)

            return Category.create({
                name: "testingGetdelete"
            })
            
        })
        .then(data => {
            catId = data.id

            return Picture.create({
                name : 'testing nih buat delete',
                description : 'deleteTestingPict',
                price : 100000,
                link : 'www.google.com',
                hidden : false,
                CategoryId : catId,
                ArtistId : artId,
                UserId : ""
            })
        })
        .then(pict => {
            pictId = pict.id
            done()
        })
    })


    // testing error
    // ======================== error internal server ==========================
    // it('should status 500, error internal server' ,function (done) {
    //     //setup
    //     const idPict = "sa"

    //     //excecute
    //     request(app) 
    //     .delete(`/artists/${artId}/pictures/${idPict}`)
    //     .set('access_token', access_token )
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


    // ======================== successfull delete picture ==========================
    it('should status 200, successfull delete' ,function (done) {
        //setup

        //excecute
        request(app) 
        .delete(`/artists/${artId}/pictures/${pictId}`)
        .set('access_token', access_token )
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
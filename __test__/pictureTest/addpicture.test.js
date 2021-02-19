// decribe POST /artists/:artistId/pictures
// -- it success
// -- it error name empty
// -- it error description empty
// -- it error price empty
// -- it error link empty
// -- it error artis id not found
// -- it error artis Id empty // not login
// -- it error category id empty

const { beforeAll, afterAll } = require("@jest/globals")


// ===================================================================================
// ==========================    POST /artists/:artistId/pictures
// ==================================================================================

describe('POST /artists/:artistId/pictures', function() {
    let artId, catId

    beforeAll(done => {
        Artist.create({
            username : 'username',
            firstName : 'user',
            lastName : 'name',
            email : 'user@mail.com',
            password : '123456',
            completeDuration: 48
        })
        .then(data => {
            artId = data.id
        })
        .catch(err => {
            console.log(err, "<< err create artist image test")
        })

        Category.create({
            name : 'image'
        })
        .then(data => {
            catId = data.id
            done()
        })
        .catch(err => {
            console.log(err, "<< err create image category test")
        })
    })

    afterAll(done => {
        Picture.delete()
        .then(() => {
        })
        .catch(err => {
            console.log(err, "<< err delete Image test")
        })

        Category.delete()
        .then(() => {
        })
        .catch(err => {
            console.log(err, "<< err delete category create image test")
        })

        Artist.delete()
        .then(() => {
            done()
        })
        .catch(err => {
            console.log(err, "<< err delete category create image test")
        })
    })


    // =========================== success create picture ====================
    it('should 201, picture success created', function(done) {
        //setup

        //excecute



        //assert
    })
})
const router = require ('express').Router()
const ArtistController = require ('../controllers/ArtistController')
const { authenticate } = require ('../middlewares/auth')

router.get ('/artists/:artistId', ArtistController.getById)

router.post ('/artists/register', ArtistController.register)

router.post ('/artists/login', ArtistController.login)

router.put ('/artists/:artistId', authenticate, ArtistController.put)

module.exports = router
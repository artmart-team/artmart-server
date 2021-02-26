const router = require ('express').Router()
const ChatController = require ('../controllers/ChatController')
const { authenticate } = require ('../middlewares/auth')

router.get ('/user/:userId/artist/:artistId/chat', ChatController.getAllByUserId)

router.get ('/artist/:artistId/user/:userId/chat', ChatController.getAllByArtistId)

router.post ('/user/:userId/artist/:artistId/chat', authenticate, ChatController.post)

module.exports = router
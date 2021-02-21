const router = require ('express').Router()
const ReviewController  = require ('../controllers/ReviewController')
const { authenticate, authorizeUserComment } = require ('../middlewares/auth')

router.get ('/artists/:artistId/reviews', ReviewController.getAllByArtist)

router.get ('/users/:userId/reviews', ReviewController.getAllByUser)

router.post ('/users/:userId/artists/:artistId/orders/:orderId/reviews/', ReviewController.post)

router.put ('/users/:userId/artists/:artistId/reviews/:reviewId', ReviewController.put)

router.delete ('/users/:userId/artists/:artistId/reviews/:reviewId', ReviewController.delete)

module.exports = router
const router = require ('express').Router()
const ReviewController  = require ('../controllers/ReviewController')
const { authenticate, authorizeUserComment } = require ('../middlewares/auth')

router.get ('/artists/:artistId/reviews', ReviewController.getAllByArtist)

router.get ('/users/:userId/reviews', ReviewController.getAllByUser)

router.get ('/artists/:artistId/reviews/:reviewId', ReviewController.getRReviewIdArtist)

router.get ('/users/:userId/reviews/:reviewId', ReviewController.getReviewIdUser)

router.post ('/users/:userId/artists/:artistId/orders/:orderId/reviews/', authenticate, ReviewController.post)

router.put ('/users/:userId/artists/:artistId/reviews/:reviewId',authenticate,authorizeUserComment, ReviewController.put)

router.delete ('/users/:userId/artists/:artistId/reviews/:reviewId',authenticate,authorizeUserComment, ReviewController.delete)

module.exports = router
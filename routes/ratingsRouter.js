const router = require ('express').Router()
const RatingController  = require ('../controllers/RatingController')
const { authenticate, authorizeUserRating } = require ('../middlewares/auth')

router.get ('/artists/:artistId/ratings', RatingController.getAllByArtist)

router.get ('/artists/:artistId/ratings/average', RatingController.getArtistAverage)

router.get ('/users/:userId/ratings', RatingController.getAllByUser)

router.post ('/users/:userId/artists/:artistId/orders/:orderId/ratings/', authenticate, RatingController.post)

router.put ('/users/:userId/artists/:artistId/ratings/:ratingId', authenticate, authorizeUserRating, RatingController.put)

router.delete ('/users/:userId/artists/:artistId/ratings/:ratingId', authenticate, authorizeUserRating, RatingController.delete)

module.exports = router
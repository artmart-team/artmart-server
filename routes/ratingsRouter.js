const router = require ('express').Router()
const RatingController  = require ('../controllers/RatingController')

router.get ('/artists/:artistId/ratings', RatingController.getAllByArtist)

router.get ('/users/:userId/ratings', RatingController.getAllByUser)

router.post ('/users/:userId/artists/:artistId/orders/:orderId/ratings/', RatingController.post)

router.put ('/users/:userId/artists/:artistId/ratings/:ratingId', RatingController.put)

router.delete ('/users/:userId/artists/:artistId/ratings/:ratingId', RatingController.delete)

module.exports = router
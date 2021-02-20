const router = require ('express').Router()
const OrderController = require ('../controllers/OrderController')
const { authenticate, authorizeUserOrder, authorizeArtistOrder } = require ('../middlewares/auth')

router.get ('/users/:userId/orders', OrderController.getAllByUser)

router.get ('/artists/:artistId/orders', OrderController.getAllByArtist)

router.use(authenticate)

router.post ('/users/:userId/artists/:artistId/orders/', OrderController.post)

router.put ('/users/:userId/orders/:orderId', authorizeUserOrder, OrderController.editOrder)

router.patch ('/artists/:artistId/orders/:orderId/accepted', authorizeArtistOrder, OrderController.acceptOrder)

router.patch ('/artists/:artistId/orders/:orderId/done', authorizeArtistOrder, OrderController.doneOrder)

router.patch ('/users/:userId/orders/:orderId/paid', authorizeArtistOrder, OrderController.paidOrder)

module.exports = router
const router = require ('express').Router()
const OrderController = require ('../controllers/OrderController')
const { authenticate, authorizeUserOrder, authorizeArtistOrder } = require ('../middlewares/auth')

router.get ('/users/:userId/orders', authenticate, OrderController.getAllByUser)

router.get ('/artists/:artistId/orders', authenticate, OrderController.getAllByArtist)

router.get ('/users/:userId/orders/:orderId', authenticate, authorizeUserOrder, OrderController.getOneByUser)

router.get ('/artists/:artistId/orders/:orderId', authenticate, authorizeArtistOrder,  OrderController.getOneByArtist)

router.post ('/users/:userId/artists/:artistId/orders/', authenticate, OrderController.post)

router.put ('/users/:userId/orders/:orderId', authenticate, authorizeUserOrder, OrderController.editOrder)

router.patch ('/artists/:artistId/orders/:orderId/accepted',  authenticate, authorizeArtistOrder, OrderController.acceptOrder)

router.patch ('/artists/:artistId/orders/:orderId/done',  authenticate, authorizeArtistOrder, OrderController.doneOrder)

router.patch ('/users/:userId/orders/:orderId/paid',  authenticate, authorizeArtistOrder, OrderController.paidOrder)

// router.post ('/requestPaymentGateway/orders/:orderId', authenticate, OrderController.respondPayment)

module.exports = router
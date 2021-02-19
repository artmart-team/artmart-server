const router = require ('express').Router()
const OrderController = require ('../controllers/OrderController')
const { authenticate } = require ('../middlewares/auth')

router.get ('/users/:userId/orders', OrderController.getAllByUser)

router.get ('/artists/:artistId/orders', OrderController.getAllByArtist)

router.post ('/users/:userId/orders/', OrderController.post)

router.put ('/users/:userId/orders/:orderId', OrderController.editOrder)

router.patch ('/artists/:artistId/orders/:orderId/accepted', OrderController.acceptOrder)

router.patch ('/artists/:artistId/orders/:orderId/done', OrderController.doneOrder)

router.patch ('/users/:userId/orders/:orderId/paid', OrderController.paidOrder)

module.exports = router
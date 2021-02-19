const router = require ('express').Router()
const usersRouter = require ('./usersRouter')
const artistsRouter = require ('./artistsRouter')
const ordersRouter = require ('./ordersRouter')

router.use (usersRouter)

router.use (artistsRouter)

router.use (ordersRouter)


module.exports = router
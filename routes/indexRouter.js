const router = require ('express').Router()
const usersRouter = require ('./usersRouter')
const artistsRouter = require ('./artistsRouter')
const ordersRouter = require ('./ordersRouter')
const picturesRouter = require ('./picturesRouter')
const optionsRouter = require ('./optionsRouter')

router.use (usersRouter)

router.use (artistsRouter)

router.use (ordersRouter)

router.use (picturesRouter)

router.use (optionsRouter)


module.exports = router
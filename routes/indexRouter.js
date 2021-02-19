const router = require ('express').Router()
const userRouter = require ('./usersRouter')

router.use (userRouter)


module.exports = router
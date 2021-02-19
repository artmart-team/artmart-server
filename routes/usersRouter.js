const router = require ('express').Router()
const UserController = require ('../controllers/UserController')
const { authenticate } = require ('../middlewares/auth')

router.get ('/users/:userId', UserController.getById)

router.post ('/users/register', UserController.register)

router.post ('/users/login', UserController.login)

router.put ('/users/:userId', authenticate, UserController.put)

module.exports = router
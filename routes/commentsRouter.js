const router = require ('express').Router()
const CommentController = require ('../controllers/CommentController')
const { authenticate } = require ('../middlewares/auth')

router.get ('/users/:userId', CommentController.getById)

router.post ('/users/register', CommentController.register)

router.post ('/users/login', CommentController.login)

router.put ('/users/:userId', CommentController.put)

module.exports = router
const router = require ('express').Router()
const CommentController = require ('../controllers/CommentController')
const { authenticate, authorizeUserComment } = require ('../middlewares/auth')

router.get ('/artists/:artistId/comments', CommentController.getAll)

router.post ('/users/:userId/artists/:artistId/comments', authenticate, CommentController.post)

router.patch ('/users/:userId/artists/:artistId/comments/:commentId', authenticate, authorizeUserComment, CommentController.patch)

router.delete ('/users/:userId/artists/:artistId/comments/:commentId', authenticate, authorizeUserComment, CommentController.delete)

module.exports = router
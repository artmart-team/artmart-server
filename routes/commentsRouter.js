const router = require ('express').Router()
const CommentController = require ('../controllers/CommentController')

router.get ('/artists/:artistId/comments', CommentController.getAll)

router.post ('/users/:userId/artists/:artistId/comments', CommentController.post)

router.patch ('/users/:userId/artists/:artistId/comments/:commentId', CommentController.patch)

router.delete ('/users/:userId/artists/:artistId/comments/:commentId', CommentController.delete)

module.exports = router
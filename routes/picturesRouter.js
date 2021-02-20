const router = require ('express').Router()
const PictureController = require ('../controllers/PictureController')
const { authenticate } = require ('../middlewares/auth')

router.get ('/pictures', PictureController.getAll)

router.get ('/users/:userId/pictures', PictureController.getAllByUser)

router.get ('/artists/:artistId/pictures', PictureController.getAllByArtist)

router.get ('/users/:userId/pictures/:pictureId', PictureController.getOneByUser)

router.get ('/artists/:artistId/pictures/:pictureId', PictureController.getOneByArtist)

router.post ('/artists/:artistId/pictures/', PictureController.post)

router.put ('/artists/:artistId/pictures/:pictureId', PictureController.put)

router.delete ('/artists/:artistId/pictures/:pictureId', PictureController.delete)


module.exports = router
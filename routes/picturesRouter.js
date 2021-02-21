const router = require ('express').Router()
const PictureController = require ('../controllers/PictureController')
const { authenticate, authorizeUserPicture, authorizeArtistPicture } = require ('../middlewares/auth')

router.get ('/pictures', PictureController.getAll)

router.get ('/users/:userId/pictures', PictureController.getAllByUser)

router.get ('/artists/:artistId/pictures', PictureController.getAllByArtist)

router.get ('/users/:userId/pictures/:pictureId', PictureController.getOneByUser)

router.get ('/artists/:artistId/pictures/:pictureId', PictureController.getOneByArtist)

router.post ('/artists/:artistId/pictures/', authenticate, PictureController.post)

router.put ('/artists/:artistId/pictures/:pictureId', authenticate, authorizeArtistPicture, PictureController.put)

router.patch ('/users/:userId/pictures/:pictureId', authenticate, authorizeUserPicture, PictureController.patchHidden)

router.delete ('/artists/:artistId/pictures/:pictureId', authenticate, authorizeArtistPicture, PictureController.delete)


module.exports = router
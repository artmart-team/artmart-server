const router = require ('express').Router()
const OptionController  = require ('../controllers/OptionController')
const { authenticate, authorizeArtistOption } = require ('../middlewares/auth')

router.get ('/artists/:artistId/options', authenticate, OptionController.getAll)

router.get ('/artists/:artistId/options/:optionId', authenticate, OptionController.getOptionId)

router.post ('/artists/:artistId/options', authenticate, OptionController.post)

router.put ('/artists/:artistId/options/:optionId', authenticate, authorizeArtistOption, OptionController.put)

router.delete ('/artists/:artistId/options/:optionId', authenticate, authorizeArtistOption, OptionController.delete)

module.exports = router
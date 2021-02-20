const router = require ('express').Router()
const OptionController  = require ('../controllers/OptionController')
const { authenticate } = require ('../middlewares/auth')

router.get ('/artists/:artistId/options', OptionController.getAll)

router.post ('/artists/:artistId/options', OptionController.post)

router.put ('/artists/:artistId/options/:optionId', OptionController.put)

router.delete ('/artists/:artistId/options/:optionId', OptionController.delete)

module.exports = router
const router = require ('express').Router()
const CatController = require ('../controllers/categoriesController')


router.get ('/categories', CatController.getAll)


module.exports = router
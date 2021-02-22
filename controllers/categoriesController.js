const { Category } = require('../models/index')

class CatController {
    static async getAll (req, res, next) {
        try {
          let data = await Category.findAll()

          res.status(200).json(data)
        } catch (err) {
          
        }
      }
}

module.exports = CatController 
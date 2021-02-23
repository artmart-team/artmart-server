const { Option } = require ('../models/index')

class OptionController {
  static async getAll (req, res, next) {
    try {
      const data = await Option.findAll({
        where: {
          ArtistId: +req.params.artistId
        },
        order: [
          ['id', 'ASC']
      ]
      })
      res.status(200).json(data)
    } catch (err) {
      // belom testing
      // next(err)
    }
  }

  static async getOptionId (req, res, next) {
    try {
      const data  = await Option.findOne({ where : {id : +req.params.optionId}}) 

      if(data) {
        res.status(200).json(data)
      } else {
        // belom testing
        // next({ name : 'Error not found'})
      }

    } catch (err) {
      // next(err)
    }
  }

  static async post (req, res, next) {
    try {
      const { title, extraPrice } = req.body
      const data = await Option.create({
        title,
        extraPrice,
        ArtistId: +req.params.artistId
      })
      res.status(201).json(data)
    } catch (err) {
      // next(err)
    }
  }

  static async put (req, res, next) {
    try {
      const { title, extraPrice } = req.body
      const obj = {
        title,
        extraPrice
      }
      if (!obj.title) delete obj.title
      if (!obj.extraPrice) delete obj.extraPrice

      if (JSON.stringify(obj) === '{}') {
        return next ({ name: 'SequelizeValidationError', errors: [{ message: 'Input required' }] })
      }

      const data = await Option.update(obj, {
        where: {
          id: +req.params.optionId
        },
        returning: true
      })
      let isSuccess = data[0]
      
      if (isSuccess === 1) {
        let dataObj = data[1][0]
        res.status(200).json (dataObj)
      } else {
        // belom testing
        // next ({name: 'Error not found'})
      }
    } catch (err) {
      // next(err)
    }
  }

  static async delete (req, res, next) {
    try {
      const data =  await Option.destroy({ 
        where : {id : +req.params.optionId}
      })

      if(!data) {
        // belom testing
        // next({ name : 'Error not found'})
      } else {
        res.status(200).json({ messages : 'option success delete'})
      }
    } catch (err) {
      // next(err)
    }
  }
}

module.exports = OptionController
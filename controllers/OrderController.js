const { Order, User, Artist } = require('../models/index')

class OrderController {
  static async getAllByUser (req, res, next) {
    try {
      const data = await Order.findAll({
        include: {
          model: Artist,
          attributes: ['username', 'email', 'profilePicture']
        }
      })
      res.status(200).json(data)
    } catch (err) {
      next(err)
    }
  }

  static async getAllByArtist (req, res, next) {
    try {
      const data = await Order.findAll({
        include: {
          model: User,
          attributes: ['username', 'email', 'profilePicture']
        }
      })
      res.status(200).json(data)
    } catch (err) {
      next(err)
    }
  }

  static async post (req, res, next) {
    try {
      let { title, description, refImageId, totalPrice, totalOptions } = req.body
      let price = null
      let duration = null

      const checkArtist = await Artist.findOne({
        where: {
          id: +req.params.artistId
        }
      })

      duration = checkArtist.completeDuration
      if (!req.body.price){
        price = checkArtist.defaultPrice
      } else {
        price = +req.body.price
      }
      if (!req.body.totalOptions) {
        totalPrice = price
      } else {
        totalPrice = price + Number(totalOptions)
      }
      
      const checkDuplicate = await Order.findAll({
        where: {
          ArtistId: +req.params.artistId
        }
      })
      
      if (checkDuplicate.length) {
        checkDuplicate.forEach(e => {
          if (!e.paid) {
            return next({ name: "Existing order still active" })
          }
        })
      } 
    
      const obj = {
        title,
        description,
        refImageId: +req.params.refImageId,
        duration: duration,
        price,
        totalPrice,
        accepted: false,
        done: false,
        paid: false,
        imageURL: '',
        UserId: +req.params.userId,
        ArtistId: +req.params.artistId
      }
      const data = await Order.create(obj)
      res.status(201).json(data)

    } catch (err) {
      next(err)
    }
  }

  static async editOrder (req, res, next) {
    try {
      const obj = {
        title: req.body.title,
        description: req.body.description
      }

      const data = await Order.update (obj, {
        where: {
          id: +req.params.orderId
        },
        returning: true
      })

      let isSuccess = data[0]
      
      if (isSuccess === 1) {
        let dataObj = data[1][0]
        res.status(200).json (dataObj)
      } else {
        next ({name: 'Error not found'})
      }
    } catch (err) {
      next(err)
    }
  }

  static async acceptOrder (req, res, next) {
    try {
      const obj = { accepted: true }
      const data = await Order.update (obj, {
        where: {
          id: +req.params.orderId
        },
        returning: true
      })
      let isSuccess = data[0]
      
      if (isSuccess === 1) {
        let dataObj = data[1][0]
        res.status(200).json (dataObj)
      } else {
        next ({name: 'Error not found'})
      }
    } catch (err) {
      next(err)
    }
  }


  static async doneOrder (req, res, next) {
    try {
      const obj = { done: true, imageURL: req.body.imageURL }
      if (!obj.imageURL) {
        return next ({ name: 'SequelizeValidationError', errors: [{ message: 'Image URL required' }] })
      } else {
        const data = await Order.update (obj, {
          where: {
            id: +req.params.orderId
          },
          returning: true
        })
        let isSuccess = data[0]
        
        if (isSuccess === 1) {
          let dataObj = data[1][0]
          res.status(200).json (dataObj)
        } else {
          next ({name: 'Error not found'})
        }    
      }
    } catch (err) {
      next (err)
    }
  }

  static async paidOrder (req, res, next) {
    try {
      const obj = { paid: true }
      const data = await Order.update (obj, {
        where: {
          id: +req.params.orderId
        },
        returning: true
      })
      let isSuccess = data[0]
      
      if (isSuccess === 1) {
        let dataObj = data[1][0]
        res.status(200).json (dataObj)
      } else {
        next ({name: 'Error not found'})
      }
    } catch (err) {
      next(err)
    }
  }
}

module.exports = OrderController
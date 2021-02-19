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
      const { title, description, refImageId, duration, price, totalPrice, accepted, done, paid, imageURL, ArtistId } = req.body

      const checkDuplicate = await Order.findAll({
        where: {
          ArtistId: +ArtistId
        }
      })
      
      if (checkDuplicate) {
        checkDuplicate.forEach(e => {
          if (!e.paid) {
            console.log(e)
            return next({ name: "Existing order still active" })
          }
        })
      } 

      const obj = {
        title,
        description,
        // refImageId,
        // duration,
        // price,
        // totalPrice,
        accepted: false,
        done: false,
        paid: false,
        imageURL: '',
        UserId: +req.params.userId,
        ArtistId: +ArtistId
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
      const obj = { done: true }
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
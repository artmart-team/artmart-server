const { Order, User, Artist, Picture } = require('../models/index')
const axios = require('axios')

function addDays(date, days) {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

class OrderController {
  static async getAllByUser (req, res, next) {
    try {
      const data = await Order.findAll({
        where: {
          UserId: +req.userId
        },
        attributes: [
          'id', 'title', 'description', 'refPictureId', 'deadline', 'price', 'totalPrice', 'accepted', 'done', 'paid', 'imageURL', 'options', 'UserId', 'ArtistId', 'ReviewId', 'RatingId'
        ],
        include: {
          model: Artist,
          attributes: [ 'id', 'username', 'profilePicture']
        }
      })

      let newData = []
      
      data.forEach(async (e, idx) => {
        if (e.refPictureId) {
          let picture = await Picture.findOne({
            where: {
              id: e.refPictureId
            }
          })
          e.dataValues.refLink = picture.link
          newData.push(e)
          
        } else {
          newData.push(e)
        }
      })
      setTimeout(function(){
        res.status(200).json(newData)
       }, 500);
    } catch (err) {
      next(err)
    }
  }

  static async getAllByArtist (req, res, next) {
    try {
      const data = await Order.findAll({
        where: {
          ArtistId: +req.artistId,
          paid: true
        },
        attributes: [
          'id', 'title', 'description', 'refPictureId', 'deadline', 'price', 'totalPrice', 'accepted', 'done', 'paid', 'imageURL', 'options', 'UserId', 'ArtistId', 'ReviewId', 'RatingId'
        ],
        include: {
          model: User,
          attributes: [ 'id', 'username', 'profilePicture']
        }
      })

      let newData = []

      data.forEach(async (e, idx) => {
        if (e.refPictureId) {
          let picture = await Picture.findOne({
            where: {
              id: e.refPictureId
            }
          })
          e.dataValues.refLink = picture.link
          newData.push(e)
        } else {
          newData.push(e)
        }
      })
      setTimeout(function(){
        res.status(200).json(newData)
       }, 500);
    } catch (err) {
      next(err)
    }
  }

  static async getOneByUser (req, res, next) {
    try {
      const data = await Order.findOne({
        where: {
          id: +req.params.orderId
        },
        attributes: [
          'id', 'title', 'description', 'refPictureId', 'deadline', 'price', 'totalPrice', 'accepted', 'done', 'paid', 'imageURL', 'options', 'UserId', 'ArtistId', 'ReviewId', 'RatingId'
        ],
        include: {
          model: Artist,
          attributes: [ 'id', 'username', 'profilePicture']
        }
      })
      res.status(200).json(data)
    } catch (err) {
      next(err)
    }
  }

  static async getOneByArtist (req, res, next) {
    try {
      const data = await Order.findOne({
        where: {
          id: +req.params.orderId
        },
        attributes: [
          'id', 'title', 'description', 'refPictureId', 'deadline', 'price', 'totalPrice', 'accepted', 'done', 'paid', 'imageURL', 'options', 'UserId', 'ArtistId', 'ReviewId', 'RatingId'
        ],
        include: {
          model: User,
          attributes: [ 'id', 'username', 'profilePicture']
        }
      })
      res.status(200).json(data)
    } catch (err) {
      next(err)
    }
  }

  static async post (req, res, next) {
    try {
      let { title, description, options } = req.body
      let setRefPictureId = +req.body.refPictureId || null
      let price = null
      let totalPrice = null

      if (!req.body.price){
        const checkArtist = await Artist.findOne({
          where: {
            id: +req.params.artistId
          }
        })

        price = checkArtist.defaultPrice
      } else {
        price = +req.body.price
      }
      
      if (!req.body.totalPrice) {
        totalPrice = price
      } else {
        totalPrice = +req.body.totalPrice
      }

      const checkDuplicate = await Order.findAll({
        where: {
          ArtistId: +req.params.artistId,
          UserId: +req.params.userId
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
        refPictureId: setRefPictureId,
        price,
        totalPrice,
        accepted: false,
        done: false,
        paid: false,
        options,
        imageURL: '',
        UserId: +req.userId,
        ArtistId: +req.params.artistId
      }
      const data = await Order.create(obj, {
        attributes: [
          'id', 'title', 'description', 'refPictureId', 'deadline', 'price', 'totalPrice', 'accepted', 'done', 'paid', 'imageURL', 'options', 'userId', 'artistId', 'reviewId', 'ratingId'
        ]
      })
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
      const artistData = await Artist.findOne({
        where: {
          id: +req.artistId
        }
      })
      const orderData = await Order.findOne({
        where: {
          id: +req.params.orderId
        }
      })


      if (orderData.deadline) {
        return next ({ name: 'Order already accepted' })
      } else {
          let deadline = addDays(new Date, artistData.completeDuration)
          console.log(artistData.completeDuration, 'completeDuration -------------')
          console.log(deadline, 'deadline -------------')
          const obj = { accepted: true, deadline }
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
      next(err)
    }
  }


  static async doneOrder (req, res, next) {
    try {
      const checkDone = await Order.findOne({
        where: {
          id: +req.params.orderId
        }
      })
      if (checkDone.done) {
        return next({ name: 'Order already done' })
      }


      const obj = { done: true, imageURL: req.body.imageURL }

      let orderData = await Order.findOne({
        where: {
          id: +req.params.orderId
        },
        include: {
          model: User,
          attributes: [ 'id', 'username', 'profilePicture']
        }
      })

      if (!orderData) {
        return next({ name: 'Error not found'})
      }

      let data = await Order.update (obj, {
        where: {
          id: +req.params.orderId
        },
        returning: true
      })
      if (!obj.imageURL) {
        return next ({ name: 'SequelizeValidationError', errors: [{ message: 'Image URL required' }] })
      } else {

        let isSuccess = data[0]
        
        if (isSuccess === 1) {
          let dataObj = data[1][0]

          const objPicture = {
            name: `[C] - ${orderData.User.username}`,
            description: '',
            price: +orderData.price,
            link: req.body.imageURL,
            hidden: false,
            CategoryId: +req.body.categoryId,
            ArtistId: +orderData.ArtistId,
            UserId: +orderData.UserId
          }
    
          const dataPicture = await Picture.create(objPicture)

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
      const checkPaid = await Order.findOne({
        where: {
          id: +req.params.orderId
        }
      })
      if (checkPaid.paid) {
        return next({ name: 'Order already paid' })
      }

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

  static async respondPayment (req, res, next) {
    try {
      let date = new Date()
      let time = date.getTime()
      const obj = {
        transaction_details: {
          order_id: 'mART__terialize' + Number(req.params.orderId) + time,
          gross_amount: +req.body.gross_amount
        }
      }

      axios.post('https://app.sandbox.midtrans.com/snap/v1/transactions', obj,
      {
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": "Basic U0ItTWlkLXNlcnZlci1jTmFXSDdCbUJMRS1tYmsxYWszUmV4al86"
        }
      })
      .then(function (response) {
        res.status(201).json(response.data)
      })
      .catch(function (error) {
        res.status(400).json(error)
        console.log(error, 'error respondPayment')
      })

    } catch (err) {
      next(err)
    }
  }

  static async getLatestOrderByUser (req, res, next) {
    try {
      const latestOrder = await Order.findOne({
        order: [ [ 'id', 'DESC' ]],
        attributes:  ['id']
      })

      if (!latestOrder) {
        next({ name: 'Error not found' })
      } else {
        res.status(200).json(latestOrder)
      }
    } catch (err) {
      next(err)
    }
  }

  static async orderDeclineByArtist (req, res, next) {
    try {
      const data = await Order.destroy({
        where: {
          id: +req.params.orderId
        }
      })
      res.status(200).json({ messages: 'Order declined' })
    } catch (err) {
      next(err)
    }
  }

  static async cancelOrder (req, res, next) {
    try {
      const data = await Order.destroy({
        where: {
          id: +req.params.orderId
        }
      })
      res.status(200).json({ messages: 'Order canceled' })
    } catch (err) {
      next(err)
    }
  }
}

module.exports = OrderController
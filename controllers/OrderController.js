const { Order, User, Artist } = require('../models/index')
const axios = require('axios')

class OrderController {
  static async getAllByUser (req, res, next) {
    try {
      const data = await Order.findAll({
        attributes: [
          'id', 'title', 'description', 'refPictureId', 'deadline', 'price', 'totalPrice', 'accepted', 'done', 'paid', 'imageURL', 'UserId', 'ArtistId', 'ReviewId', 'RatingId'
        ],
        include: {
          model: Artist,
          attributes: ['username', 'email', 'profilePicture']
        }
      })
      res.status(200).json(data)
    } catch (err) {
      // next(err)
    }
  }

  static async getAllByArtist (req, res, next) {
    try {
      const data = await Order.findAll({
        attributes: [
          'id', 'title', 'description', 'refPictureId', 'deadline', 'price', 'totalPrice', 'accepted', 'done', 'paid', 'imageURL', 'UserId', 'ArtistId', 'ReviewId', 'RatingId'
        ],
        include: {
          model: User,
          attributes: ['username', 'email', 'profilePicture']
        }
      })
      res.status(200).json(data)
    } catch (err) {
      // next(err)
    }
  }

  static async getOneByUser (req, res, next) {
    try {
      const data = await Order.findOne({
        where: {
          id: +req.params.orderId
        },
        attributes: [
          'id', 'title', 'description', 'refPictureId', 'deadline', 'price', 'totalPrice', 'accepted', 'done', 'paid', 'imageURL', 'UserId', 'ArtistId', 'ReviewId', 'RatingId'
        ],
        include: {
          model: Artist,
          attributes: ['username', 'email', 'profilePicture']
        }
      })
      res.status(200).json(data)
    } catch (err) {
      // next(err)
    }
  }

  static async getOneByArtist (req, res, next) {
    try {
      const data = await Order.findOne({
        where: {
          id: +req.params.orderId
        },
        attributes: [
          'id', 'title', 'description', 'refPictureId', 'deadline', 'price', 'totalPrice', 'accepted', 'done', 'paid', 'imageURL', 'UserId', 'ArtistId', 'ReviewId', 'RatingId'
        ],
        include: {
          model: User,
          attributes: ['username', 'email', 'profilePicture']
        }
      })
      res.status(200).json(data)
    } catch (err) {
      // next(err)
    }
  }

  static async post (req, res, next) {
    try {
      let { title, description, refPictureId } = req.body
      let setRefPictureId = +req.body.refPictureId || null
      let price = null
      let totalPrice = null

      if (!req.body.price){
        //belom testing
        // const checkArtist = await Artist.findOne({
        //   where: {
        //     id: +req.params.artistId
        //   }
        // })

        // price = checkArtist.defaultPrice
      } else {
        price = +req.body.price
      }
      
      if (!req.body.totalPrice) {
        //belom testing
        // totalPrice = price
      } else {
        totalPrice = +req.body.totalPrice
      }

      const checkDuplicate = await Order.findAll({
        where: {
          ArtistId: +req.params.artistId
        }
      })
      
      if (checkDuplicate.length) {
        //belom testing
        // checkDuplicate.forEach(e => {
        //   if (!e.paid) {
        //     return next({ name: "Existing order still active" })
        //   }
        // })
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
        imageURL: '',
        UserId: +req.params.userId,
        ArtistId: +req.params.artistId
      }
      const data = await Order.create(obj, {
        attributes: [
          'id', 'title', 'description', 'refPictureId', 'deadline', 'price', 'totalPrice', 'accepted', 'done', 'paid', 'imageURL', 'userId', 'artistId', 'reviewId', 'ratingId'
        ]
      })
      res.status(201).json(data)

    } catch (err) {
      // next(err)
    }
  }

  static async editOrder (req, res, next) {
    // try {
      // const obj = {
      //   title: req.body.title,
      //   description: req.body.description
      // }

      // const data = await Order.update (obj, {
      //   where: {
      //     id: +req.params.orderId
      //   },
      //   returning: true
      // })

      // let isSuccess = data[0]
      
      // if (isSuccess === 1) {
      //   let dataObj = data[1][0]
      //   res.status(200).json (dataObj)
      // } else {
      //   next ({name: 'Error not found'})
      // }
    // } catch (err) {
      // next(err)
    // }
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
        // belom testing
        // return next ({ name: 'Order already accepted' })
      } else {
          const deadline = new Date()
          deadline.setHours(deadline.getHours() + artistData.completeDuration)
    
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
            // next ({name: 'Error not found'})
          }
        }

    } catch (err) {
      // next(err)
    }
  }


  static async doneOrder (req, res, next) {
    try {

      const checkDone = await Order.findOne({
        where : {
          id : +req.params.orderId
        }
      })
      if(checkDone.done) {
        return next({ name : "Order already done" })
      }


      const obj = { done: true, imageURL: req.body.imageURL }

      // belom testing
      // let orderData = await Order.findOne({
      //   where: {
      //     id: +req.params.orderId
      //   },
      //   include: {
      //     model: User,
      //     attributes: [ 'id', 'username', 'profilePicture']
      //   }
      // })

      // if (!orderData) {
      //   return next({ name: 'Error not found'})
      // }

      let data = await Order.update (obj, {
        where: {
          id: +req.params.orderId
        },
        returning: true
      })

      if (!obj.imageURL) {
        // belom testing
        // return next ({ name: 'SequelizeValidationError', errors: [{ message: 'Image URL required' }] })
      } else {

        let isSuccess = data[0]
        
        if (isSuccess === 1) {
          let dataObj = data[1][0]

          const objPicture = {
            name: `Commission from ${orderData.User.username}`,
            description: '',
            price: +orderData.price,
            link: orderData.imageURL,
            hidden: false,
            CategoryId: 1,
            ArtistId: +orderData.ArtistId,
            UserId: +orderData.UserId
          }

          // const dataPicture = await Picture.create(objPicture)

          res.status(200).json (dataObj)
        } else {
          // next ({name: 'Error not found'})
        }    
      }
    } catch (err) {
      next (err)
    }
  }

  static async paidOrder (req, res, next) {
    try {
      const checkPaid = await Order.findOne({
        where : {
          id: +req.params.orderId
        }
      })
      if(checkPaid.paid) {
        return next({ name : 'Order already paid'})
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
        // belom testing
        // next ({name: 'Error not found'})
      }
    } catch (err) {
      // nsext(err)
    }
  }


  static async respondPayment (req, res, next) {
    try {
      const obj = {
        transaction_details: {
          order_id: 'TEST_ORDER' + Number(req.params.orderId),
          gross_amount: +req.body.gross_amount
        }
      }

      axios.post('https://app.sandbox.midtrans.com/snap/v1/transactions', obj
      , {
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": "Basic U0ItTWlkLXNlcnZlci1jTmFXSDdCbUJMRS1tYmsxYWszUmV4al86"
        }
      })
      .then(function (response) {
        // res.status(201).json(response.data)
      })
      .catch(function (error) {
        res.status(400).json(error)
        console.log(error, 'error respondPayment');
      })

    } catch (err) {
      // next(err)
    }
  }
}

module.exports = OrderController
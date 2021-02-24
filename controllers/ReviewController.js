const { Review, Order } = require ('../models/index')

class ReviewController {
  static async getAllByArtist (req, res, next) {
    try {
      const data = await Review.findAll({
        where: {
          ArtistId: +req.params.artistId
        }
      })
      res.status(200).json(data)
    } catch (err) {
      next(err)
    }
  }

  static async getAllByUser (req, res, next) {
    try {
      const data = await Review.findAll({
        where: {
          UserId: +req.params.userId
        }
      })
      res.status(200).json(data)
    } catch (err) {
      next(err)
    }
  }

  static async getReviewIdUser (req, res, next) {
    try {
      const data  = await Review.findOne({ where : {
        id : +req.params.reviewId,
        UserId : +req.params.userId
      }}) 

      if(data) {
        res.status(200).json(data)
      } else {
        next({ name : 'Error not found'})
      }

    } catch (err) {
      next(err)
    }
  }

  static async getRReviewIdArtist (req, res, next) {
    try {
      const data  = await Review.findOne({ where : {
        id : +req.params.reviewId,
        ArtistId : +req.params.artistId
      }}) 

      if(data) {
        res.status(200).json(data)
      } else {
        next({ name : 'Error not found'})
      }

    } catch (err) {
      next(err)
    }
  }

  static async post (req, res, next) {
    try {
      const findOrder = await Order.findOne({
        where: {
          id: +req.params.orderId
        }
      })


      // if (findOrder.UserId !== req.userId) {
      //   res.status (401).json ({message: 'Unauthorized'})
      // }

      if (!findOrder) {
        // next({ name: 'Error not found' })
      } else if (findOrder.ReviewId) {
          next({ name: 'Already have review' })
      } else {
        const { title, description } = req.body
        const obj = {
          title,
          description,
          UserId: +req.params.userId,
          ArtistId: +req.params.artistId
        }
  
        const data = await Review.create(obj)
  
        const updateObj = {
          ReviewId: data.id
        }
  
        const updatedOrderData = await Order.update(updateObj, {
          where: {
            id: +req.params.orderId
          }
        })
        res.status(201).json(data)
      }

    } catch (err) {
      // next(err)
    }
  }

  static async put (req, res, next) {
    try {
      const { title, description } = req.body
      const obj = {
        title,
        description
      }
      if (!obj.title) delete obj.title
      if (!obj.description) delete obj.description

      if (JSON.stringify(obj) === '{}') {
        return next ({ name: 'SequelizeValidationError', errors: [{ message: 'Input required' }] })
      }


      let data = await Review.update (obj, {
        where: {
          id: +req.params.reviewId
        },
        returning: true
      })
      let isSuccess = data[0]
      
      if (isSuccess === 1) {
        let dataObj = data[1][0]

        res.status(200).json (dataObj)
      } else {
        //belom testing
        // next ({name: 'Error not found'})
      }
    } catch (err) {
      // next(err)
    }
  }

  static async delete (req, res, next) {
    try {
      const data = await Review.destroy({
        where: {
          id: +req.params.reviewId
        }
      })

      res.status(200).json({ messages: 'Review deleted' })
    } catch (err) {
      // next(err)
    }
  }
}

module.exports = ReviewController
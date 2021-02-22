const { Rating, Order } = require ('../models/index')

class RatingController {
  static async getAllByArtist (req, res, next) {
    try {
      const data = await Rating.findAll({
        where: {
          ArtistId: +req.params.artistId
        }
      })
      res.status(200).json(data)
    } catch (err) {
      next(err)
    }
  }

  static async getRatingIdUser (req, res, next) {
    try {
      const data  = await Rating.findOne({ where : {
        id : +req.params.ratingId,
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

  static async getRatingIdArtist (req, res, next) {
    try {
      const data  = await Rating.findOne({ where : {
        id : +req.params.ratingId,
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

  static async getAllByUser (req, res, next) {
    try {
      const data = await Rating.findAll({
        where: {
          UserId: +req.params.userId
        }
      })
      res.status(200).json(data)
    } catch (err) {
      next(err)
    }
  }

  static async post (req, res, next) {
    try {
      const obj = {
        score: +req.body.score,
        UserId: +req.params.userId,
        ArtistId: +req.params.artistId
      }

      const data = await Rating.create(obj)

      const updateObj = {
        RatingId: data.id
      }

      const updatedOrderData = await Order.update(updateObj, {
        where: {
          id: +req.params.orderId
        }
      })
      res.status(201).json(data)
    } catch (err) {
      next(err)
    }
  }

  static async put (req, res, next) {
    try {
      const obj = {
        score: +req.body.score
      }
      if (!obj.score) delete obj.score

      if (JSON.stringify(obj) === '{}') {
        return next ({ name: 'SequelizeValidationError', errors: [{ message: 'Input required' }] })
      }

      let data = await Rating.update (obj, {
        where: {
          id: +req.params.ratingId
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

  static async delete (req, res, next) {
    try {
      const data = await Rating.destroy({
        where: {
          id: +req.params.ratingId
        }
      })

      if(!data) {
        next({ name : 'Error not found'})
      }

      res.status(200).json({ messages: 'Rating deleted' })
    } catch (err) {
      next(err)
    }
  }
}

module.exports = RatingController
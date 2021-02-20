const { Comment, User } = require ('../models/index')

class CommentController {
  static async getAll (req, res, next) {
    try {
      let data = await Comment.findAll({
        where: {
          ArtistId: +req.params.artistId
        },
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
      let obj = {
        description: req.body.description,
        UserId: +req.params.userId,
        ArtistId: +req.params.artistId
      }

      if (!obj.description) {
        return next ({ name: 'SequelizeValidationError', errors: [{ message: 'Input required' }] })
      } else {
        const data = await Comment.create(obj)
        res.status(201).json(data)
      }

    } catch (err) {
      next(err)
    }
  }

  static async patch (req, res, next) {
    try {
      let obj = {
        description: req.body.description
      }

      if (!obj.description) {
        return next ({ name: 'SequelizeValidationError', errors: [{ message: 'Input required' }] })
      } else {
        const data = await Comment.update(obj, {
          where: {
            id: +req.params.commentId
          },
          returning: true
        })
        let isSuccess = data[0]
      
        if (isSuccess === 1) {
          let dataObj = data[1][0]
          delete dataObj.dataValues.password
          res.status(200).json (dataObj)
        } else {
          next ({name: 'Error not found'})
        }
      }

    } catch (err) {
      next(err)
    }
  }

  static async delete (req, res, next) {
    try {
      const data = await Comment.destroy({
        where: {
          id: +req.params.commentId
        }
      })
      if(!data) {
        next ({ name: 'Error not found' })
      } else {
        res.status(200).json({ message: 'Comment deleted' })
      }

    } catch (err) {
      next(err)
    }
  }
}

module.exports = CommentController
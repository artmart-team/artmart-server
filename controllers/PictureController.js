const { Picture, User, Artist } = require ('../models/index')

class PictureController {
  static async getAll (req, res, next) {
    try {
      const data = await Picture.findAll()
      res.status(200).json(data)
    } catch (err) {
      next(err)
    }
  }

  static async getAllByUser (req, res, next) {
    try {
      const data = await Picture.findAll({
        where: {
          UserId: +req.params.userId
        },
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
      const data = await Picture.findAll({
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

  static async getOneByUser (req, res, next) {
    try {
      const data = await Picture.findOne({
        where: {
          id: +req.params.pictureId
        },
        include: {
          model: Artist,
          attributes: ['username', 'email', 'profilePicture']
        }
      })

      if (!data) {
        next({ name: 'Error not found'})
      } else {
        res.status(200).json(data)
      }
    } catch (err) {
      next(err)
    }
  }


  static async getOneByArtist (req, res, next) {
    try {
      const data = await Picture.findOne({
        where: {
          id: +req.params.pictureId
        },
        include: {
          model: User,
          attributes: ['username', 'email', 'profilePicture']
        }
      })

      if (!data) {
        next({ name: 'Error not found'})
      } else {
        res.status(200).json(data)
      }
    } catch (err) {
      next(err)
    }
  }
  
  static async post (req, res, next) {
    try {
      let { name, description, price, link, hidden, CategoryId, UserId } = req.body
      if (!UserId) UserId = null
      const obj = {
        name,
        description,
        price,
        link,
        hidden,
        CategoryId,
        ArtistId: +req.params.artistId,
        UserId
      }

      const data = await Picture.create(obj)
      res.status(201).json(data)
    } catch (err) {
      next(err)
    }
  }

  static async put (req, res, next) {
    try {
      let obj = {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        link: req.body.link,
        hidden: req.body.hidden,
        categoryId: req.body.categoryId
      }
      if (!obj.name) delete obj.name
      if (!obj.description) delete obj.description
      if (!obj.price) delete obj.price
      if (!obj.link) delete obj.link
      if (!obj.hidden) delete obj.hidden
      if (!obj.categoryId) delete obj.categoryId

      if (JSON.stringify(obj) === '{}') {
        return next ({ name: 'SequelizeValidationError', errors: [{ message: 'Input required' }] })
      }

      let data = await Picture.update (obj, {
        where: {
          id: +req.params.pictureId
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
      const data = await Picture.destroy({
        where: {
          id: +req.params.pictureId
        }
      })
      if (!data) {
        next({ name: "Error not found" })
      } else {
        res.status(200).json({ messages: 'Pictures deleted' })
      }
    } catch (err) {
      next(err)
    }
  }
}

module.exports = PictureController
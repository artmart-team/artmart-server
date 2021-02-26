const { Chat, User, Artist } = require ('../models/index')

class ChatController {
  static async getAllByUserId (req, res, next) {
    try {
      const data = await Chat.findAll({
        where: {
          UserId: +req.params.userId,
          ArtistId: +req.params.artistId
        },
        attributes: ['id', 'messages', 'from', 'UserId', 'ArtistId', 'createdAt'],
        include: [
          {
            model: User,
            attributes: ['id', 'username', 'profilePicture']
          },
          {
            model: Artist,
            attributes: ['id', 'username', 'profilePicture']
          }
        ]
      })

      res.status(200).json(data)
    } catch (err) {
      next(err)
    }
  }

  static async getAllByArtistId (req, res, next) {
    try {
      const data = await Chat.findAll({
        where: {
          UserId: +req.params.userId,
          ArtistId: +req.params.artistId
        },
        attributes: ['id', 'messages', 'from', 'UserId', 'ArtistId', 'createdAt'],
        include: [
          {
            model: User,
            attributes: ['id', 'username', 'profilePicture']
          },
          {
            model: Artist,
            attributes: ['id', 'username', 'profilePicture']
          }
        ]
      })

      res.status(200).json(data)
    } catch (err) {
      next(err)
    }
  }

  static async post (req, res, next) {
    try {
      let from = ''
      if (req.artistId) {
        from = 'artist'
      } else {
        from = 'customer'
      }
      const obj = {
        messages: req.body.messages,
        from,
        UserId: +req.params.userId,
        ArtistId: +req.params.artistId
      }
      const data = await Chat.create(obj)

      res.status(201).json(data)      
    } catch (err) {
      next(err)
    }
  }
}

module.exports = ChatController
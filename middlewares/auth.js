const { checkToken } = require ('../helpers/jwt')
const { User, Artist, Order } = require ('../models/index')

async function authenticate (req, res, next) {
  try {
    let decoded = checkToken (req.headers.access_token)

    let dataUser = await User.findOne ({
      where: {
        username: decoded.username
      }
    })

    let dataArtist = await Artist.findOne ({
      where: {
        username: decoded.username
      }
    })

    if ( !dataUser && !dataArtist) {
      res.status (403).json ({message: 'Please login first'})
    } else {
      if (!dataUser) {
        req.artistId = dataArtist.id
        next ()

      } else {
        req.userId = dataUser.id
        next ()
      }
    }
  } catch (err) {
    next (err)
  }
}

async function authorizeUserOrder (req, res, next) {
  try {
    const targetId = +req.params.orderId
    var data = await Order.findOne({
      where: {
        id: targetId
      }
    })

    if (data.UserId !== req.userId) {
      res.status (401).json ({message: 'Unauthorized'})
    } else if (data.UserId === req.userId) {
      next()
    }
  } catch (err) {
    next (err)
  }
}

async function authorizeArtistOrder (req, res, next) {
  try {
    const targetId = +req.params.orderId
    var data = await Order.findOne({
      where: {
        id: targetId
      }
    })

    if (data.ArtistId !== req.artistId) {
      res.status (401).json ({message: 'Unauthorized'})
    } else if (data.ArtistId === req.artistId) {
      next()
    }
  } catch (err) {
    next (err)
  }
}

module.exports = {
  authenticate,
  authorizeUserOrder,
  authorizeArtistOrder
}
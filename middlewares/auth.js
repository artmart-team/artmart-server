const { checkToken } = require ('../helpers/jwt')
const { User, Artist } = require ('../models/index')

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

async function authorize (req, res, next) {
  try {
    const targetId = +req.params.cartId
    var data = await Cart.findOne({
      where: {
        id: targetId
      }
    })
    if (data.userId !== req.user) {
      res.status (401).json ({message: 'Unauthorized'})
    } else if (data.userId === req.user) {
      next()
    }
  } catch (err) {
    console.log(data, 'masuk')
    next (err)
  }
}

module.exports = {
  authenticate,
  authorize
}
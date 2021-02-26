const { checkToken } = require ('../helpers/jwt')
const { User, Artist, Order, Picture, Comment, Option, Rating, Review, Chat } = require ('../models/index')

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
      console.log(dataUser, dataArtist, 'datadata')
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

async function authorizeUserEdit (req, res, next) {
  try {
    const targetId = +req.params.userId
    var data = await User.findOne({
      where: {
        id: targetId
      }
    })
    if (!data) {
      return next({ name: 'Error not found' })
    }

    if (data.id !== req.userId) {
      res.status (401).json ({message: 'Unauthorized'})
    } else if (data.id === req.userId) {
      next()
    }
  } catch (err) {
    next (err)
  }
}

async function authorizeArtistEdit (req, res, next) {
  try {
    const targetId = +req.params.artistId
    var data = await Artist.findOne({
      where: {
        id: targetId
      }
    })
    if (!data) {
      return next({ name: 'Error not found' })
    }

    if (data.id !== req.artistId) {
      res.status (401).json ({message: 'Unauthorized'})
    } else if (data.id === req.artistId) {
      next()
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
    if (!data) {
      return next({ name: 'Error not found' })
    }

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
    if (!data) {
      return next({ name: 'Error not found' })
    }

    if (data.ArtistId !== req.artistId) {
      res.status (401).json ({message: 'Unauthorized'})
    } else if (data.ArtistId === req.artistId) {
      next()
    }
  } catch (err) {
    next (err)
  }
}

async function authorizeUserPicture (req, res, next) {
  try {
    const targetId = +req.params.pictureId
    var data = await Picture.findOne({
      where: {
        id: targetId
      }
    })
    if (!data) {
      return next({ name: 'Error not found' })
    }

    if (data.UserId !== req.userId) {
      res.status (401).json ({message: 'Unauthorized'})
    } else if (data.UserId === req.userId) {
      next()
    }
  } catch (err) {
    next (err)
  }
}

async function authorizeArtistPicture (req, res, next) {
  try {
    const targetId = +req.params.pictureId
    var data = await Picture.findOne({
      where: {
        id: targetId
      }
    })
    if (!data) {
      return next({ name: 'Error not found' })
    }

    if (data.ArtistId !== req.artistId) {
      res.status (401).json ({message: 'Unauthorized'})
    } else if (data.ArtistId === req.artistId) {
      next()
    }
  } catch (err) {
    next (err)
  }
}

async function authorizeUserComment (req, res, next) {
  try {
    const targetId = +req.params.commentId
    var data = await Comment.findOne({
      where: {
        id: targetId
      }
    })
    if (!data) {
      return next({ name: 'Error not found' })
    }

    if (data.UserId !== req.userId) {
      res.status (401).json ({message: 'Unauthorized'})
    } else if (data.UserId === req.userId) {
      next()
    }
  } catch (err) {
    next (err)
  }
}

async function authorizeArtistOption (req, res, next) {
  try {
    const targetId = +req.params.optionId
    var data = await Option.findOne({
      where: {
        id: targetId
      }
    })
    if (!data) {
      return next({ name: 'Error not found' })
    }

    if (data.ArtistId !== req.artistId) {
      res.status (401).json ({message: 'Unauthorized'})
    } else if (data.ArtistId === req.artistId) {
      next()
    }
  } catch (err) {
    next (err)
  }
}

async function authorizeUserRating (req, res, next) {
  try {
    const targetId = +req.params.ratingId
    var data = await Rating.findOne({
      where: {
        id: targetId
      }
    })
    if (!data) {
      return next({ name: 'Error not found' })
    }

    if (data.UserId !== req.userId) {
      res.status (401).json ({message: 'Unauthorized'})
    } else if (data.UserId === req.userId) {
      next()
    }
  } catch (err) {
    next (err)
  }
}

async function authorizeUserReview (req, res, next) {
  try {
    const targetId = +req.params.reviewId
    var data = await Review.findOne({
      where: {
        id: targetId
      }
    })
    if (!data) {
      return next({ name: 'Error not found' })
    }

    if (data.UserId !== req.userId) {
      res.status (401).json ({message: 'Unauthorized'})
    } else if (data.UserId === req.userId) {
      next()
    }
  } catch (err) {
    next (err)
  }
}



module.exports = {
  authenticate,
  authorizeUserEdit,
  authorizeArtistEdit,
  authorizeUserOrder,
  authorizeArtistOrder,
  authorizeUserPicture,
  authorizeArtistPicture,
  authorizeUserComment,
  authorizeArtistOption,
  authorizeUserRating,
  authorizeUserReview
}
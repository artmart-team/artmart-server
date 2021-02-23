const { checkToken } = require ('../helpers/jwt')
const { User, Artist, Order, Picture, Comment, Option, Rating, Review } = require ('../models/index')

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
        // console.log(req.artistId, '<< artist login id')
        next ()

      } else {
        req.userId = dataUser.id
        // console.log(req.userId, '<< user login Id')
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
      //belom testing
      // return next({ name: 'Error not found' })
    }

    if (data.id !== req.userId) {
      //belom testing
      // res.status (401).json ({message: 'Unauthorized'})
    } else if (data.id === req.userId) {
      next()
    }
  } catch (err) {
    // next (err)
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
      //belom testing
      // return next({ name: 'Error not found' })
    }

    if (data.id !== req.artistId) {
      //belom testing
      // res.status (401).json ({message: 'Unauthorized'})
    } else if (data.id === req.artistId) {
      next()
    }
  } catch (err) {
    // next (err)
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
      //belom testing
      // return next({ name: 'Error not found' })
    }

    if (data.UserId !== req.userId) {
      //belom testing
      // res.status (401).json ({message: 'Unauthorized'})
    } else if (data.UserId === req.userId) {
      next()
    }
  } catch (err) {
    // next (err)
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
      //belom testing
      // return next({ name: 'Error not found' })
    }

    if (data.ArtistId !== req.artistId) {
      //belom testing
      // res.status (401).json ({message: 'Unauthorized'})
    } else if (data.ArtistId === req.artistId) {
      next()
    }
  } catch (err) {
    // next (err)
  }
}

async function authorizeUserPicture (req, res, next) {
  try {
    //belom testing
    const targetId = +req.params.pictureId
    var data = await Picture.findOne({
      where: {
        id: targetId
      }
    })

    if (data.UserId !== req.userId) {
      //belom testing
      // res.status (401).json ({message: 'Unauthorized'})
    } else if (data.UserId === req.userId) {
      next()
    }
  } catch (err) {
    // next (err)
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
      //belom testing
      // res.status (401).json ({message: 'Unauthorized'})
    } else if (data.ArtistId === req.artistId) {
      next()
    }
  } catch (err) {
    // next (err)
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

    if (data.UserId !== req.userId) {
      //belom testing
      // res.status (401).json ({message: 'Unauthorized'})
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

    if (data.ArtistId != req.artistId) {
      //belom testing
      // res.status (401).json ({message: 'Unauthorized'})
    } else if (data.ArtistId == req.artistId) {
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

    if (data.UserId !== req.userId) {
      //belom testing
      // res.status (401).json ({message: 'Unauthorized'})
    } else if (data.UserId === req.userId) {
      next()
    }
  } catch (err) {
    next (err)
  }
}

async function authorUserReview (req, res, next) {
  try {
    const targetId = +req.params.reviewId
    var data = await Review.findOne({
      where: {
        id: targetId
      }
    })

    if (data.UserId != req.userId) {
      //belom testing
      // res.status (401).json ({message: 'Unauthorized'})
    } else if (data.UserId == req.userId) {
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
  authorUserReview
}
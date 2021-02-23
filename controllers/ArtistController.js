const { Artist } = require ('../models/index')
const { checkPassword } =  require ('../helpers/bcrypt')
const { generateToken } = require ('../helpers/jwt')

class ArtistController {
  static async getById (req, res, next) {
    try {
      let data = await Artist.findOne({
        where: {
          id: +req.params.artistId
        }
      })
      if (data) {
        delete data.dataValues.password
        res.status(200).json(data)
      } else {
        next({ name: "Error not found"})
      }
    } catch (err) {
      next(err)
    }
  }

  static async register (req, res, next) {
    try {
      const { username, firstName, lastName, email, password, completeDuration, profilePicture, bankAccount, defaultPrice } = req.body
      let data = await Artist.create ({
        username,
        firstName,
        lastName,
        email, 
        password,
        completeDuration,
        profilePicture,
        bankAccount,
        defaultPrice: +defaultPrice
      })

      delete data.dataValues.password
      res.status (201).json (data)
    } catch (err) {
      next (err)
    }
  }

  static async login (req, res, next) {
    try {
      const { username, email, password } = req.body

      let data

      if(!email && username) {
        data = await Artist.findOne({
          where : { username }})

          if(!data) {
            next({ name : "Invalid email / password"})
          } else {
            let checked = checkPassword (password, data.password)

            if(checked) {
              const payload = {
                id : data.id,
                username : data.username,
                profilePicture : data.profilePicture
              }

              const access_token = generateToken(payload)

              res.status(200).json({
                access_token, 
                id: data.id, 
                username:data.username, 
                profilePicture: data.profilePicture
              })
            } else {
              //belom testing
              // next ({name: 'Invalid email / password'})
            }
          }
      }

      if(!username && email) {
        data = await Artist.findOne({
          where : { email }})

          if(!data) {
            next({ name : "Invalid email / password"})
          } else {
            let checked = checkPassword (password, data.password)

            if(checked) {
              const payload = {
                id : data.id,
                username : data.username,
                profilePicture : data.profilePicture
              }

              const access_token = generateToken(payload)

              res.status(200).json({
                access_token, 
                id: data.id, 
                username:data.username, 
                profilePicture: data.profilePicture
              })
            } else {
              // belom testing
              // next ({name: 'Invalid email / password'})
            }
          }
        }

      if (!username && !email) {
        next({name : 'Invalid email / password'})
      }
    } catch (err) {
      // belom testing
      // next (err)
    }
  }

  static async put (req, res, next) {
    try {
      let obj = {
        username: req.body.username,
        email: req.body.email,
        firstName: req.body.firstName,
        lastName:req.body.lastName,
        profilePicture: req.body.profilePicture
      }
      if (!obj.username) delete obj.username
      if (!obj.email) delete obj.email
      if (!obj.firstName) delete obj.firstName
      if (!obj.lastName) delete obj.lastName
      if (!obj.profilePicture) delete obj.profilePicture

      if (JSON.stringify(obj) === '{}') {
        return next ({ name: 'SequelizeValidationError', errors: [{ message: 'Input required' }] })
      }

      let data = await Artist.update (obj, {
        where: {
          id: +req.params.artistId
        },
        returning: true
      })
      let isSuccess = data[0]
      
      if (isSuccess === 1) {
        let dataObj = data[1][0]
        delete dataObj.dataValues.password
        res.status(200).json (dataObj)
      } else {
        // belom testing
        // next ({name: 'Error not found'})
      }

    } catch (err) {
      // next(err)
    }
  }
}

module.exports = ArtistController
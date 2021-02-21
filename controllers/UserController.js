const { User } = require ('../models/index')
const { checkPassword } =  require ('../helpers/bcrypt')
const { generateToken } = require ('../helpers/jwt')

class UserController {
  static async getById (req, res, next) {
    try {
      let data = await User.findOne({
        where: {
          id: +req.params.userId
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
      const { username, firstName, lastName, email, password, profilePicture } = req.body
      let data = await User.create ({
        username,
        firstName,
        lastName,
        email, 
        password,
        profilePicture
      })
      // console.log(data)
      delete data.dataValues.password
      res.status (201).json (data)
    } catch (err) {
      next (err)
    }
  }

  static async login (req, res, next) {
    try {
      const { username, email, password } = req.body

      if (username) {
        let data = await User.findOne ({
          where: {
            username
          }
        })
        if (!data) {
          next ({name: 'Invalid email / password'})
        } else {
          let checked = checkPassword (password, data.password)
          if (!checked) {
            next ({name: 'Invalid email / password'})
          } else {
            const payload = {
              id: data.id,
              username: data.username,
              profilePicture: data.profilePicture
            }
            const access_token = generateToken (payload)
            res.status (200).json ({
              access_token, 
              id: data.id, 
              role: data.role, 
              username:data.username, 
              profilePicture: data.profilePicture})
          }
        }
      } else {
        let data = await User.findOne ({
          where: {
            email
          }
        })
        if (!data) {
          next ({name: 'Invalid email / password'})
        } else {
          let checked = checkPassword (password, data.password)
          if (!checked) {
            next ({name: 'Invalid email / password'})
          } else {
            const payload = {
              id: data.id,
              username: data.username,
              profilePicture: data.profilePicture
            }
            const access_token = generateToken (payload)
            res.status (200).json ({
              access_token, 
              id: data.id,  
              username:data.username, 
              profilePicture: data.profilePicture})
          }
        }
      }
 
    } catch (err) {
      next (err)
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

      let data = await User.update (obj, {
        where: {
          id: +req.params.userId
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

    } catch (err) {
      next(err)
    }
  }
}

module.exports = UserController
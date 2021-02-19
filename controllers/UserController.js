const { User } = require ('../models/index')
const { checkPassword } =  require ('../helpers/bcrypt')
const { generateToken } = require ('../helpers/jwt')

class UserController {
  static async register (req, res, next) {
    try {
      const { username, firstName, lastName, email, password } = req.body
      let data = await User.create ({
        username,
        firstName,
        lastName,
        email, 
        password
      })
      res.status (201).json (data)
    } catch (err) {
      next (err)
    }
  }
}

module.exports = UserController
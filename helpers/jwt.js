// if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
//   require('dotenv').config()
// }

const jwt = require ('jsonwebtoken')

const SECRET_KEY = process.env.SECRET_KEY ? process.env.SECRET_KEY : "rahasia"

function generateToken (payload) {
  const token = jwt.sign (payload , SECRET_KEY)
  return token
}

function checkToken (token) {
  const decoded = jwt.verify(token, SECRET_KEY)
  return decoded
}

module.exports = {
  generateToken,
  checkToken
}
function errorHandlers (err, req, res, next) {
  console.log (err.name, 'err.name')
  console.log (err.message, 'err.message')
  console.log (err)
  if (err.errors) {
    var errors = err.errors.map (e => {
      return e.message
    })
  }

  switch (err.name) {
    case 'SequelizeValidationError':
      res.status(400).json ({ errors })
      break;
    case 'SequelizeUniqueConstraintError':
      res.status(400).json ({ messages: 'Email or Username has already been used' })
      break;
    case 'Error not found':
      res.status(404).json ({ messages: 'Error not found' })
      break;
    case 'Invalid email / password':
      res.status(400).json ({ messages: 'Invalid email / password' })
      break;
    case 'Unauthorized access':
      res.status(401).json ({ messages: 'Unauthorized access' })
      break;
    case 'JsonWebTokenError':
      res.status(401).json ({ messages: 'Please login first' })
      break;
    case 'Existing order still active':
      res.status(403).json ({ messages: 'You already have an order for this artist' })
    default:
      res.status(500).json ({ messages: 'Internal server error' })
  }
}

module.exports = errorHandlers
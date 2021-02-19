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

    default:
      res.status (500).json ({message: 'Internal server error'})
  }
}

module.exports = errorHandlers
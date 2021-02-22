if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
    require('dotenv').config()
}
  
const express = require('express')
const router = require ('./routes/indexRouter')
const errorHandlers = require ('./middlewares/errorHandlers')
var cors = require('cors')
const app = express()


app.use (cors())

app.use (express.urlencoded ({extended: false}))

app.use (express.json ())

app.use ('/', router)

app.use (errorHandlers)

module.exports = app
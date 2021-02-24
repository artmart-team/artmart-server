if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
    require('dotenv').config()
  }
const { Chat } = require ('./models/index')

const express = require('express')
var cors = require('cors')
const router = require ('./routes/indexRouter')
const errorHandlers = require ('./middlewares/errorHandlers')
const app = express()
const port = process.env.PORT || 3000

app.use (cors())

const server = require('http').createServer(app)
const io = require('socket.io')(server)


app.use (express.urlencoded ({extended: false}))

app.use (express.json ())

app.use ('/', router)

app.use (errorHandlers)


async function postChat (messages, from, UserId, ArtistId) {
    try {
      const obj = {
        messages,
        from,
        UserId,
        ArtistId
      }
      const data = await Chat.create(obj)

      // console.log(data)  
    } catch (err) {
      console.log(err)
    }
}


io.on('connection', (socket) => {
  const sessionID = socket.id
  console.log('Socket.io client connected with id ' + socket.id)
  socket.emit('connected', `Your session id ${sessionID}`, 'second message')

  socket.on('joinRoom', (role, id, opId) => {
    console.log(role, id)
    if (role === 'artist') {
      socket.join(`${opId}--${id}`)
      socket.emit('yourRoom', `${opId}--${id}`, role)

    } else if (role === 'customer') {
      socket.join(`${id}--${opId}`)
      socket.emit('yourRoom', `${id}--${opId}`, role)
    }
  })

  socket.on('message', async (room, msg, role, userId, artistId) => {
    io.to(room).emit('getBroadcast', msg, role)

    await postChat(msg, role, userId, artistId)
  })

})



server.listen(port, () => {
  console.log(`mARTerialize app listening at http://localhost:${port}`)
})

module.exports = app


const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const http = require('http')
const { Server } = require('socket.io')

dotenv.config()

const app = express()
const server = http.createServer(app)

app.use(cors())
app.use(express.json())

const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST', 'PUT']
  }
})
app.set('io', io)
app.use(
  '/api/hospitals', require('./routes/hospitalRoutes')
)
app.use(
  '/api', require('./routes/checkInRoutes')
)
io.on('connection', (socket) => {

  console.log('Socket connected:', socket.id)

  socket.on('join_queue', (roomId) => {

    socket.join(roomId)

    console.log(
      'Socket joined queue:',
      roomId
    )
  })

  socket.on('disconnect', () => {

    console.log(
      'Socket disconnected:',
      socket.id
    )
  })

})
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {

    console.log('MongoDB Connected')

    server.listen(5000, () => {

      console.log(
        'Server on port 5000'
      )

    })

  })
  .catch((err) => {

    console.error(
      'MongoDB connection error:',
      err.message
    )

  })
const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const http = require('http')
const { Server } = require('socket.io')
const connectDB = require('./config/db')

dotenv.config()
connectDB()

const app = express()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.json({ message: 'OPD Queue Tracker Server Running' })
})

app.use('/api/hospitals', require('./routes/hospitalRoutes'))
app.use('/api', require('./routes/checkInRoutes'))

const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    origin: '*'
  }
})

app.set('io', io)

io.on('connection', (socket) => {
  console.log('Client connected:', socket.id)

  socket.on('join_queue', (roomId) => {
    socket.join(roomId)
    console.log(socket.id, 'joined room:', roomId)
  })

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id)
  })
})

const PORT = process.env.PORT || 5000

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
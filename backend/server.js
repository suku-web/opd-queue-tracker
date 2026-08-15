const dns = require('dns')
dns.setServers(['8.8.8.8', '1.1.1.1'])

const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const http = require('http')
const { Server } = require('socket.io')

dotenv.config()

const app = express()
const server = http.createServer(app)

// Middleware
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://opd-queue-tracker.vercel.app',
    /\.vercel\.app$/
  ]
}))

app.use(express.json())

// Root route
app.get('/', (req, res) => {
  res.json({
    message: 'OPD Queue Tracker Server Running'
  })
})

// Socket.io
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST', 'PUT']
  }
})

app.set('io', io)

// Load models
require('./models/Hospital')
const CheckIn = require('./models/CheckIn')
require('./models/User')

// Routes
app.use(
  '/api/auth',
  require('./routes/authRoutes')
)

app.use(
  '/api/hospitals',
  require('./routes/hospitalRoutes')
)

app.use(
  '/api',
  require('./routes/checkInRoutes')
)

// Queue status route
app.get('/api/queues/:id', async (req, res) => {
  try {
    const hospitalId = req.params.id
    const dept = req.query.dept || 'General'

    const activePatients = await CheckIn.find({
      hospitalId: hospitalId,
      department: dept,
      status: 'waiting'
    }).sort({ createdAt: 1 })

    const totalWaiting = activePatients.length

    const tokenNumber =
      totalWaiting > 0
        ? `OPD-${400 + totalWaiting}`
        : 'OPD-401'

    const currentServing =
      totalWaiting > 1
        ? `OPD-${400 + totalWaiting - 1}`
        : 'OPD-400'

    const waitTime =
      `${totalWaiting * 5 || 5} Mins`

    res.json({
      tokenNumber,
      currentServing,
      waitTime
    })
  } catch (error) {
    console.error(
      'Queue calculation error:',
      error
    )

    res.json({
      tokenNumber: 'OPD-401',
      currentServing: 'OPD-400',
      waitTime: '5 Mins'
    })
  }
})

// Socket connections
io.on('connection', (socket) => {
  console.log(
    'Socket connected:',
    socket.id
  )

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

// MongoDB + server startup
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB Connected')

    const PORT = process.env.PORT || 5000

    server.listen(PORT, () => {
      console.log(
        `Server running on port ${PORT}`
      )
    })
  })
  .catch((err) => {
    console.error(
      'MongoDB connection error:',
      err.message
    )
  })
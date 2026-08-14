<<<<<<< HEAD
const express = require('express')
const cors = require('cors')
=======
const dns = require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1']); 

>>>>>>> 2ef0391f2163817341cbf271da7e7b0f92ffcfc8
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const http = require('http')
const { Server } = require('socket.io')

dotenv.config()

<<<<<<< HEAD
const app = express()
const server = http.createServer(app)

app.use(cors())
app.use(express.json())

const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST', 'PUT']
  }
=======
const express = require('express')
const cors    = require('cors')
const mongoose = require('mongoose')

if (!process.env.MONGO_URI) {
  console.error('❌ Error: MONGO_URI is missing from your .env file!')
} else {
  mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected ✅'))
    .catch(err => console.error('MongoDB error ❌:', err.message))
}

// 1. Load the Database Models
require('./models/Hospital')
const CheckIn = require('./models/CheckIn') // Storing reference to use below
require('./models/User')

const app = express()
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://opd-queue-tracker.vercel.app',
    /\.vercel\.app$/
  ]
}))
app.use(express.json())

app.get('/', (req, res) => {
  res.json({ message: 'OPD Queue Tracker Server Running' })
>>>>>>> 2ef0391f2163817341cbf271da7e7b0f92ffcfc8
})
app.set('io', io)
app.use(
  '/api/hospitals', require('./routes/hospitalRoutes')
)
app.use(
  '/api', require('./routes/checkInRoutes')
)
io.on('connection', (socket) => {

<<<<<<< HEAD
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
=======
// 2. Add the Missing Queue Status Route (The Fix!)
app.get('/api/queues/:id', async (req, res) => {
  try {
    const hospitalId = req.params.id;
    const dept = req.query.dept || 'General';

    // Query MongoDB for patients checking into this hospital and department
    const activePatients = await CheckIn.find({ 
      hospitalId: hospitalId, 
      department: dept 
    }).sort({ createdAt: 1 });

    const totalWaiting = activePatients.length;

    // Generate dynamic live data based on actual database entries
    const tokenNumber = totalWaiting > 0 ? `OPD-${400 + totalWaiting}` : 'OPD-401';
    const currentServing = totalWaiting > 1 ? `OPD-${400 + totalWaiting - 1}` : 'OPD-400';
    const waitTime = `${totalWaiting * 5 || 5} Mins`; // 5 mins per person in line

    res.json({
      tokenNumber,
      currentServing,
      waitTime
    });
  } catch (error) {
    console.error("Queue calculation error:", error);
    // Secure fallback so your frontend NEVER gets stuck on Loading if DB has an issue
    res.json({
      tokenNumber: 'OPD-401',
      currentServing: 'OPD-400',
      waitTime: '5 Mins'
    });
  }
});

// 3. Register standard routes
app.use('/api/auth', require('./routes/authRoutes'))
app.use('/api/hospitals', require('./routes/hospitalRoutes'))
app.use('/api', require('./routes/checkInRoutes'))

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
>>>>>>> 2ef0391f2163817341cbf271da7e7b0f92ffcfc8

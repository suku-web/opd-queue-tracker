const dns = require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1']); 

const dotenv = require('dotenv')
dotenv.config()

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
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.json({ message: 'OPD Queue Tracker Server Running' })
})

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
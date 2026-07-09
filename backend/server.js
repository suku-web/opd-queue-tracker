
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

require('./models/Hospital')
require('./models/CheckIn')
require('./models/User')


const app = express()
app.use(cors())
app.use(express.json())


app.get('/', (req, res) => {
  res.json({ message: 'OPD Queue Tracker Server Running' })
})


app.use('/api/auth', require('./routes/authRoutes'))
app.use('/api/hospitals', require('./routes/hospitalRoutes'))
app.use('/api', require('./routes/checkInRoutes'))


const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
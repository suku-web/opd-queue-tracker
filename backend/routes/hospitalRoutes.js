const router = require('express').Router()

router.get('/', (req, res) => {
  res.json([
    {
      _id: '1',
      name: 'KEM Hospital',
      address: 'Parel, Mumbai',
      location: { lat: 19.0076, lng: 72.8413 },
      departments: [
        { name: 'General',      averageServiceMinutes: 10 },
        { name: 'Cardiology',   averageServiceMinutes: 15 },
        { name: 'Orthopaedics', averageServiceMinutes: 12 },
      ]
    },
    {
      _id: '2',
      name: 'Sion Hospital',
      address: 'Sion, Mumbai',
      location: { lat: 19.0418, lng: 72.8613 },
      departments: [
        { name: 'General',     averageServiceMinutes: 10 },
        { name: 'Gynaecology', averageServiceMinutes: 20 },
      ]
    }
  ])
})

module.exports = router
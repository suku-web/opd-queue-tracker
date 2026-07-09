const router   = require('express').Router()
const Hospital = require('../models/Hospital')

// GET /api/hospitals - Pulls live data from your MongoDB cluster
router.get('/', async (req, res) => {
  try {
    const hospitals = await Hospital.find()
    res.json(hospitals)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = router
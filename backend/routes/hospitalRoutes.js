const router = require('express').Router()
const Hospital = require('../models/Hospital')
const QRCode = require('qrcode')

// GET /api/hospitals
router.get('/', async (req, res) => {
  try {
    const hospitals = await Hospital.find()

    res.json(hospitals)

  } catch (err) {
    res.status(500).json({
      error: err.message
    })
  }
})


// POST /api/hospitals
router.post('/', async (req, res) => {
  try {
    const hospital = await Hospital.create(req.body)

    res.status(201).json(hospital)

  } catch (err) {
    res.status(500).json({
      error: err.message
    })
  }
})


// POST /api/hospitals/generate-qr/:id
router.post('/generate-qr/:id', async (req, res) => {
  try {

    // Find hospital using MongoDB ID
    const hospital = await Hospital.findById(
      req.params.id
    )

    // Hospital not found
    if (!hospital) {
      return res.status(404).json({
        error: 'Hospital not found'
      })
    }

    // Check-in URL
    const checkInURL =
      'http://localhost:5173/checkin' +
      '?hospital=' + hospital._id

    // Generate QR code
    const qrDataUrl =
      await QRCode.toDataURL(checkInURL)

    // Save QR code in hospital document
    hospital.qrCode = qrDataUrl

    await hospital.save()

    // Send QR code back
    res.json({
      success: true,
      qrCode: qrDataUrl
    })

  } catch (err) {
    res.status(500).json({
      error: err.message
    })
  }
})


module.exports = router
const router   = require('express').Router()
const Hospital = require('../models/Hospital')
const CheckIn  = require('../models/CheckIn')

// POST /api/checkin
router.post('/checkin', async (req, res) => {
  try {
    const { hospitalId, department } = req.body
    if (!hospitalId || !department) {
      return res.status(400).json({
        error: 'hospitalId and department are required'
      })
    }

    const hospital = await Hospital.findById(hospitalId)
    if (!hospital) {
      return res.status(404).json({
        error: 'Hospital not found'
      })
    }

    const dept = hospital.departments.find(
      d => d.name === department
    )
    const avgTime = dept
      ? dept.averageServiceMinutes : 10

    const waitingCount = await CheckIn.countDocuments({
      hospitalId, department, status: 'waiting'
    })

    const tokenNumber    = waitingCount + 1
    const estimatedWait  = waitingCount * avgTime

    await CheckIn.create({
      hospitalId, department,
      tokenNumber, status: 'waiting'
    })

    res.json({
      success:       true,
      tokenNumber,
      estimatedWait,
      message: `Checked in to ${department}. Your token is #${tokenNumber}.`
    })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// GET /api/queue/:hospitalId/:dept
router.get('/queue/:hospitalId/:dept', async (req, res) => {
  try {
    const { hospitalId, dept } = req.params
    const hospital = await Hospital.findById(hospitalId)
    const deptObj  = hospital?.departments.find(
      d => d.name === dept
    )
    const avgTime = deptObj
      ? deptObj.averageServiceMinutes : 10

    const queueCount = await CheckIn.countDocuments({
      hospitalId, department: dept, status: 'waiting'
    })

    res.json({
      hospitalId,
      department:    dept,
      queueCount,
      estimatedWait: queueCount * avgTime
    })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// PUT /api/checkin/:id/served
router.put('/checkin/:id/served', async (req, res) => {
  try {
    await CheckIn.findByIdAndUpdate(
      req.params.id,
      { status: 'served' }
    )
    res.json({ success: true, message: 'Marked as served.' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = router
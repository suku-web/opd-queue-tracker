const router = require('express').Router()

router.post('/checkin', (req, res) => {
  const { hospitalId, department } = req.body
  if (!hospitalId || !department) {
    return res.status(400).json({
      error: 'hospitalId and department are required'
    })
  }
  res.json({
    success: true,
    tokenNumber: 7,
    estimatedWait: 60,
    message: `Checked in to ${department}. Token is #7.`
  })
})

router.get('/queue/:hospitalId/:dept', (req, res) => {
  res.json({
    hospitalId: req.params.hospitalId,
    department: req.params.dept,
    queueCount: 6,
    estimatedWait: 60
  })
})

router.put('/checkin/:id/served', (req, res) => {
  res.json({ success: true, message: 'Marked as served.' })
})

module.exports = router
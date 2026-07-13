const mongoose = require('mongoose')

const DepartmentSchema = new mongoose.Schema({
name:  { type: String, required: true },
averageServiceMinutes: { type: Number, default: 10 }
})

const HospitalSchema = new mongoose.Schema({
name:     { type: String, required: true },
address:  { type: String, required: true },
location: { lat: Number, lng: Number },
departments: [DepartmentSchema],
adminId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
},
qrCode:String,
createdAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Hospital', HospitalSchema)

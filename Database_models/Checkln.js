const mongoose = require('mongoose')

const CheckInSchema = new mongoose.Schema({
hospitalId: {
type: mongoose.Schema.Types.ObjectId,
    ref:'Hospital',
    required: true
},
department:  { type: String, required: true },
tokenNumber: { type: Number },
checkInTime: { type: Date, default: Date.now },
status: {
type: String,
enum:    ['waiting', 'served', 'left'],
default: 'waiting'
}
})

module.exports = mongoose.model('CheckIn', CheckInSchema)

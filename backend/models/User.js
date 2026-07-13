const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
name:         { type: String, required: true },
email:        { type: String, required: true, unique: true },
passwordHash: { type: String, required: true },
hospitalId: {
    type: mongoose.Schema.Types.ObjectId,
    ref:  'Hospital'
},
role:      { type: String, default: 'admin' },
createdAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('User', UserSchema)

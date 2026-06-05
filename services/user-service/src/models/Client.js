const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
  label: { type: String, required: true },
  line1: { type: String, required: true },
  line2: String,
  city: { type: String, required: true },
  pincode: { type: String, required: true },
  lat: Number,
  lng: Number,
  isDefault: { type: Boolean, default: false }
});

const clientSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  fullName: { type: String, required: true },
  avatarUrl: String,
  addresses: [addressSchema],
  preferences: {
    language: { type: String, default: 'en' },
    notifications: { type: Boolean, default: true }
  }
}, { timestamps: true });

module.exports = mongoose.model('Client', clientSchema);

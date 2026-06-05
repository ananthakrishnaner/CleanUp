const mongoose = require('mongoose');

const slotSchema = new mongoose.Schema({
  start: String, // HH:mm format
  end: String
});

const exceptionSchema = new mongoose.Schema({
  date: String, // YYYY-MM-DD
  isAvailable: Boolean,
  reason: String
});

const availabilitySchema = new mongoose.Schema({
  cleanerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Cleaner', required: true },
  dayOfWeek: { type: Number, min: 0, max: 6, required: true },
  slots: [slotSchema],
  exceptions: [exceptionSchema]
}, { timestamps: true });

// Ensure unique entry per cleaner per day of week
availabilitySchema.index({ cleanerId: 1, dayOfWeek: 1 }, { unique: true });

module.exports = mongoose.model('Availability', availabilitySchema);

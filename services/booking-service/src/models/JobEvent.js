const mongoose = require('mongoose');

const jobEventSchema = new mongoose.Schema({
  bookingId: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking', required: true },
  type: { type: String, required: true },
  payload: { type: mongoose.Schema.Types.Mixed },
  by: { type: String, required: true },
  at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('JobEvent', jobEventSchema);

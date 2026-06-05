const mongoose = require('mongoose');

const rescheduleSchema = new mongoose.Schema({
  by: String,
  from: Date,
  to: Date,
  reason: String,
  timestamp: { type: Date, default: Date.now }
});

const bookingSchema = new mongoose.Schema({
  clientId: { type: String, required: true },
  serviceType: { type: String, required: true },
  addressId: { type: String, required: true },
  scheduledStart: { type: Date, required: true },
  scheduledEnd: { type: Date, required: true },
  status: {
    type: String,
    enum: ['pending_assignment', 'assigned', 'cleaner_confirmed', 'in_progress', 'completed', 'cancelled', 'rejected', 'rescheduled', 'disputed'],
    default: 'pending_assignment'
  },
  assignedCleanerId: { type: String },
  price: { type: Number, required: true },
  promoCodeId: String,
  paymentId: String,
  rescheduleHistory: [rescheduleSchema],
  confirmationDeadline: Date,
  notes: String
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);

const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  bookingId: { type: String, required: true, unique: true },
  clientId: { type: String, required: true },
  cleanerId: { type: String, required: true },
  rating: { type: Number, min: 1, max: 5, required: true },
  comment: { type: String },
  isHidden: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Review', reviewSchema);

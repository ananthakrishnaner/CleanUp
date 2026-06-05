const mongoose = require('mongoose');

const historySchema = new mongoose.Schema({
  type: { type: String, enum: ['EARNED', 'SPENT'], required: true },
  amount: { type: Number, required: true },
  bookingId: { type: String },
  timestamp: { type: Date, default: Date.now }
});

const loyaltySchema = new mongoose.Schema({
  clientId: { type: String, required: true, unique: true },
  points: { type: Number, default: 0 },
  history: [historySchema]
}, { timestamps: true });

module.exports = mongoose.model('Loyalty', loyaltySchema);

const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  bookingId: { type: String, required: true },
  clientId: { type: String, required: true },
  cleanerId: { type: String },
  amount: { type: Number, required: true },
  currency: { type: String, default: 'USD' },
  method: { type: String, enum: ['CASH', 'CARD', 'WALLET'], required: true },
  status: { type: String, enum: ['PENDING', 'COMPLETED', 'FAILED', 'REFUNDED'], default: 'PENDING' },
  gatewayTxnId: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Payment', paymentSchema);

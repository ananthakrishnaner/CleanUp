const mongoose = require('mongoose');

const promoSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true, uppercase: true },
  discountType: { type: String, enum: ['PERCENT', 'FIXED'], required: true },
  value: { type: Number, required: true },
  expiresAt: { type: Date },
  usageLimit: { type: Number },
  currentUsage: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Promo', promoSchema);

const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  permissions: [{ type: String }],
  lastActiveAt: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Admin', adminSchema);

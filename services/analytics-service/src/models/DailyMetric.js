const mongoose = require('mongoose');

const dailyMetricSchema = new mongoose.Schema({
  date: { type: String, required: true, unique: true }, // Format: YYYY-MM-DD
  newUsers: { type: Number, default: 0 },
  completedBookings: { type: Number, default: 0 },
  revenue: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('DailyMetric', dailyMetricSchema);

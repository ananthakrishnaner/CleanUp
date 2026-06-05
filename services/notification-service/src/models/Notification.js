const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  channel: { type: String, enum: ['sms', 'email', 'push'], required: true },
  template: { type: String, required: true },
  payload: { type: mongoose.Schema.Types.Mixed },
  status: { type: String, enum: ['sent', 'failed'], required: true },
  sentAt: { type: Date, default: Date.now },
  error: { type: String }
});

module.exports = mongoose.model('Notification', notificationSchema);

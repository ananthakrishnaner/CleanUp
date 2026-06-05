const mongoose = require('mongoose');

const chatMessageSchema = new mongoose.Schema({
  senderId: { type: String, required: true },
  senderRole: { type: String, required: true },
  content: { type: String, required: true },
  read: { type: Boolean, default: false },
  timestamp: { type: Date, default: Date.now }
});

const threadSchema = new mongoose.Schema({
  bookingId: { type: String, required: true, unique: true },
  clientId: { type: String, required: true },
  cleanerId: { type: String, required: true },
  messages: [chatMessageSchema]
}, { timestamps: true });

module.exports = mongoose.model('Thread', threadSchema);

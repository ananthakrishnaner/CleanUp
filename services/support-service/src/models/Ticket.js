const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  senderId: { type: String, required: true },
  senderRole: { type: String, required: true },
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

const ticketSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  userRole: { type: String, required: true },
  subject: { type: String, required: true },
  status: { type: String, enum: ['open', 'in_progress', 'resolved', 'closed'], default: 'open' },
  priority: { type: String, enum: ['low', 'medium', 'high', 'urgent'], default: 'medium' },
  assignedTo: { type: String },
  messages: [messageSchema]
}, { timestamps: true });

module.exports = mongoose.model('Ticket', ticketSchema);

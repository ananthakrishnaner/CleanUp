const mongoose = require('mongoose');

const auditLogSchema = new mongoose.Schema({
  actorId: { type: String, required: true },
  actorRole: { type: String, required: true },
  action: { type: String, required: true },
  target: { type: String },
  payload: { type: mongoose.Schema.Types.Mixed },
  at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('AuditLog', auditLogSchema);

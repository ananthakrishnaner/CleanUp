const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
  type: String,
  url: String,
  verified: { type: Boolean, default: false }
});

const cleanerSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  fullName: { type: String, required: true },
  avatarUrl: String,
  bio: String,
  skills: [String],
  serviceAreas: [String],
  experienceYears: Number,
  documents: [documentSchema],
  rating: { type: Number, default: 0 },
  ratingsCount: { type: Number, default: 0 },
  isVerified: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Cleaner', cleanerSchema);

// services/auth-service/src/models/User.js
const { mongoose } = require('@cleanup/shared/db');
const bcrypt        = require('bcryptjs');

const usernameRe = /^[a-z0-9_]{3,20}$/;

const userSchema = new mongoose.Schema(
  {
    username:       { type: String, required: true, unique: true, lowercase: true, trim: true, match: usernameRe },
    email:          { type: String, lowercase: true, trim: true, sparse: true, unique: true },
    phone:          { type: String, trim: true, sparse: true, unique: true },
    passwordHash:   { type: String, required: true },
    role:           { type: String, enum: ['admin', 'cleaner', 'client'], required: true, index: true },
    isActive:       { type: Boolean, default: true },
    mustChangePwd:  { type: Boolean, default: false },
    refreshTokenHash: { type: String, default: null },
    lastLoginAt:    { type: Date, default: null },
  },
  { timestamps: true }
);

userSchema.methods.verifyPassword = function (plain) {
  return bcrypt.compare(plain, this.passwordHash);
};

userSchema.statics.hashPassword = function (plain) {
  return bcrypt.hash(plain, 10);
};

userSchema.methods.toSafeJSON = function () {
  return {
    id:         this._id.toString(),
    username:   this.username,
    email:      this.email || null,
    phone:      this.phone || null,
    role:       this.role,
    isActive:   this.isActive,
    mustChangePwd: this.mustChangePwd,
    createdAt:  this.createdAt,
  };
};

module.exports = mongoose.model('User', userSchema);

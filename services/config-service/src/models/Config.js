const mongoose = require('mongoose');
const crypto = require('crypto');

const configSchema = new mongoose.Schema({
  key: { type: String, required: true, unique: true },
  value: { type: mongoose.Schema.Types.Mixed, required: true },
  isSecret: { type: Boolean, default: false },
  description: { type: String }
}, { timestamps: true });

// Basic AES-256-GCM encryption for secrets at rest
const algorithm = 'aes-256-gcm';
const getEncKey = () => {
  const key = process.env.CONFIG_ENC_KEY || '12345678901234567890123456789012'; // 32 bytes
  return Buffer.from(key.padEnd(32, '0').slice(0, 32), 'utf8');
};

configSchema.pre('save', function (next) {
  if (this.isModified('value') && this.isSecret && typeof this.value === 'string') {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(algorithm, getEncKey(), iv);
    let encrypted = cipher.update(this.value, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    const authTag = cipher.getAuthTag().toString('hex');
    this.value = `${iv.toString('hex')}:${authTag}:${encrypted}`;
  }
  next();
});

configSchema.methods.getDecryptedValue = function () {
  if (!this.isSecret) return this.value;
  try {
    const parts = this.value.split(':');
    if (parts.length !== 3) return this.value; // Not encrypted or format changed
    const iv = Buffer.from(parts[0], 'hex');
    const authTag = Buffer.from(parts[1], 'hex');
    const encryptedText = Buffer.from(parts[2], 'hex');
    const decipher = crypto.createDecipheriv(algorithm, getEncKey(), iv);
    decipher.setAuthTag(authTag);
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  } catch (err) {
    return '*** DECRYPTION ERROR ***';
  }
};

module.exports = mongoose.model('Config', configSchema);

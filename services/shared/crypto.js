// services/shared/crypto.js
// AES-256-GCM encryption used by config-service to store secret values
// (SMS tokens, push keys, email keys, etc.) at rest.

const crypto = require('crypto');

function key() {
  const k = process.env.CONFIG_ENC_KEY;
  if (!k) throw new Error('CONFIG_ENC_KEY not set');
  const buf = Buffer.from(k, 'base64');
  if (buf.length !== 32) throw new Error('CONFIG_ENC_KEY must be 32 bytes (base64-encoded)');
  return buf;
}

function encrypt(plain) {
  if (plain == null) return null;
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv('aes-256-gcm', key(), iv);
  const ct = Buffer.concat([cipher.update(String(plain), 'utf8'), cipher.final()]);
  const tag = cipher.getAuthTag();
  return Buffer.concat([iv, tag, ct]).toString('base64');
}

function decrypt(b64) {
  if (b64 == null) return null;
  const buf = Buffer.from(b64, 'base64');
  const iv  = buf.subarray(0, 12);
  const tag = buf.subarray(12, 28);
  const ct  = buf.subarray(28);
  const decipher = crypto.createDecipheriv('aes-256-gcm', key(), iv);
  decipher.setAuthTag(tag);
  return Buffer.concat([decipher.update(ct), decipher.final()]).toString('utf8');
}

module.exports = { encrypt, decrypt };

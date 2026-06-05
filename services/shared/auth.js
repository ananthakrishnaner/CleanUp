// services/shared/auth.js
// JWT signing/verification + Express middleware used by every service that
// exposes authenticated endpoints.
//
// In dev, a single shared secret is used to keep the stack easy to bring up.
// In production, auth-service signs with an RS256 private key; downstream
// services verify with the matching public key. The same Express middleware
// works for both: pass a `secret` (HS256) or `publicKey` (RS256) at boot.

const fs     = require('fs');
const jwt    = require('jsonwebtoken');
const { Errors } = require('./errors');

function loadSecret({ secret, privateKeyPath, publicKeyPath }) {
  if (secret) return { type: 'hs256', value: secret };
  if (publicKeyPath) {
    return { type: 'rs256', value: fs.readFileSync(publicKeyPath, 'utf8'), private: null };
  }
  if (privateKeyPath) {
    return {
      type: 'rs256',
      value: fs.readFileSync(privateKeyPath, 'utf8'),
      private: fs.readFileSync(privateKeyPath, 'utf8'),
    };
  }
  // Dev fallback
  return { type: 'hs256', value: 'dev-shared-secret-change-me' };
}

function signAccess(payload, opts) {
  return jwt.sign(payload, opts.private || opts.value, {
    algorithm: opts.type === 'rs256' ? 'RS256' : 'HS256',
    expiresIn: process.env.JWT_ACCESS_TTL || '15m',
  });
}

function signRefresh(payload, opts) {
  return jwt.sign({ ...payload, kind: 'refresh' }, opts.private || opts.value, {
    algorithm: opts.type === 'rs256' ? 'RS256' : 'HS256',
    expiresIn: process.env.JWT_REFRESH_TTL || '30d',
  });
}

function verify(token, opts) {
  return jwt.verify(token, opts.value, {
    algorithms: [opts.type === 'rs256' ? 'RS256' : 'HS256'],
  });
}

function authMiddleware(opts) {
  return function (req, _res, next) {
    // If Nginx passed the X-User-* headers (via auth_request), use them
    if (req.headers['x-user-id']) {
      req.user = {
        id: req.headers['x-user-id'],
        role: req.headers['x-user-role'],
        username: req.headers['x-user-username']
      };
      return next();
    }
    
    // Fallback: local JWT verification (e.g. for auth-service itself or internal calls without Nginx proxy)
    const header = req.headers.authorization || '';
    const m = header.match(/^Bearer\s+(.+)$/i);
    if (!m) return next(Errors.unauthorized('Missing bearer token or gateway auth headers'));
    try {
      const decoded = verify(m[1], opts);
      if (decoded.kind === 'refresh') return next(Errors.unauthorized('Refresh token cannot be used as access'));
      req.user = { id: decoded.sub, role: decoded.role, username: decoded.username };
      next();
    } catch (e) {
      return next(Errors.unauthorized('Invalid or expired token'));
    }
  };
}

function requireRole(...roles) {
  return function (req, _res, next) {
    if (!req.user) return next(Errors.unauthorized());
    if (!roles.includes(req.user.role)) return next(Errors.forbidden('Insufficient role'));
    next();
  };
}

// For service-to-service internal calls (X-Internal-Secret header)
function internalOnly() {
  const expected = process.env.INTERNAL_API_SECRET || 'dev-internal-secret';
  return function (req, _res, next) {
    if (req.headers['x-internal-secret'] !== expected) {
      return next(Errors.forbidden('Internal endpoint'));
    }
    next();
  };
}

module.exports = { loadSecret, signAccess, signRefresh, verify, authMiddleware, requireRole, internalOnly };

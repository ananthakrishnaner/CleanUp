// services/shared/errors.js
// Typed error class + central error handler. All services use this so the
// gateway receives a consistent JSON error shape:
//   { error: { code, message, details? } }

class AppError extends Error {
  constructor(status, code, message, details) {
    super(message);
    this.status = status;
    this.code = code;
    this.details = details;
  }
}

const Errors = {
  badRequest:       (msg = 'Bad request',            details) => new AppError(400, 'bad_request',          msg, details),
  unauthorized:     (msg = 'Unauthorized',           details) => new AppError(401, 'unauthorized',          msg, details),
  forbidden:        (msg = 'Forbidden',              details) => new AppError(403, 'forbidden',             msg, details),
  notFound:         (msg = 'Not found',              details) => new AppError(404, 'not_found',             msg, details),
  conflict:         (msg = 'Conflict',               details) => new AppError(409, 'conflict',              msg, details),
  unprocessable:    (msg = 'Unprocessable entity',   details) => new AppError(422, 'unprocessable_entity',  msg, details),
  rateLimited:      (msg = 'Too many requests',      details) => new AppError(429, 'rate_limited',          msg, details),
  internal:         (msg = 'Internal server error',  details) => new AppError(500, 'internal_error',        msg, details),
};

function notFoundHandler(req, res) {
  res.status(404).json({ error: { code: 'not_found', message: `Route ${req.method} ${req.originalUrl} not found` } });
}

// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, _next) {
  if (err instanceof AppError) {
    return res.status(err.status).json({ error: { code: err.code, message: err.message, details: err.details } });
  }
  // Mongoose validation
  if (err && err.name === 'ValidationError') {
    return res.status(422).json({ error: { code: 'validation_error', message: err.message, details: err.errors } });
  }
  // Cast errors (bad ObjectId, etc.)
  if (err && err.name === 'CastError') {
    return res.status(400).json({ error: { code: 'bad_request', message: `Invalid ${err.path}` } });
  }
  // Duplicate key
  if (err && err.code === 11000) {
    return res.status(409).json({ error: { code: 'conflict', message: 'Duplicate key', details: err.keyValue } });
  }
  // Unknown
  // eslint-disable-next-line no-console
  console.error('[unhandled]', err);
  return res.status(500).json({ error: { code: 'internal_error', message: 'Internal server error' } });
}

module.exports = { AppError, Errors, notFoundHandler, errorHandler };

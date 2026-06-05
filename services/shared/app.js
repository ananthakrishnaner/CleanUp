// services/shared/app.js
// Tiny "createApp" factory: builds an Express app with JSON parsing,
// /health, /ready, the central error handler, and the given routes.
// Used by every microservice for a consistent shape.

const express       = require('express');
const cors          = require('cors');
const helmet        = require('helmet');
const morgan        = require('morgan');
const rateLimit     = require('express-rate-limit');
const { errorHandler, notFoundHandler } = require('./errors');
const logger        = require('./logger');

function createApp({ name, routes, rateLimitPerMinute = 600 }) {
  const app = express();
  app.disable('x-powered-by');
  app.set('trust proxy', true);
  app.use(helmet());
  app.use(cors({ origin: true, credentials: true }));
  app.use(express.json({ limit: '1mb' }));
  app.use(express.urlencoded({ extended: true }));
  app.use(morgan('combined', {
    stream: { write: (msg) => logger.info(msg.trim()) },
  }));

  // Per-service rate limit
  app.use('/api', rateLimit({ windowMs: 60 * 1000, max: rateLimitPerMinute, standardHeaders: true, legacyHeaders: false }));

  // Health/readiness
  app.get('/health', (_req, res) => res.json({ status: 'ok', service: name, ts: Date.now() }));
  app.get('/ready',  (_req, res) => res.json({ status: 'ready', service: name, ts: Date.now() }));

  if (routes) app.use(routes);

  app.use(notFoundHandler);
  app.use(errorHandler);
  return app;
}

module.exports = { createApp };

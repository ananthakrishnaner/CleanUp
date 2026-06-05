// services/shared/logger.js
// Winston-based logger used by every microservice.

const winston = require('winston');

const level = process.env.LOG_LEVEL || 'info';

const logger = winston.createLogger({
  level,
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  defaultMeta: { service: process.env.SERVICE_NAME || 'unknown' },
  transports: [new winston.transports.Console()],
});

module.exports = logger;

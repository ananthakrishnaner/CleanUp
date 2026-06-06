const express = require('express');
const os = require('os');
const { connect, getDb } = require('@cleanup/shared/db');
const mongoose = require('mongoose');

const router = express.Router();

// Service status configuration
const SERVICES = [
  { name: 'auth', port: 4001, status: 'managed' },
  { name: 'payment', port: 4002, status: 'standalone' },
  { name: 'user', path: '/users', status: 'running' },
  { name: 'cleaner', path: '/cleaners', status: 'running' },
  { name: 'booking', path: '/bookings', status: 'running' },
  { name: 'notification', path: '/notifications', status: 'running' },
  { name: 'admin', path: '/admin', status: 'running' },
  { name: 'config', path: '/config', status: 'running' },
  { name: 'support', path: '/support', status: 'running' },
  { name: 'chat', path: '/chat', status: 'running' },
  { name: 'review', path: '/reviews', status: 'running' },
  { name: 'promo', path: '/promos', status: 'running' },
  { name: 'loyalty', path: '/loyalty', status: 'running' },
  { name: 'analytics', path: '/analytics', status: 'running' },
];

// GET /health - Detailed health check
router.get('/health', async (req, res, next) => {
  try {
    const startTime = Date.now();

    // Get MongoDB status
    let mongoStatus = { connected: false, error: null };
    try {
      const db = getDb();
      if (db) {
        const admin = db.admin();
        const mongoInfo = await admin.serverStatus();
        mongoStatus = {
          connected: mongoose.connection.readyState === 1,
          readyState: mongoose.connection.readyState, // 0=disconnected, 1=connected, 2=connecting, 3=disconnecting
          host: mongoose.connection.host,
          database: mongoose.connection.name,
          version: mongoInfo.version,
          uptimeSeconds: mongoInfo.uptime,
          connections: {
            current: mongoInfo.connections?.current,
            available: mongoInfo.connections?.available,
          },
        };
      }
    } catch (e) {
      mongoStatus = { connected: false, error: e.message };
    }

    // Get system/CPU status
    const cpuLoad = os.loadavg();
    const totalMem = os.totalmem();
    const freeMem = os.freemem();
    const usedMem = totalMem - freeMem;

    const systemStatus = {
      hostname: os.hostname(),
      platform: os.platform(),
      arch: os.arch(),
      nodeVersion: process.version,
      uptimeSeconds: process.uptime(),
      cpu: {
        cores: os.cpus().length,
        loadAverage: {
          '1m': cpuLoad[0].toFixed(2),
          '5m': cpuLoad[1].toFixed(2),
          '15m': cpuLoad[2].toFixed(2),
        },
      },
      memory: {
        total: Math.round(totalMem / 1024 / 1024) + ' MB',
        used: Math.round(usedMem / 1024 / 1024) + ' MB',
        free: Math.round(freeMem / 1024 / 1024) + ' MB',
        usagePercent: ((usedMem / totalMem) * 100).toFixed(1) + '%',
      },
    };

    // Build service status
    const servicesStatus = SERVICES.map(svc => ({
      name: svc.name,
      status: svc.status,
      port: svc.port || null,
      path: svc.path || null,
    }));

    const responseTime = Date.now() - startTime;

    const health = {
      status: mongoStatus.connected ? 'healthy' : 'degraded',
      timestamp: new Date().toISOString(),
      responseTimeMs: responseTime,
      version: process.env.APP_VERSION || '1.0.0',
      environment: process.env.NODE_ENV || 'development',
      services: servicesStatus,
      database: mongoStatus,
      system: systemStatus,
    };

    // Set appropriate HTTP status
    const httpStatus = mongoStatus.connected ? 200 : 503;
    res.status(httpStatus).json(health);
  } catch (e) {
    next(e);
  }
});

// GET /health/liveness - Simple liveness probe
router.get('/health/liveness', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// GET /health/readiness - Readiness probe (checks DB)
router.get('/health/readiness', async (req, res) => {
  try {
    const db = getDb();
    if (db && mongoose.connection.readyState === 1) {
      await db.command({ ping: 1 });
      res.json({ status: 'ready', database: 'connected' });
    } else {
      res.status(503).json({ status: 'not ready', database: 'disconnected' });
    }
  } catch (e) {
    res.status(503).json({ status: 'not ready', error: e.message });
  }
});

// GET /health/ping - Simple ping
router.get('/health/ping', (req, res) => {
  res.send('pong');
});

module.exports = router;
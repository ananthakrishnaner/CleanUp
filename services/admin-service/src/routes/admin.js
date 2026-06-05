const express = require('express');
const { authMiddleware, requireRole, internalOnly } = require('@cleanup/shared/auth');
const Admin = require('../models/Admin');
const AuditLog = require('../models/AuditLog');
const z = require('zod');

const router = express.Router();

router.use(authMiddleware({ secret: process.env.JWT_PUBLIC_KEY || 'dev-shared-secret-change-me', type: 'hs256' }));
router.use(requireRole('admin'));

router.get('/dashboard', async (req, res, next) => {
  try {
    // Basic stub for analytics
    res.json({
      metrics: {
        todayBookings: 0,
        revenue: 0,
        activeCleaners: 0,
        openTickets: 0
      }
    });
  } catch (err) {
    next(err);
  }
});

router.get('/audit-log', async (req, res, next) => {
  try {
    const logs = await AuditLog.find().sort({ at: -1 }).limit(100);
    res.json(logs);
  } catch (err) {
    next(err);
  }
});

// Internal endpoint to log audit events
router.post('/audit-log/internal', internalOnly(), async (req, res, next) => {
  try {
    const data = z.object({
      actorId: z.string(),
      actorRole: z.string(),
      action: z.string(),
      target: z.string().optional(),
      payload: z.any().optional(),
    }).parse(req.body);

    const log = await AuditLog.create(data);
    res.status(201).json(log);
  } catch (err) {
    next(err);
  }
});

module.exports = router;

const express = require('express');
const { authMiddleware, requireRole, internalOnly } = require('@cleanup/shared/auth');
const DailyMetric = require('../models/DailyMetric');
const z = require('zod');

const router = express.Router();

router.post('/internal/track', internalOnly(), async (req, res, next) => {
  try {
    const data = z.object({
      metric: z.enum(['newUsers', 'completedBookings', 'revenue']),
      value: z.number().default(1)
    }).parse(req.body);

    const dateStr = new Date().toISOString().split('T')[0];
    const update = { $inc: {} };
    update.$inc[data.metric] = data.value;

    const metric = await DailyMetric.findOneAndUpdate(
      { date: dateStr },
      update,
      { new: true, upsert: true }
    );
    res.json(metric);
  } catch (err) {
    next(err);
  }
});

router.use(authMiddleware({ secret: process.env.JWT_PUBLIC_KEY || 'dev-shared-secret-change-me', type: 'hs256' }));

router.get('/dashboard', requireRole('admin'), async (req, res, next) => {
  try {
    const metrics = await DailyMetric.find().sort({ date: -1 }).limit(30);
    
    // Aggregate totals for the last 30 days
    const totals = metrics.reduce((acc, curr) => {
      acc.newUsers += curr.newUsers;
      acc.completedBookings += curr.completedBookings;
      acc.revenue += curr.revenue;
      return acc;
    }, { newUsers: 0, completedBookings: 0, revenue: 0 });

    res.json({ totals, history: metrics });
  } catch (err) {
    next(err);
  }
});

module.exports = router;

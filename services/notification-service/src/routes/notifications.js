const express = require('express');
const { authMiddleware, internalOnly, requireRole } = require('@cleanup/shared/auth');
const Notification = require('../models/Notification');
const logger = require('@cleanup/shared/logger');
const z = require('zod');

const router = express.Router();

router.use(authMiddleware({ secret: process.env.JWT_PUBLIC_KEY || 'dev-shared-secret-change-me', type: 'hs256' }));

// Internal service-to-service notification dispatch
router.post('/send', internalOnly(), async (req, res, next) => {
  try {
    const data = z.object({
      userId: z.string(),
      channel: z.enum(['sms', 'email', 'push']),
      template: z.string(),
      payload: z.any().optional(),
    }).parse(req.body);

    // In a real implementation, dispatch via Twilio/FCM/SendGrid using config-service credentials
    // For now, we simulate success and log to the database
    logger.info('Notification Dispatched', data);

    const notification = await Notification.create({
      ...data,
      status: 'sent'
    });

    res.status(201).json(notification);
  } catch (err) {
    next(err);
  }
});

// Client/Cleaner views their notification history
router.get('/me', async (req, res, next) => {
  try {
    const notifications = await Notification.find({ userId: req.user.id }).sort({ sentAt: -1 }).limit(50);
    res.json(notifications);
  } catch (err) {
    next(err);
  }
});

// Admin test endpoint
router.post('/test', requireRole('admin'), async (req, res, next) => {
  try {
    const data = z.object({
      channel: z.enum(['sms', 'email', 'push']),
      template: z.string(),
      payload: z.any().optional()
    }).parse(req.body);

    logger.info('Test Notification Triggered', data);
    res.json({ success: true, message: `Test ${data.channel} triggered` });
  } catch (err) {
    next(err);
  }
});

module.exports = router;

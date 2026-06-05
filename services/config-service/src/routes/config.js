const express = require('express');
const { authMiddleware, requireRole } = require('@cleanup/shared/auth');
const Config = require('../models/Config');
const z = require('zod');
const axios = require('axios');

const router = express.Router();

// Allow reading public configs without auth
router.get('/', async (req, res, next) => {
  try {
    const configs = await Config.find({ isSecret: false });
    res.json(configs);
  } catch (err) {
    next(err);
  }
});

router.use(authMiddleware({ secret: process.env.JWT_PUBLIC_KEY || 'dev-shared-secret-change-me', type: 'hs256' }));

router.get('/all', requireRole('admin'), async (req, res, next) => {
  try {
    const configs = await Config.find();
    // Mask secrets for API response
    const masked = configs.map(c => {
      const obj = c.toObject();
      if (obj.isSecret) obj.value = '••••••••';
      return obj;
    });
    res.json(masked);
  } catch (err) {
    next(err);
  }
});

router.put('/:key', requireRole('admin'), async (req, res, next) => {
  try {
    const data = z.object({
      value: z.any(),
      isSecret: z.boolean().optional(),
      description: z.string().optional()
    }).parse(req.body);

    const config = await Config.findOne({ key: req.params.key });
    if (config) {
      config.value = data.value;
      if (data.isSecret !== undefined) config.isSecret = data.isSecret;
      if (data.description !== undefined) config.description = data.description;
      await config.save();
      res.json(config);
    } else {
      const newConfig = await Config.create({ key: req.params.key, ...data });
      res.status(201).json(newConfig);
    }
  } catch (err) {
    next(err);
  }
});

// Admin test endpoints
router.post('/test-sms', requireRole('admin'), async (req, res, next) => {
  try {
    // Should call notification-service to test
    await axios.post('http://notification-service:4006/test', {
      channel: 'sms', template: 'test', payload: {}
    }, { headers: { Authorization: req.headers.authorization }});
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
});

router.post('/test-email', requireRole('admin'), async (req, res, next) => {
  try {
    await axios.post('http://notification-service:4006/test', {
      channel: 'email', template: 'test', payload: {}
    }, { headers: { Authorization: req.headers.authorization }});
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
});

router.post('/test-push', requireRole('admin'), async (req, res, next) => {
  try {
    await axios.post('http://notification-service:4006/test', {
      channel: 'push', template: 'test', payload: {}
    }, { headers: { Authorization: req.headers.authorization }});
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
});

module.exports = router;

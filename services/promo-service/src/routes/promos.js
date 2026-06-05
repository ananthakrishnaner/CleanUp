const express = require('express');
const { authMiddleware, requireRole } = require('@cleanup/shared/auth');
const { Errors } = require('@cleanup/shared/errors');
const Promo = require('../models/Promo');
const z = require('zod');

const router = express.Router();

router.use(authMiddleware({ secret: process.env.JWT_PUBLIC_KEY || 'dev-shared-secret-change-me', type: 'hs256' }));

router.post('/apply', async (req, res, next) => {
  try {
    const data = z.object({ code: z.string().toUpperCase() }).parse(req.body);
    const promo = await Promo.findOne({ code: data.code });
    
    if (!promo) throw Errors.notFound('Invalid promo code');
    if (promo.expiresAt && promo.expiresAt < new Date()) throw Errors.badRequest('Promo code expired');
    if (promo.usageLimit && promo.currentUsage >= promo.usageLimit) throw Errors.badRequest('Promo code limit reached');

    // In a real flow, the booking-service would validate this internally and increment usage.
    // This is just a read check.
    res.json(promo);
  } catch (err) {
    next(err);
  }
});

router.get('/', requireRole('admin'), async (req, res, next) => {
  try {
    const promos = await Promo.find().sort({ createdAt: -1 });
    res.json(promos);
  } catch (err) {
    next(err);
  }
});

router.post('/', requireRole('admin'), async (req, res, next) => {
  try {
    const data = z.object({
      code: z.string().toUpperCase(),
      discountType: z.enum(['PERCENT', 'FIXED']),
      value: z.number(),
      expiresAt: z.string().datetime().optional(),
      usageLimit: z.number().optional()
    }).parse(req.body);

    const promo = await Promo.create(data);
    res.status(201).json(promo);
  } catch (err) {
    next(err);
  }
});

module.exports = router;

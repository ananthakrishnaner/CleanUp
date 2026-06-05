const express = require('express');
const { authMiddleware, internalOnly } = require('@cleanup/shared/auth');
const Loyalty = require('../models/Loyalty');
const z = require('zod');

const router = express.Router();

router.use(authMiddleware({ secret: process.env.JWT_PUBLIC_KEY || 'dev-shared-secret-change-me', type: 'hs256' }));

router.get('/me', async (req, res, next) => {
  try {
    const loyalty = await Loyalty.findOne({ clientId: req.user.id });
    res.json(loyalty || { clientId: req.user.id, points: 0, history: [] });
  } catch (err) {
    next(err);
  }
});

router.post('/internal/earn', internalOnly(), async (req, res, next) => {
  try {
    const data = z.object({
      clientId: z.string(),
      amount: z.number().positive(),
      bookingId: z.string().optional()
    }).parse(req.body);

    const loyalty = await Loyalty.findOneAndUpdate(
      { clientId: data.clientId },
      { 
        $inc: { points: data.amount },
        $push: { history: { type: 'EARNED', amount: data.amount, bookingId: data.bookingId } }
      },
      { new: true, upsert: true }
    );
    
    res.json(loyalty);
  } catch (err) {
    next(err);
  }
});

router.post('/internal/spend', internalOnly(), async (req, res, next) => {
  try {
    const data = z.object({
      clientId: z.string(),
      amount: z.number().positive(),
      bookingId: z.string().optional()
    }).parse(req.body);

    const loyalty = await Loyalty.findOne({ clientId: data.clientId });
    if (!loyalty || loyalty.points < data.amount) {
      return res.status(400).json({ error: 'Insufficient points' });
    }

    loyalty.points -= data.amount;
    loyalty.history.push({ type: 'SPENT', amount: data.amount, bookingId: data.bookingId });
    await loyalty.save();
    
    res.json(loyalty);
  } catch (err) {
    next(err);
  }
});

module.exports = router;

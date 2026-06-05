const express = require('express');
const { authMiddleware, internalOnly } = require('@cleanup/shared/auth');
const Payment = require('../models/Payment');
const z = require('zod');

const router = express.Router();

router.use(authMiddleware({ secret: process.env.JWT_PUBLIC_KEY || 'dev-shared-secret-change-me', type: 'hs256' }));

// Get payment details for a specific booking
router.get('/:bookingId', async (req, res, next) => {
  try {
    const payment = await Payment.findOne({ bookingId: req.params.bookingId });
    res.json(payment || {});
  } catch (err) {
    next(err);
  }
});

// Internal endpoint to create or update payment (e.g. from booking-service)
router.post('/internal/sync', internalOnly(), async (req, res, next) => {
  try {
    const data = z.object({
      bookingId: z.string(),
      clientId: z.string(),
      cleanerId: z.string().optional(),
      amount: z.number(),
      method: z.string().default('CASH'),
      status: z.string().default('PENDING')
    }).parse(req.body);

    const payment = await Payment.findOneAndUpdate(
      { bookingId: data.bookingId },
      { $set: data },
      { new: true, upsert: true }
    );
    
    res.status(201).json(payment);
  } catch (err) {
    next(err);
  }
});

// Webhook stub for external gateways (e.g. Stripe)
router.post('/webhook', async (req, res, next) => {
  try {
    // In a real implementation, this would verify the gateway signature
    // and update the payment status accordingly.
    res.status(200).send('OK');
  } catch (err) {
    next(err);
  }
});

module.exports = router;

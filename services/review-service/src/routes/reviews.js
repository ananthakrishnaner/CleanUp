const express = require('express');
const { authMiddleware, requireRole } = require('@cleanup/shared/auth');
const Review = require('../models/Review');
const z = require('zod');

const router = express.Router();

router.get('/cleaner/:id', async (req, res, next) => {
  try {
    const reviews = await Review.find({ cleanerId: req.params.id, isHidden: false })
                                .sort({ createdAt: -1 });
    res.json(reviews);
  } catch (err) {
    next(err);
  }
});

router.use(authMiddleware({ secret: process.env.JWT_PUBLIC_KEY || 'dev-shared-secret-change-me', type: 'hs256' }));

router.post('/', requireRole('client'), async (req, res, next) => {
  try {
    const data = z.object({
      bookingId: z.string(),
      cleanerId: z.string(),
      rating: z.number().min(1).max(5),
      comment: z.string().optional()
    }).parse(req.body);

    const review = await Review.create({
      ...data,
      clientId: req.user.id
    });
    
    res.status(201).json(review);
  } catch (err) {
    next(err);
  }
});

// Admin moderates review
router.patch('/:id/hide', requireRole('admin'), async (req, res, next) => {
  try {
    const data = z.object({ isHidden: z.boolean() }).parse(req.body);
    const review = await Review.findByIdAndUpdate(req.params.id, { $set: { isHidden: data.isHidden } }, { new: true });
    res.json(review);
  } catch (err) {
    next(err);
  }
});

module.exports = router;

const express = require('express');
const { authMiddleware, requireRole } = require('@cleanup/shared/auth');
const { Errors } = require('@cleanup/shared/errors');
const Cleaner = require('../models/Cleaner');
const Availability = require('../models/Availability');
const z = require('zod');

const router = express.Router();

router.use(authMiddleware({ secret: process.env.JWT_PUBLIC_KEY || 'dev-shared-secret-change-me', type: 'hs256' }));

// Admin creates cleaner profile (triggered after auth-service creation)
router.post('/', requireRole('admin'), async (req, res, next) => {
  try {
    const data = z.object({
      userId: z.string(),
      fullName: z.string(),
      skills: z.array(z.string()).optional(),
      serviceAreas: z.array(z.string()).optional(),
    }).parse(req.body);

    const cleaner = await Cleaner.create(data);
    res.status(201).json(cleaner);
  } catch (err) {
    next(err);
  }
});

// Admin lists all cleaners
router.get('/', requireRole('admin'), async (req, res, next) => {
  try {
    const cleaners = await Cleaner.find();
    res.json(cleaners);
  } catch (err) {
    next(err);
  }
});

// Cleaner views own profile
router.get('/me', requireRole('cleaner'), async (req, res, next) => {
  try {
    const cleaner = await Cleaner.findOne({ userId: req.user.id });
    if (!cleaner) throw Errors.notFound('Profile not found');
    res.json(cleaner);
  } catch (err) {
    next(err);
  }
});

// Admin views specific cleaner
router.get('/:id', requireRole('admin'), async (req, res, next) => {
  try {
    const cleaner = await Cleaner.findById(req.params.id);
    if (!cleaner) throw Errors.notFound('Cleaner not found');
    res.json(cleaner);
  } catch (err) {
    next(err);
  }
});

// Admin updates specific cleaner
router.patch('/:id', requireRole('admin'), async (req, res, next) => {
  try {
    const update = z.object({
      fullName: z.string().optional(),
      skills: z.array(z.string()).optional(),
      serviceAreas: z.array(z.string()).optional(),
      isActive: z.boolean().optional(),
      isVerified: z.boolean().optional(),
    }).parse(req.body);

    const cleaner = await Cleaner.findByIdAndUpdate(req.params.id, { $set: update }, { new: true });
    if (!cleaner) throw Errors.notFound('Cleaner not found');
    res.json(cleaner);
  } catch (err) {
    next(err);
  }
});

// Admin soft-deletes cleaner
router.delete('/:id', requireRole('admin'), async (req, res, next) => {
  try {
    const cleaner = await Cleaner.findByIdAndUpdate(req.params.id, { $set: { isActive: false } }, { new: true });
    if (!cleaner) throw Errors.notFound('Cleaner not found');
    res.json(cleaner);
  } catch (err) {
    next(err);
  }
});

// Cleaner updates availability
router.put('/:id/availability', requireRole('cleaner', 'admin'), async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = z.object({
      dayOfWeek: z.number().min(0).max(6),
      slots: z.array(z.object({
        start: z.string(),
        end: z.string()
      }))
    }).parse(req.body);

    // If caller is cleaner, ensure they own it
    if (req.user.role === 'cleaner') {
      const cleaner = await Cleaner.findOne({ userId: req.user.id });
      if (!cleaner || cleaner._id.toString() !== id) {
        throw Errors.forbidden('Cannot edit another cleaner\'s availability');
      }
    }

    const avail = await Availability.findOneAndUpdate(
      { cleanerId: id, dayOfWeek: data.dayOfWeek },
      { $set: { slots: data.slots } },
      { new: true, upsert: true }
    );
    res.json(avail);
  } catch (err) {
    next(err);
  }
});

// Get cleaner availability
router.get('/:id/availability', async (req, res, next) => {
  try {
    const avail = await Availability.find({ cleanerId: req.params.id });
    res.json(avail);
  } catch (err) {
    next(err);
  }
});

module.exports = router;

const express = require('express');
const { authMiddleware, requireRole } = require('@cleanup/shared/auth');
const { Errors } = require('@cleanup/shared/errors');
const Booking = require('../models/Booking');
const JobEvent = require('../models/JobEvent');
const z = require('zod');
const axios = require('axios');

const router = express.Router();

router.use(authMiddleware({ secret: process.env.JWT_PUBLIC_KEY || 'dev-shared-secret-change-me', type: 'hs256' }));

const logEvent = async (bookingId, type, by, payload = {}) => {
  await JobEvent.create({ bookingId, type, by, payload });
};

// Client creates booking
router.post('/', requireRole('client'), async (req, res, next) => {
  try {
    const data = z.object({
      serviceType: z.string(),
      addressId: z.string(),
      scheduledStart: z.string().datetime(),
      scheduledEnd: z.string().datetime(),
      price: z.number(),
      notes: z.string().optional()
    }).parse(req.body);

    const booking = await Booking.create({
      ...data,
      clientId: req.user.id,
      status: 'pending_assignment'
    });

    await logEvent(booking._id, 'CREATED', req.user.id);
    
    // Auto-assignment algorithm would be triggered here async
    
    res.status(201).json(booking);
  } catch (err) {
    next(err);
  }
});

// Client gets own bookings
router.get('/me', requireRole('client'), async (req, res, next) => {
  try {
    const bookings = await Booking.find({ clientId: req.user.id }).sort({ scheduledStart: 1 });
    res.json(bookings);
  } catch (err) {
    next(err);
  }
});

// Cleaner gets assigned bookings
router.get('/assigned', requireRole('cleaner'), async (req, res, next) => {
  try {
    const bookings = await Booking.find({ assignedCleanerId: req.user.id }).sort({ scheduledStart: 1 });
    res.json(bookings);
  } catch (err) {
    next(err);
  }
});

// Admin lists all bookings
router.get('/', requireRole('admin'), async (req, res, next) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    next(err);
  }
});

// Get specific booking
router.get('/:id', async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) throw Errors.notFound('Booking not found');
    res.json(booking);
  } catch (err) {
    next(err);
  }
});

// Client or Admin reschedules booking
router.patch('/:id/reschedule', requireRole('client', 'admin'), async (req, res, next) => {
  try {
    const data = z.object({
      scheduledStart: z.string().datetime(),
      scheduledEnd: z.string().datetime(),
      reason: z.string()
    }).parse(req.body);

    const booking = await Booking.findById(req.params.id);
    if (!booking) throw Errors.notFound('Booking not found');
    
    booking.rescheduleHistory.push({
      by: req.user.id,
      from: booking.scheduledStart,
      to: new Date(data.scheduledStart),
      reason: data.reason
    });
    
    booking.scheduledStart = new Date(data.scheduledStart);
    booking.scheduledEnd = new Date(data.scheduledEnd);
    booking.status = 'rescheduled';
    await booking.save();
    
    await logEvent(booking._id, 'RESCHEDULED', req.user.id, data);
    res.json(booking);
  } catch (err) {
    next(err);
  }
});

// Client cancels booking
router.patch('/:id/cancel', requireRole('client', 'admin'), async (req, res, next) => {
  try {
    const data = z.object({ reason: z.string().optional() }).parse(req.body);
    const booking = await Booking.findById(req.params.id);
    if (!booking) throw Errors.notFound('Booking not found');

    booking.status = 'cancelled';
    await booking.save();
    
    await logEvent(booking._id, 'CANCELLED', req.user.id, data);
    res.json(booking);
  } catch (err) {
    next(err);
  }
});

// Cleaner confirms booking
router.post('/:id/confirm', requireRole('cleaner'), async (req, res, next) => {
  try {
    const booking = await Booking.findOne({ _id: req.params.id, assignedCleanerId: req.user.id });
    if (!booking) throw Errors.notFound('Booking not found or not assigned to you');
    if (booking.status !== 'assigned' && booking.status !== 'rescheduled') {
      throw Errors.badRequest(`Cannot confirm booking from status ${booking.status}`);
    }
    
    booking.status = 'cleaner_confirmed';
    booking.confirmationDeadline = undefined;
    await booking.save();
    
    await logEvent(booking._id, 'CONFIRMED', req.user.id);
    
    res.json(booking);
  } catch (err) {
    next(err);
  }
});

// Cleaner completes booking
router.post('/:id/complete', requireRole('cleaner'), async (req, res, next) => {
  try {
    const booking = await Booking.findOne({ _id: req.params.id, assignedCleanerId: req.user.id });
    if (!booking) throw Errors.notFound();
    
    booking.status = 'completed';
    await booking.save();
    
    await logEvent(booking._id, 'COMPLETED', req.user.id);
    
    res.json(booking);
  } catch (err) {
    next(err);
  }
});

// Cleaner rejects booking
router.post('/:id/reject', requireRole('cleaner'), async (req, res, next) => {
  try {
    const data = z.object({ reason: z.string() }).parse(req.body);
    const booking = await Booking.findOne({ _id: req.params.id, assignedCleanerId: req.user.id });
    if (!booking) throw Errors.notFound();
    
    booking.status = 'rejected';
    await booking.save();
    
    await logEvent(booking._id, 'REJECTED', req.user.id, data);
    
    // Auto-assignment algorithm to retry would be triggered here async
    
    res.json(booking);
  } catch (err) {
    next(err);
  }
});

// Cleaner starts booking
router.post('/:id/start', requireRole('cleaner'), async (req, res, next) => {
  try {
    const booking = await Booking.findOne({ _id: req.params.id, assignedCleanerId: req.user.id });
    if (!booking) throw Errors.notFound();
    
    booking.status = 'in_progress';
    await booking.save();
    
    await logEvent(booking._id, 'STARTED', req.user.id);
    
    res.json(booking);
  } catch (err) {
    next(err);
  }
});

// Cleaner collects cash
router.post('/:id/collect-cash', requireRole('cleaner'), async (req, res, next) => {
  try {
    const booking = await Booking.findOne({ _id: req.params.id, assignedCleanerId: req.user.id });
    if (!booking) throw Errors.notFound();
    
    // A real implementation would call the payment-service here
    // For now, we'll log the event
    await logEvent(booking._id, 'CASH_COLLECTED', req.user.id);
    
    res.json({ success: true, bookingId: booking._id });
  } catch (err) {
    next(err);
  }
});

module.exports = router;

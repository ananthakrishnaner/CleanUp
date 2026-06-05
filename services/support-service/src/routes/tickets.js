const express = require('express');
const { authMiddleware, requireRole } = require('@cleanup/shared/auth');
const { Errors } = require('@cleanup/shared/errors');
const Ticket = require('../models/Ticket');
const z = require('zod');

const router = express.Router();

router.use(authMiddleware({ secret: process.env.JWT_PUBLIC_KEY || 'dev-shared-secret-change-me', type: 'hs256' }));

// Create a new ticket
router.post('/tickets', async (req, res, next) => {
  try {
    const data = z.object({
      subject: z.string(),
      priority: z.enum(['low', 'medium', 'high', 'urgent']).default('medium'),
      message: z.string()
    }).parse(req.body);

    const ticket = await Ticket.create({
      userId: req.user.id,
      userRole: req.user.role,
      subject: data.subject,
      priority: data.priority,
      messages: [{
        senderId: req.user.id,
        senderRole: req.user.role,
        content: data.message
      }]
    });

    res.status(201).json(ticket);
  } catch (err) {
    next(err);
  }
});

// User gets their own tickets
router.get('/tickets/me', async (req, res, next) => {
  try {
    const tickets = await Ticket.find({ userId: req.user.id }).sort({ updatedAt: -1 });
    res.json(tickets);
  } catch (err) {
    next(err);
  }
});

// Admin queue
router.get('/tickets', requireRole('admin'), async (req, res, next) => {
  try {
    const tickets = await Ticket.find().sort({ createdAt: -1 });
    res.json(tickets);
  } catch (err) {
    next(err);
  }
});

// Add a reply
router.post('/tickets/:id/reply', async (req, res, next) => {
  try {
    const data = z.object({ message: z.string() }).parse(req.body);
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) throw Errors.notFound('Ticket not found');

    // Only allow owner or admin
    if (ticket.userId !== req.user.id && req.user.role !== 'admin') {
      throw Errors.forbidden();
    }

    ticket.messages.push({
      senderId: req.user.id,
      senderRole: req.user.role,
      content: data.message
    });
    
    // Auto-update status if replied by admin
    if (req.user.role === 'admin' && ticket.status === 'open') {
      ticket.status = 'in_progress';
      if (!ticket.assignedTo) ticket.assignedTo = req.user.id;
    }

    await ticket.save();
    res.json(ticket);
  } catch (err) {
    next(err);
  }
});

// Admin updates status
router.patch('/tickets/:id/status', requireRole('admin'), async (req, res, next) => {
  try {
    const data = z.object({
      status: z.enum(['open', 'in_progress', 'resolved', 'closed'])
    }).parse(req.body);
    
    const ticket = await Ticket.findByIdAndUpdate(req.params.id, { $set: { status: data.status } }, { new: true });
    if (!ticket) throw Errors.notFound('Ticket not found');
    res.json(ticket);
  } catch (err) {
    next(err);
  }
});

module.exports = router;

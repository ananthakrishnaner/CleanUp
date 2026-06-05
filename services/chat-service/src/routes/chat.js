const express = require('express');
const { authMiddleware, internalOnly } = require('@cleanup/shared/auth');
const { Errors } = require('@cleanup/shared/errors');
const Thread = require('../models/Thread');
const z = require('zod');

const router = express.Router();

// Internal route to create thread when booking is assigned
router.post('/internal/threads', internalOnly(), async (req, res, next) => {
  try {
    const data = z.object({
      bookingId: z.string(),
      clientId: z.string(),
      cleanerId: z.string()
    }).parse(req.body);

    const thread = await Thread.findOneAndUpdate(
      { bookingId: data.bookingId },
      { $set: data },
      { new: true, upsert: true }
    );
    res.status(201).json(thread);
  } catch (err) {
    next(err);
  }
});

router.use(authMiddleware({ secret: process.env.JWT_PUBLIC_KEY || 'dev-shared-secret-change-me', type: 'hs256' }));

router.get('/threads', async (req, res, next) => {
  try {
    const filter = req.user.role === 'client' 
      ? { clientId: req.user.id } 
      : { cleanerId: req.user.id };
    
    if (req.user.role === 'admin') filter = {};

    const threads = await Thread.find(filter).sort({ updatedAt: -1 });
    res.json(threads);
  } catch (err) {
    next(err);
  }
});

router.get('/threads/:id/messages', async (req, res, next) => {
  try {
    const thread = await Thread.findById(req.params.id);
    if (!thread) throw Errors.notFound('Thread not found');
    
    // Auth check
    if (thread.clientId !== req.user.id && thread.cleanerId !== req.user.id && req.user.role !== 'admin') {
      throw Errors.forbidden();
    }

    res.json(thread.messages);
  } catch (err) {
    next(err);
  }
});

router.post('/threads/:id/messages', async (req, res, next) => {
  try {
    const data = z.object({ content: z.string() }).parse(req.body);
    const thread = await Thread.findById(req.params.id);
    if (!thread) throw Errors.notFound('Thread not found');
    
    if (thread.clientId !== req.user.id && thread.cleanerId !== req.user.id && req.user.role !== 'admin') {
      throw Errors.forbidden();
    }

    const msg = {
      senderId: req.user.id,
      senderRole: req.user.role,
      content: data.content
    };
    
    thread.messages.push(msg);
    await thread.save();

    // Trigger WS broadcast
    const { broadcast } = require('../ws');
    broadcast(thread._id.toString(), msg);

    res.status(201).json(msg);
  } catch (err) {
    next(err);
  }
});

module.exports = router;

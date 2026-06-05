const express = require('express');
const { authMiddleware, requireRole } = require('@cleanup/shared/auth');
const { Errors } = require('@cleanup/shared/errors');
const Client = require('../models/Client');
const z = require('zod');

const router = express.Router();

router.use(authMiddleware({ secret: process.env.JWT_PUBLIC_KEY || 'dev-shared-secret-change-me', type: 'hs256' }));

router.get('/me', requireRole('client'), async (req, res, next) => {
  try {
    let client = await Client.findOne({ userId: req.user.id });
    if (!client) {
      client = await Client.create({ userId: req.user.id, fullName: req.user.username });
    }
    res.json(client);
  } catch (err) {
    next(err);
  }
});

router.patch('/me', requireRole('client'), async (req, res, next) => {
  try {
    const update = z.object({
      fullName: z.string().optional(),
      avatarUrl: z.string().url().optional(),
      preferences: z.object({
        language: z.string().optional(),
        notifications: z.boolean().optional()
      }).optional()
    }).parse(req.body);
    
    const client = await Client.findOneAndUpdate(
      { userId: req.user.id },
      { $set: update },
      { new: true, upsert: true }
    );
    res.json(client);
  } catch (err) {
    next(err);
  }
});

router.post('/me/addresses', requireRole('client'), async (req, res, next) => {
  try {
    const address = z.object({
      label: z.string(),
      line1: z.string(),
      line2: z.string().optional(),
      city: z.string(),
      pincode: z.string(),
      lat: z.number().optional(),
      lng: z.number().optional(),
      isDefault: z.boolean().optional()
    }).parse(req.body);

    const client = await Client.findOne({ userId: req.user.id });
    if (!client) throw Errors.notFound('Client profile not found');

    if (address.isDefault) {
      client.addresses.forEach(a => a.isDefault = false);
    }

    client.addresses.push(address);
    await client.save();
    
    res.status(201).json(client);
  } catch (err) {
    next(err);
  }
});

router.delete('/me/addresses/:id', requireRole('client'), async (req, res, next) => {
  try {
    const client = await Client.findOne({ userId: req.user.id });
    if (!client) throw Errors.notFound('Client profile not found');
    
    client.addresses.id(req.params.id).deleteOne();
    await client.save();
    
    res.json(client);
  } catch (err) {
    next(err);
  }
});

module.exports = router;

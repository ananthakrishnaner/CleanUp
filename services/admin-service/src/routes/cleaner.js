const express = require('express');
const { authMiddleware, requireRole, internalOnly } = require('@cleanup/shared/auth');
const z = require('zod');
const { client } = require('@cleanup/shared/http');
const { Errors } = require('@cleanup/shared/errors');

const router = express.Router();

router.use(authMiddleware({ secret: process.env.JWT_PUBLIC_KEY || 'dev-shared-secret-change-me', type: 'hs256' }));
router.use(requireRole('admin'));

// Helper to call auth-service internal API
const authClient = (path, options = {}) => client(process.env.AUTH_SERVICE_URL || 'http://auth-service:4001', options);

// ─── GET /admin/cleaners ───────────────────────────────────────────
router.get('/cleaners', async (req, res, next) => {
  try {
    const { q, page = 1, limit = 50 } = req.query;
    const params = new URLSearchParams();
    params.append('role', 'cleaner');
    if (q) params.append('q', q);
    if (page) params.append('page', String(page));
    if (limit) params.append('limit', String(limit));

    const response = await authClient(`/auth/internal/users?${params.toString()}`);
    const users = response.data.users.map((u: any) => ({
      id: u._id,
      username: u.username,
      email: u.email,
      phone: u.phone,
      isActive: u.isActive,
      createdAt: u.createdAt,
    }));
    res.json({ total: response.data.total, cleaners: users });
  } catch (e) {
    next(e);
  }
});

// ─── POST /admin/cleaners ───────────────────────────────────────────
router.post('/cleaners', async (req, res, next) => {
  try {
    const schema = z.object({
      username: z.string().regex(/^[a-z0-9_]{3,20}$/, 'username must be 3-20 lowercase alphanumerics/underscore'),
      email: z.string().email().optional(),
      phone: z.string().optional(),
      password: z.string().min(8).max(72),
    });
    const body = schema.parse(req.body);

    // Check if user already exists via auth-service
    const checkResponse = await authClient('/auth/internal/users').catch(() => ({ data: { users: [] } }));
    const existing = checkResponse.data.users?.find(
      (u: any) => u.username === body.username.toLowerCase() ||
        (body.email && u.email === body.email.toLowerCase()) ||
        (body.phone && u.phone === body.phone)
    );
    if (existing) {
      throw Errors.conflict('Username, email, or phone already taken');
    }

    // Create cleaner via auth-service internal endpoint
    const createResponse = await authClient('/auth/internal/users', {
      method: 'POST',
      data: {
        username: body.username.toLowerCase(),
        email: body.email?.toLowerCase(),
        phone: body.phone,
        password: body.password,
        role: 'cleaner',
        mustChangePwd: true,
      },
    });

    res.status(201).json({ cleaner: createResponse.data.user });
  } catch (e) {
    next(e);
  }
});

// ─── DELETE /admin/cleaners/:id ─────────────────────────────────
router.delete('/cleaners/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    // Call auth-service to deactivate (soft delete) the user
    await authClient(`/auth/internal/users/${id}`, {
      method: 'DELETE',
    });
    res.json({ ok: true });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
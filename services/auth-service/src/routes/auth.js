// services/auth-service/src/routes/auth.js
const express = require('express');
const { z }   = require('zod');
const bcrypt  = require('bcryptjs');
const User    = require('../models/User');
const { signAccess, signRefresh, verify, loadSecret, internalOnly } = require('@cleanup/shared/auth');
const { Errors } = require('@cleanup/shared/errors');
const { client } = require('@cleanup/shared/http');

const router = express.Router();
const opts   = loadSecret({ secret: process.env.AUTH_JWT_SECRET || process.env.INTERNAL_API_SECRET });

const registerSchema = z.object({
  username: z.string().regex(usernameRe, 'username must be 3-20 lowercase alphanumerics/underscore'),
  email:    z.string().email().optional(),
  phone:    z.string().min(7).max(20).optional(),
  password: z.string().min(8).max(72),
  role:     z.enum(['client']).default('client'),
});
const usernameRe = /^[a-z0-9_]{3,20}$/;

const loginSchema = z.object({
  identifier: z.string().min(3), // username | email | phone
  password:   z.string().min(1),
});

const refreshSchema = z.object({ refreshToken: z.string().min(10) });

const changePwdSchema = z.object({
  oldPassword: z.string().min(1),
  newPassword: z.string().min(8).max(72),
});

// ─── POST /auth/register (client self-signup) ────────────────────────
router.post('/register', async (req, res, next) => {
  try {
    const body = registerSchema.parse(req.body);
    const exists = await User.findOne({
      $or: [
        { username: body.username.toLowerCase() },
        body.email ? { email: body.email.toLowerCase() } : { _id: null },
        body.phone ? { phone: body.phone } : { _id: null },
      ],
    });
    if (exists) throw Errors.conflict('Username, email, or phone already taken');

    const passwordHash = await User.hashPassword(body.password);
    const user = await User.create({
      username: body.username.toLowerCase(),
      email: body.email ? body.email.toLowerCase() : undefined,
      phone: body.phone || undefined,
      passwordHash,
      role: 'client',
    });

    // Best-effort: create a corresponding client profile in user-service.
    if (process.env.USER_SERVICE_URL) {
      try {
        await client(process.env.USER_SERVICE_URL).post('/internal/clients', {
          userId: user._id.toString(),
          fullName: body.username,
        });
      } catch (e) {
        // Log only; user can finish profile later.
        // eslint-disable-next-line no-console
        console.warn('user-service profile sync failed', e.message);
      }
    }

    const accessToken  = signAccess({ sub: user._id.toString(), role: user.role, username: user.username }, opts);
    const refreshToken = signRefresh({ sub: user._id.toString(), role: user.role, username: user.username }, opts);
    user.refreshTokenHash = await bcrypt.hash(refreshToken, 8);
    await user.save();

    res.status(201).json({ user: user.toSafeJSON(), accessToken, refreshToken });
  } catch (e) { next(e); }
});

// ─── POST /auth/login (username|email|phone + password) ──────────────
router.post('/login', async (req, res, next) => {
  try {
    const { identifier, password } = loginSchema.parse(req.body);
    const id = identifier.toLowerCase();
    const user = await User.findOne({
      $or: [{ username: id }, { email: id }, { phone: identifier }],
    });
    if (!user || !user.isActive) throw Errors.unauthorized('Invalid credentials');
    const ok = await user.verifyPassword(password);
    if (!ok) throw Errors.unauthorized('Invalid credentials');

    user.lastLoginAt = new Date();
    const accessToken  = signAccess({ sub: user._id.toString(), role: user.role, username: user.username }, opts);
    const refreshToken = signRefresh({ sub: user._id.toString(), role: user.role, username: user.username }, opts);
    user.refreshTokenHash = await bcrypt.hash(refreshToken, 8);
    await user.save();

    res.json({ user: user.toSafeJSON(), accessToken, refreshToken });
  } catch (e) { next(e); }
});

// ─── POST /auth/refresh ─────────────────────────────────────────────
router.post('/refresh', async (req, res, next) => {
  try {
    const { refreshToken } = refreshSchema.parse(req.body);
    let decoded;
    try { decoded = verify(refreshToken, opts); } catch { throw Errors.unauthorized('Invalid refresh token'); }
    const user = await User.findById(decoded.sub);
    if (!user || !user.refreshTokenHash) throw Errors.unauthorized();
    const ok = await bcrypt.compare(refreshToken, user.refreshTokenHash);
    if (!ok) throw Errors.unauthorized('Refresh token revoked');
    const accessToken = signAccess({ sub: user._id.toString(), role: user.role, username: user.username }, opts);
    res.json({ accessToken });
  } catch (e) { next(e); }
});

// ─── POST /auth/change-password ─────────────────────────────────────
router.post('/change-password', async (req, res, next) => {
  try {
    const auth = req.headers.authorization || '';
    const m = auth.match(/^Bearer\s+(.+)$/);
    if (!m) throw Errors.unauthorized();
    let decoded;
    try { decoded = verify(m[1], opts); } catch { throw Errors.unauthorized(); }
    const { oldPassword, newPassword } = changePwdSchema.parse(req.body);
    const user = await User.findById(decoded.sub);
    if (!user) throw Errors.unauthorized();
    if (!(await user.verifyPassword(oldPassword))) throw Errors.unauthorized('Wrong current password');
    user.passwordHash = await User.hashPassword(newPassword);
    user.mustChangePwd = false;
    user.refreshTokenHash = null;
    await user.save();
    res.json({ ok: true });
  } catch (e) { next(e); }
});

// ─── POST /auth/logout ──────────────────────────────────────────────
router.post('/logout', async (req, res, next) => {
  try {
    const auth = req.headers.authorization || '';
    const m = auth.match(/^Bearer\s+(.+)$/);
    if (m) {
      try {
        const decoded = verify(m[1], opts);
        await User.updateOne({ _id: decoded.sub }, { $set: { refreshTokenHash: null } });
      } catch { /* ignore */ }
    }
    res.json({ ok: true });
  } catch (e) { next(e); }
});

// ─── GET /auth/me (used by Nginx auth_request and other services) ───────
router.get('/me', authMiddleware(opts), async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user || !user.isActive) throw Errors.unauthorized();
    
    // Set headers for Nginx auth_request to extract
    res.set('X-User-Id', user._id.toString());
    res.set('X-User-Role', user.role);
    res.set('X-User-Username', user.username);
    res.json({ user: user.toSafeJSON() });
  } catch (e) { next(e); }
});

// ─── INTERNAL: create a user with a given role (used by admin-svc) ──
router.post('/internal/users', internalOnly(), async (req, res, next) => {
  try {
    const body = z.object({
      username: z.string().regex(usernameRe),
      email:    z.string().email().optional(),
      phone:    z.string().optional(),
      password: z.string().min(8).max(72),
      role:     z.enum(['admin', 'cleaner', 'client']),
      mustChangePwd: z.boolean().default(true),
    }).parse(req.body);
    const exists = await User.findOne({ $or: [{ username: body.username.toLowerCase() }, body.email ? { email: body.email.toLowerCase() } : { _id: null }, body.phone ? { phone: body.phone } : { _id: null }] });
    if (exists) throw Errors.conflict('User already exists');
    const passwordHash = await User.hashPassword(body.password);
    const user = await User.create({
      username: body.username.toLowerCase(),
      email: body.email ? body.email.toLowerCase() : undefined,
      phone: body.phone || undefined,
      passwordHash,
      role: body.role,
      mustChangePwd: body.mustChangePwd,
    });
    res.status(201).json({ user: user.toSafeJSON() });
  } catch (e) { next(e); }
});

// ─── INTERNAL: get user by id ──────────────────────────────────────
router.get('/internal/users/:id', internalOnly(), async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) throw Errors.notFound('User not found');
    res.json({ user: user.toSafeJSON() });
  } catch (e) { next(e); }
});

// ─── INTERNAL: list users (paginated) ──────────────────────────────
router.get('/internal/users', internalOnly(), async (req, res, next) => {
  try {
    const { role, q, page = 1, limit = 50 } = req.query;
    const filter = {};
    if (role) filter.role = role;
    if (q) filter.$or = [{ username: new RegExp(q, 'i') }, { email: new RegExp(q, 'i') }, { phone: new RegExp(q, 'i') }];
    const total = await User.countDocuments(filter);
    const users = await User.find(filter)
      .sort({ createdAt: -1 })
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit));
    res.json({ total, users: users.map(u => u.toSafeJSON()) });
  } catch (e) { next(e); }
});

module.exports = router;

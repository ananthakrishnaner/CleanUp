const { createApp } = require('@cleanup/shared/app');
const { connect } = require('@cleanup/shared/db');
const logger = require('@cleanup/shared/logger');

const NAME = 'backend-service';
const PORT = Number(process.env.PORT || 4003);
const MONGO_URI = process.env.MONGO_URI;
const MONGO_DB = process.env.MONGO_DB || 'cleanup_db';

// Import all service routes
const userRoutes = require('./routes/users');
const cleanerRoutes = require('./routes/cleaners');
const bookingRoutes = require('./routes/bookings');
const notificationRoutes = require('./routes/notifications');
const adminRoutes = require('./routes/admin');
const configRoutes = require('./routes/config');
const supportRoutes = require('./routes/support');
const chatRoutes = require('./routes/chat');
const reviewRoutes = require('./routes/reviews');
const promoRoutes = require('./routes/promos');
const loyaltyRoutes = require('./routes/loyalty');
const analyticsRoutes = require('./routes/analytics');

const routes = [
  { path: '/users', handler: userRoutes },
  { path: '/cleaners', handler: cleanerRoutes },
  { path: '/bookings', handler: bookingRoutes },
  { path: '/notifications', handler: notificationRoutes },
  { path: '/admin', handler: adminRoutes },
  { path: '/config', handler: configRoutes },
  { path: '/support', handler: supportRoutes },
  { path: '/chat', handler: chatRoutes },
  { path: '/reviews', handler: reviewRoutes },
  { path: '/promos', handler: promoRoutes },
  { path: '/loyalty', handler: loyaltyRoutes },
  { path: '/analytics', handler: analyticsRoutes },
  { path: '/health', handler: require('./routes/health') },
];

(async () => {
  try {
    // Connect to MongoDB
    await connect(MONGO_URI, MONGO_DB);
    logger.info('connected.to.mongodb', { service: NAME, db: MONGO_DB });

    // Create Express app with all routes
    const app = createApp({ name: NAME, routes });

    app.listen(PORT, '0.0.0.0', () => {
      logger.info(`listening.on.port`, { service: NAME, port: PORT });
      logger.info('registered.routes', {
        services: routes.map(r => r.path),
        count: routes.length
      });
    });
  } catch (e) {
    logger.error('startup.failed', { error: e.message, service: NAME });
    process.exit(1);
  }
})();
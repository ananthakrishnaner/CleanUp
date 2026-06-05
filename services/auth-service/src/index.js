// services/auth-service/src/index.js
const { createApp } = require('@cleanup/shared/app');
const { connect }   = require('@cleanup/shared/db');
const logger        = require('@cleanup/shared/logger');
const authRoutes    = require('./routes/auth');

const PORT = Number(process.env.PORT || 4001);
const NAME = 'auth-service';

(async () => {
  try {
    await connect(process.env.MONGO_URI, process.env.MONGO_DB || 'auth_db');
  } catch (e) {
    logger.error('mongo.connect.failed', { error: e.message });
    process.exit(1);
  }
  const app = createApp({ name: NAME, routes: authRoutes });
  app.listen(PORT, '0.0.0.0', () => logger.info(`listening on :${PORT}`, { service: NAME }));
})();

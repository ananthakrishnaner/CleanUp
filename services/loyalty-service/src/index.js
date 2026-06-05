// services/loyalty-service/src/index.js
const { createApp } = require('@cleanup/shared/app');
const { connect }   = require('@cleanup/shared/db');
const logger        = require('@cleanup/shared/logger');
const loyaltyRoutes = require('./routes/loyalty');

const PORT = Number(process.env.PORT || 4013);
const NAME = 'loyalty-service';

(async () => {
  try {
    await connect(process.env.MONGO_URI, process.env.MONGO_DB || 'loyalty_db');
  } catch (e) {
    logger.error('mongo.connect.failed', { error: e.message });
    process.exit(1);
  }
  const app = createApp({ name: NAME, routes: loyaltyRoutes });
  app.listen(PORT, '0.0.0.0', () => logger.info(`listening on :${PORT}`, { service: NAME }));
})();

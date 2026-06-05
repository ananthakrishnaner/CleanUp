// services/review-service/src/index.js
const { createApp } = require('@cleanup/shared/app');
const { connect }   = require('@cleanup/shared/db');
const logger        = require('@cleanup/shared/logger');
const reviewRoutes  = require('./routes/reviews');

const PORT = Number(process.env.PORT || 4011);
const NAME = 'review-service';

(async () => {
  try {
    await connect(process.env.MONGO_URI, process.env.MONGO_DB || 'review_db');
  } catch (e) {
    logger.error('mongo.connect.failed', { error: e.message });
    process.exit(1);
  }
  const app = createApp({ name: NAME, routes: reviewRoutes });
  app.listen(PORT, '0.0.0.0', () => logger.info(`listening on :${PORT}`, { service: NAME }));
})();

// services/chat-service/src/index.js
const { createApp } = require('@cleanup/shared/app');
const { connect }   = require('@cleanup/shared/db');
const logger        = require('@cleanup/shared/logger');
const chatRoutes    = require('./routes/chat');
const { setupWebSocket } = require('./ws');

const PORT = Number(process.env.PORT || 4010);
const NAME = 'chat-service';

(async () => {
  try {
    await connect(process.env.MONGO_URI, process.env.MONGO_DB || 'chat_db');
  } catch (e) {
    logger.error('mongo.connect.failed', { error: e.message });
    process.exit(1);
  }
  const app = createApp({ name: NAME, routes: chatRoutes });
  const server = app.listen(PORT, '0.0.0.0', () => logger.info(`listening on :${PORT}`, { service: NAME }));
  
  setupWebSocket(server);
})();

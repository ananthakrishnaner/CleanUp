// services/shared/db.js
// Centralised Mongoose connection helper.

const mongoose = require('mongoose');
const logger   = require('./logger');

async function connect(uri, dbName) {
  mongoose.set('strictQuery', true);
  await mongoose.connect(uri, {
    dbName,
    serverSelectionTimeoutMS: 10000,
  });
  logger.info('mongo.connected', { db: dbName });
  return mongoose.connection;
}

async function disconnect() {
  await mongoose.disconnect();
  logger.info('mongo.disconnected');
}

module.exports = { connect, disconnect, mongoose };

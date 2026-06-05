// services/shared/http.js
// Tiny axios-based client for service-to-service calls. Adds the
// X-Internal-Secret header automatically and short timeouts.

const axios = require('axios');

function client(baseURL) {
  return axios.create({
    baseURL,
    timeout: 8000,
    headers: {
      'Content-Type': 'application/json',
      'X-Internal-Secret': process.env.INTERNAL_API_SECRET || 'dev-internal-secret',
    },
  });
}

module.exports = { client };

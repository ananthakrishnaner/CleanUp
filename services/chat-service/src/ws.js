const { WebSocketServer } = require('ws');
const { verify } = require('@cleanup/shared/auth');

const connections = new Map(); // threadId -> Set(ws)

const setupWebSocket = (server) => {
  const wss = new WebSocketServer({ server, path: '/ws/chat/' });

  wss.on('connection', (ws, req) => {
    // Expected URL: /ws/chat/?token=JWT&threadId=123
    const url = new URL(req.url, `http://${req.headers.host}`);
    const token = url.searchParams.get('token');
    const threadId = url.searchParams.get('threadId');

    if (!token || !threadId) {
      ws.close(1008, 'Missing credentials');
      return;
    }

    try {
      const opts = { secret: process.env.JWT_PUBLIC_KEY || 'dev-shared-secret-change-me', type: 'hs256' };
      verify(token, opts); // validate user
      
      if (!connections.has(threadId)) {
        connections.set(threadId, new Set());
      }
      connections.get(threadId).add(ws);

      ws.on('close', () => {
        const threadConns = connections.get(threadId);
        if (threadConns) {
          threadConns.delete(ws);
          if (threadConns.size === 0) connections.delete(threadId);
        }
      });
    } catch (e) {
      ws.close(1008, 'Invalid token');
    }
  });
};

const broadcast = (threadId, message) => {
  const threadConns = connections.get(threadId);
  if (threadConns) {
    const payload = JSON.stringify(message);
    threadConns.forEach(ws => {
      if (ws.readyState === 1) ws.send(payload); // OPEN
    });
  }
};

module.exports = { setupWebSocket, broadcast };

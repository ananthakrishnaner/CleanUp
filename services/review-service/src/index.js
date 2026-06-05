const http = require('http');
const server = http.createServer((req, res) => {
  res.writeHead(200);
  res.end('Dummy review-service running');
});
// Start on whatever PORT is passed or 4000
const port = process.env.PORT || 4000;
server.listen(port, '0.0.0.0', () => console.log('review-service running on ' + port));

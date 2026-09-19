const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

const port = Number(process.env.PORT || 4173);
const root = path.join(__dirname, 'public');
const releases = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'fixtures', 'releases.json'), 'utf8'));

function sendJson(response, status, body) {
  response.writeHead(status, { 'content-type': 'application/json; charset=utf-8' });
  response.end(JSON.stringify(body));
}

function serveAsset(response, fileName) {
  const filePath = path.join(root, fileName);
  if (!filePath.startsWith(root) || !fs.existsSync(filePath)) {
    response.writeHead(404);
    response.end('Not found');
    return;
  }
  const contentType = fileName.endsWith('.css') ? 'text/css' : 'text/html';
  response.writeHead(200, { 'content-type': `${contentType}; charset=utf-8` });
  response.end(fs.readFileSync(filePath));
}

const server = http.createServer((request, response) => {
  const url = new URL(request.url, `http://${request.headers.host}`);

  if (url.pathname === '/health') return sendJson(response, 200, { status: 'ok' });
  if (url.pathname === '/api/releases') {
    const status = url.searchParams.get('status');
    const filtered = status ? releases.filter((release) => release.status === status) : releases;
    return sendJson(response, 200, { data: filtered, meta: { total: filtered.length } });
  }
  if (url.pathname.startsWith('/api/releases/')) {
    const release = releases.find((item) => item.id === url.pathname.split('/').pop());
    return release ? sendJson(response, 200, { data: release }) : sendJson(response, 404, { error: 'Release not found' });
  }
  if (url.pathname === '/' || url.pathname === '/index.html') return serveAsset(response, 'index.html');
  return response.writeHead(404) && response.end('Not found');
});

server.listen(port, '127.0.0.1', () => {
  if (process.env.NODE_ENV !== 'test') console.log(`Release Radar listening on http://127.0.0.1:${port}`);
});
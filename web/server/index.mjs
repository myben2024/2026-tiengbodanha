import { createReadStream, existsSync, statSync } from 'node:fs';
import { createServer } from 'node:http';
import { extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';
import { handleAudioApi } from './audio-api.mjs';
import { loadLocalEnv } from './env.mjs';

const rootDir = join(fileURLToPath(new URL('.', import.meta.url)), '..');
const distDir = join(rootDir, 'dist');
await loadLocalEnv(join(rootDir, '.env'));

const server = createServer(async (request, response) => {
  if (request.url === '/healthz') {
    response.setHeader('Content-Type', 'application/json; charset=utf-8');
    response.end('{"status":"ok"}');
    return;
  }

  if (await handleAudioApi(request, response)) return;

  const pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
  const requestedPath = normalize(join(distDir, pathname));
  const filePath = requestedPath.startsWith(distDir) && existsSync(requestedPath) && statSync(requestedPath).isFile()
    ? requestedPath
    : join(distDir, 'index.html');
  response.setHeader('Content-Type', contentType(filePath));
  createReadStream(filePath).on('error', () => {
    response.statusCode = 404;
    response.end('Not found');
  }).pipe(response);
});

const port = Number(process.env.PORT || 4173);
server.listen(port, '0.0.0.0', () => console.log(`Server listening on http://localhost:${port}`));

function contentType(path) {
  return ({
    '.css': 'text/css; charset=utf-8',
    '.html': 'text/html; charset=utf-8',
    '.js': 'text/javascript; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.mp3': 'audio/mpeg',
    '.png': 'image/png',
    '.svg': 'image/svg+xml',
  })[extname(path)] || 'application/octet-stream';
}
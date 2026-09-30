import { AudioRequestError, createAudioService } from './audio-service.mjs';

let audioService;
const generationWindows = new Map();
const generationLimit = 30;
const generationWindowMs = 10 * 60 * 1000;

export async function handleAudioApi(request, response) {
  try {
    const url = new URL(request.url, 'http://localhost');
    if (url.pathname !== '/api/audio') return false;

    if (request.method === 'GET') {
      const result = await getService().find(
        url.searchParams.get('text'),
        url.searchParams.get('ipa') || undefined,
      );
      sendJson(response, 200, result);
      return true;
    }

    if (request.method === 'POST') {
      enforceGenerationRate(request);
      const body = await readJsonBody(request);
      const result = await getService().generate(body.text, body.ipa);
      sendJson(response, 200, result);
      return true;
    }

    response.setHeader('Allow', 'GET, POST');
    sendJson(response, 405, { error: 'Method not allowed.' });
    return true;
  } catch (error) {
    const statusCode = error instanceof AudioRequestError ? error.statusCode : 500;
    console.error('Audio API error:', error);
    sendJson(response, statusCode, { error: statusCode === 500 ? 'Audio service unavailable.' : error.message });
    return true;
  }
}

function getService() {
  audioService ??= createAudioService();
  return audioService;
}

function enforceGenerationRate(request) {
  const forwardedAddress = request.headers['cf-connecting-ip'] || request.headers['x-forwarded-for'];
  const address = String(forwardedAddress || request.socket.remoteAddress || 'unknown').split(',')[0].trim();
  const now = Date.now();
  const current = generationWindows.get(address);
  const window = !current || now - current.startedAt >= generationWindowMs
    ? { startedAt: now, count: 0 }
    : current;
  window.count += 1;
  generationWindows.set(address, window);
  if (window.count > generationLimit) {
    throw new AudioRequestError(429, 'Too many audio generation requests. Please try again later.');
  }
}

function readJsonBody(request) {
  return new Promise((resolve, reject) => {
    let body = '';
    request.setEncoding('utf8');
    request.on('data', (chunk) => {
      body += chunk;
      if (body.length > 10_000) reject(new AudioRequestError(413, 'Request body is too large.'));
    });
    request.on('end', () => {
      try {
        resolve(JSON.parse(body || '{}'));
      } catch {
        reject(new AudioRequestError(400, 'Request body must be valid JSON.'));
      }
    });
    request.on('error', reject);
  });
}

function sendJson(response, statusCode, value) {
  response.statusCode = statusCode;
  response.setHeader('Content-Type', 'application/json; charset=utf-8');
  response.setHeader('Cache-Control', 'no-store');
  response.end(JSON.stringify(value));
}
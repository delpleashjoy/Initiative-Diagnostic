import { createServer } from 'http';
import { readFile, readFileSync, existsSync } from 'fs';
import { extname, join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { request as httpsRequest } from 'https';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// ── Load .env ────────────────────────────────────────────────────────────────
function loadEnv() {
  const envPath = join(__dirname, '.env');
  if (!existsSync(envPath)) return;
  const lines = readFileSync(envPath, 'utf8').split('\n');
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const idx = trimmed.indexOf('=');
    if (idx === -1) continue;
    const key = trimmed.slice(0, idx).trim();
    const val = trimmed.slice(idx + 1).trim();
    if (key && !(key in process.env)) process.env[key] = val;
  }
}
loadEnv();

// ── Kit.com tag IDs (server-side only) ───────────────────────────────────────
const TAG_IDS = {
  'diagnostic-lead':          17388100,
  'imbalance-score-low':      17388103,
  'imbalance-score-moderate': 17388108,
  'imbalance-score-high':     17388115,
  'imbalance-score-critical': 17388118,
};

function kitPost(tagId, payload) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify(payload);
    const req = httpsRequest({
      hostname: 'api.kit.com',
      path: `/v3/tags/${tagId}/subscribe`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body),
      },
    }, (res) => {
      let data = '';
      res.on('data', chunk => { data += chunk; });
      res.on('end', () => resolve(JSON.parse(data)));
    });
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

// ── Server ────────────────────────────────────────────────────────────────────
const server = createServer((req, res) => {

  // POST /api/subscribe — proxy to Kit.com with key stored server-side
  if (req.method === 'POST' && req.url === '/api/subscribe') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', async () => {
      try {
        const { name, email, tags, scoreTier, initiativeScore } = JSON.parse(body);
        const apiKey = process.env.KIT_API_KEY;
        if (!apiKey) {
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ ok: false, error: 'KIT_API_KEY not configured' }));
          return;
        }
        const results = await Promise.all(
          tags.map(tagName => {
            const tagId = TAG_IDS[tagName];
            if (!tagId) return Promise.resolve({ error: 'unknown tag: ' + tagName });
            return kitPost(tagId, {
              api_key:    apiKey,
              first_name: name,
              email,
              fields: {
                score_tier:       scoreTier,
                initiative_score: String(initiativeScore),
              },
            }).then(d => {
              console.log('[Kit] Tagged', tagName + ':', d.subscription && d.subscription.state);
              return d;
            });
          })
        );
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ ok: true, results }));
      } catch (err) {
        console.error('[Kit] Subscribe error:', err);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ ok: false, error: err.message }));
      }
    });
    return;
  }

  // Static file serving
  let filePath = join(__dirname, req.url === '/' ? 'index.html' : req.url);
  if (!filePath.startsWith(__dirname)) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }
  readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end('Not found');
      return;
    }
    const ext = extname(filePath);
    const contentType = {
      '.html': 'text/html',
      '.css': 'text/css',
      '.js': 'application/javascript',
      '.png': 'image/png',
      '.jpg': 'image/jpeg',
      '.svg': 'image/svg+xml'
    }[ext] || 'text/plain';
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  });
});

server.listen(3000, () => console.log('Server running at http://localhost:3000'));

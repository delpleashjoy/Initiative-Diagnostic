const { request: httpsRequest } = require('https');

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

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const apiKey = process.env.KIT_API_KEY;
  if (!apiKey) {
    return {
      statusCode: 500,
      body: JSON.stringify({ ok: false, error: 'KIT_API_KEY not configured' }),
    };
  }

  try {
    const { name, email, tags, scoreTier, initiativeScore } = JSON.parse(event.body);

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
        });
      })
    );

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ok: true, results }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ok: false, error: err.message }),
    };
  }
};

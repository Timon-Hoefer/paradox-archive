const encoder = new TextEncoder();
const SESSION_COOKIE = 'pa_session';
const SESSION_MAX_AGE_SECONDS = 100 * 24 * 60 * 60;

export function json(data, status = 200, headers = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store, max-age=0',
      'X-Content-Type-Options': 'nosniff',
      'Referrer-Policy': 'no-referrer',
      'X-Frame-Options': 'DENY',
      'X-Permitted-Cross-Domain-Policies': 'none',
      'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
      'Content-Security-Policy': "default-src 'none'; frame-ancestors 'none'",
      'Cross-Origin-Opener-Policy': 'same-origin',
      'Cross-Origin-Resource-Policy': 'same-origin',
      'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=(), usb=()',
      ...headers
    }
  });
}

export function sameOrigin(request) {
  const origin = request.headers.get('Origin');
  if (origin) return origin === new URL(request.url).origin;
  return request.headers.get('Sec-Fetch-Site') === 'same-origin';
}

export async function readJsonBody(request, maximum = 2048) {
  const contentType = request.headers.get('Content-Type') || '';
  if (!/^application\/json(?:\s*;|$)/i.test(contentType)) {
    return { response: json({ error: 'unsupported_media_type' }, 415) };
  }

  const encoding = (request.headers.get('Content-Encoding') || 'identity').trim().toLowerCase();
  if (encoding !== 'identity') {
    return { response: json({ error: 'unsupported_content_encoding' }, 415) };
  }

  const declaredLength = request.headers.get('Content-Length');
  if (declaredLength !== null) {
    const length = Number(declaredLength);
    if (!Number.isFinite(length) || length < 0) {
      return { response: json({ error: 'invalid_content_length' }, 400) };
    }
    if (length > maximum) return { response: json({ error: 'request_too_large' }, 413) };
  }

  if (!request.body) return { response: json({ error: 'invalid_json' }, 400) };
  const reader = request.body.getReader();
  const chunks = [];
  let total = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      total += value.byteLength;
      if (total > maximum) {
        await reader.cancel();
        return { response: json({ error: 'request_too_large' }, 413) };
      }
      chunks.push(value);
    }
  } catch {
    return { response: json({ error: 'invalid_body' }, 400) };
  }

  const bytes = new Uint8Array(total);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.byteLength;
  }

  try {
    return { value: JSON.parse(new TextDecoder('utf-8', { fatal: true }).decode(bytes)) };
  } catch {
    return { response: json({ error: 'invalid_json' }, 400) };
  }
}

export function methodNotAllowed(allowed) {
  return json({ error: 'method_not_allowed' }, 405, { Allow: allowed.join(', ') });
}

export async function consumeRateLimit(database, rateKey, nowSeconds, windowSeconds, maximum) {
  const row = await database
    .prepare(`INSERT INTO rate_limits (rate_key, window_started, attempts)
              VALUES (?, ?, 1)
              ON CONFLICT(rate_key) DO UPDATE SET
                window_started = CASE
                  WHEN excluded.window_started - rate_limits.window_started >= ?
                  THEN excluded.window_started
                  ELSE rate_limits.window_started
                END,
                attempts = CASE
                  WHEN excluded.window_started - rate_limits.window_started >= ?
                  THEN 1
                  ELSE MIN(rate_limits.attempts + 1, ?)
                END
              RETURNING window_started, attempts`)
    .bind(rateKey, nowSeconds, windowSeconds, windowSeconds, maximum + 1)
    .first();

  const attempts = Number(row?.attempts || maximum + 1);
  const windowStarted = Number(row?.window_started || nowSeconds);
  return {
    allowed: attempts <= maximum,
    retryAfter: attempts <= maximum ? 0 : Math.max(1, windowSeconds - (nowSeconds - windowStarted))
  };
}

export function getSessionId(request) {
  const cookie = request.headers.get('Cookie') || '';
  const match = cookie.match(/(?:^|;\s*)pa_session=([A-Za-z0-9_-]{43})(?:;|$)/);
  return match?.[1] || null;
}

function bytesToBase64Url(bytes) {
  let binary = '';
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}

export function createSessionId() {
  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);
  return bytesToBase64Url(bytes);
}

export function sessionCookie(sessionId, request) {
  const secure = new URL(request.url).protocol === 'https:' ? '; Secure' : '';
  return `${SESSION_COOKIE}=${sessionId}; Path=/; HttpOnly${secure}; SameSite=Strict; Max-Age=${SESSION_MAX_AGE_SECONDS}`;
}

export function clearSessionCookie(request) {
  const secure = new URL(request.url).protocol === 'https:' ? '; Secure' : '';
  return `${SESSION_COOKIE}=; Path=/; HttpOnly${secure}; SameSite=Strict; Max-Age=0`;
}

export async function keyedHash(secret, value) {
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(value));
  return bytesToBase64Url(new Uint8Array(signature));
}

export async function sessionHash(secret, sessionId) {
  return keyedHash(secret, `session:${sessionId}`);
}

export function cleanAnswer(value) {
  return typeof value === 'string' ? value.normalize('NFKC').trim() : '';
}

export function constantTimeEqual(left, right) {
  const a = encoder.encode(left);
  const b = encoder.encode(right);
  let difference = a.length ^ b.length;
  const length = Math.max(a.length, b.length);
  for (let index = 0; index < length; index += 1) {
    difference |= (a[index] || 0) ^ (b[index] || 0);
  }
  return difference === 0;
}

export function completionContent(answer) {
  return {
    en: {
      headline: answer,
      completion: 'The archive was never broken. It erased its own proof and waited for you to rebuild it.',
      factLabel: 'Did you know?',
      fact: `In The Hitchhiker's Guide to the Galaxy, the supercomputer Deep Thought produces ${answer} as the answer to the Ultimate Question of life, the universe, and everything.`
    },
    de: {
      headline: answer,
      completion: 'Das Archiv war nie beschädigt. Es löschte seinen eigenen Beweis und wartete darauf, dass du ihn neu erschaffst.',
      factLabel: 'Wusstest du?',
      fact: `In Per Anhalter durch die Galaxis gibt der Supercomputer Deep Thought die Zahl ${answer} als Antwort auf die ultimative Frage nach dem Leben, dem Universum und dem ganzen Rest aus.`
    }
  };
}

export function clientIp(request) {
  return request.headers.get('CF-Connecting-IP') || 'unavailable';
}

export function normalizeEntry(value) {
  return typeof value === 'string'
    ? value
        .normalize('NFKC')
        .replace(/[\u0000-\u001f\u007f\u202a-\u202e\u2066-\u2069]/gi, ' ')
        .replace(/\s+/g, ' ')
        .trim()
    : '';
}

export function characterLength(value) {
  return Array.from(value).length;
}

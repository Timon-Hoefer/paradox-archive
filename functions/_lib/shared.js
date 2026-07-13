const encoder = new TextEncoder();
const SESSION_COOKIE = 'pa_session';
const SESSION_MAX_AGE_SECONDS = 7 * 24 * 60 * 60;

export function json(data, status = 200, headers = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store, max-age=0',
      'X-Content-Type-Options': 'nosniff',
      'Referrer-Policy': 'no-referrer',
      ...headers
    }
  });
}

export function sameOrigin(request) {
  const origin = request.headers.get('Origin');
  return !origin || origin === new URL(request.url).origin;
}

export function bodyIsSmallEnough(request, maximum = 2048) {
  const length = Number(request.headers.get('Content-Length') || 0);
  return Number.isFinite(length) && length <= maximum;
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
      completion: 'Session complete.',
      factLabel: 'Did you know?',
      fact: `In The Hitchhiker's Guide to the Galaxy, the supercomputer Deep Thought produces ${answer} as the answer to the Ultimate Question of life, the universe, and everything.`
    },
    de: {
      headline: answer,
      completion: 'Sitzung abgeschlossen.',
      factLabel: 'Wusstest du?',
      fact: `In Per Anhalter durch die Galaxis gibt der Supercomputer Deep Thought die Zahl ${answer} als Antwort auf die ultimative Frage nach dem Leben, dem Universum und dem ganzen Rest aus.`
    }
  };
}

export function clientIp(request) {
  return (
    request.headers.get('CF-Connecting-IP') ||
    request.headers.get('X-Forwarded-For')?.split(',')[0]?.trim() ||
    'local-development'
  );
}

export function normalizeEntry(value) {
  return typeof value === 'string'
    ? value.normalize('NFKC').replace(/[\u0000-\u001f\u007f]/g, ' ').replace(/\s+/g, ' ').trim()
    : '';
}

export function characterLength(value) {
  return Array.from(value).length;
}

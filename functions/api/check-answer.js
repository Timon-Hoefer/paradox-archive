import {
  cleanAnswer,
  clientIp,
  completionContent,
  constantTimeEqual,
  consumeRateLimit,
  createSessionId,
  getSessionId,
  json,
  keyedHash,
  methodNotAllowed,
  readJsonBody,
  sameOrigin,
  sessionCookie,
  sessionHash
} from '../_lib/shared.js';

const WINDOW_SECONDS = 10 * 60;
const MAX_ATTEMPTS = 12;
const SESSION_LIFETIME_MS = 100 * 24 * 60 * 60 * 1000;

async function post(context) {
  const { request, env } = context;
  if (!sameOrigin(request)) return json({ error: 'forbidden' }, 403);
  if (!env.DB || !env.FINAL_ANSWER || !env.SESSION_SIGNING_KEY) {
    return json({ error: 'server_not_configured' }, 503);
  }

  const body = await readJsonBody(request);
  if (body.response) return body.response;
  const payload = body.value;

  const supplied = cleanAnswer(payload?.answer);
  if (!supplied || supplied.length > 64) return json({ error: 'invalid_answer' }, 400);

  let sessionId = getSessionId(request);
  const createdSession = !sessionId;
  if (!sessionId) sessionId = createSessionId();

  const now = Date.now();
  const nowSeconds = Math.floor(now / 1000);
  const ipKey = await keyedHash(env.SESSION_SIGNING_KEY, `rate:${clientIp(request)}`);
  const attempt = await consumeRateLimit(env.DB, ipKey, nowSeconds, WINDOW_SECONDS, MAX_ATTEMPTS);
  const cookieHeaders = createdSession ? { 'Set-Cookie': sessionCookie(sessionId, request) } : {};

  if (!attempt.allowed) {
    return json(
      { error: 'rate_limited', retryAfter: attempt.retryAfter },
      429,
      { ...cookieHeaders, 'Retry-After': String(attempt.retryAfter) }
    );
  }

  const expected = cleanAnswer(env.FINAL_ANSWER);
  if (!constantTimeEqual(supplied, expected)) {
    return json({ correct: false }, 200, cookieHeaders);
  }

  const hash = await sessionHash(env.SESSION_SIGNING_KEY, sessionId);
  await env.DB
    .prepare(`INSERT INTO solved_sessions (session_hash, solved_at, joined, expires_at)
              VALUES (?, ?, 0, ?)
              ON CONFLICT(session_hash) DO UPDATE SET
                solved_at = excluded.solved_at,
                expires_at = excluded.expires_at`)
    .bind(hash, now, now + SESSION_LIFETIME_MS)
    .run();

  return json(
    { correct: true, reveal: completionContent(expected) },
    200,
    { 'Set-Cookie': sessionCookie(sessionId, request) }
  );
}

export async function onRequest(context) {
  if (context.request.method !== 'POST') return methodNotAllowed(['POST']);
  return post(context);
}

import {
  bodyIsSmallEnough,
  cleanAnswer,
  clientIp,
  completionContent,
  constantTimeEqual,
  createSessionId,
  getSessionId,
  json,
  keyedHash,
  sameOrigin,
  sessionCookie,
  sessionHash
} from '../_lib/shared.js';

const WINDOW_SECONDS = 10 * 60;
const MAX_ATTEMPTS = 12;
const SESSION_LIFETIME_MS = 7 * 24 * 60 * 60 * 1000;

async function consumeAttempt(database, rateKey, nowSeconds) {
  const current = await database
    .prepare('SELECT window_started, attempts FROM rate_limits WHERE rate_key = ?')
    .bind(rateKey)
    .first();

  if (!current || nowSeconds - Number(current.window_started) >= WINDOW_SECONDS) {
    await database
      .prepare(`INSERT INTO rate_limits (rate_key, window_started, attempts)
                VALUES (?, ?, 1)
                ON CONFLICT(rate_key) DO UPDATE SET window_started = excluded.window_started, attempts = 1`)
      .bind(rateKey, nowSeconds)
      .run();
    return { allowed: true, retryAfter: 0 };
  }

  if (Number(current.attempts) >= MAX_ATTEMPTS) {
    return {
      allowed: false,
      retryAfter: Math.max(1, WINDOW_SECONDS - (nowSeconds - Number(current.window_started)))
    };
  }

  await database
    .prepare('UPDATE rate_limits SET attempts = attempts + 1 WHERE rate_key = ?')
    .bind(rateKey)
    .run();
  return { allowed: true, retryAfter: 0 };
}

export async function onRequestPost(context) {
  const { request, env } = context;
  if (!sameOrigin(request)) return json({ error: 'forbidden' }, 403);
  if (!bodyIsSmallEnough(request)) return json({ error: 'request_too_large' }, 413);
  if (!env.DB || !env.FINAL_ANSWER || !env.SESSION_SIGNING_KEY) {
    return json({ error: 'server_not_configured' }, 503);
  }

  let payload;
  try {
    payload = await request.json();
  } catch {
    return json({ error: 'invalid_json' }, 400);
  }

  const supplied = cleanAnswer(payload?.answer);
  if (!supplied || supplied.length > 64) return json({ error: 'invalid_answer' }, 400);

  let sessionId = getSessionId(request);
  const createdSession = !sessionId;
  if (!sessionId) sessionId = createSessionId();

  const now = Date.now();
  const nowSeconds = Math.floor(now / 1000);
  const ipKey = await keyedHash(env.SESSION_SIGNING_KEY, `rate:${clientIp(request)}`);
  const attempt = await consumeAttempt(env.DB, ipKey, nowSeconds);
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

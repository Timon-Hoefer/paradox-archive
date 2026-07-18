import {
  characterLength,
  clientIp,
  completionContent,
  consumeRateLimit,
  getSessionId,
  json,
  keyedHash,
  methodNotAllowed,
  normalizeEntry,
  readJsonBody,
  sameOrigin,
  sessionHash
} from '../_lib/shared.js';

const HALL_WINDOW_SECONDS = 60 * 60;
const MAX_HALL_ENTRIES_PER_IP = 5;
const HALL_LIMIT = 100;
const HALL_RETENTION_MS = 100 * 24 * 60 * 60 * 1000;

async function pruneEntries(database, now = Date.now()) {
  await database.batch([
    database.prepare('DELETE FROM hall_entries WHERE created_at < ?').bind(now - HALL_RETENTION_MS),
    database.prepare(`DELETE FROM hall_entries
                      WHERE id NOT IN (
                        SELECT id FROM hall_entries
                        ORDER BY created_at DESC, id DESC
                        LIMIT ${HALL_LIMIT}
                      )`)
  ]);
}

async function readEntries(database) {
  const result = await database
    .prepare(`SELECT name, comment, created_at
              FROM hall_entries
              ORDER BY created_at DESC, id DESC
              LIMIT ${HALL_LIMIT}`)
    .all();
  return (result.results || []).map((entry) => ({
    name: entry.name,
    comment: entry.comment,
    at: new Date(Number(entry.created_at)).toISOString()
  }));
}

async function sessionState(env, request) {
  const sessionId = getSessionId(request);
  if (!sessionId || !env.SESSION_SIGNING_KEY) return { solved: false, joined: false };
  const hash = await sessionHash(env.SESSION_SIGNING_KEY, sessionId);
  const row = await env.DB
    .prepare('SELECT joined, expires_at FROM solved_sessions WHERE session_hash = ?')
    .bind(hash)
    .first();
  const solved = Boolean(row && Number(row.expires_at) > Date.now());
  return { solved, joined: solved && Boolean(row.joined), hash };
}

async function readOwnEntry(database, hash) {
  if (!hash) return null;
  const entry = await database
    .prepare('SELECT name, comment, created_at FROM hall_entries WHERE session_hash = ?')
    .bind(hash)
    .first();
  return entry ? { name: entry.name, comment: entry.comment, at: new Date(Number(entry.created_at)).toISOString() } : null;
}

function validateEntry(payload) {
  const name = normalizeEntry(payload?.name);
  const comment = normalizeEntry(payload?.comment);
  if (characterLength(name) < 1 || characterLength(name) > 30) {
    return { response: json({ error: 'invalid_name' }, 400) };
  }
  if (characterLength(comment) < 1 || characterLength(comment) > 100) {
    return { response: json({ error: 'invalid_comment' }, 400) };
  }
  return { name, comment };
}

async function payload(database, state) {
  const [entries, ownEntry] = await Promise.all([readEntries(database), readOwnEntry(database, state.hash)]);
  return {
    entries,
    ownEntry,
    solved: state.solved,
    joined: Boolean(ownEntry),
    canJoin: state.solved && !ownEntry
  };
}

async function get(context) {
  const { request, env } = context;
  if (!env.DB || !env.SESSION_SIGNING_KEY) return json({ error: 'server_not_configured' }, 503);
  await pruneEntries(env.DB);
  const state = await sessionState(env, request);
  const answer = state.solved && env.FINAL_ANSWER ? String(env.FINAL_ANSWER).normalize('NFKC').trim() : null;
  return json({ ...(await payload(env.DB, state)), reveal: answer ? completionContent(answer) : null });
}

async function post(context) {
  const { request, env } = context;
  if (!sameOrigin(request)) return json({ error: 'forbidden' }, 403);
  if (!env.DB || !env.SESSION_SIGNING_KEY) return json({ error: 'server_not_configured' }, 503);

  const state = await sessionState(env, request);
  if (!state.solved || !state.hash) return json({ error: 'solve_required' }, 403);
  await pruneEntries(env.DB);
  if (await readOwnEntry(env.DB, state.hash)) return json({ error: 'already_joined' }, 409);

  const body = await readJsonBody(request);
  if (body.response) return body.response;
  const submitted = body.value;

  const validated = validateEntry(submitted);
  if (validated.response) return validated.response;
  const { name, comment } = validated;

  const nowSeconds = Math.floor(Date.now() / 1000);
  const ipKey = await keyedHash(env.SESSION_SIGNING_KEY, `hall:${clientIp(request)}`);
  const limit = await consumeRateLimit(
    env.DB,
    ipKey,
    nowSeconds,
    HALL_WINDOW_SECONDS,
    MAX_HALL_ENTRIES_PER_IP
  );
  if (!limit.allowed) {
    return json(
      { error: 'rate_limited', retryAfter: limit.retryAfter },
      429,
      { 'Retry-After': String(limit.retryAfter) }
    );
  }

  const now = Date.now();
  let results;
  try {
    results = await env.DB.batch([
      env.DB
        .prepare(`INSERT INTO hall_entries (session_hash, name, comment, created_at)
                  SELECT ?, ?, ?, ?
                  WHERE EXISTS (
                    SELECT 1 FROM solved_sessions
                    WHERE session_hash = ? AND expires_at > ?
                  )`)
        .bind(state.hash, name, comment, now, state.hash, now),
      env.DB
        .prepare(`UPDATE solved_sessions
                  SET joined = 1
                  WHERE session_hash = ? AND expires_at > ?`)
        .bind(state.hash, now),
      env.DB.prepare('DELETE FROM hall_entries WHERE created_at < ?').bind(now - HALL_RETENTION_MS),
      env.DB.prepare(`DELETE FROM hall_entries
                      WHERE id NOT IN (
                        SELECT id FROM hall_entries
                        ORDER BY created_at DESC, id DESC
                        LIMIT ${HALL_LIMIT}
                      )`)
    ]);
  } catch (error) {
    if (String(error).toLowerCase().includes('unique')) return json({ error: 'already_joined' }, 409);
    throw error;
  }

  if (!Number(results?.[0]?.meta?.changes || 0)) return json({ error: 'already_joined' }, 409);
  return json(await payload(env.DB, { ...state, solved: true }));
}

async function patch(context) {
  const { request, env } = context;
  if (!sameOrigin(request)) return json({ error: 'forbidden' }, 403);
  if (!env.DB || !env.SESSION_SIGNING_KEY) return json({ error: 'server_not_configured' }, 503);
  const state = await sessionState(env, request);
  if (!state.solved || !state.hash) return json({ error: 'solve_required' }, 403);
  const body = await readJsonBody(request);
  if (body.response) return body.response;
  const validated = validateEntry(body.value);
  if (validated.response) return validated.response;
  const result = await env.DB
    .prepare('UPDATE hall_entries SET name = ?, comment = ? WHERE session_hash = ?')
    .bind(validated.name, validated.comment, state.hash)
    .run();
  if (!Number(result?.meta?.changes || 0)) return json({ error: 'entry_not_found' }, 404);
  return json(await payload(env.DB, state));
}

async function remove(context) {
  const { request, env } = context;
  if (!sameOrigin(request)) return json({ error: 'forbidden' }, 403);
  if (!env.DB || !env.SESSION_SIGNING_KEY) return json({ error: 'server_not_configured' }, 503);
  const state = await sessionState(env, request);
  if (!state.solved || !state.hash) return json({ error: 'solve_required' }, 403);
  await env.DB.batch([
    env.DB.prepare('DELETE FROM hall_entries WHERE session_hash = ?').bind(state.hash),
    env.DB.prepare('UPDATE solved_sessions SET joined = 0 WHERE session_hash = ?').bind(state.hash)
  ]);
  return json(await payload(env.DB, { ...state, joined: false }));
}

export async function onRequest(context) {
  if (context.request.method === 'GET') return get(context);
  if (context.request.method === 'POST') return post(context);
  if (context.request.method === 'PATCH') return patch(context);
  if (context.request.method === 'DELETE') return remove(context);
  return methodNotAllowed(['GET', 'POST', 'PATCH', 'DELETE']);
}

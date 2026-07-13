import {
  bodyIsSmallEnough,
  characterLength,
  completionContent,
  getSessionId,
  json,
  normalizeEntry,
  sameOrigin,
  sessionHash
} from '../_lib/shared.js';

async function readEntries(database) {
  const result = await database
    .prepare(`SELECT name, comment, created_at
              FROM hall_entries
              ORDER BY created_at DESC, id DESC
              LIMIT 50`)
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

export async function onRequestGet(context) {
  const { request, env } = context;
  if (!env.DB || !env.SESSION_SIGNING_KEY) return json({ error: 'server_not_configured' }, 503);
  const [entries, state] = await Promise.all([readEntries(env.DB), sessionState(env, request)]);
  const answer = state.solved && env.FINAL_ANSWER ? String(env.FINAL_ANSWER).normalize('NFKC').trim() : null;
  return json({
    entries,
    solved: state.solved,
    joined: state.joined,
    canJoin: state.solved && !state.joined,
    reveal: answer ? completionContent(answer) : null
  });
}

export async function onRequestPost(context) {
  const { request, env } = context;
  if (!sameOrigin(request)) return json({ error: 'forbidden' }, 403);
  if (!bodyIsSmallEnough(request)) return json({ error: 'request_too_large' }, 413);
  if (!env.DB || !env.SESSION_SIGNING_KEY) return json({ error: 'server_not_configured' }, 503);

  const state = await sessionState(env, request);
  if (!state.solved || !state.hash) return json({ error: 'solve_required' }, 403);
  if (state.joined) return json({ error: 'already_joined' }, 409);

  let payload;
  try {
    payload = await request.json();
  } catch {
    return json({ error: 'invalid_json' }, 400);
  }

  const name = normalizeEntry(payload?.name);
  const comment = normalizeEntry(payload?.comment);
  if (characterLength(name) < 1 || characterLength(name) > 30) {
    return json({ error: 'invalid_name' }, 400);
  }
  if (characterLength(comment) < 1 || characterLength(comment) > 100) {
    return json({ error: 'invalid_comment' }, 400);
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
                    WHERE session_hash = ? AND joined = 0 AND expires_at > ?
                  )`)
        .bind(state.hash, name, comment, now, state.hash, now),
      env.DB
        .prepare(`UPDATE solved_sessions
                  SET joined = 1
                  WHERE session_hash = ? AND joined = 0 AND expires_at > ?`)
        .bind(state.hash, now),
      env.DB
        .prepare(`DELETE FROM hall_entries
                  WHERE id NOT IN (
                    SELECT id FROM hall_entries
                    ORDER BY created_at DESC, id DESC
                    LIMIT 50
                  )`)
    ]);
  } catch (error) {
    if (String(error).toLowerCase().includes('unique')) return json({ error: 'already_joined' }, 409);
    throw error;
  }

  if (!Number(results?.[0]?.meta?.changes || 0)) return json({ error: 'already_joined' }, 409);
  return json({ entries: await readEntries(env.DB), solved: true, joined: true, canJoin: false });
}

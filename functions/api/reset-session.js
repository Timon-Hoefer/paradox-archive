import { clearSessionCookie, getSessionId, json, methodNotAllowed, sameOrigin, sessionHash } from '../_lib/shared.js';

export async function onRequest({ request, env }) {
  if (request.method !== 'POST') return methodNotAllowed(['POST']);
  if (!sameOrigin(request)) return json({ error: 'forbidden' }, 403);
  const sessionId = getSessionId(request);
  if (sessionId && env?.DB && env?.SESSION_SIGNING_KEY) {
    const hash = await sessionHash(env.SESSION_SIGNING_KEY, sessionId);
    await env.DB.batch([
      env.DB.prepare('DELETE FROM hall_entries WHERE session_hash = ?').bind(hash),
      env.DB.prepare('DELETE FROM solved_sessions WHERE session_hash = ?').bind(hash)
    ]);
  }
  return json({ reset: true }, 200, { 'Set-Cookie': clearSessionCookie(request) });
}

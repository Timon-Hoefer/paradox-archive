import { clearSessionCookie, json, sameOrigin } from '../_lib/shared.js';

export async function onRequestPost({ request }) {
  if (!sameOrigin(request)) return json({ error: 'forbidden' }, 403);
  return json({ reset: true }, 200, { 'Set-Cookie': clearSessionCookie(request) });
}

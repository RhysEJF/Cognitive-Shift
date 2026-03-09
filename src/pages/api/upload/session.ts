export const prerender = false;

import type { APIRoute } from 'astro';
import { SESSION_COOKIE, parseCookie, getSession } from '../../../lib/upload-auth';

export const GET: APIRoute = async ({ request, locals }) => {
  const { env } = locals.runtime;
  const kv = env.SESSION;

  const sessionId = parseCookie(request.headers.get('Cookie'), SESSION_COOKIE);
  if (!sessionId) {
    return Response.json({ authenticated: false });
  }

  const session = await getSession(kv, sessionId);
  if (!session) {
    return Response.json({ authenticated: false });
  }

  return Response.json({
    authenticated: true,
    user: {
      login: session.login,
      avatar_url: session.avatar_url,
    },
  });
};

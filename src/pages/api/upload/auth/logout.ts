export const prerender = false;

import type { APIRoute } from 'astro';
import {
  SESSION_COOKIE,
  parseCookie,
  deleteSession,
  clearSessionCookieHeader,
} from '../../../../lib/upload-auth';

export const POST: APIRoute = async ({ request, locals }) => {
  const { env } = locals.runtime;
  const kv = env.SESSION;

  const sessionId = parseCookie(request.headers.get('Cookie'), SESSION_COOKIE);
  if (sessionId) {
    await deleteSession(kv, sessionId);
  }

  return new Response(null, {
    status: 302,
    headers: {
      Location: '/contribute/vault',
      'Set-Cookie': clearSessionCookieHeader(),
    },
  });
};

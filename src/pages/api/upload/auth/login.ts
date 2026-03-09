export const prerender = false;

import type { APIRoute } from 'astro';
import { generateSessionId, storeOAuthState } from '../../../../lib/upload-auth';

const GITHUB_AUTHORIZE_URL = 'https://github.com/login/oauth/authorize';
const CLIENT_ID = 'Iv23licwel1bsB6zyGvd';

export const GET: APIRoute = async ({ request, locals }) => {
  const { env } = locals.runtime;
  const kv = env.SESSION;

  const origin = new URL(request.url).origin;
  const callbackUrl = `${origin}/api/upload/auth/callback`;

  const state = generateSessionId();
  await storeOAuthState(kv, state);

  const params = new URLSearchParams({
    client_id: CLIENT_ID,
    redirect_uri: callbackUrl,
    scope: 'read:user',
    state,
  });

  return new Response(null, {
    status: 302,
    headers: {
      Location: `${GITHUB_AUTHORIZE_URL}?${params}`,
    },
  });
};

export const prerender = false;

import type { APIRoute } from 'astro';
import {
  validateOAuthState,
  generateSessionId,
  createSession,
  isUserAllowed,
  sessionCookieHeader,
} from '../../../../lib/upload-auth';

const CLIENT_ID = 'Iv23licwel1bsB6zyGvd';

export const GET: APIRoute = async ({ request, locals }) => {
  const { env } = locals.runtime;
  const kv = env.SESSION;

  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');

  if (!code || !state) {
    return new Response('Missing code or state parameter', { status: 400 });
  }

  // Validate OAuth state
  const validState = await validateOAuthState(kv, state);
  if (!validState) {
    return new Response('Invalid or expired state parameter', { status: 400 });
  }

  // Exchange code for access token
  const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      client_id: CLIENT_ID,
      client_secret: env.KEYSTATIC_GITHUB_CLIENT_SECRET,
      code,
    }),
  });

  if (!tokenRes.ok) {
    return new Response('Failed to exchange code for token', { status: 502 });
  }

  const tokenData = (await tokenRes.json()) as {
    access_token?: string;
    error?: string;
  };
  if (!tokenData.access_token) {
    return new Response(`OAuth error: ${tokenData.error || 'unknown'}`, {
      status: 400,
    });
  }

  // Fetch user profile (we only need login, avatar_url, id)
  const userRes = await fetch('https://api.github.com/user', {
    headers: {
      Authorization: `Bearer ${tokenData.access_token}`,
      Accept: 'application/vnd.github+json',
      'User-Agent': 'cognitive-shift-upload',
    },
  });

  if (!userRes.ok) {
    return new Response('Failed to fetch user profile', { status: 502 });
  }

  const userData = (await userRes.json()) as {
    login: string;
    avatar_url: string;
    id: number;
  };

  // Check allowlist
  if (!isUserAllowed(userData.login, env)) {
    return new Response('You are not authorized to upload files.', {
      status: 403,
    });
  }

  // Create session — discard GitHub token (not stored)
  const sessionId = generateSessionId();
  await createSession(kv, sessionId, {
    login: userData.login,
    avatar_url: userData.avatar_url,
    github_id: userData.id,
    created_at: Date.now(),
  });

  return new Response(null, {
    status: 302,
    headers: {
      Location: '/contribute/vault',
      'Set-Cookie': sessionCookieHeader(sessionId),
    },
  });
};

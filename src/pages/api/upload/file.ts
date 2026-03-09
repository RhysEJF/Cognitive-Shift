export const prerender = false;

import type { APIRoute } from 'astro';
import {
  SESSION_COOKIE,
  parseCookie,
  getSession,
  checkRateLimit,
} from '../../../lib/upload-auth';

const ALLOWED_TYPES = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
]);

const ALLOWED_CATEGORIES = new Set([
  'articles',
  'authors',
  'publications',
  'general',
]);

const MAX_SIZE = 10 * 1024 * 1024; // 10 MB

const CDN_BASE = 'https://assets.thecognitiveshift.com';

function sanitizeFilename(raw: string): string {
  // Strip directory components, keep only the filename
  const basename = raw.split(/[/\\]/).pop() || 'upload';
  // Lowercase, replace non-alphanumeric (except dots and hyphens) with hyphens
  const clean = basename
    .toLowerCase()
    .replace(/[^a-z0-9.\-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
  // Prepend timestamp for uniqueness
  const ts = Date.now();
  return `${ts}-${clean || 'file'}`;
}

export const POST: APIRoute = async ({ request, locals }) => {
  const { env } = locals.runtime;
  const kv = env.SESSION;
  const bucket = env.ASSETS_BUCKET;

  // CSRF: validate Origin
  const origin = request.headers.get('Origin');
  if (origin && !origin.endsWith('thecognitiveshift.com')) {
    return Response.json({ error: 'Forbidden' }, { status: 403 });
  }

  // Authenticate
  const sessionId = parseCookie(request.headers.get('Cookie'), SESSION_COOKIE);
  if (!sessionId) {
    return Response.json({ error: 'Not authenticated' }, { status: 401 });
  }

  const session = await getSession(kv, sessionId);
  if (!session) {
    return Response.json({ error: 'Session expired' }, { status: 401 });
  }

  // Rate limit
  const rateCheck = await checkRateLimit(kv, session.github_id);
  if (!rateCheck.allowed) {
    return Response.json(
      { error: 'Rate limit exceeded. Try again in a few minutes.' },
      { status: 429 },
    );
  }

  // Parse multipart form data
  const contentType = request.headers.get('Content-Type') || '';
  if (!contentType.includes('multipart/form-data')) {
    return Response.json(
      { error: 'Expected multipart/form-data' },
      { status: 400 },
    );
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return Response.json({ error: 'Invalid form data' }, { status: 400 });
  }

  const file = formData.get('file');
  const category = formData.get('category')?.toString() || 'general';

  if (!file || !(file instanceof File)) {
    return Response.json({ error: 'No file provided' }, { status: 400 });
  }

  // Validate category
  if (!ALLOWED_CATEGORIES.has(category)) {
    return Response.json(
      { error: `Invalid category. Allowed: ${[...ALLOWED_CATEGORIES].join(', ')}` },
      { status: 400 },
    );
  }

  // Validate size
  if (file.size > MAX_SIZE) {
    return Response.json(
      { error: 'File too large. Maximum size is 10 MB.' },
      { status: 413 },
    );
  }

  // Validate MIME type
  if (!ALLOWED_TYPES.has(file.type)) {
    return Response.json(
      { error: `File type not allowed. Accepted: JPEG, PNG, WebP, GIF.` },
      { status: 400 },
    );
  }

  // Build R2 key
  const filename = sanitizeFilename(file.name);
  const key = `${category}/${filename}`;

  // Upload to R2
  const arrayBuffer = await file.arrayBuffer();
  await bucket.put(key, arrayBuffer, {
    httpMetadata: { contentType: file.type },
    customMetadata: {
      uploadedBy: session.login,
      originalName: file.name,
    },
  });

  return Response.json({
    url: `${CDN_BASE}/${key}`,
    key,
    remaining: rateCheck.remaining,
  });
};

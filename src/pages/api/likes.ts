import type { APIRoute } from 'astro';
import PocketBase from 'pocketbase';

const pb = new PocketBase('https://pocketbase-production-3085.up.railway.app');

// Rate limiting map: IP -> { count, resetTime }
const rateLimitMap = new Map();
const RATE_LIMIT = 5; // 5 likes per hour per IP
const RATE_WINDOW = 60 * 60 * 1000; // 1 hour in milliseconds

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_WINDOW });
    return false;
  }

  if (now > record.resetTime) {
    // Reset the rate limit window
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_WINDOW });
    return false;
  }

  if (record.count >= RATE_LIMIT) {
    return true;
  }

  record.count++;
  return false;
}

function getClientIP(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  return request.headers.get('x-real-ip') || 'unknown';
}

export const GET: APIRoute = async ({ request }) => {
  try {
    const url = new URL(request.url);
    const articleSlug = url.searchParams.get('articleSlug');

    if (!articleSlug) {
      return new Response(
        JSON.stringify({ error: 'Article slug is required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Count total likes for this article
    try {
      const records = await pb.collection('article_likes').getFullList({
        filter: `article_slug="${articleSlug}"`
      });

      return new Response(
        JSON.stringify({
          likes: records.length,
          userHasLiked: false // Will be determined by frontend localStorage
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    } catch (error) {
      console.error('Error fetching likes:', error);
      return new Response(
        JSON.stringify({ likes: 0, userHasLiked: false }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }
  } catch (error) {
    console.error('Error fetching likes:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to fetch likes' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const clientIP = getClientIP(request);
    const userAgent = request.headers.get('user-agent') || 'unknown';
    const userFingerprint = `${clientIP}-${userAgent}`.substring(0, 100); // Hash for privacy

    const body = await request.json();
    const { articleSlug } = body;

    if (!articleSlug) {
      return new Response(
        JSON.stringify({ error: 'Article slug is required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Check if user already liked this article
    try {
      const existingLike = await pb.collection('article_likes').getFirstListItem(
        `article_slug="${articleSlug}" && user_fingerprint="${userFingerprint}"`
      );

      if (existingLike) {
        return new Response(
          JSON.stringify({ error: 'Already liked this article' }),
          { status: 409, headers: { 'Content-Type': 'application/json' } }
        );
      }
    } catch (error) {
      // No existing like found, continue
    }

    // Check daily rate limit (10 likes per day)
    const today = new Date().toISOString().split('T')[0];
    try {
      const todayLikes = await pb.collection('article_likes').getFullList({
        filter: `user_fingerprint="${userFingerprint}" && liked_at>="${today} 00:00:00"`
      });

      if (todayLikes.length >= 10) {
        return new Response(
          JSON.stringify({ error: 'Daily like limit reached (10 per day)' }),
          { status: 429, headers: { 'Content-Type': 'application/json' } }
        );
      }
    } catch (error) {
      // Continue if error checking daily limits
    }

    // Create new like
    try {
      await pb.collection('article_likes').create({
        article_slug: articleSlug,
        user_fingerprint: userFingerprint,
        liked_at: new Date().toISOString()
      });

      // Get updated total count
      const allLikes = await pb.collection('article_likes').getFullList({
        filter: `article_slug="${articleSlug}"`
      });

      return new Response(
        JSON.stringify({
          likes: allLikes.length,
          success: true
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    } catch (error) {
      console.error('Error creating like:', error);
      return new Response(
        JSON.stringify({ error: 'Failed to create like' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }
  } catch (error) {
    console.error('Error processing like:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to process like' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
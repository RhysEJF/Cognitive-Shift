import type { APIRoute } from 'astro';
import PocketBase from 'pocketbase';

const pb = new PocketBase('https://thecognitiveshift.pocketbase.io');

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
    const articleId = url.searchParams.get('articleId');

    if (!articleId) {
      return new Response(
        JSON.stringify({ error: 'Article ID is required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Try to get existing like count
    try {
      const record = await pb.collection('article_likes').getFirstListItem(
        `article_id="${articleId}"`
      );
      return new Response(
        JSON.stringify({ likes: record.like_count || 0 }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    } catch (error) {
      // Record doesn't exist, return 0
      return new Response(
        JSON.stringify({ likes: 0 }),
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

    // Check rate limit
    if (isRateLimited(clientIP)) {
      return new Response(
        JSON.stringify({ error: 'Rate limit exceeded. Please try again later.' }),
        { status: 429, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const body = await request.json();
    const { articleId } = body;

    if (!articleId) {
      return new Response(
        JSON.stringify({ error: 'Article ID is required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Try to get existing record
    let record;
    try {
      record = await pb.collection('article_likes').getFirstListItem(
        `article_id="${articleId}"`
      );

      // Update existing record
      const updatedRecord = await pb.collection('article_likes').update(record.id, {
        like_count: (record.like_count || 0) + 1
      });

      return new Response(
        JSON.stringify({ likes: updatedRecord.like_count }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    } catch (error) {
      // Record doesn't exist, create new one
      try {
        const newRecord = await pb.collection('article_likes').create({
          article_id: articleId,
          like_count: 1
        });

        return new Response(
          JSON.stringify({ likes: newRecord.like_count }),
          { status: 200, headers: { 'Content-Type': 'application/json' } }
        );
      } catch (createError) {
        console.error('Error creating like record:', createError);
        return new Response(
          JSON.stringify({ error: 'Failed to create like record' }),
          { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
      }
    }
  } catch (error) {
    console.error('Error processing like:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to process like' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
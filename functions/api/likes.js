import PocketBase from 'pocketbase';

const pb = new PocketBase('https://pocketbase-production-3085.up.railway.app');

function getClientIP(request) {
  const forwarded = request.headers.get('cf-connecting-ip') ||
                   request.headers.get('x-forwarded-for') ||
                   request.headers.get('x-real-ip') ||
                   'unknown';
  return forwarded.split(',')[0].trim();
}

export async function onRequest(context) {
  const { request } = context;

  // CORS headers
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json'
  };

  // Handle CORS preflight
  if (request.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (request.method === 'GET') {
      // Get like count for article
      const url = new URL(request.url);
      const articleSlug = url.searchParams.get('articleSlug');

      if (!articleSlug) {
        return new Response(
          JSON.stringify({ error: 'Article slug is required' }),
          { status: 400, headers: corsHeaders }
        );
      }

      const records = await pb.collection('article_likes').getFullList({
        filter: `article_slug="${articleSlug}"`
      });

      return new Response(
        JSON.stringify({
          likes: records.length,
          userHasLiked: false
        }),
        { headers: corsHeaders }
      );

    } else if (request.method === 'POST') {
      // Add a like
      const clientIP = getClientIP(request);
      const userAgent = request.headers.get('user-agent') || 'unknown';
      const userFingerprint = `${clientIP}-${userAgent.substring(0, 50)}`;

      const body = await request.json();
      const { articleSlug } = body;

      if (!articleSlug) {
        return new Response(
          JSON.stringify({ error: 'Article slug is required' }),
          { status: 400, headers: corsHeaders }
        );
      }

      // Check if already liked
      try {
        const existingLike = await pb.collection('article_likes').getFirstListItem(
          `article_slug="${articleSlug}" && user_fingerprint="${userFingerprint}"`
        );

        if (existingLike) {
          return new Response(
            JSON.stringify({ error: 'Already liked this article' }),
            { status: 409, headers: corsHeaders }
          );
        }
      } catch (error) {
        // No existing like found, continue
      }

      // Check daily rate limit
      const today = new Date().toISOString().split('T')[0];
      try {
        const todayLikes = await pb.collection('article_likes').getFullList({
          filter: `user_fingerprint="${userFingerprint}" && liked_at>="${today} 00:00:00"`
        });

        if (todayLikes.length >= 10) {
          return new Response(
            JSON.stringify({ error: 'Daily like limit reached (10 per day)' }),
            { status: 429, headers: corsHeaders }
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

        // Get updated count
        const allLikes = await pb.collection('article_likes').getFullList({
          filter: `article_slug="${articleSlug}"`
        });

        return new Response(
          JSON.stringify({
            likes: allLikes.length,
            success: true
          }),
          { headers: corsHeaders }
        );
      } catch (error) {
        console.error('Error creating like:', error);
        return new Response(
          JSON.stringify({ error: 'Failed to create like' }),
          { status: 500, headers: corsHeaders }
        );
      }
    }

  } catch (error) {
    console.error('API Error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: corsHeaders }
    );
  }

  return new Response(
    JSON.stringify({ error: 'Method not allowed' }),
    { status: 405, headers: corsHeaders }
  );
}
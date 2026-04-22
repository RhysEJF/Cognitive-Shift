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

  if (request.method === 'GET') {
    return new Response(
      JSON.stringify({
        status: 'success',
        message: 'Cloudflare Pages Function is working!',
        timestamp: new Date().toISOString()
      }),
      { headers: corsHeaders }
    );
  }

  if (request.method === 'POST') {
    try {
      const body = await request.json();
      return new Response(
        JSON.stringify({
          status: 'success',
          message: 'POST request received',
          received: body,
          timestamp: new Date().toISOString()
        }),
        { headers: corsHeaders }
      );
    } catch (error) {
      return new Response(
        JSON.stringify({
          status: 'error',
          message: 'Invalid JSON'
        }),
        { status: 400, headers: corsHeaders }
      );
    }
  }

  return new Response(
    JSON.stringify({ error: 'Method not allowed' }),
    { status: 405, headers: corsHeaders }
  );
}
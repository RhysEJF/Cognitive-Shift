export async function onRequest(context) {
  console.log('Function called!', context.request.method);

  return new Response(
    JSON.stringify({
      message: 'Hello World!',
      method: context.request.method,
      url: context.request.url
    }),
    {
      headers: { 'Content-Type': 'application/json' },
      status: 200
    }
  );
}
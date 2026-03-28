export async function onRequest(context) {
  const client_id = context.env.GITHUB_CLIENT_ID;
  const url = new URL(context.request.url);
  const provider = url.searchParams.get('provider');

  if (provider !== 'github') {
    return new Response('Unsupported provider', { status: 400 });
  }

  // Redirect to GitHub for login
  const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${client_id}&scope=repo,user`;
  return Response.redirect(githubAuthUrl, 302);
}

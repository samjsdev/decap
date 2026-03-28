export async function onRequest(context) {
  const client_id = context.env.GITHUB_CLIENT_ID;
  const client_secret = context.env.GITHUB_CLIENT_SECRET;
  const url = new URL(context.request.url);
  const code = url.searchParams.get('code');

  // Exchange the code for an access token
  const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ client_id, client_secret, code }),
  });

  const tokenData = await tokenResponse.json();
  const token = tokenData.access_token;
  
  if (!token) {
    return new Response('Error: No access token received. Ensure your GitHub Client ID and Secret are correct.', { status: 400 });
  }

  // Send the token back to the Decap CMS window
  const script = `
    <script>
      const receiveMessage = (message) => {
        if (message.origin !== "${url.origin}") return;
        window.opener.postMessage(
          'authorization:github:success:{"token":"${token}","provider":"github"}',
          message.origin
        );
        window.removeEventListener("message", receiveMessage, false);
      };
      window.addEventListener("message", receiveMessage, false);
      window.opener.postMessage("authorizing:github", "*");
    </script>
  `;

  return new Response(script, {
    headers: { 'Content-Type': 'text/html;charset=UTF-8' },
  });
}

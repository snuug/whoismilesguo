const projectId = '63f2718577a2ba21aed9'
const appwriteEndpoint = 'https://back.standwithfreedom.org/v1'
const provider = 'discord'

async function createOAuth2Session() {
  const response = await fetch(`${appwriteEndpoint}/account/sessions/oauth2/${provider}`, {
    method: 'GET',
    headers: {
      'Host': 'back.standwithfreedom.org',
      'Content-Type': 'application/json',
      'X-Appwrite-Response-Format': '1.0.0',
      'X-Appwrite-Project': projectId,
    },
  });
  return response.url;
}

export default defineEventHandler(async (event) => {
  if (event.node.req.url.startsWith('/api/oauth2')) {
    const url = await createOAuth2Session();
    event.node.res.writeHead(302, { Location: url });
    event.node.res.end();
  }
});

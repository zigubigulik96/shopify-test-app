export async function onRequestGet({ request, env }) {
  const url = new URL(request.url);
  const shop = url.searchParams.get("shop");

  if (!shop) {
    return new Response("Missing ?shop=your-store.myshopify.com", { status: 400 });
  }

  const scopes = url.searchParams.get("scopes");
  if (!scopes) {
    return new Response("Missing ?scopes=read_orders,write_orders", { status: 400 });
  }

  const redirectUri = encodeURIComponent(`${url.origin}/auth/callback`);
  const installUrl =
    `https://${shop}/admin/oauth/authorize` +
    `?client_id=${encodeURIComponent(env.SHOPIFY_CLIENT_ID)}` +
    `&scope=${encodeURIComponent(scopes)}` +
    `&redirect_uri=${redirectUri}`;

  return Response.redirect(installUrl, 302);
}

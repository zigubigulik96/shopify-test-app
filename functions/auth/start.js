export async function onRequestGet({ request, env }) {
  const url = new URL(request.url);
  const shop = url.searchParams.get("shop");

  if (!shop) {
    return new Response("Missing ?shop=your-store.myshopify.com", { status: 400 });
  }

  // Minimal scopes for testing
  const scope = "read_all_orders,read_analytics,read_assigned_fulfillment_orders,write_assigned_fulfillment_orders,read_companies,write_companies,read_custom_fulfillment_services,write_custom_fulfillment_services,read_customers,write_customers,read_customer_payment_methods,read_customer_merge,write_customer_merge,read_delivery_customizations,write_delivery_customizations,read_price_rules,write_price_rules,read_discounts,write_discounts,read_draft_orders,read_files,read_fulfillment_constraint_rules,write_fulfillment_constraint_rules,read_fulfillments,write_fulfillments,write_inventory,read_inventory,write_inventory_shipments,read_inventory_shipments,write_inventory_shipments_received_items,read_inventory_shipments_received_items,write_inventory_transfers,read_inventory_transfers,read_delivery_option_generators,write_delivery_option_generators,read_locales,write_locales,write_locations,read_locations,read_markets,write_markets,read_markets_home,write_markets_home,read_merchant_managed_fulfillment_orders,write_merchant_managed_fulfillment_orders,read_metaobject_definitions,write_metaobject_definitions,read_metaobjects,write_metaobjects,write_order_edits,read_order_edits,read_orders,write_orders,write_packing_slip_templates,read_packing_slip_templates,read_payment_terms,read_product_feeds,write_product_feeds,read_product_listings,write_product_listings,read_products,write_products,read_purchase_options,read_returns,write_returns,read_shipping,write_shipping,read_third_party_fulfillment_orders,write_third_party_fulfillment_orders,read_translations,customer_read_markets,customer_read_metaobjects,customer_read_orders";

  const redirectUri = encodeURIComponent(`${url.origin}/auth/callback`);
  const installUrl =
    `https://${shop}/admin/oauth/authorize` +
    `?client_id=${encodeURIComponent(env.SHOPIFY_CLIENT_ID)}` +
    `&scope=${encodeURIComponent(scope)}` +
    `&redirect_uri=${redirectUri}`;

  return Response.redirect(installUrl, 302);
}

import type { Database } from "@midday/supabase/types";
import { createServerClient } from "@supabase/ssr";
import TickerClient from "./TickerClient";

export const runtime = "nodejs";

export default async function TickerBlock() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_KEY;

  // If envs are missing at build/prerender time, render safe zeros instead of throwing
  if (!url || !key) {
    console.warn("[TickerBlock] Missing Supabase envs at build/runtime; rendering zeros.");
    return <TickerClient total={0} tx={0} biz={0} />;
  }

  const client = createServerClient<Database>(url, key, {
    cookies: { get(){return null;}, set(){return null;}, remove(){return null;} },
  });

  const currency = "USD";
  const [ { data: totalSum }, { count: businessCount }, { count: transactionCount } ] = await Promise.all([
    client.rpc("calculate_total_sum", { target_currency: currency }),
    client.from("teams").select("id", { count: "exact", head: true }).limit(1),
    client.from("transactions").select("id", { count: "exact", head: true }).limit(1),
  ]);

  return <TickerClient total={totalSum ?? 0} tx={transactionCount ?? 0} biz={businessCount ?? 0} />;
}

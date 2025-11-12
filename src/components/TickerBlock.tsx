import type { Database } from "@midday/supabase/types";
import { createServerClient } from "@supabase/ssr";
import TickerClient from "./TickerClient";

export default async function TickerBlock() {
  const client = createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_KEY!,
    {
      cookies: { get(){return null;}, set(){return null;}, remove(){return null;} },
    }
  );

  const currency = "USD";
  const [ { data: totalSum }, { count: businessCount }, { count: transactionCount } ] = await Promise.all([
    client.rpc("calculate_total_sum", { target_currency: currency }),
    client.from("teams").select("id", { count: "exact", head: true }).limit(1),
    client.from("transactions").select("id", { count: "exact", head: true }).limit(1),
  ]);

  return <TickerClient total={totalSum ?? 0} tx={transactionCount ?? 0} biz={businessCount ?? 0} />;
}

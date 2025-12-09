import type { Database } from "@midday/supabase/types";
import { createServerClient } from "@supabase/ssr";
import { getSupabaseServiceKey, getSupabaseUrl } from "@/lib/supabase/env";
import Link from "next/link";

const currency = "USD";

export async function Ticker() {
  const url = getSupabaseUrl();
  const key = getSupabaseServiceKey();

  // Gracefully handle missing envs at build/prerender time to avoid crashes
  if (!url || !key) {
    console.warn('[Ticker] Missing Supabase envs at build/runtime; rendering zeros.');
    return (
      <div className="text-center flex flex-col mt-[120px] md:mt-[280px] mb-[120px] md:mb-[250px] space-y-4 md:space-y-10">
        <span className="font-medium text-center text-[40px] md:text-[80px] lg:text-[100px] xl:text-[130px] 2xl:text-[160px] md:mb-2 text-stroke leading-none">
          {Intl.NumberFormat('en-US', {
            style: 'currency',
            currency,
            maximumFractionDigits: 0,
          }).format(0)}
        </span>
        <span className="text-[#878787]">
          Through our system{' '}
          <Link href="/open-startup" className="underline">
            {Intl.NumberFormat('en-US', {
              maximumFractionDigits: 0,
            }).format(0)}
          </Link>{' '}
          transactions across{' '}
          <Link href="/open-startup" className="underline">
            {Intl.NumberFormat('en-US', {
              maximumFractionDigits: 0,
            }).format(0)}
          </Link>{' '}
          businesses.
        </span>
      </div>
    );
  }

  const client = createServerClient<Database>(url, key, {
    cookies: {
      get() {
        return null;
      },
      set() {
        return null;
      },
      remove() {
        return null;
      },
    },
  });

  const [
    { data: totalSum },
    { count: businessCount },
    { count: transactionCount },
  ] = await Promise.all([
    client.rpc("calculate_total_sum", {
      target_currency: currency,
    }),
    client.from("teams").select("id", { count: "exact", head: true }).limit(1),
    client
      .from("transactions")
      .select("id", { count: "exact", head: true })
      .limit(1),
  ]);

  return (
    <div className="text-center flex flex-col mt-[120px] md:mt-[280px] mb-[120px] md:mb-[250px] space-y-4 md:space-y-10">
      <span className="font-medium text-center text-[40px] md:text-[80px] lg:text-[100px] xl:text-[130px] 2xl:text-[160px] md:mb-2 text-stroke leading-none">
        {Intl.NumberFormat("en-US", {
          style: "currency",
          currency: currency,
          maximumFractionDigits: 0,
        }).format(totalSum ?? 0)}
      </span>
      <span className="text-[#878787]">
        Through our system{" "}
        <Link href="/open-startup" className="underline">
          {Intl.NumberFormat("en-US", {
            maximumFractionDigits: 0,
          }).format(transactionCount ?? 0)}
        </Link>{" "}
        transactions across{" "}
        <Link href="/open-startup" className="underline">
          {Intl.NumberFormat("en-US", {
            maximumFractionDigits: 0,
          }).format(businessCount ?? 0)}
        </Link>{" "}
        businesses.
      </span>
    </div>
  );
}

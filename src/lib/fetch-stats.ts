"use server";

import type { Database } from "@midday/supabase/types";
import { createServerClient } from "@supabase/ssr";

export async function fetchStats() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_KEY;

  const zeroStats = {
    users: 0,
    transactions: 0,
    bankAccounts: 0,
    trackerEntries: 0,
    inboxItems: 0,
    bankConnections: 0,
    trackerProjects: 0,
    reports: 0,
    vaultObjects: 0,
    transactionEnrichments: 0,
    invoices: 0,
    invoiceCustomers: 0,
  };

  if (!url || !key) {
    console.warn("[fetchStats] Missing Supabase envs at build/runtime; returning zeros.");
    return zeroStats;
  }

  const supabase = createServerClient<Database>(url, key, {
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

  const supabaseStorage = createServerClient<Database>(url, key, {
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
    db: { schema: "storage" },
  });

  const [
    { count: users },
    { count: transactions },
    { count: bankAccounts },
    { count: trackerEntries },
    { count: inboxItems },
    { count: bankConnections },
    { count: trackerProjects },
    { count: reports },
    { count: vaultObjects },
    { count: transactionEnrichments },
    { count: invoices },
    { count: invoiceCustomers },
  ] = await Promise.all([
    supabase
      .from("teams")
      .select("id", { count: "exact", head: true })
      .limit(1),
    supabase
      .from("transactions")
      .select("id", { count: "exact", head: true })
      .limit(1),
    supabase
      .from("bank_accounts")
      .select("id", { count: "exact", head: true })
      .limit(1),
    supabase
      .from("tracker_entries")
      .select("id", { count: "exact", head: true })
      .limit(1),
    supabase
      .from("inbox")
      .select("id", { count: "exact", head: true })
      .limit(1),
    supabase
      .from("bank_connections")
      .select("id", { count: "exact", head: true })
      .limit(1),
    supabase
      .from("tracker_projects")
      .select("id", { count: "exact", head: true })
      .limit(1),
    supabase
      .from("reports")
      .select("id", { count: "exact", head: true })
      .limit(1),
    supabaseStorage
      .from("objects")
      .select("id", { count: "exact", head: true })
      .limit(1),
    supabase
      .from("transaction_enrichments")
      .select("id", { count: "exact", head: true })
      .limit(1),
    supabase
      .from("invoices")
      .select("id", { count: "exact", head: true })
      .limit(1),
    supabase
      .from("customers")
      .select("id", { count: "exact", head: true })
      .limit(1),
  ]);

  return {
    users: users ?? 0,
    transactions: transactions ?? 0,
    bankAccounts: bankAccounts ?? 0,
    trackerEntries: trackerEntries ?? 0,
    inboxItems: inboxItems ?? 0,
    bankConnections: bankConnections ?? 0,
    trackerProjects: trackerProjects ?? 0,
    reports: reports ?? 0,
    vaultObjects: vaultObjects ?? 0,
    transactionEnrichments: transactionEnrichments ?? 0,
    invoices: invoices ?? 0,
    invoiceCustomers: invoiceCustomers ?? 0,
  };
}

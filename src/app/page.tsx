"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const pools = [
  {
    name: "Household groceries",
    members: ["You", "Sam", "Naomi"],
    balance: "+$84.20",
    tone: "Settled this week · calm",
  },
  {
    name: "Weekend cabin trip",
    members: ["You", "Mia", "Ravi", "Taylor"],
    balance: "-$132.40",
    tone: "Two people still to settle",
  },
  {
    name: "Team offsite fund",
    members: ["You", "Product team"],
    balance: "+$2,410.00",
    tone: "Auto-contributions every Friday",
  },
];

export default function HomePage() {
  return (
    <main className="relative min-h-screen bg-paper text-ink">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:items-start mt-6">
        <section className="space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
            className="rounded-soft border border-stone bg-paper/80 shadow-soft p-6 sm:p-8"
          >
            <p className="text-xs tracking-[0.26em] uppercase text-mist mb-4">
              Shared payments · Wabi-sabi
            </p>
            <h1 className="font-poppins text-3xl sm:text-4xl lg:text-5xl leading-tight mb-4">
              The quiet way to
              <span className="block sm:inline sm:ml-2">split what matters.</span>
            </h1>
            <p className="font-lora text-sm sm:text-base text-text-soft max-w-xl mb-6">
              Split helps friends, families, and collaborators pool money without the mess of spreadsheets or group chats. Calm
              surfaces, clear balances, and contributions that feel fair.
            </p>
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-6">
              <Link
                href="/#get-started"
                className="px-5 py-2 rounded-full border border-ink bg-ink text-paper text-sm tracking-wide hover:bg-transparent hover:text-ink transition-colors"
              >
                Start a shared pool
              </Link>
              <Link
                href="/#funding"
                className="px-4 py-2 rounded-full border border-stone text-sm text-text-soft hover:border-ink/60 transition-colors"
              >
                See how funding works
              </Link>
            </div>
            <p className="text-xs text-text-soft">No feeds, no badges, no social noise. Just simple shared balances.</p>
          </motion.div>

          <div className="rounded-soft border border-stone bg-stone/60 shadow-soft p-5 sm:p-6 max-w-md">
            <h2 className="font-poppins text-xs tracking-[0.22em] uppercase text-mist mb-2">
              Designed with Wabi-sabi
            </h2>
            <p className="font-lora text-sm text-text-soft mb-3">
              Imperfect edges, gentle asymmetry, and just enough interface to stay out of your way. Split is built to feel more like
              passing a notebook around than managing a ledger.
            </p>
            <ul className="font-lora text-xs text-text-soft space-y-1.5 list-disc pl-4">
              <li>No gradients or neon surfaces.</li>
              <li>Soft cards instead of hard rectangles.</li>
              <li>Balances that update quietly in real time.</li>
            </ul>
          </div>
        </section>

        <aside className="space-y-5">
          <div className="text-xs tracking-[0.22em] uppercase text-mist">Example shared pools</div>
          <div className="space-y-4">
            {pools.map((pool, index) => (
              <div
                key={pool.name}
                className="rounded-soft border border-stone bg-paper/90 shadow-soft p-4 sm:p-5 relative overflow-hidden"
                style={{
                  transform:
                    index === 1 ? 'translateX(4px)' : index === 2 ? 'translateX(-6px)' : 'translateX(0)',
                }}
              >
                <div className="absolute -right-6 -top-6 h-16 w-16 rounded-full border border-mist/40" />
                <div className="absolute -right-10 -top-8 h-12 w-12 rounded-full border border-mist/20" />
                <div className="flex items-center justify-between gap-4 mb-3">
                  <div>
                    <h3 className="font-poppins text-sm sm:text-base">{pool.name}</h3>
                    <p className="font-lora text-xs text-text-soft">{pool.members.join(' · ')}</p>
                  </div>
                  <div className="text-right">
                    <div className="font-poppins text-sm">{pool.balance}</div>
                    <div className="text-[10px] text-mist mt-1">{pool.tone}</div>
                  </div>
                </div>
                <div className="flex items-center justify-between text-[11px] text-text-soft mt-2">
                  <span>View contributions</span>
                  <span className="rounded-full px-2 py-0.5 border border-mist/60">Subtle updates only</span>
                </div>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </main>
  );
}

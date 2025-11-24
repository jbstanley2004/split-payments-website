"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

import { TICKER_PERIODS, currencyCompact } from "./MetricsStrip";

function formatFragment(totalK: number) {
  return currencyCompact.format(totalK * 1000).replace(".0", "");
}

export default function TickerMatrixBackground() {
  const fragments = useMemo(() => {
    const baseFragments = TICKER_PERIODS.flatMap((period) => {
      const latestChartPoint = period.chartValues[period.chartValues.length - 1] ?? 0;
      return [
        formatFragment(period.totalK),
        period.totalLabel.replace("·", "•"),
        period.chartLabel.toUpperCase(),
        formatFragment(latestChartPoint),
        period.meta,
        ...period.statusMessages
      ];
    });

    const curated = [
      "NET PER DAY",
      "ROLLING 7 DAYS",
      "AUTH RATE 98.7%",
      "SETTLEMENTS T+1",
      "FUNDS FLOWING",
      "PAYOUTS SYNCED"
    ];

    return Array.from(new Set([...baseFragments, ...curated])).slice(0, 42);
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <motion.div
        className="absolute inset-[-10%]"
        animate={{ x: ["0%", "-1.5%", "0.5%", "0%"], y: ["0%", "-1%", "-0.5%", "0%"] }}
        transition={{ duration: 48, repeat: Infinity, ease: "easeInOut" }}
      >
        <div
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-12 gap-y-10 sm:gap-y-12 px-6 md:px-12 pt-10"
          style={{ filter: "blur(1.2px)", opacity: 0.1 }}
        >
          {fragments.map((fragment, index) => (
            <span
              key={`${fragment}-${index}`}
              className="text-[9px] sm:text-[10px] md:text-xs font-semibold tracking-[0.28em] uppercase text-slate-500"
            >
              {fragment}
            </span>
          ))}
        </div>
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-b from-white via-white/70 to-white" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 44%, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.85) 34%, rgba(255,255,255,0.6) 60%, rgba(255,255,255,0.25) 76%, transparent 92%)"
        }}
      />
    </div>
  );
}

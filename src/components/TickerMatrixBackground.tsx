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
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <motion.div
        className="absolute inset-[-12%]"
        animate={{ x: ["0%", "-1.5%", "0.5%", "0%"], y: ["0%", "-1%", "-0.5%", "0%"] }}
        transition={{ duration: 48, repeat: Infinity, ease: "easeInOut" }}
        style={{
          maskImage:
            "radial-gradient(circle at 50% 42%, rgba(0,0,0,0) 0%, rgba(0,0,0,0.35) 30%, rgba(0,0,0,0.85) 55%, rgba(0,0,0,0.35) 78%, rgba(0,0,0,0) 100%)",
          WebkitMaskImage:
            "radial-gradient(circle at 50% 42%, rgba(0,0,0,0) 0%, rgba(0,0,0,0.35) 30%, rgba(0,0,0,0.85) 55%, rgba(0,0,0,0.35) 78%, rgba(0,0,0,0) 100%)"
        }}
      >
        <div
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-12 gap-y-10 sm:gap-y-12 px-6 md:px-12 pt-10"
          style={{ filter: "blur(1.2px)", opacity: 0.14 }}
        >
          {fragments.map((fragment, index) => (
            <span
              key={`${fragment}-${index}`}
              className="text-[9px] sm:text-[10px] md:text-xs font-semibold tracking-[0.28em] uppercase text-slate-400"
              style={{ letterSpacing: "0.32em" }}
            >
              {fragment}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

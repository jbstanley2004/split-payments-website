"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

import { TICKER_PERIODS, currencyCompact } from "./MetricsStrip";

type Position = { top: string; left: string; drift?: number };

const POSITIONS: Position[] = [
  { top: "6%", left: "8%", drift: 6 },
  { top: "14%", left: "38%", drift: 4 },
  { top: "10%", left: "72%", drift: 8 },
  { top: "28%", left: "18%", drift: 5 },
  { top: "32%", left: "54%", drift: 7 },
  { top: "26%", left: "82%", drift: 4 },
  { top: "48%", left: "12%", drift: 5 },
  { top: "56%", left: "42%", drift: 6 },
  { top: "50%", left: "70%", drift: 5 },
  { top: "68%", left: "24%", drift: 4 },
  { top: "74%", left: "56%", drift: 7 },
  { top: "70%", left: "82%", drift: 6 }
];

function buildMatrixItems(periodIndex: number) {
  const period = TICKER_PERIODS[periodIndex];
  const trailingValue = period.chartValues[period.chartValues.length - 1] ?? 0;

  const chartSnippets = period.chartValues.map((value, index) => {
    return `d${index + 1} ${currencyCompact.format(value * 1000)}`;
  });

  const baseItems = [
    `${period.totalLabel.split("·")[0]?.trim() ?? period.totalLabel} ${currencyCompact.format(period.totalK * 1000)}`,
    `${period.chartLabel} ${currencyCompact.format(trailingValue * 1000)}`,
    period.meta,
    ...period.statusMessages,
    ...chartSnippets,
    `${period.id.toUpperCase()} throughput`,
    `avg ${currencyCompact.format((period.totalK * 1000) / Math.max(period.chartValues.length, 1))}`
  ];

  return POSITIONS.map((_, index) => baseItems[index % baseItems.length]);
}

export default function DataMatrixBackground() {
  const [periodIndex, setPeriodIndex] = useState(0);
  const [driftPhase, setDriftPhase] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPeriodIndex((prev) => (prev + 1) % TICKER_PERIODS.length);
    }, 6400);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setDriftPhase((prev) => prev + 1);
    }, 9000);

    return () => clearInterval(interval);
  }, []);

  const items = useMemo(() => buildMatrixItems(periodIndex), [periodIndex]);

  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden>
      <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/60 to-white/92" />

      <div className="relative h-full w-full">
        {items.map((item, index) => {
          const position = POSITIONS[index];
          const driftAmount = (position.drift ?? 6) / 2 + (driftPhase % 3);

          return (
            <motion.div
              key={`${item}-${index}`}
              className="absolute text-[8px] sm:text-[9px] md:text-[10px] font-semibold tracking-[0.18em] uppercase text-slate-800/15 blur-[1.6px] select-none"
              style={{ top: position.top, left: position.left }}
              animate={{
                x: ["0%", `${driftAmount}%`, "0%", `-${driftAmount / 2}%`, "0%"],
                y: ["0%", `-${driftAmount / 3}%`, "0%", `${driftAmount / 5}%`, "0%"],
                opacity: [0.08, 0.11, 0.09, 0.1, 0.08]
              }}
              transition={{ duration: 22 + index * 0.35, repeat: Infinity, ease: "easeInOut" }}
            >
              {item}
            </motion.div>
          );
        })}
      </div>

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.65)_0%,rgba(255,255,255,0.9)_50%,rgba(255,255,255,1)_75%)]" />
    </div>
  );
}

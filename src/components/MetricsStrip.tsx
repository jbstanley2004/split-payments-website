"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

type Period = {
  id: "today" | "week" | "month";
  totalK: number;
  totalLabel: string;
  chartLabel: string;
  chartValues: number[];
  meta: string;
};

const currencyCompact = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  notation: "compact",
  maximumFractionDigits: 1
});

function useAnimatedNumber(target: number, duration = 0.8) {
  const [value, setValue] = useState(target);

  useEffect(() => {
    const start = performance.now();
    const from = value;

    const tick = (now: number) => {
      const elapsed = Math.min((now - start) / (duration * 1000), 1);
      const nextValue = from + (target - from) * (1 - Math.pow(1 - elapsed, 3));
      setValue(nextValue);
      if (elapsed < 1) {
        requestAnimationFrame(tick);
      }
    };

    const frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, duration]);

  return value;
}

const PERIODS: Period[] = [
  {
    id: "today",
    totalK: 48.2,
    totalLabel: "Net card volume",
    chartLabel: "Volume by hour",
    chartValues: [4.1, 6.2, 7.4, 6.8, 8.3, 9.1, 6.3],
    meta: "Deposits expected T+1 · Eastern cutoff"
  },
  {
    id: "week",
    totalK: 326.5,
    totalLabel: "Net card volume · rolling 7 days",
    chartLabel: "Net per day",
    chartValues: [42, 51, 48, 37, 56, 44, 48],
    meta: "Settlements aligned to batch close"
  },
  {
    id: "month",
    totalK: 1420.8,
    totalLabel: "Net card volume · last 30 days",
    chartLabel: "Weekly trend",
    chartValues: [332, 354, 341, 393],
    meta: "Includes refunds, chargebacks & fees"
  }
];

export default function MetricsStrip() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % PERIODS.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const active = PERIODS[activeIndex];

  const animatedTotal = useAnimatedNumber(active.totalK);
  const animatedChart = useAnimatedNumber(active.chartValues[active.chartValues.length - 1] ?? 0);

  const formattedTotal = useMemo(
    () => currencyCompact.format(animatedTotal * 1000),
    [animatedTotal]
  );

  const formattedChart = useMemo(
    () => currencyCompact.format(animatedChart * 1000),
    [animatedChart]
  );

  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-6 px-6 md:px-10 lg:px-16">
      <div className="relative mx-auto max-w-6xl overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 0.6, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex items-center justify-between gap-6"
          >
            <div className="flex flex-col gap-1">
              <span className="text-3xl font-bold text-black font-poppins" suppressHydrationWarning>
                {formattedTotal}
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-black/50">
                {active.totalLabel}
              </span>
            </div>

            <div className="flex flex-col items-center text-center md:items-start md:text-left gap-1">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-black/40">
                {active.chartLabel}
              </span>
              <span className="text-xl font-semibold text-black font-poppins" suppressHydrationWarning>
                {formattedChart}
              </span>
            </div>

            <div className="flex items-center gap-3 text-xs text-black/60 font-poppins">
              <span className="hidden sm:inline">{active.meta}</span>
              <span className="hidden md:inline">TSYS · FD Omaha</span>
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#FF4306] opacity-60"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#FF4306]"></span>
              </span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

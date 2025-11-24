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

function useOdometerNumber(target: number, duration = 900, steps = 18) {
  const [value, setValue] = useState(target);

  useEffect(() => {
    const startValue = value;
    const totalSteps = Math.max(4, steps);
    const startTime = performance.now();
    const endTime = startTime + duration;
    let frame: number;

    const tick = (now: number) => {
      const rawProgress = Math.min((now - startTime) / duration, 1);
      const steppedProgress = Math.min(1, Math.round(rawProgress * totalSteps) / totalSteps);
      const eased = 1 - Math.pow(1 - steppedProgress, 3);
      setValue(startValue + (target - startValue) * eased);

      if (now < endTime) {
        frame = requestAnimationFrame(tick);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, duration, steps]);

  return value;
}

function DigitColumn({
  char,
  className
}: {
  char: string;
  className?: string;
}) {
  const isDigit = /[0-9]/.test(char);

  if (!isDigit) {
    return <span className={className}>{char}</span>;
  }

  return (
    <span className={`relative inline-flex overflow-hidden align-baseline ${className ?? ""}`}>
      <AnimatePresence initial={false} mode="popLayout">
        <motion.span
          key={char}
          initial={{ y: "70%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-70%", opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          className="block"
        >
          {char}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

function OdometerText({ text, className }: { text: string; className?: string }) {
  return (
    <span className={`inline-flex ${className ?? ""}`}>
      {text.split("").map((char, index) => (
        <DigitColumn key={`${char}-${index}`} char={char} />
      ))}
    </span>
  );
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

  const animatedTotal = useOdometerNumber(active.totalK);
  const animatedChart = useOdometerNumber(active.chartValues[active.chartValues.length - 1] ?? 0);

  const formattedTotal = useMemo(
    () => currencyCompact.format(animatedTotal * 1000),
    [animatedTotal]
  );

  const formattedChart = useMemo(
    () => currencyCompact.format(animatedChart * 1000),
    [animatedChart]
  );

  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-4 md:bottom-6 px-6 md:px-10 lg:px-16">
      <div className="relative mx-auto max-w-6xl overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white via-white/70 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white via-white/70 to-transparent" />

        <div className="flex items-center justify-between gap-6 opacity-85">
          <div className="flex flex-col gap-1">
            <OdometerText text={formattedTotal} className="text-2xl sm:text-3xl font-bold text-black font-poppins" />
            <span className="text-[9px] font-semibold uppercase tracking-[0.24em] text-black/45">
              {active.totalLabel}
            </span>
          </div>

          <div className="flex flex-col items-center text-center md:items-start md:text-left gap-1">
            <span className="text-[9px] font-bold uppercase tracking-[0.24em] text-black/35">
              {active.chartLabel}
            </span>
            <OdometerText text={formattedChart} className="text-lg sm:text-xl font-semibold text-black font-poppins" />
          </div>

          <div className="flex items-center gap-3 text-[11px] text-black/60 font-poppins">
            <span className="hidden sm:inline">{active.meta}</span>
            <span className="hidden md:inline">TSYS · FD Omaha</span>
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#FF4306] opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#FF4306]" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

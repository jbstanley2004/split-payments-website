"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { CalendarClock, WalletCards } from "lucide-react";

type Period = {
  id: "today" | "week" | "month";
  totalK: number;
  totalLabel: string;
  chartLabel: string;
  chartValues: number[];
  meta: string;
  statusMessages: string[];
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
    meta: "Deposits expected T+1 · Eastern cutoff",
    statusMessages: ["Settlements aligned to batch close", "TSYS · FD Omaha", "Reconciliations locked"]
  },
  {
    id: "week",
    totalK: 326.5,
    totalLabel: "Net card volume · rolling 7 days",
    chartLabel: "Net per day",
    chartValues: [42, 51, 48, 37, 56, 44, 48],
    meta: "Settlements aligned to batch close",
    statusMessages: ["Funds flowing · ACH + card", "TSYS · FD Omaha", "Live auth rate 98.7%"]
  },
  {
    id: "month",
    totalK: 1420.8,
    totalLabel: "Net card volume · last 30 days",
    chartLabel: "Weekly trend",
    chartValues: [332, 354, 341, 393],
    meta: "Includes refunds, chargebacks & fees",
    statusMessages: ["Payouts synced nightly", "TSYS · FD Omaha", "Risk review clear"]
  }
];

export default function MetricsStrip() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [statusIndex, setStatusIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % PERIODS.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setStatusIndex(0);
  }, [activeIndex]);

  useEffect(() => {
    const interval = setInterval(() => {
      setStatusIndex((prev) => prev + 1);
    }, 3200);

    return () => clearInterval(interval);
  }, []);

  const active = PERIODS[activeIndex];
  const activeStatus = active.statusMessages[statusIndex % active.statusMessages.length];

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
    <div className="pointer-events-none absolute inset-x-0 bottom-4 md:bottom-6 px-4 sm:px-6 md:px-10 lg:px-16">
      <div className="relative mx-auto max-w-6xl overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white/70 via-white/35 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white/70 via-white/35 to-transparent" />

        <div className="flex flex-wrap items-center justify-between gap-3.5 sm:gap-5 rounded-2xl px-3 sm:px-5 py-2.5 sm:py-3 backdrop-blur-2xl backdrop-saturate-50 bg-white/30 border border-white/25 ring-1 ring-white/15 opacity-55 shadow-[0_26px_96px_-70px_rgba(0,0,0,0.34)] text-slate-500/60">
          <div className="flex flex-col gap-1 flex-1 min-w-[150px] basis-[48%] sm:basis-auto">
            <OdometerText text={formattedTotal} className="text-[14px] sm:text-[16px] md:text-[25px] font-semibold text-slate-500/70 font-poppins" />
            <span className="text-[7px] sm:text-[8.5px] font-semibold uppercase tracking-[0.24em] text-slate-500/55">
              {active.totalLabel}
            </span>
          </div>

          <div className="flex flex-col items-start text-left gap-1 flex-1 min-w-[150px] basis-[48%] sm:basis-auto">
            <span className="text-[7px] sm:text-[8.5px] font-bold uppercase tracking-[0.24em] text-slate-500/55">
              {active.chartLabel}
            </span>
            <OdometerText text={formattedChart} className="text-[13px] sm:text-[15px] md:text-[18px] font-semibold text-slate-500/68 font-poppins" />
          </div>

          <div className="flex items-center gap-3 text-[9px] sm:text-[10.75px] font-poppins text-slate-500/65 flex-1 min-w-[180px] basis-[48%] sm:basis-auto justify-end">
            <div className="hidden sm:flex items-center gap-2 min-w-[150px] justify-end text-slate-500/60">
              <CalendarClock className="h-3.5 w-3.5 opacity-70" />
              <span className="truncate">{active.meta}</span>
            </div>
            <div className="hidden md:block w-px h-4 bg-slate-200/50" />
            <div className="flex items-center gap-2 min-w-[140px] text-slate-500/60">
              <WalletCards className="h-3.5 w-3.5 opacity-70" />
              <div className="relative h-4 overflow-hidden">
                <AnimatePresence initial={false} mode="popLayout">
                  <motion.span
                    key={activeStatus}
                    initial={{ y: "50%", opacity: 0 }}
                    animate={{ y: "0%", opacity: 1 }}
                    exit={{ y: "-50%", opacity: 0 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="block leading-4"
                  >
                    {activeStatus}
                  </motion.span>
                </AnimatePresence>
              </div>
            </div>
            <div className="relative flex h-2.5 w-2.5">
              <motion.span
                className="absolute inline-flex h-full w-full rounded-full bg-[#43b37b]/18"
                animate={{ scale: [1, 2.1, 1], opacity: [0.26, 0.04, 0.26] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#43b37b]/35" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

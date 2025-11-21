"use client";

import { AnimatePresence, motion, animate } from "framer-motion";
import {
  Activity,
  ArrowDownRight,
  ArrowUpRight,
  CalendarClock,
  CreditCard,
  FileText,
  Timer,
  WalletCards,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

type PeriodId = "today" | "week" | "month";

type ChannelRow = {
  id: string;
  label: string;
  descriptor: string;
  amountK: number; // thousands
  deltaPct: number;
  icon?: LucideIcon;
};

type ChartConfig = {
  label: string;
  unit?: string;
  x: string[];
  values: number[];
};

type PeriodConfig = {
  id: PeriodId;
  label: string;
  chip: string;
  totalK: number;
  totalLabel: string;
  meta: string;
  chart: ChartConfig;
  channels: ChannelRow[];
};

// Animated number for totals / chart headline
function useAnimatedNumber(target: number, duration = 0.7) {
  const [value, setValue] = useState(target);
  const previousRef = useRef(target);

  useEffect(() => {
    const controls = animate(previousRef.current, target, {
      duration,
      ease: "easeOut",
      onUpdate: (v) => setValue(v),
    });

    previousRef.current = target;
    return () => controls.stop();
  }, [target, duration]);

  return value;
}

const currencyCompact = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  notation: "compact",
  maximumFractionDigits: 1,
});

const numberCompact = new Intl.NumberFormat("en-US", {
  notation: "compact",
  maximumFractionDigits: 1,
});

// ---------- Chart (thin line, no gradient fill) ------------------------------

type LineChartProps = {
  config: ChartConfig;
};

const LineChart = ({ config }: LineChartProps) => {
  const { values, x, label, unit } = config;
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const { path, points, lastValue } = useMemo(() => {
    if (!values.length) {
      return {
        path: "",
        points: [] as { x: number; y: number }[],
        lastValue: 0,
      };
    }

    const w = 260;
    const h = 120;
    const paddingX = 12;
    const paddingY = 16;

    const vMin = Math.min(...values);
    const vMax = Math.max(...values);
    const range = vMax - vMin || 1;

    const pts = values.map((v, i) => {
      const t = values.length === 1 ? 0 : i / (values.length - 1);
      const xPos = paddingX + t * (w - 2 * paddingX);
      const yPos =
        paddingY +
        (h - 2 * paddingY) -
        ((v - vMin) / range) * (h - 2 * paddingY);
      return { x: xPos, y: yPos };
    });

    const d = pts
      .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`)
      .join(" ");

    return {
      path: d,
      points: pts,
      lastValue: values[values.length - 1] ?? 0,
    };
  }, [values]);

  const animatedValue = useAnimatedNumber(lastValue);

  const formattedCurrent =
    unit === "$"
      ? currencyCompact.format(animatedValue * 1000)
      : numberCompact.format(animatedValue);

  return (
    <div className="flex h-full flex-col justify-between">
      <div className="flex items-center justify-between gap-4">
        <div className="space-y-1">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-300">
            {label}
          </p>
          <p className="text-lg font-semibold text-slate-50">
            {formattedCurrent}
          </p>
        </div>
        <div className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-3 py-1 text-[11px] font-medium text-emerald-200">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          <span>Live volume</span>
        </div>
      </div>

      <div className="mt-5 flex-1">
        <svg
          viewBox="0 0 260 130"
          className="h-full w-full"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* grid */}
          {[0.25, 0.5, 0.75].map((t) => (
            <line
              key={t}
              x1={0}
              x2={260}
              y1={130 * t}
              y2={130 * t}
              stroke="rgba(148,163,184,0.35)"
              strokeWidth={0.5}
              strokeDasharray="4 4"
            />
          ))}

          <AnimatePresence>
            {path && (
              <motion.path
                key="line"
                d={path}
                fill="none"
                stroke="#e5e7eb"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                exit={{ pathLength: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
              />
            )}
          </AnimatePresence>

          {points.map((point, i) => {
            const active = hoverIndex === i;
            return (
              <motion.g
                key={i}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  delay: 0.15 + i * 0.04,
                  type: "spring",
                  stiffness: 220,
                  damping: 20,
                }}
                onMouseEnter={() => setHoverIndex(i)}
                onMouseLeave={() => setHoverIndex(null)}
              >
                <circle
                  cx={point.x}
                  cy={point.y}
                  r={3.5}
                  fill="#020617"
                  stroke="#e5e7eb"
                  strokeWidth={1.5}
                />
                {active && (
                  <motion.circle
                    cx={point.x}
                    cy={point.y}
                    r={7}
                    stroke="#e5e7eb"
                    strokeWidth={1}
                    fill="transparent"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                  />
                )}
              </motion.g>
            );
          })}
        </svg>
      </div>

      <div className="mt-2 flex items-center justify-between text-[11px] text-slate-300/80">
        {x.map((label) => (
          <span key={label}>{label}</span>
        ))}
      </div>
    </div>
  );
};

// ---------- Period data: proper card-processing channels ---------------------

const PERIODS: PeriodConfig[] = [
  {
    id: "today",
    label: "Today",
    chip: "Live",
    totalK: 48.2,
    totalLabel: "Net card volume",
    meta: "Deposits expected T+1 · Eastern cutoff",
    chart: {
      label: "Volume by hour",
      unit: "$",
      x: ["8a", "10a", "12p", "2p", "4p", "6p", "8p"],
      values: [4.1, 6.2, 7.4, 6.8, 8.3, 9.1, 6.3],
    },
    channels: [
      {
        id: "instore",
        label: "In-store EMV & tap",
        descriptor: "Countertop + mobile readers",
        amountK: 28.4,
        deltaPct: 12.4,
        icon: CreditCard,
      },
      {
        id: "gateway",
        label: "E-commerce gateway",
        descriptor: "Hosted checkout & wallets",
        amountK: 14.9,
        deltaPct: 7.8,
        icon: Activity,
      },
      {
        id: "keyed",
        label: "Keyed / virtual terminal",
        descriptor: "Back office, mail / phone orders",
        amountK: 4.1,
        deltaPct: -2.1,
        icon: FileText,
      },
    ],
  },
  {
    id: "week",
    label: "Last 7 days",
    chip: "Rolling",
    totalK: 326.5,
    totalLabel: "Net card volume · rolling 7 days",
    meta: "Settlements aligned to batch close",
    chart: {
      label: "Net per day",
      unit: "$",
      x: ["Thu", "Fri", "Sat", "Sun", "Mon", "Tue", "Wed"],
      values: [42, 51, 48, 37, 56, 44, 48],
    },
    channels: [
      {
        id: "instore",
        label: "In-store EMV & tap",
        descriptor: "Auth rate 98.7% · 61% of volume",
        amountK: 201.9,
        deltaPct: 9.6,
        icon: CreditCard,
      },
      {
        id: "gateway",
        label: "E-commerce gateway",
        descriptor: "Cart + subscription billing",
        amountK: 92.3,
        deltaPct: 14.2,
        icon: Activity,
      },
      {
        id: "keyed",
        label: "Keyed / virtual terminal",
        descriptor: "Card-not-present back office",
        amountK: 32.3,
        deltaPct: -3.8,
        icon: FileText,
      },
    ],
  },
  {
    id: "month",
    label: "Last 30 days",
    chip: "Settlement view",
    totalK: 1420.8,
    totalLabel: "Net card volume · last 30 days",
    meta: "Includes refunds, chargebacks & fees",
    chart: {
      label: "Weekly trend",
      unit: "$",
      x: ["Wk 1", "Wk 2", "Wk 3", "Wk 4"],
      values: [332, 354, 341, 393],
    },
    channels: [
      {
        id: "instore",
        label: "In-store EMV & tap",
        descriptor: "All lanes · multi-MID routing",
        amountK: 876.2,
        deltaPct: 11.3,
        icon: CreditCard,
      },
      {
        id: "gateway",
        label: "E-commerce gateway",
        descriptor: "Checkout + vaulted cards",
        amountK: 396.1,
        deltaPct: 19.4,
        icon: Activity,
      },
      {
        id: "keyed",
        label: "Keyed / virtual terminal",
        descriptor: "Invoice & phone orders",
        amountK: 148.5,
        deltaPct: 1.9,
        icon: FileText,
      },
    ],
  },
];

// ---------- Main component: wide dashboard card ------------------------------

export default function DashboardAnimation() {
  const [activePeriodId, setActivePeriodId] = useState<PeriodId>("week");

  // Auto-rotate Today → 7 days → 30 days
  useEffect(() => {
    const interval = setInterval(() => {
      setActivePeriodId((current) => {
        const idx = PERIODS.findIndex((p) => p.id === current);
        const next = PERIODS[(idx + 1) % PERIODS.length];
        return next.id;
      });
    }, 9000);

    return () => clearInterval(interval);
  }, []);

  const active = useMemo(
    () => PERIODS.find((p) => p.id === activePeriodId) ?? PERIODS[0],
    [activePeriodId]
  );

  const animatedTotal = useAnimatedNumber(active.totalK);
  const formattedTotal = useMemo(
    () => currencyCompact.format(animatedTotal * 1000),
    [animatedTotal]
  );

  return (
    // IMPORTANT: no fixed height, no outer dark shell.
    // This sits directly on the page’s white background and scales horizontally.
    <section className="w-full">
      <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-0">
        <div className="relative overflow-hidden rounded-[2rem] bg-slate-950 p-7 text-slate-50 shadow-[0_28px_120px_rgba(15,23,42,0.9)] sm:p-8">
          {/* Gradient glows, anchored to card */}
          <div className="pointer-events-none absolute -right-24 -top-40 h-72 w-72 rounded-full bg-gradient-to-br from-fuchsia-500 via-rose-500 to-amber-400 opacity-80 blur-3xl" />
          <div className="pointer-events-none absolute -left-20 bottom-[-5rem] h-64 w-64 rounded-full bg-emerald-500/45 opacity-80 blur-3xl" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(148,163,184,0.22)_0,_transparent_55%)]" />

          <div className="relative z-10 space-y-5">
            {/* Top row: brand + tabs */}
            <div className="flex flex-wrap items-start justify-between gap-4 lg:items-center">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-black/40 shadow-inner shadow-black/60">
                  <span className="text-sm font-semibold tracking-tight">S</span>
                </div>
                <div className="space-y-0.5">
                  <p className="text-sm font-semibold text-slate-100">
                    Settlement feed
                  </p>
                  <p className="text-xs text-slate-400">
                    Card-present &amp; online channels
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-end gap-2 text-right">
                <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/45 bg-emerald-500/10 px-3 py-1 text-[11px] font-medium text-emerald-200">
                  <motion.span
                    className="inline-flex h-2 w-2 rounded-full bg-emerald-400"
                    animate={{ opacity: [0.3, 1, 0.3], scale: [1, 1.08, 1] }}
                    transition={{
                      repeat: Infinity,
                      duration: 1.6,
                      ease: "easeInOut",
                    }}
                  />
                  Live processor feed
                </div>

                <div className="flex items-center gap-1 rounded-full bg-white/10 p-1 text-[11px]">
                  {PERIODS.map((period) => {
                    const isActive = period.id === active.id;
                    return (
                      <button
                        key={period.id}
                        onClick={() => setActivePeriodId(period.id)}
                        className="relative rounded-full px-3 py-1.5"
                      >
                        {isActive && (
                          <motion.span
                            layoutId="split-period-pill"
                            className="absolute inset-0 rounded-full bg-white text-slate-900 shadow-sm"
                            transition={{
                              type: "spring",
                              stiffness: 260,
                              damping: 24,
                            }}
                          />
                        )}
                        <span
                          className={`relative z-10 font-medium ${
                            isActive ? "text-slate-900" : "text-slate-200/85"
                          }`}
                        >
                          {period.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Main grid: wide dashboard layout */}
            <div className="grid gap-6 lg:grid-cols-12">
              {/* Left: headings + total */}
              <div className="space-y-4 lg:col-span-4">
                <div>
                  <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-slate-400">
                    Real-time analytics
                  </p>
                  <p className="mt-2 text-base font-medium text-slate-100">
                    Net card volume
                  </p>
                </div>

                <p className="text-4xl font-semibold tracking-tight text-slate-50 xl:text-[2.6rem]">
                  {formattedTotal}
                </p>

                <div className="space-y-1 text-xs text-slate-300">
                  <p>{active.totalLabel}</p>
                  <p className="flex items-center gap-1 text-slate-400">
                    <CalendarClock className="h-3 w-3" />
                    {active.meta}
                  </p>
                  <p className="flex items-center gap-1 text-slate-400">
                    <WalletCards className="h-3 w-3" />
                    TSYS · FD Omaha · Unified deposits
                  </p>
                </div>
              </div>

              {/* Middle: channel tiles */}
              <div className="space-y-3 lg:col-span-5">
                {active.channels.map((row) => {
                  const positive = row.deltaPct >= 0;
                  const Icon = row.icon;
                  return (
                    <div
                      key={row.id}
                      className="flex items-center justify-between gap-3 rounded-2xl bg-white/6 px-4 py-3 backdrop-blur-sm"
                    >
                      <div className="flex items-center gap-3">
                        {Icon && (
                          <span className="inline-flex h-8 w-8 items-center justify-center rounded-2xl bg-black/40">
                            <Icon className="h-4 w-4 text-slate-100" />
                          </span>
                        )}
                        <div className="space-y-0.5">
                          <p className="text-xs font-medium text-slate-50">
                            {row.label}
                          </p>
                          <p className="text-[11px] text-slate-400">
                            {row.descriptor}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs font-semibold text-slate-50">
                          {currencyCompact.format(row.amountK * 1000)}
                        </p>
                        <div className="mt-0.5 inline-flex items-center justify-end gap-1 text-[11px] font-medium">
                          {positive ? (
                            <ArrowUpRight className="h-3 w-3 text-emerald-400" />
                          ) : (
                            <ArrowDownRight className="h-3 w-3 text-rose-400" />
                          )}
                          <span
                            className={
                              positive ? "text-emerald-200" : "text-rose-200"
                            }
                          >
                            {positive ? "+" : ""}
                            {row.deltaPct.toFixed(1)}%
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Right: chart card */}
              <div className="rounded-2xl bg-black/35 px-4 py-4 lg:col-span-3">
                <LineChart config={active.chart} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


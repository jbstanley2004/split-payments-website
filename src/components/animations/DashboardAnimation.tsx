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
import { useEffect, useMemo, useRef, useState, useId } from "react";

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

// ---------- Chart (Gradient Area - Light Mode) ------------------------------

type LineChartProps = {
  config: ChartConfig;
};

const LineChart = ({ config }: LineChartProps) => {
  const { values, x, label, unit } = config;
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const { path, areaPath, points, lastValue, min, max } = useMemo(() => {
    if (!values.length) {
      return {
        path: "",
        areaPath: "",
        points: [] as { x: number; y: number }[],
        lastValue: 0,
        min: 0,
        max: 0,
      };
    }

    const w = 260;
    const h = 120;
    const paddingX = 4;
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

    const area = `${d} L ${pts[pts.length - 1].x} ${h} L ${pts[0].x} ${h} Z`;

    return {
      path: d,
      areaPath: area,
      points: pts,
      lastValue: values[values.length - 1] ?? 0,
      min: vMin,
      max: vMax,
    };
  }, [values]);

  const animatedValue = useAnimatedNumber(lastValue);

  const formattedCurrent =
    unit === "$"
      ? currencyCompact.format(animatedValue * 1000)
      : numberCompact.format(animatedValue);

  const id = useId();
  const gradientId = `chart-grad-${id}`;

  return (
    <div className="flex h-full flex-col justify-between">
      <div className="flex items-center justify-between gap-4">
        <div className="space-y-1">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
            {label}
          </p>
          <p className="text-xl font-bold text-slate-900" suppressHydrationWarning>
            {formattedCurrent}
          </p>
        </div>
        {/* Single Live Indicator in Chart */}
        <div className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#FF4306] opacity-75"></span>
          <span className="relative inline-flex h-2 w-2 rounded-full bg-[#FF4306]"></span>
        </div>
      </div>

      <div className="mt-6 flex-1 relative">
        <svg
          viewBox="0 0 260 130"
          className="h-full w-full overflow-visible"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FF4306" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#FF4306" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          {[0.25, 0.5, 0.75].map((t) => (
            <line
              key={t}
              x1={0}
              x2={260}
              y1={130 * t}
              y2={130 * t}
              stroke="rgba(148,163,184,0.15)"
              strokeWidth={1}
              strokeDasharray="4 4"
            />
          ))}

          <AnimatePresence>
            {areaPath && (
              <motion.path
                key="area"
                d={areaPath}
                fill={`url(#${gradientId})`}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              />
            )}
            {path && (
              <motion.path
                key="line"
                d={path}
                fill="none"
                stroke="#FF4306"
                strokeWidth={2.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
              />
            )}
          </AnimatePresence>

          {points.map((point, i) => {
            const active = hoverIndex === i;
            return (
              <motion.g
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  delay: 0.2 + i * 0.05,
                  type: "spring",
                }}
                onMouseEnter={() => setHoverIndex(i)}
                onMouseLeave={() => setHoverIndex(null)}
              >
                {/* Hover target area */}
                <circle cx={point.x} cy={point.y} r={12} fill="transparent" />

                <circle
                  cx={point.x}
                  cy={point.y}
                  r={4}
                  fill="#ffffff"
                  stroke="#FF4306"
                  strokeWidth={2.5}
                />
                {active && (
                  <motion.circle
                    cx={point.x}
                    cy={point.y}
                    r={8}
                    stroke="#FF4306"
                    strokeWidth={1}
                    fill="transparent"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                  />
                )}
              </motion.g>
            );
          })}
        </svg>
      </div>

      <div className="mt-2 flex items-center justify-between text-[10px] font-semibold text-slate-400">
        {x.map((label, i) => (
          <span key={i}>{label}</span>
        ))}
      </div>
    </div>
  );
};

// ---------- Period data -----------------------------------------------------

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

// ---------- Main component ---------------------------------------------------

export default function DashboardAnimation() {
  const [activePeriodId, setActivePeriodId] = useState<PeriodId>("week");

  // Auto-rotate
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
    <div className="w-full h-full">
      {/* Main Card Content - Removed outer container styling */}
      <div className="relative h-full bg-white/50 backdrop-blur-sm p-6 sm:p-8">

        {/* Content Grid */}
        <div className="flex flex-col h-full gap-6">

          {/* Header: Metric & Meta */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 shrink-0">
            <div className="space-y-1">
              <h3 className="text-5xl font-bold tracking-tight text-slate-900 md:text-6xl" suppressHydrationWarning>
                {formattedTotal}
              </h3>
              <p className="text-sm font-semibold text-slate-500">{active.totalLabel}</p>
            </div>

            <div className="flex items-center gap-4 text-sm font-medium text-slate-500 pb-1">
              <div className="flex items-center gap-2">
                <CalendarClock className="h-4 w-4 text-slate-400" />
                <span>{active.meta}</span>
              </div>
              <div className="hidden sm:block w-px h-4 bg-slate-200" />
              <div className="flex items-center gap-2">
                <WalletCards className="h-4 w-4 text-slate-400" />
                <span>TSYS · FD Omaha</span>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex flex-col lg:flex-row gap-8 h-full min-h-0">

            {/* Left: Channel List (Clean, Borderless) */}
            <div className="lg:w-[30%] flex flex-col justify-center gap-2">
              {active.channels.map((row) => {
                const positive = row.deltaPct >= 0;
                const Icon = row.icon;
                return (
                  <div
                    key={row.id}
                    className="group flex items-center justify-between rounded-xl p-3 transition-colors hover:bg-slate-50"
                  >
                    <div className="flex items-center gap-3">
                      {Icon && (
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-50 text-slate-600 group-hover:bg-white group-hover:shadow-sm transition-all">
                          <Icon className="h-5 w-5" />
                        </div>
                      )}
                      <div>
                        <p className="text-sm font-bold text-slate-900">{row.label}</p>
                        <p className="text-xs font-medium text-slate-500">{row.descriptor}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-slate-900">
                        {currencyCompact.format(row.amountK * 1000)}
                      </p>
                      <div className={`flex items-center justify-end gap-0.5 text-xs font-bold ${positive ? "text-emerald-600" : "text-rose-600"}`}>
                        {positive ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                        <span>{positive ? "+" : ""}{row.deltaPct.toFixed(1)}%</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right: Chart (Large, Fluid) */}
            <div className="lg:w-[70%] bg-slate-50/50 rounded-3xl p-6 border border-slate-100">
              <LineChart config={active.chart} />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

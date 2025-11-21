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
import { useEffect, useMemo, useState } from "react";

type ViewId = "overview" | "batches" | "daily";

type KPI = {
  id: string;
  label: string;
  value: string;
  delta?: string;
  deltaPositive?: boolean;
  meta?: string;
  icon?: LucideIcon;
};

type SideRow = {
  id: string;
  label: string;
  value: string;
  meta?: string;
  pill?: string;
};

type ChartConfig = {
  label: string;
  unit?: string;
  x: string[];
  values: number[];
};

type ViewConfig = {
  id: ViewId;
  label: string;
  pill?: string;
  subtitle: string;
  periodLabel: string;
  primaryHighlight: string;
  kpis: KPI[];
  chart: ChartConfig;
  sideTitle: string;
  sideRows: SideRow[];
  footerNote: string;
};

// --- Animated number hook (for the chart headline only) -----------------------

function useAnimatedNumber(target: number, duration = 0.7) {
  const [value, setValue] = useState(target);

  useEffect(() => {
    const controls = animate(value, target, {
      duration,
      ease: "easeOut",
      onUpdate: (v) => setValue(v),
    });

    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

// --- Simple line chart (thin line, no gradient fill) --------------------------

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

  const formattedCurrent = useMemo(
    () =>
      unit === "$"
        ? currencyCompact.format(animatedValue * 1000)
        : numberCompact.format(animatedValue),
    [animatedValue, unit]
  );

  return (
    <div className="flex h-full flex-col justify-between">
      {/* Header above chart */}
      <div className="flex items-center justify-between gap-4">
        <div className="space-y-1">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-500">
            {label}
          </p>
          <p className="text-lg font-semibold text-slate-900">
            {formattedCurrent}
          </p>
        </div>
        <div className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-medium text-emerald-700">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          <span>Live volume</span>
        </div>
      </div>

      {/* Chart */}
      <div className="mt-5 flex-1">
        <svg
          viewBox="0 0 260 130"
          className="h-full w-full"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* horizontal grid */}
          {[0.25, 0.5, 0.75].map((t) => (
            <line
              key={t}
              x1={0}
              x2={260}
              y1={130 * t}
              y2={130 * t}
              stroke="rgba(148, 163, 184, 0.35)"
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
                stroke="#0f172a"
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

          {/* Points */}
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
                  fill="#ffffff"
                  stroke="#0f172a"
                  strokeWidth={1.5}
                />
                {active && (
                  <motion.circle
                    cx={point.x}
                    cy={point.y}
                    r={7}
                    stroke="#0f172a"
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

      {/* X axis labels */}
      <div className="mt-2 flex items-center justify-between text-[11px] text-slate-500">
        {x.map((label) => (
          <span key={label}>{label}</span>
        ))}
      </div>
    </div>
  );
};

// --- View data (same content, new skin) ---------------------------------------

const VIEWS: ViewConfig[] = [
  {
    id: "overview",
    label: "Overview",
    pill: "Unified",
    subtitle: "Snapshot across card-present, online, and funding.",
    periodLabel: "Today · March 2024",
    primaryHighlight: "Gross volume is trending above last month.",
    kpis: [
      {
        id: "revenue",
        label: "Total Revenue",
        value: "$156.8k",
        delta: "+12.5% vs last month",
        deltaPositive: true,
        meta: "Card & digital wallets",
        icon: Activity,
      },
      {
        id: "transactions",
        label: "Transactions",
        value: "3,421",
        delta: "+284 today",
        deltaPositive: true,
        meta: "97.8% approval rate",
        icon: CreditCard,
      },
      {
        id: "avg-ticket",
        label: "Avg. Ticket",
        value: "$45.84",
        delta: "Stable trend",
        deltaPositive: true,
        meta: "Last 90 days",
        icon: WalletCards,
      },
      {
        id: "top-category",
        label: "Top Category",
        value: "Retail",
        delta: "42% of sales",
        meta: "In-store & online",
      },
    ],
    chart: {
      label: "Weekly revenue",
      unit: "$",
      x: ["Week 1", "Week 2", "Week 3", "Week 4"],
      values: [28, 31, 29, 38],
    },
    sideTitle: "Live activity",
    sideRows: [
      {
        id: "act-1",
        label: "VISA • A910S SmartPOS",
        value: "$82.19 • Approved",
        meta: "Seattle • 12 sec ago",
        pill: "Chip",
      },
      {
        id: "act-2",
        label: "Apple Pay • Online checkout",
        value: "$146.02 • Approved",
        meta: "San Francisco • 38 sec ago",
        pill: "Tokenized",
      },
      {
        id: "act-3",
        label: "Mastercard • Keyed entry",
        value: "$219.40 • Pending",
        meta: "Chicago • 1 min ago",
        pill: "Card-not-present",
      },
    ],
    footerNote:
      "Metrics are updated in real time as new transactions are authorized and captured.",
  },
  {
    id: "batches",
    label: "Batches",
    pill: "TSYS · FD Omaha",
    subtitle: "Every closed batch, with exact end time and batch number.",
    periodLabel: "Automatic close · 7:00 PM local time",
    primaryHighlight:
      "Your last batch closed cleanly with no processor rejects.",
    kpis: [
      {
        id: "net-total",
        label: "Net Total",
        value: "$48,200.21",
        delta: "+$3,912 vs prior batch",
        deltaPositive: true,
        meta: "Deposited T+1",
        icon: Activity,
      },
      {
        id: "sales-count",
        label: "Total Sales",
        value: "372",
        delta: "$52,940.90",
        deltaPositive: true,
        meta: "Gross sales volume",
      },
      {
        id: "refund-count",
        label: "Refunds",
        value: "6",
        delta: "-$4,740.69",
        deltaPositive: false,
        meta: "Customer returns & voids",
      },
      {
        id: "fees",
        label: "Fees",
        value: "$1,210.16",
        delta: "2.29% effective rate",
        deltaPositive: false,
        meta: "Interchange + processor",
      },
    ],
    chart: {
      label: "Net per batch (last 7 days)",
      unit: "$",
      x: ["Thu", "Fri", "Sat", "Sun", "Mon", "Tue", "Wed"],
      values: [34, 41, 37, 28, 46, 39, 48],
    },
    sideTitle: "Recent batches",
    sideRows: [
      {
        id: "b-1",
        label: "Batch #38492 • Closed 6:59 PM",
        value: "Net $48,200.21",
        meta: "Sales 372 · Refunds 6",
        pill: "Settled",
      },
      {
        id: "b-2",
        label: "Batch #38491 • Closed 6:59 PM",
        value: "Net $44,288.04",
        meta: "Sales 341 · Refunds 4",
        pill: "Settled",
      },
      {
        id: "b-3",
        label: "Batch #38490 • Closed 6:58 PM",
        value: "Net $39,102.77",
        meta: "Sales 318 · Refunds 3",
        pill: "Settled",
      },
    ],
    footerNote:
      "Batch reports are generated automatically within an hour of closing and emailed to configured recipients.",
  },
  {
    id: "daily",
    label: "Daily Reports",
    pill: "Email + CSV",
    subtitle: "Daily transaction reports aligned to your report time.",
    periodLabel: "Report time · 12:00 AM in company timezone",
    primaryHighlight:
      "Today’s activity is tracking ahead of the last 7-day average.",
    kpis: [
      {
        id: "daily-sales",
        label: "Total Sales",
        value: "$182.4k",
        delta: "+18.1% vs 7-day avg",
        deltaPositive: true,
        meta: "All merchant accounts",
        icon: FileText,
      },
      {
        id: "daily-refunds",
        label: "Total Refunds",
        value: "$6.2k",
        delta: "3.4% of sales",
        deltaPositive: false,
        meta: "Includes voids",
      },
      {
        id: "daily-net",
        label: "Net Total",
        value: "$176.2k",
        delta: "After fees & refunds",
        deltaPositive: true,
        meta: "Settlement-aligned",
      },
      {
        id: "daily-time",
        label: "Report Status",
        value: "Queued 11:59 PM",
        delta: "Last sent 12:01 AM",
        deltaPositive: true,
        meta: "Recipients 4",
      },
    ],
    chart: {
      label: "Net total (last 30 days)",
      unit: "$",
      x: ["Week 1", "Week 2", "Week 3", "Week 4"],
      values: [162, 171, 168, 176],
    },
    sideTitle: "Date range presets",
    sideRows: [
      {
        id: "dr-1",
        label: "Today",
        value: "Live until report time",
        meta: "Matches deposit for aligned batch times",
        pill: "Selected",
      },
      {
        id: "dr-2",
        label: "Last 7 Days",
        value: "Rolling behavior view",
        meta: "Good for refund trends",
      },
      {
        id: "dr-3",
        label: "Last 30 Days",
        value: "Monthly overview",
        meta: "Use for board reporting",
      },
    ],
    footerNote:
      "Update report time or recipients any time under Account Settings → Reports on your Split dashboard.",
  },
];

// --- Main component -----------------------------------------------------------

export default function DashboardAnimation() {
  const [activeViewId, setActiveViewId] = useState<ViewId>("overview");

  // Auto-rotate views
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveViewId((current) => {
        const currentIndex = VIEWS.findIndex((v) => v.id === current);
        const next = VIEWS[(currentIndex + 1) % VIEWS.length];
        return next.id;
      });
    }, 9000);

    return () => clearInterval(interval);
  }, []);

  const activeView = useMemo(
    () => VIEWS.find((v) => v.id === activeViewId) ?? VIEWS[0],
    [activeViewId]
  );

  return (
    // No custom background here – let the page’s white canvas show through.
    <section className="w-full">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-0">
        {/* Header + view switcher */}
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-500">
              Real-time analytics
            </p>
            <div className="mt-2 flex flex-wrap items-center gap-3">
              <h3 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
                {activeView.id === "overview" && "March 2024"}
                {activeView.id === "batches" && "Online batch reports"}
                {activeView.id === "daily" && "Daily transaction reports"}
              </h3>
              {activeView.pill && (
                <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-[11px] font-medium text-slate-900">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  {activeView.pill}
                </span>
              )}
            </div>
            <p className="mt-1 text-xs text-slate-500">
              {activeView.periodLabel}
            </p>
          </div>

          <div className="flex flex-col items-start gap-3 text-left md:items-end md:text-right">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 text-[11px] font-medium text-emerald-700">
              <motion.span
                className="inline-flex h-2 w-2 rounded-full bg-emerald-500"
                animate={{ opacity: [0.3, 1, 0.3], scale: [1, 1.08, 1] }}
                transition={{
                  repeat: Infinity,
                  duration: 1.6,
                  ease: "easeInOut",
                }}
              />
              Live processor feed
            </div>

            <div className="flex items-center gap-1 rounded-full bg-slate-100 p-1 text-xs">
              {VIEWS.map((view) => {
                const isActive = view.id === activeView.id;
                return (
                  <button
                    key={view.id}
                    onClick={() => setActiveViewId(view.id)}
                    className="relative rounded-full px-3 py-1.5 transition-colors"
                  >
                    {isActive && (
                      <motion.span
                        layoutId="view-pill"
                        className="absolute inset-0 rounded-full bg-white shadow-sm"
                        transition={{
                          type: "spring",
                          stiffness: 260,
                          damping: 24,
                        }}
                      />
                    )}
                    <span
                      className={`relative z-10 font-medium ${
                        isActive ? "text-slate-900" : "text-slate-500"
                      }`}
                    >
                      {view.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Subheadline strip */}
        <div className="flex flex-col gap-3 rounded-xl bg-slate-50 px-4 py-3 text-xs text-slate-700 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-2">
            <Timer className="h-4 w-4 text-emerald-600" />
            <span>{activeView.subtitle}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-500">
            <CalendarClock className="h-4 w-4" />
            <span>{activeView.primaryHighlight}</span>
          </div>
        </div>

        {/* KPI cards */}
        <div>
          <AnimatePresence mode="sync">
            <motion.div
              key={activeView.id + "-kpis"}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4"
            >
              {activeView.kpis.map((kpi, index) => {
                const Icon = kpi.icon;
                return (
                  <motion.div
                    key={kpi.id}
                    className="relative overflow-hidden rounded-xl bg-white px-4 py-4 shadow-sm"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.3 }}
                    whileHover={{ y: -2 }}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-slate-500">
                          {kpi.label}
                        </p>
                        <p className="mt-1 text-xl font-semibold tracking-tight text-slate-900">
                          {kpi.value}
                        </p>
                      </div>
                      {Icon && (
                        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-slate-100">
                          <Icon className="h-4 w-4 text-slate-700" />
                        </span>
                      )}
                    </div>

                    {kpi.delta && (
                      <div className="mt-2 flex items-center gap-1 text-[11px] font-medium">
                        {kpi.deltaPositive === true && (
                          <ArrowUpRight className="h-3 w-3 text-emerald-600" />
                        )}
                        {kpi.deltaPositive === false && (
                          <ArrowDownRight className="h-3 w-3 text-rose-500" />
                        )}
                        <span
                          className={
                            kpi.deltaPositive === true
                              ? "text-emerald-700"
                              : kpi.deltaPositive === false
                              ? "text-rose-600"
                              : "text-slate-500"
                          }
                        >
                          {kpi.delta}
                        </span>
                      </div>
                    )}

                    {kpi.meta && (
                      <p className="mt-1 text-[11px] text-slate-500">
                        {kpi.meta}
                      </p>
                    )}
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Chart + side panel */}
        <div className="grid gap-4 md:grid-cols-3">
          <motion.div
            key={activeView.id + "-chart"}
            className="flex flex-col rounded-xl bg-white px-5 py-5 shadow-sm md:col-span-2"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.05 }}
          >
            <LineChart config={activeView.chart} />
          </motion.div>

          <motion.div
            key={activeView.id + "-side"}
            className="flex flex-col rounded-xl bg-white px-5 py-5 shadow-sm"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <div className="mb-3 flex flex-shrink-0 items-center justify-between gap-2">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
                  {activeView.sideTitle}
                </p>
                {activeView.id === "batches" && (
                  <p className="mt-1 text-[11px] text-slate-500">
                    Each batch report includes net totals, sales, refunds, and
                    fees.
                  </p>
                )}
                {activeView.id === "daily" && (
                  <p className="mt-1 text-[11px] text-slate-500">
                    Filter by date range or merchant account from the dashboard.
                  </p>
                )}
                {activeView.id === "overview" && (
                  <p className="mt-1 text-[11px] text-slate-500">
                    The most recent authorizations across all devices and
                    channels.
                  </p>
                )}
              </div>
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-slate-100">
                {activeView.id === "overview" && (
                  <CreditCard className="h-4 w-4 text-slate-700" />
                )}
                {activeView.id === "batches" && (
                  <Activity className="h-4 w-4 text-slate-700" />
                )}
                {activeView.id === "daily" && (
                  <FileText className="h-4 w-4 text-slate-700" />
                )}
              </span>
            </div>

            <div className="flex-1 space-y-2 overflow-y-auto">
              {activeView.sideRows.map((row, index) => (
                <motion.div
                  key={row.id}
                  className="flex items-start justify-between gap-3 rounded-lg bg-slate-50 px-3 py-3"
                  initial={{ opacity: 0, y: 12, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: 0.05 + index * 0.04 }}
                >
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-medium text-slate-900">
                      {row.label}
                    </p>
                    <p className="mt-0.5 truncate text-xs text-slate-700">
                      {row.value}
                    </p>
                    {row.meta && (
                      <p className="mt-0.5 truncate text-[11px] text-slate-500">
                        {row.meta}
                      </p>
                    )}
                  </div>
                  {row.pill && (
                    <span className="mt-1 inline-flex h-6 flex-shrink-0 items-center rounded-full bg-white px-2 text-[10px] font-medium text-slate-700">
                      {row.pill}
                    </span>
                  )}
                </motion.div>
              ))}
            </div>

            <p className="mt-3 flex-shrink-0 text-[11px] text-slate-500">
              {activeView.footerNote}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

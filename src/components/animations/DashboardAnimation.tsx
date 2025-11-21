"use client";

import {
  AnimatePresence,
  motion,
  animate,
} from "framer-motion";
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
import {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";

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

// --- Animated number hook ----------------------------------------------------

function useAnimatedNumber(target: number, duration = 0.8) {
  const [value, setValue] = useState(target);
  const previous = useRef(target);

  useEffect(() => {
    const controls = animate(previous.current, target, {
      duration,
      ease: "easeOut",
      onUpdate: (v) => setValue(v),
    });

    previous.current = target;
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

// --- Chart component ---------------------------------------------------------

type LineAreaChartProps = {
  config: ChartConfig;
};

const LineAreaChart = ({ config }: LineAreaChartProps) => {
  const { values, x, label, unit } = config;
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const { path, areaPath, min, max } = useMemo(() => {
    if (!values.length) {
      return { path: "", areaPath: "", min: 0, max: 0 };
    }

    const w = 260;
    const h = 120;
    const padding = 8; // Add padding to prevent clipping
    const vMin = Math.min(...values);
    const vMax = Math.max(...values);
    const range = vMax - vMin || 1;

    const points = values.map((v, i) => {
      const t = values.length === 1 ? 0 : i / (values.length - 1);
      const x = t * w;
      // Map value to y range [h - padding, padding] (inverted y-axis)
      const y = (h - padding) - ((v - vMin) / range) * (h - 2 * padding);
      return { x, y };
    });

    const d = points
      .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`)
      .join(" ");

    const area =
      `${d} L ${points[points.length - 1].x} ${h} ` +
      `L ${points[0].x} ${h} Z`;

    return {
      path: d,
      areaPath: area,
      min: vMin,
      max: vMax,
    };
  }, [values]);

  const id = useId();
  const gradientId = `split-dashboard-gradient-${id.replace(/:/g, "")}`;

  const animatedValue = useAnimatedNumber(
    values[values.length - 1] ?? 0
  );

  const formattedCurrent = useMemo(
    () =>
      unit === "$"
        ? currencyCompact.format(animatedValue * 1000)
        : numberCompact.format(animatedValue),
    [animatedValue, unit]
  );

  return (
    <div className="flex h-full flex-col justify-between">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-400">
            {label}
          </p>
          <p className="mt-1 text-lg font-semibold text-white">
            {formattedCurrent}
          </p>
        </div>
        <div className="inline-flex items-center gap-1 rounded-full border border-white/5 bg-white/5 px-3 py-1">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          <span className="text-[11px] font-medium text-slate-200">
            Live volume
          </span>
        </div>
      </div>

      <div className="mt-5 flex-1">
        <svg
          viewBox="0 0 260 130"
          className="h-full w-full overflow-visible"
        >
          <defs>
            <linearGradient
              id={gradientId}
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop
                offset="0%"
                stopColor="#fb923c"
                stopOpacity="0.45"
              />
              <stop
                offset="100%"
                stopColor="#020617"
                stopOpacity="0"
              />
            </linearGradient>
          </defs>

          {/* horizontal grid */}
          {[0.25, 0.5, 0.75].map((t) => (
            <line
              key={t}
              x1={0}
              x2={260}
              y1={130 * t}
              y2={130 * t}
              stroke="rgba(148, 163, 184, 0.25)"
              strokeDasharray="2 4"
            />
          ))}

          <AnimatePresence>
            {areaPath && (
              <motion.path
                key="area"
                d={areaPath}
                fill={`url(#${gradientId})`}
                initial={{ opacity: 0, pathLength: 0 }}
                animate={{ opacity: 1, pathLength: 1 }}
                exit={{ opacity: 0, pathLength: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
            )}
          </AnimatePresence>

          <AnimatePresence>
            {path && (
              <motion.path
                key="line"
                d={path}
                fill="none"
                stroke="#fb923c"
                strokeWidth={2}
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                exit={{ pathLength: 0 }}
                transition={{ duration: 0.9, ease: "easeOut" }}
              />
            )}
          </AnimatePresence>

          {/* points */}
          {values.map((v, i) => {
            const t =
              values.length === 1
                ? 0
                : i / (values.length - 1);
            const xCoord = t * 260;
            const yCoord =
              120 -
              ((v - min) / (max - min || 1)) * 120;

            const active = hoverIndex === i;

            return (
              <motion.g
                key={i}
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  delay: 0.2 + i * 0.04,
                  type: "spring",
                  stiffness: 220,
                  damping: 20,
                }}
                onMouseEnter={() => setHoverIndex(i)}
                onMouseLeave={() => setHoverIndex(null)}
              >
                <circle
                  cx={xCoord}
                  cy={yCoord}
                  r={5}
                  fill="#020617"
                  stroke="#fb923c"
                  strokeWidth={2}
                />
                {active && (
                  <motion.circle
                    cx={xCoord}
                    cy={yCoord}
                    r={9}
                    stroke="#fb923c"
                    strokeWidth={1}
                    fill="transparent"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                    }}
                  />
                )}
              </motion.g>
            );
          })}
        </svg>
      </div>

      {/* x labels */}
      <div className="mt-1 flex items-center justify-between text-[11px] text-slate-400">
        {x.map((label) => (
          <span key={label}>{label}</span>
        ))}
      </div>
    </div>
  );
};

// --- View data ---------------------------------------------------------------

const VIEWS: ViewConfig[] = [
  {
    id: "overview",
    label: "Overview",
    pill: "Unified",
    subtitle:
      "Snapshot across card-present, online, and funding.",
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
    subtitle:
      "Every closed batch, with exact end time and batch number.",
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
    subtitle:
      "Daily transaction reports aligned to your report time.",
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

// --- Main component ----------------------------------------------------------

export default function DashboardAnimation() {
  const [activeViewId, setActiveViewId] = useState<ViewId>("overview");
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

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

  // Measure container
  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new ResizeObserver(([entry]) => {
      if (entry && entry.contentRect) {
        setDimensions({
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        });
      }
    });

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const activeView = useMemo(
    () => VIEWS.find((v) => v.id === activeViewId) ?? VIEWS[0],
    [activeViewId]
  );

  // Calculate scale to fit container while maintaining aspect ratio
  // We design for a "base" size that looks good
  const baseWidth = 1200;
  const baseHeight = 750;

  const scaleX = dimensions.width > 0 ? dimensions.width / baseWidth : 1;
  const scaleY = dimensions.height > 0 ? dimensions.height / baseHeight : 1;

  // Use the smaller scale to ensure it fits both dimensions (contain)
  // Or use scaleX to fill width and let height adjust?
  // The user said "entire dashboard isn't being rendered inside", implying overflow.
  // "Contain" strategy is safest.
  const scale = Math.min(scaleX, scaleY);

  // If container is very small, we might want to switch to a mobile layout instead of scaling too small.
  // But for now, let's stick to the "graphic replacement" goal which implies preserving the look.
  // We'll clamp the scale slightly to avoid microscopic rendering, but mostly let it scale.

  return (
    <div
      ref={containerRef}
      className="relative h-full w-full overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[#020617] to-[#020617] text-white shadow-[0_30px_120px_rgba(15,23,42,0.85)]"
    >
      {/* soft ambient glows - fixed to container */}
      <div className="pointer-events-none absolute -left-10 -top-10 h-56 w-56 rounded-full bg-emerald-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 bottom-0 h-64 w-64 rounded-full bg-orange-500/10 blur-3xl" />

      {/* Scaled Content Wrapper */}
      <div
        className="absolute left-1/2 top-1/2 origin-center"
        style={{
          width: baseWidth,
          height: baseHeight,
          transform: `translate(-50%, -50%) scale(${scale})`,
        }}
      >
        <div className="relative z-10 flex h-full w-full flex-col gap-6 p-10">
          {/* Header */}
          <div className="flex flex-shrink-0 items-start justify-between gap-4">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-400">
                Real-time analytics
              </p>
              <div className="mt-2 flex items-center gap-3">
                <h3 className="text-3xl font-semibold tracking-tight">
                  {activeView.id === "overview" && "March 2024"}
                  {activeView.id === "batches" && "Online batch reports"}
                  {activeView.id === "daily" && "Daily transaction reports"}
                </h3>
                {activeView.pill && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-white/5 px-3 py-1 text-[11px] font-medium text-slate-100 border border-white/10">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    {activeView.pill}
                  </span>
                )}
              </div>
              <p className="mt-1 text-xs text-slate-400">
                {activeView.periodLabel}
              </p>
            </div>

            <div className="flex flex-col items-end gap-3 text-right">
              <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1 text-[11px] font-medium text-emerald-300 border border-emerald-500/30">
                <motion.span
                  className="inline-flex h-2 w-2 rounded-full bg-emerald-400"
                  animate={{
                    opacity: [0.3, 1, 0.3],
                    scale: [1, 1.08, 1],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 1.6,
                    ease: "easeInOut",
                  }}
                />
                Live processor feed
              </div>

              {/* View switcher */}
              <div className="flex items-center gap-1 rounded-full bg-white/5 p-1 text-xs">
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
                          className="absolute inset-0 rounded-full bg-white text-slate-900"
                          transition={{
                            type: "spring",
                            stiffness: 260,
                            damping: 24,
                          }}
                        />
                      )}
                      <span
                        className={`relative z-10 font-medium ${isActive ? "text-slate-900" : "text-slate-200/80"
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

          {/* Subheadline */}
          <div className="flex flex-shrink-0 items-center justify-between gap-3 rounded-2xl border border-white/5 bg-white/5 px-4 py-3 text-xs text-slate-200/90">
            <div className="flex items-center gap-2">
              <Timer className="h-4 w-4 text-emerald-300" />
              <span>{activeView.subtitle}</span>
            </div>
            <div className="flex items-center gap-2">
              <CalendarClock className="h-4 w-4 text-slate-300" />
              <span className="text-slate-400">
                {activeView.primaryHighlight}
              </span>
            </div>
          </div>

          {/* KPIs */}
          <div className="flex-shrink-0">
            <AnimatePresence mode="sync">
              <motion.div
                key={activeView.id + "-kpis"}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35 }}
                className="grid grid-cols-4 gap-3"
              >
                {activeView.kpis.map((kpi, index) => {
                  const targetNumber = parseFloat(kpi.value.replace(/[^0-9.]/g, "") || "0") || 0;
                  const animated = useAnimatedNumber(targetNumber);

                  const formatted = useMemo(() => {
                    if (kpi.id.includes("revenue") || kpi.id.includes("net") || kpi.id.includes("fees") || kpi.value.startsWith("$")) {
                      return currencyCompact.format(animated * (kpi.id === "fees" ? 1 : 1000));
                    }
                    if (kpi.id.includes("transactions") || kpi.id.includes("sales") || kpi.id.includes("refund") || kpi.value.match(/^\d/)) {
                      return numberCompact.format(animated);
                    }
                    return kpi.value;
                  }, [animated, kpi.id, kpi.value]);

                  const Icon = kpi.icon;

                  return (
                    <motion.div
                      key={kpi.id}
                      className="relative overflow-hidden rounded-2xl border border-white/5 bg-white/5 px-4 py-4 shadow-[0_16px_40px_rgba(15,23,42,0.65)]"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05, duration: 0.4 }}
                      whileHover={{ y: -2, boxShadow: "0 24px 70px rgba(15,23,42,0.9)" }}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-slate-400">
                            {kpi.label}
                          </p>
                          <p className="mt-1 text-xl font-semibold tracking-tight text-white">
                            {kpi.value.startsWith("$") || kpi.value.match(/^\d/) ? formatted : kpi.value}
                          </p>
                        </div>
                        {Icon && (
                          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-black/40">
                            <Icon className="h-4 w-4 text-slate-200" />
                          </span>
                        )}
                      </div>

                      {kpi.delta && (
                        <div className="mt-2 flex items-center gap-1 text-[11px] font-medium">
                          {kpi.deltaPositive === true && <ArrowUpRight className="h-3 w-3 text-emerald-400" />}
                          {kpi.deltaPositive === false && <ArrowDownRight className="h-3 w-3 text-rose-400" />}
                          <span className={kpi.deltaPositive === true ? "text-emerald-300" : kpi.deltaPositive === false ? "text-rose-300" : "text-slate-300"}>
                            {kpi.delta}
                          </span>
                        </div>
                      )}

                      {kpi.meta && (
                        <p className="mt-1 text-[11px] text-slate-400">
                          {kpi.meta}
                        </p>
                      )}

                      {/* subtle corner highlight */}
                      <div className="pointer-events-none absolute -right-8 -top-8 h-16 w-16 rounded-full bg-orange-500/10 blur-xl" />
                    </motion.div>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Lower grid: chart + side panel */}
          <div className="grid min-h-0 flex-1 grid-cols-3 gap-4">
            <motion.div
              key={activeView.id + "-chart"}
              className="col-span-2 flex flex-col rounded-2xl border border-white/5 bg-black/20 px-5 py-5"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <LineAreaChart config={activeView.chart} />
            </motion.div>

            <motion.div
              key={activeView.id + "-side"}
              className="col-span-1 flex flex-col rounded-2xl border border-white/5 bg-black/20 px-5 py-5"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 }}
            >
              <div className="mb-3 flex items-center justify-between gap-2 flex-shrink-0">
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400">
                    {activeView.sideTitle}
                  </p>
                  {activeView.id === "batches" && (
                    <p className="mt-1 text-[11px] text-slate-400">
                      Each batch report includes net totals, sales, refunds, and fees.
                    </p>
                  )}
                  {activeView.id === "daily" && (
                    <p className="mt-1 text-[11px] text-slate-400">
                      Filter by date range or merchant account from the dashboard.
                    </p>
                  )}
                  {activeView.id === "overview" && (
                    <p className="mt-1 text-[11px] text-slate-400">
                      The most recent authorizations across all devices and channels.
                    </p>
                  )}
                </div>
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/5">
                  {activeView.id === "overview" && <CreditCard className="h-4 w-4 text-slate-200" />}
                  {activeView.id === "batches" && <Activity className="h-4 w-4 text-slate-200" />}
                  {activeView.id === "daily" && <FileText className="h-4 w-4 text-slate-200" />}
                </span>
              </div>

              <div className="flex-1 space-y-2 overflow-hidden overflow-y-auto custom-scrollbar">
                {activeView.sideRows.map((row, index) => (
                  <motion.div
                    key={row.id}
                    className="flex items-start justify-between gap-3 rounded-xl bg-white/3 px-3 py-3"
                    initial={{ opacity: 0, y: 12, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ delay: 0.05 + index * 0.04 }}
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-slate-100 truncate">
                        {row.label}
                      </p>
                      <p className="mt-0.5 text-xs text-slate-300 truncate">
                        {row.value}
                      </p>
                      {row.meta && (
                        <p className="mt-0.5 text-[11px] text-slate-500 truncate">
                          {row.meta}
                        </p>
                      )}
                    </div>
                    {row.pill && (
                      <span className="mt-1 inline-flex h-6 items-center rounded-full bg-white/5 px-2 text-[10px] font-medium text-slate-200 flex-shrink-0">
                        {row.pill}
                      </span>
                    )}
                  </motion.div>
                ))}
              </div>

              <p className="mt-3 text-[11px] text-slate-500 flex-shrink-0">
                {activeView.footerNote}
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { AnimatePresence, motion, animate } from "framer-motion";
import {
    Activity,
    ArrowDownRight,
    ArrowUpRight,
    CalendarClock,
    CreditCard,
    FileText,
    WalletCards,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useEffect, useMemo, useRef, useState, useId } from "react";

type PeriodId = "week";

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

type Point = { x: number; y: number };

const CHART_ACCENT = "#ffffff";
const BRAND_ORANGE = "#FF4306";

function createSmoothPath(points: Point[], smoothing = 0.2) {
    if (!points.length) return "";

    const controlPoint = (
        current: Point,
        previous?: Point,
        next?: Point,
        reverse = false
    ): Point => {
        const p = previous ?? current;
        const n = next ?? current;
        const o = {
            x: (n.x - p.x) * smoothing,
            y: (n.y - p.y) * smoothing,
        };

        return {
            x: current.x - (reverse ? o.x : -o.x),
            y: current.y - (reverse ? o.y : -o.y),
        };
    };

    const d = [`M ${points[0].x} ${points[0].y}`];

    for (let i = 1; i < points.length; i++) {
        const cps = controlPoint(points[i - 1], points[i - 2], points[i]);
        const cpe = controlPoint(points[i], points[i - 1], points[i + 1], true);
        d.push(`C ${cps.x} ${cps.y} ${cpe.x} ${cpe.y} ${points[i].x} ${points[i].y}`);
    }

    return d.join(" ");
}

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

const PERIODS: PeriodConfig[] = [
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
];

export function AnalyticsGraphic() {
    const active = PERIODS[0]; // Always show week view
    const animatedTotal = useAnimatedNumber(active.totalK);
    const formattedTotal = useMemo(
        () => currencyCompact.format(animatedTotal * 1000),
        [animatedTotal]
    );

    return (
        <div className="w-full max-w-4xl mx-auto bg-[#111111] rounded-3xl overflow-hidden shadow-2xl border border-white/10 p-6 md:p-8">
            <div className="flex flex-col md:flex-row gap-8">
                {/* Left Column: Metrics & List */}
                <div className="flex-1 space-y-8">
                    {/* Header Metric */}
                    <div className="space-y-1">
                        <h3 className="text-4xl md:text-5xl font-bold tracking-tight text-white" suppressHydrationWarning>
                            {formattedTotal}
                        </h3>
                        <p className="text-sm font-medium text-gray-400">{active.totalLabel}</p>
                    </div>

                    {/* Channel List */}
                    <div className="space-y-3">
                        {active.channels.map((row) => {
                            const positive = row.deltaPct >= 0;
                            const Icon = row.icon;
                            return (
                                <div
                                    key={row.id}
                                    className="group flex items-center justify-between rounded-xl p-3 transition-colors hover:bg-white/5"
                                >
                                    <div className="flex items-center gap-3">
                                        {Icon && (
                                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#222222] text-white group-hover:bg-[#333333] transition-all">
                                                <Icon className="h-5 w-5" />
                                            </div>
                                        )}
                                        <div>
                                            <p className="text-sm font-bold text-white">{row.label}</p>
                                            <p className="text-xs font-medium text-gray-500">{row.descriptor}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-bold text-white" suppressHydrationWarning>
                                            {currencyCompact.format(row.amountK * 1000)}
                                        </p>
                                        <div className={`flex items-center justify-end gap-0.5 text-xs font-bold ${positive ? "text-emerald-500" : "text-rose-500"}`}>
                                            {positive ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                                            <span>{positive ? "+" : ""}{row.deltaPct.toFixed(1)}%</span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Right Column: Chart */}
                <div className="flex-1 flex flex-col">
                    <div className="flex items-center justify-between gap-2 mb-4">
                        <div className="space-y-0.5">
                            <p className="text-xs font-bold uppercase tracking-widest text-gray-500">
                                {active.chart.label}
                            </p>
                            <p className="text-2xl font-bold text-white" suppressHydrationWarning>
                                {currencyCompact.format(active.chart.values[active.chart.values.length - 1] * 1000)}
                            </p>
                        </div>
                        {/* Live Indicator and Meta */}
                        <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1.5 text-[10px] font-medium text-gray-400">
                                <CalendarClock className="h-3 w-3 text-gray-500" />
                                <span className="hidden sm:inline">{active.meta}</span>
                            </div>
                            <div className="hidden sm:block w-px h-3 bg-gray-800" />
                            <div className="flex items-center gap-1.5 text-[10px] font-medium text-gray-400">
                                <WalletCards className="h-3 w-3 text-gray-500" />
                                <span>TSYS · FD Omaha</span>
                            </div>
                            <div className="relative flex h-2 w-2 ml-2">
                                <span
                                    className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"
                                    style={{ backgroundColor: BRAND_ORANGE }}
                                ></span>
                                <span
                                    className="relative inline-flex h-2 w-2 rounded-full"
                                    style={{ backgroundColor: BRAND_ORANGE }}
                                ></span>
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 relative min-h-[200px]">
                        <svg
                            viewBox="0 0 260 130"
                            className="w-full h-full overflow-visible"
                            preserveAspectRatio="none"
                        >
                            <defs>
                                <linearGradient id="analytics-chart-grad" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor={CHART_ACCENT} stopOpacity="0.15" />
                                    <stop offset="100%" stopColor={CHART_ACCENT} stopOpacity="0" />
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
                                    stroke="rgba(255,255,255,0.05)"
                                    strokeWidth={1}
                                    strokeDasharray="4 4"
                                />
                            ))}

                            {(() => {
                                const values = active.chart.values;
                                if (!values.length) return null;

                                // Add padding so chart points don't get clipped
                                const padding = { top: 15, bottom: 15, left: 10, right: 10 };
                                const w = 260 - padding.left - padding.right;
                                const h = 130 - padding.top - padding.bottom;

                                const vMin = Math.min(...values);
                                const vMax = Math.max(...values);
                                const vRange = vMax - vMin || 1;

                                const points = values.map((val, i) => ({
                                    x: padding.left + (i / (values.length - 1)) * w,
                                    y: padding.top + ((vMax - val) / vRange) * h
                                }));

                                const linePath = createSmoothPath(points);

                                const areaPath = `${linePath} L ${260 - padding.right} ${130 - padding.bottom} L ${padding.left} ${130 - padding.bottom} Z`;

                                return (
                                    <>
                                        <motion.path
                                            d={areaPath}
                                            fill="url(#analytics-chart-grad)"
                                            animate={{ opacity: 1 }}
                                            transition={{ duration: 0.5 }}
                                        />
                                        <motion.path
                                            d={linePath}
                                            fill="none"
                                            stroke={CHART_ACCENT}
                                            strokeWidth={1.5}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            animate={{ pathLength: 1 }}
                                            transition={{ duration: 0.7, ease: "easeOut" }}
                                        />
                                        {points.map((point, i) => (
                                            <circle
                                                key={i}
                                                cx={point.x}
                                                cy={point.y}
                                                r={2}
                                                fill={CHART_ACCENT}
                                            />
                                        ))}
                                    </>
                                );
                            })()}
                        </svg>
                    </div>
                    {/* X-axis labels */}
                    <div className="flex items-center justify-between text-[10px] font-semibold text-gray-500 mt-2">
                        {active.chart.x.map((label, i) => (
                            <span key={i}>{label}</span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

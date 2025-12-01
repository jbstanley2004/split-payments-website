"use client";

import { motion } from "framer-motion";
import { useMemo, useState, useEffect } from "react";
import { TICKER_PERIODS } from "@/components/MetricsStrip";

type Point = { x: number; y: number };

const CHART_ACCENT = "#111111";

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

export default function BackgroundChart({ className }: { className?: string }) {
    // Sync with MetricsStrip - cycle through periods every 5 seconds
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % TICKER_PERIODS.length);
        }, 5000); // Match MetricsStrip timing

        return () => clearInterval(interval);
    }, []);

    // Get current period's chart values
    const values = TICKER_PERIODS[activeIndex].chartValues;

    const { areaPath, linePath, points } = useMemo(() => {
        if (!values.length) return { areaPath: "", linePath: "", points: [] };

        // Dimensions for the SVG
        const width = 1000;
        const height = 300;
        const padding = { top: 50, bottom: 20, left: 0, right: 0 };

        const w = width - padding.left - padding.right;
        const h = height - padding.top - padding.bottom;

        const vMin = Math.min(...values);
        const vMax = Math.max(...values);
        const vRange = vMax - vMin || 1;

        const pts = values.map((val, i) => ({
            x: padding.left + (i / (values.length - 1)) * w,
            y: padding.top + ((vMax - val) / vRange) * h
        }));

        const lPath = createSmoothPath(pts);
        const aPath = `${lPath} L ${width} ${height} L ${0} ${height} Z`;

        return { areaPath: aPath, linePath: lPath, points: pts };
    }, [values]);

    return (
        <div className={`w-full h-full ${className}`}>
            <svg
                viewBox="0 0 1000 300"
                className="w-full h-full overflow-visible"
                preserveAspectRatio="none"
            >
                <defs>
                    <linearGradient id="bg-chart-grad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={CHART_ACCENT} stopOpacity="0.08" />
                        <stop offset="100%" stopColor={CHART_ACCENT} stopOpacity="0" />
                    </linearGradient>
                </defs>

                <motion.path
                    d={areaPath}
                    fill="url(#bg-chart-grad)"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, d: areaPath }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                />
                <motion.path
                    d={linePath}
                    fill="none"
                    stroke={CHART_ACCENT}
                    strokeWidth={2}
                    strokeOpacity={0.15}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1, d: linePath }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                />

                {/* Reference Dots */}
                {points.map((point, i) => (
                    <motion.circle
                        key={`${activeIndex}-${i}`}
                        cx={point.x}
                        cy={point.y}
                        r={3}
                        fill={CHART_ACCENT}
                        opacity={0.3}
                        initial={{ scale: 0 }}
                        animate={{
                            scale: 1,
                            cx: point.x,
                            cy: point.y
                        }}
                        transition={{ duration: 1, ease: "easeInOut" }}
                    />
                ))}
            </svg>
        </div>
    );
}

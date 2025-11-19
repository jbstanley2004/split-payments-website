"use client";

import * as React from "react";
import { motion, useAnimation } from "framer-motion";

export type FanStackCardsProps = {
  svgs: (string | React.ReactNode)[]; // 4 items in order
  className?: string;
  darkOnTop?: boolean;
  hoverParallax?: number;
  delay?: number;
};

const clamp = (n: number, min: number, max: number) =>
  Math.max(min, Math.min(max, n));

function isSvgMarkup(s: unknown): s is string {
  return typeof s === "string" && s.trim().startsWith("<svg");
}

const cardBase =
  "rounded-3xl ring-1 ring-black/10 dark:ring-white/15 overflow-hidden bg-transparent";

export default function FanStackCards({
  svgs,
  className = "",
  darkOnTop = true,
  hoverParallax = 18,
  delay = 0.2,
}: FanStackCardsProps) {
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const [bounds, setBounds] = React.useState({ w: 0, h: 0, x: 0, y: 0 });
  const [pointer, setPointer] = React.useState({ x: 0, y: 0 });
  const controls = useAnimation();

  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  React.useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setBounds({ w: rect.width, h: rect.height, x: rect.left, y: rect.top });
  }, []);

  // Fan-out on mount
  React.useEffect(() => {
    if (prefersReduced) return;
    const sequence = async () => {
      await controls.start(() => ({
        x: 0,
        y: 0,
        rotate: 0,
        scale: 1,
        transition: { duration: 0 },
      }));
      await controls.start((i: number) => ({
        x: [0, fanOffsets[i].x],
        y: [0, fanOffsets[i].y],
        rotate: [0, fanOffsets[i].r],
        transition: {
          delay: delay + i * 0.06,
          duration: 0.6,
          ease: [0.22, 1, 0.36, 1],
        },
      }));
    };
    sequence();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prefersReduced]);

  const onPointerMove = (e: React.PointerEvent) => {
    const cx = bounds.x + bounds.w / 2;
    const cy = bounds.y + bounds.h / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    setPointer({ x: dx, y: dy });
  };

  const onLeave = () => setPointer({ x: 0, y: 0 });

  const cards = darkOnTop ? svgs : [...svgs].reverse();

  return (
    <div
      ref={containerRef}
      onPointerMove={onPointerMove}
      onPointerLeave={onLeave}
      className={"relative mx-auto w-full max-w-6xl " + className}
      aria-label="Working capital feature cards"
      role="group"
    >
      <div className="relative aspect-[16/10] w-full">
        {cards.map((node, idx) => {
          const i = idx; // 0..3 (top to bottom)
          const p = prefersReduced ? { x: 0, y: 0 } : parallax(pointer, i, hoverParallax);
          const z = 50 - i;

          return (
            <motion.div
              key={idx}
              custom={i}
              animate={controls}
              style={{ zIndex: z, translateX: p.x, translateY: p.y }}
              className={`absolute inset-0 ${cardBase}`}
              initial={false}
            >
              <CardMedia node={node} />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

const fanOffsets = [
  { x: 0, y: 0, r: 0 },        // (1) front
  { x: -12, y: 12, r: -1.5 },  // (2)
  { x: 12, y: 24, r: 1.5 },    // (3)
  { x: 0, y: 36, r: 0.75 },    // (4)
];

function parallax(pointer: { x: number; y: number }, index: number, max = 16) {
  const depth = 1 - index * 0.18; // farther cards move less
  const tx = clamp((pointer.x / 240) * max * depth, -max, max);
  const ty = clamp((pointer.y / 240) * max * depth, -max, max);
  return { x: tx, y: ty };
}

function CardMedia({ node }: { node: string | React.ReactNode }) {
  if (isSvgMarkup(node)) {
    return (
      <div
        className="h-full w-full"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: node }}
      />
    );
  }
  if (typeof node === "string") {
    return <img src={node} className="h-full w-full object-cover" alt="" />;
  }
  return <div className="h-full w-full">{node}</div>;
}

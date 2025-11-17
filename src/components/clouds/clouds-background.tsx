"use client";

import clsx from "clsx";
import type { CSSProperties } from "react";

const CLOUD_BLOBS = [
  {
    id: "north",
    size: 720,
    top: "-6%",
    left: "-8%",
    blur: 40,
    opacity: 0.35,
    duration: 140,
    delay: 0,
    start: "-12%",
    end: "6%",
    scale: 1.05,
    gradient:
      "radial-gradient(circle at 30% 30%, rgba(244,237,225,0.65), rgba(217,119,87,0.2) 55%, transparent 75%)",
  },
  {
    id: "center",
    size: 680,
    top: "12%",
    left: "30%",
    blur: 35,
    opacity: 0.45,
    duration: 165,
    delay: -20,
    start: "-5%",
    end: "12%",
    scale: 1.1,
    gradient:
      "radial-gradient(circle at 40% 30%, rgba(248,244,236,0.55), rgba(188,209,202,0.3) 45%, transparent 70%)",
  },
  {
    id: "south-west",
    size: 540,
    top: "45%",
    left: "-15%",
    blur: 45,
    opacity: 0.3,
    duration: 130,
    delay: -10,
    start: "-8%",
    end: "14%",
    scale: 0.95,
    gradient:
      "radial-gradient(circle at 60% 40%, rgba(243,230,215,0.5), rgba(203,202,219,0.25) 50%, transparent 75%)",
  },
  {
    id: "south-east",
    size: 620,
    top: "48%",
    left: "55%",
    blur: 38,
    opacity: 0.32,
    duration: 150,
    delay: -35,
    start: "-10%",
    end: "18%",
    scale: 1.05,
    gradient:
      "radial-gradient(circle at 35% 45%, rgba(248,244,236,0.6), rgba(106,155,204,0.25) 45%, transparent 70%)",
  },
  {
    id: "far-east",
    size: 500,
    top: "-2%",
    left: "70%",
    blur: 50,
    opacity: 0.25,
    duration: 175,
    delay: -15,
    start: "-15%",
    end: "10%",
    scale: 0.9,
    gradient:
      "radial-gradient(circle at 25% 25%, rgba(243,228,211,0.45), rgba(188,209,202,0.2) 50%, transparent 75%)",
  },
  {
    id: "ground-fog",
    size: 780,
    top: "65%",
    left: "20%",
    blur: 55,
    opacity: 0.4,
    duration: 155,
    delay: -50,
    start: "-6%",
    end: "10%",
    scale: 1.15,
    gradient:
      "radial-gradient(circle at 50% 30%, rgba(248,244,236,0.55), rgba(217,119,87,0.22) 55%, transparent 80%)",
  },
] as const;

export function CloudsBackground({ className }: { className?: string }) {
  return (
    <div className={clsx("clouds-background pointer-events-none absolute inset-0 overflow-hidden", className)}>
      <div className="absolute inset-0 bg-gradient-to-b from-[#050405] via-[#1a1510] to-[#35271b]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,rgba(217,119,87,0.28),transparent_58%)] opacity-60" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_5%,rgba(106,155,204,0.25),transparent_60%)] opacity-40" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_80%,rgba(188,209,202,0.35),transparent_62%)] opacity-50" />

      {CLOUD_BLOBS.map((blob) => {
        const style: CSSProperties = {
          width: `${blob.size}px`,
          height: `${blob.size}px`,
          top: blob.top,
          left: blob.left,
          filter: `blur(${blob.blur}px)`,
          animationDuration: `${blob.duration}s, ${blob.duration * 0.6}s`,
          animationDelay: `${blob.delay}s, ${blob.delay * 0.4}s`,
          background: blob.gradient,
          mixBlendMode: "screen",
          "--x-start": blob.start,
          "--x-end": blob.end,
          "--cloud-scale": blob.scale,
          "--cloud-opacity": blob.opacity,
        };

        return <span key={blob.id} className="cloud-blob" style={style} aria-hidden />;
      })}

      <div className="absolute inset-x-[-10%] top-1/4 h-1/2 rotate-2 bg-gradient-to-r from-transparent via-white/15 to-transparent blur-3xl opacity-30" />
      <div className="absolute inset-x-0 bottom-0 h-[35vh] bg-gradient-to-b from-transparent via-[#1a1510]/20 to-[#050405]" />

      <style jsx>{`
        .clouds-background {
          background: radial-gradient(circle at 20% 20%, rgba(12, 8, 6, 0.35), rgba(5, 4, 5, 0.85));
        }

        .cloud-blob {
          position: absolute;
          border-radius: 9999px;
          opacity: var(--cloud-opacity, 0.4);
          animation-name: cloud-drift, cloud-pulse;
          animation-timing-function: linear, ease-in-out;
          animation-iteration-count: infinite;
          will-change: transform, opacity, filter;
        }

        @keyframes cloud-drift {
          0% {
            transform: translate3d(var(--x-start, -12%), 0, 0) scale(var(--cloud-scale, 1));
          }
          100% {
            transform: translate3d(var(--x-end, 12%), 0, 0) scale(var(--cloud-scale, 1));
          }
        }

        @keyframes cloud-pulse {
          0%,
          100% {
            opacity: var(--cloud-opacity, 0.4);
          }
          50% {
            opacity: calc(var(--cloud-opacity, 0.4) * 0.65);
          }
        }
      `}</style>
    </div>
  );
}

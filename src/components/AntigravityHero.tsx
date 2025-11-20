"use client";

import React, { useEffect, useRef } from "react";

// Antigravity-style hero card with specs that orbit the cursor
// This component is self-contained and uses inline styles for transforms,
// so you can drop it into any layout that uses Tailwind for spacing/typography.

export function AntigravityHero() {
  const heroRef = useRef<HTMLDivElement | null>(null);
  const deviceRef = useRef<HTMLDivElement | null>(null);
  const specsRef = useRef<(HTMLDivElement | null)[]>([]);
  const cursorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const hero = heroRef.current;
    const device = deviceRef.current;
    const cursor = cursorRef.current;
    const specNodes = specsRef.current;

    if (!hero || !device || !cursor || !specNodes.length) return;

    let rect = hero.getBoundingClientRect();
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let animationFrame: number;

    const updateRect = () => {
      rect = hero.getBoundingClientRect();
    };

    const handleMove = (event: MouseEvent) => {
      const { left, top, width, height } = rect;
      const x = (event.clientX - left) / width;
      const y = (event.clientY - top) / height;

      const nx = (x - 0.5) * 2;
      const ny = (y - 0.5) * 2;

      targetX = nx;
      targetY = ny;

      cursor.style.opacity = "1";
      cursor.style.transform = `translate3d(${event.clientX - left}px, ${event.clientY - top}px, 0)`;
    };

    const handleLeave = () => {
      targetX = 0;
      targetY = 0;
      cursor.style.opacity = "0";
    };

    const animate = () => {
      currentX += (targetX - currentX) * 0.14;
      currentY += (targetY - currentY) * 0.14;

      const tiltX = currentY * -10;
      const tiltY = currentX * 18;
      const lift = (Math.abs(currentX) + Math.abs(currentY)) * 10 + 18;

      device.style.transform =
        `translate3d(0,0,0) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translate3d(0,0,${lift}px)`;

      specNodes.forEach((node) => {
        if (!node) return;
        const depthAttr = node.getAttribute("data-depth");
        const depth = depthAttr ? parseFloat(depthAttr) : 1;
        const offsetX = currentX * 32 * depth;
        const offsetY = currentY * -28 * depth;
        node.style.transform = `translate3d(${offsetX}px, ${offsetY}px, 0)`;
      });

      animationFrame = requestAnimationFrame(animate);
    };

    const handleResize = () => updateRect();
    const handleScroll = () => updateRect();

    hero.addEventListener("mousemove", handleMove);
    hero.addEventListener("mouseleave", handleLeave);
    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);

    animationFrame = requestAnimationFrame(animate);

    return () => {
      hero.removeEventListener("mousemove", handleMove);
      hero.removeEventListener("mouseleave", handleLeave);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative mt-8 w-full max-w-5xl mx-auto rounded-[32px] border border-black/5 bg-gradient-to-b from-slate-900 via-slate-950 to-black text-white overflow-hidden shadow-[0_30px_70px_rgba(15,23,42,0.8)]"
    >
      {/* Gradient orbits */}
      <div className="pointer-events-none absolute inset-[-30%] bg-[radial-gradient(circle_at_0%_0%,rgba(56,189,248,0.3),transparent_55%),radial-gradient(circle_at_120%_70%,rgba(244,114,182,0.35),transparent_55%)] opacity-90 mix-blend-screen" />

      <div className="relative z-10 grid gap-10 px-8 py-10 md:px-12 md:py-12 lg:grid-cols-[1.15fr_minmax(0,0.85fr)] items-center">
        <div className="space-y-4 max-w-md">
          <p className="text-xs tracking-[0.2em] uppercase text-cyan-300/80">
            Split hardware spotlight
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight">
            Specs that orbit your cursor.
          </h2>
          <p className="text-sm md:text-base text-slate-200/80 leading-relaxed">
            Move across the card and watch key hardware specs subtly follow your pointer, echoing the antigravity demo while staying performant in Next.js.
          </p>
          <ul className="mt-4 space-y-2 text-sm text-slate-200/80">
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
              <span>3D tilt driven by real-time pointer position.</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
              <span>Spec pills move at different depths for parallax.</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
              <span>Fully self-contained and reusable UI block.</span>
            </li>
          </ul>
        </div>

        <div className="relative h-[260px] md:h-[320px] lg:h-[360px]">
          {/* 3D device */}
          <div
            ref={deviceRef}
            className="absolute inset-[12%] rounded-[24px] bg-gradient-to-br from-slate-800 via-slate-900 to-black border border-white/10 shadow-[0_22px_60px_rgba(15,23,42,0.9)] will-change-transform"
            style={{ transformStyle: "preserve-3d" }}
          >
            <div className="absolute inset-[14%] rounded-[18px] bg-gradient-to-b from-slate-900 via-black to-slate-950 border border-white/5" />
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 h-6 w-24 rounded-full bg-gradient-to-r from-cyan-400/90 to-slate-900/90 opacity-80 blur-[0.5px]" />
          </div>

          {/* Spec pills */}
          <div className="pointer-events-none">
            <SpecPill
              index={0}
              specsRef={specsRef}
              depth={1.1}
              className="left-[10%] top-[14%]"
              label="Battery"
              value="24 hr adaptive"
            />
            <SpecPill
              index={1}
              specsRef={specsRef}
              depth={1.6}
              className="right-[4%] top-[40%]"
              label="Display"
              value="6.7 in, 120 Hz"
            />
            <SpecPill
              index={2}
              specsRef={specsRef}
              depth={2}
              className="left-[34%] bottom-[10%]"
              label="Weight"
              value="Under 180 g"
            />
          </div>

          {/* Soft cursor inside the hero */}
          <div
            ref={cursorRef}
            className="pointer-events-none absolute h-5 w-5 rounded-full border border-cyan-300/70 shadow-[0_0_0_1px_rgba(15,23,42,1),0_0_55px_rgba(56,189,248,0.25)] mix-blend-screen opacity-0 transition-opacity duration-150"
            style={{ transform: "translate3d(-9999px,-9999px,0)" }}
          />
        </div>
      </div>
    </section>
  );
}

interface SpecPillProps {
  index: number;
  specsRef: React.MutableRefObject<(HTMLDivElement | null)[]>;
  depth: number;
  className?: string;
  label: string;
  value: string;
}

function SpecPill({ index, specsRef, depth, className = "", label, value }: SpecPillProps) {
  return (
    <div
      ref={(node) => {
        specsRef.current[index] = node;
      }}
      data-depth={depth}
      className={"absolute flex items-start gap-2 rounded-full border border-white/20 bg-black/80 px-3.5 py-2 text-xs md:text-[0.8rem] text-slate-100 shadow-[0_16px_40px_rgba(15,23,42,0.9)] backdrop-blur-md will-change-transform " + className}
    >
      <span className="mt-[3px] h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_0_4px_rgba(34,211,238,0.2)]" />
      <span className="flex flex-col leading-tight">
        <span className="text-[0.68rem] uppercase tracking-[0.18em] text-cyan-300/80">{label}</span>
        <span className="font-medium text-slate-50">{value}</span>
      </span>
    </div>
  );
}

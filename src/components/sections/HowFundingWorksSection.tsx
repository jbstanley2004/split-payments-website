"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { motion, animate, useMotionValue, useTransform } from "framer-motion";
import type { AnimationPlaybackControls, PanInfo } from "framer-motion";

const timelineSteps = [
  {
    label: "Day 0",
    title: "Sign your funding agreement",
    body: "Once we confirm your processing history, we send a simple agreement. As soon as it’s signed, we move straight into activation.",
  },
  {
    label: "Day 0–2",
    title: "Merchant account & equipment activated",
    body: "We set up your merchant account and whatever you need for processing—software integration, online gateway, or physical terminal. If hardware is required, we ship and activate it remotely.",
  },
  {
    label: "Day 3–5",
    title: "Funding deployed",
    body: "As soon as your account is active, we deploy your funding directly into your business bank account so you can put it to work. No separate application for the first round.",
  },
];

const fundingStages = [
  { id: 1, label: "Funding deployed", description: "Capital lands in your business bank account." },
  { id: 2, label: "Repayment as you process", description: "A fixed percentage of each card sale goes toward repayment." },
  { id: 3, label: "Balance paid down", description: "Your advance balance decreases with each batch." },
  { id: 4, label: "Volume stays healthy", description: "Sales stay at or above baseline." },
];

function AutoQualificationBlock() {
  return (
    <section className="mb-12 border-b border-border-subtle pb-10">
      <header className="mb-6 max-w-2xl">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-subtle">
          Eligibility
        </p>
        <h3 className="mt-2 text-2xl md:text-3xl font-poppins font-semibold text-main">
          You don’t apply — you qualify automatically
        </h3>
        <p className="mt-3 text-sm md:text-base text-subtle">
          If your volume and history fit our model, we proactively extend funding offers based on your processing. No lengthy application or hard credit pull to get started.
          <span className="font-semibold text-main"> If you’re processing with us and your numbers qualify, we’ll tap you on the shoulder.</span>
        </p>
      </header>

      <div className="flex flex-wrap gap-3 text-xs md:text-sm text-subtle">
        {"Based on real sales, not projections|No separate underwriting package to compile|Offers scale up as your processing grows"
          .split("|")
          .map((item) => (
            <div
              key={item}
              className="chip chip--neutral"
            >
              <span className="dot" />
              <span>{item}</span>
            </div>
          ))}
      </div>
    </section>
  );
}

function DeploymentTimeline() {
  return (
    <section className="mb-14">
      <div className="mb-6 flex flex-col gap-3">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-subtle">Timeline</p>
        <h3 className="text-xl md:text-2xl font-poppins font-semibold text-main">Funding in days, not months</h3>
        <p className="max-w-2xl text-sm md:text-base text-subtle">
          Because we underwrite off your card-processing history, we can move much faster than traditional lenders. Here’s how a typical deployment looks once you’re processing with us.
        </p>
      </div>

      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-[14px] hidden w-px bg-border-subtle md:block" />
        <div className="space-y-4 md:space-y-5">
          {timelineSteps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: index * 0.06, duration: 0.45 }}
              className="relative flex flex-col rounded-xl border border-border-subtle bg-white px-5 py-4 md:flex-row md:items-center md:gap-6 md:px-6"
            >
              <div className="mb-3 flex items-center gap-3 md:mb-0 md:w-40">
                <div className="hidden h-3 w-3 items-center justify-center md:flex">
                  <span className="dot" />
                </div>
                <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-main">
                  {step.label}
                </span>
              </div>

              <div className="flex-1">
                <h4 className="mb-1.5 text-sm md:text-base font-poppins font-semibold text-main">
                  {step.title}
                </h4>
                <p className="text-sm text-subtle">{step.body}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FundingLoopVisual() {
  const n = fundingStages.length;
  const progress = useMotionValue(0);
  const rotation = useTransform(progress, (v) => (v * 360) / n);
  const inverseRotation = useTransform(rotation, (v) => -v);

  const [activeIndex, setActiveIndex] = useState(0);
  const controls = useRef<AnimationPlaybackControls | null>(null);

  const progressToIndex = useCallback(
    (value: number) => {
      let idx = Math.round(-value) % n;
      if (idx < 0) idx += n;
      return idx;
    },
    [n]
  );

  const startAutoRotate = useCallback(() => {
    controls.current?.stop();
    const current = progress.get();
    let normalized = current % n;
    if (normalized < 0) normalized += n;
    progress.set(normalized);

    controls.current = animate(progress, normalized + n, {
      duration: 24,
      ease: "linear",
      repeat: Infinity,
      repeatType: "loop",
      onUpdate: (latest) => {
        setActiveIndex(progressToIndex(latest));
      },
    });
  }, [n, progress, progressToIndex]);

  useEffect(() => {
    startAutoRotate();
    return () => {
      controls.current?.stop();
    };
  }, [startAutoRotate]);

  const handleDragStart = () => {
    controls.current?.stop();
  };

  const handleDrag = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const current = progress.get();
    const dragFactor = -0.01;
    const next = current + info.delta.x * dragFactor;
    progress.set(next);
    setActiveIndex(progressToIndex(next));
  };

  const handleDragEnd = () => {
    startAutoRotate();
  };

  const ringRadius = 70;
  const chipRadius = ringRadius + 8;

  const activeStage = fundingStages[activeIndex] ?? fundingStages[0];

  return (
    <section className="mb-14">
      <div className="flex flex-col items-center text-center">
        <h3 className="text-lg md:text-xl font-poppins font-semibold text-main">
          A funding loop that matches your sales cycle
        </h3>
        <p className="mt-3 max-w-xl text-sm md:text-base text-subtle">
          Funding deploys, repays automatically as you process cards, and becomes available again as long as your volume stays healthy. It’s a loop, not a one-off event.
        </p>
      </div>

      <div className="mt-10 flex flex-col items-center gap-8 lg:flex-row lg:items-stretch lg:gap-14">
        <div className="relative flex h-[320px] w-[320px] items-center justify-center rounded-full border border-border-subtle bg-white sm:h-[360px] sm:w-[360px] lg:shrink-0">
          <div className="relative z-10 flex h-32 w-32 flex-col items-center justify-center rounded-full border border-border-subtle bg-white px-4 text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-subtle">Loop</p>
            <p className="mt-1 text-xs font-poppins font-semibold text-main">Deploy → Repay → Renew</p>
          </div>

          <div className="absolute inset-6 rounded-full border border-dashed border-border-subtle" />

          <div className="pointer-events-none absolute inset-6">
            <svg viewBox="0 0 200 200" className="h-full w-full" aria-hidden="true">
              <circle cx="100" cy="100" r={ringRadius} stroke="var(--border-subtle)" strokeWidth={2} fill="none" />
            </svg>
          </div>

          <motion.div
            className="absolute inset-0 cursor-grab active:cursor-grabbing"
            style={{ rotate: rotation }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            dragMomentum={false}
            onDragStart={handleDragStart}
            onDrag={handleDrag}
            onDragEnd={handleDragEnd}
          >
            {fundingStages.map((stage, index) => {
              const angleDeg = -90 + (360 / n) * index;
              const angleRad = (angleDeg * Math.PI) / 180;
              const x = 100 + Math.cos(angleRad) * chipRadius;
              const y = 100 + Math.sin(angleRad) * chipRadius;
              const leftPct = (x / 200) * 100;
              const topPct = (y / 200) * 100;
              const isActive = index === activeIndex;

              return (
                <div
                  key={stage.id}
                  className="absolute"
                  style={{ left: `${leftPct}%`, top: `${topPct}%`, transform: "translate(-50%, -50%)" }}
                >
                  <motion.div
                    className="inline-flex items-center gap-1.5 rounded-full border bg-white px-3 py-1.5"
                    style={{ rotate: inverseRotation }}
                    animate={{
                      borderColor: isActive ? "var(--accent-orange)" : "var(--border-subtle)",
                      scale: isActive ? 1.04 : 0.96,
                      opacity: isActive ? 1 : 0.8,
                    }}
                    transition={{ type: "spring", stiffness: 260, damping: 24 }}
                  >
                    <span className="dot" />
                    <span className="text-[11px] md:text-xs text-main">{stage.label}</span>
                  </motion.div>
                </div>
              );
            })}
          </motion.div>
        </div>

        <div className="max-w-md space-y-4 text-sm md:text-base text-subtle">
          <div className="border border-border-subtle bg-white px-4 py-3 rounded-xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-subtle">Current step</p>
            <p className="mt-1 text-sm font-poppins font-semibold text-main">{activeStage.label}</p>
            <p className="mt-1 text-xs md:text-sm">{activeStage.description}</p>
          </div>

          <p>
            Instead of fixed monthly payments,
            <span className="font-semibold text-main"> repayment flexes with your sales.</span> On strong days, you pay down more. On slower days, less. There’s no penalty for early payoff and no compounding interest.
          </p>
          <p>
            Once your balance is paid down and your card volume stays healthy, we proactively extend renewed funding offers so you can
            <span className="font-semibold text-main"> keep investing in growth without reapplying.</span>
          </p>
          <div className="mt-3 grid gap-3 text-xs md:text-sm">
            <div className="flex items-start gap-2">
              <span className="dot mt-1" />
              <p>
                <span className="font-semibold text-main">No compounding interest or variable rates.</span> Just a simple, transparent cost of capital tied to your sales volume.
              </p>
            </div>
            <div className="flex items-start gap-2">
              <span className="dot mt-1" />
              <p>
                <span className="font-semibold text-main">Works for seasonal and growth-stage businesses.</span> Repayment naturally slows during off-peak periods.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ReassuranceStrip() {
  return (
    <section className="mt-4 border-t border-border-subtle pt-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-subtle">
            Built for established card volume
          </p>
          <p className="max-w-xl text-sm md:text-base text-subtle">
            We’re building a card processing and funding platform for businesses that want a straightforward way to turn card volume into working capital.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3 text-xs md:text-sm text-subtle">
          <div className="chip chip--neutral">
            <span className="dot" />
            <span>Simple, transparent structure</span>
          </div>
          <div className="chip chip--neutral">
            <span className="dot" />
            <span>Terms that adjust with your seasonality</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function HowFundingWorksSection() {
  return (
    <section className="py-16 md:py-20 bg-transparent">
      <div className="mx-auto max-w-4xl px-6 sm:px-8">
        <header className="mb-10">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-subtle">Funding</p>
          <h2 className="mt-1 text-3xl sm:text-4xl font-poppins font-semibold tracking-tight text-main">
            How funding works
          </h2>
          <p className="mt-4 max-w-2xl text-sm font-lora text-subtle sm:text-base md:text-lg">
            Automatic qualification, fast deployment, and repeat funding as your card sales stay strong.
          </p>
        </header>

        <AutoQualificationBlock />
        <DeploymentTimeline />
        <FundingLoopVisual />
        <ReassuranceStrip />
      </div>
    </section>
  );
}

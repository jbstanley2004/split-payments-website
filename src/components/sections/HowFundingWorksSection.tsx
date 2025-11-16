"use client";

import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  motion,
  animate,
  useMotionValue,
  useTransform,
} from "framer-motion";
import type { AnimationPlaybackControls, PanInfo } from "framer-motion";
import Link from "next/link";
import OrangePushButton from "@/components/OrangePushButton";

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
  {
    id: 1,
    label: "Funding deployed",
    description: "Capital lands in your business bank account.",
  },
  {
    id: 2,
    label: "Repayment as you process",
    description: "A fixed percentage of each card sale goes toward repayment.",
  },
  {
    id: 3,
    label: "Balance paid down",
    description: "Your advance balance decreases with each batch.",
  },
  {
    id: 4,
    label: "Volume stays healthy",
    description: "Sales stay at or above baseline.",
  },
];

// Visual styles for the four funding stages (loop chips + current step card)
const fundingStageStyles = [
  {
    // Funding deployed – greenish
    bg: "#BCD1CA",
    chipBg: "#BCD1CA",
  },
  {
    // Repayment as you process – bluish
    bg: "#6A9BCC",
    chipBg: "#6A9BCC",
  },
  {
    // Balance paid down – lavender
    bg: "#CBCADB",
    chipBg: "#CBCADB",
  },
  {
    // Volume stays healthy – darkest beige from eligibility card
    bg: "#d8d1c6",
    chipBg: "#d8d1c6",
  },
];

function AutoQualificationCard() {
  return (
    <div className="mb-16">
      {/* Warm beige to match Credit Card Acceptance card */}
      <div className="rounded-3xl bg-[#d8d1c6] px-6 py-6 md:px-8 md:py-7 shadow-[0_18px_45px_rgba(20,20,19,0.06)]">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#9B8E7A]">
          Eligibility
        </p>
        <h3 className="mb-2 text-xl md:text-2xl font-poppins font-semibold text-[#141413]">
          You don’t apply — you qualify automatically
        </h3>
        <p className="mb-4 text-sm md:text-base font-lora text-[#524F49]">
          If your volume and history fit our model, we proactively extend
          funding offers based on your processing. No lengthy application or
          hard credit pull to get started.{" "}
          <span className="font-semibold text-[#3F3A32]">
            If you’re processing with us and your numbers qualify, we’ll tap
            you on the shoulder.
          </span>
        </p>
        <div className="flex flex-wrap items-center gap-3 text-xs md:text-sm text-[#524F49]">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#f0ebe2] px-3 py-1">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#D97757]" />
            <span>Based on real sales, not projections</span>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full bg-[#f0ebe2] px-3 py-1">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#D97757]" />
            <span>No separate underwriting package to compile</span>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full bg-[#f0ebe2] px-3 py-1">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#D97757]" />
            <span>Offers scale up as your processing grows</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function DeploymentTimeline() {
  // Timeline card background colors
  const accentStyles = [
    {
      // Day 0 – darkest beige card
      cardBg: "bg-[#d8d1c6]",
    },
    {
      // Day 0–2 – bluish card (Funding home-section blue)
      cardBg: "bg-[#6A9BCC]",
    },
    {
      // Day 3–5 – greenish card (Funding deployed)
      cardBg: "bg-[#BCD1CA]",
    },
  ];

  return (
    <section className="mb-16">
      <div className="mb-6 flex flex-col gap-3">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#9B8E7A]">
          Timeline
        </p>
        <h3 className="text-xl md:text-2xl font-poppins font-semibold text-[#141413]">
          Funding in days, not months
        </h3>
        <p className="max-w-2xl text-sm md:text-base font-lora text-[#524F49]">
          Because we underwrite off your card-processing history, we can move
          much faster than traditional lenders. Here’s how a typical deployment
          looks once you’re processing with us.
        </p>
      </div>

      <div className="relative">
        {/* Vertical line for desktop */}
        <div className="pointer-events-none absolute inset-y-0 left-[16px] hidden w-px bg-gradient-to-b from-[#E3DDD0] via-[#D6CDBF] to-[#E3DDD0] md:block" />

        <div className="space-y-4 md:space-y-5">
          {timelineSteps.map((step, index) => {
            const accent =
              accentStyles[index] || accentStyles[accentStyles.length - 1];

            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: index * 0.08, duration: 0.5 }}
                className={`relative flex flex-col rounded-2xl border border-[#E3DDD0] ${accent.cardBg} backdrop-blur-sm px-5 py-5 shadow-[0_14px_32px_rgba(20,20,19,0.06)] md:flex-row md:items-center md:gap-6 md:px-6 md:py-5`}
              >
                {/* Day label */}
                <div className="mb-3 flex items-center gap-3 md:mb-0 md:w-48">
                  <div className="hidden h-3 w-3 items-center justify-center md:flex">
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#D97757]" />
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[#141413]">
                    {step.label}
                  </span>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h4 className="mb-2 text-base md:text-lg font-poppins font-semibold text-[#141413]">
                    {step.title}
                  </h4>
                  <p className="text-sm md:text-base font-lora text-[#141413]">
                    {step.body}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function FundingLoopVisual() {
  const n = fundingStages.length; // 4

  // progress goes 0 → n (each unit = one card step)
  const progress = useMotionValue(0);
  const rotation = useTransform(progress, (v) => (v * 360) / n);
  const inverseRotation = useTransform(rotation, (v) => -v);

  const [activeIndex, setActiveIndex] = useState(0);
  const controls = useRef<AnimationPlaybackControls | null>(null);

  const progressToIndex = useCallback(
    (value: number) => {
      // Chip at 12 o’clock is the one with index ≡ -progress (mod n)
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
      duration: 24, // full loop time (slower)
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

  const handleDrag = (
    _event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    const current = progress.get();
    const dragFactor = -0.01; // drag sensitivity
    const next = current + info.delta.x * dragFactor;
    progress.set(next);
    setActiveIndex(progressToIndex(next));
  };

  const handleDragEnd = () => {
    startAutoRotate();
  };

  // Radius for the orbit chips (smaller so chips never fight the edge)
  const ringRadius = 70;
  const chipRadius = ringRadius + 8;

  const activeStage = fundingStages[activeIndex] ?? fundingStages[0];
  const activeStageStyle =
    fundingStageStyles[activeIndex] ?? fundingStageStyles[0];

  return (
    <section className="mb-16 lg:mb-20">
      <div className="flex flex-col items-center text-center">
        <h3 className="text-lg md:text-xl font-poppins font-semibold text-[#141413]">
          A funding loop that matches your sales cycle
        </h3>
        <p className="mt-3 max-w-xl text-sm md:text-base font-lora text-[#524F49]">
          Funding deploys, repays automatically as you process cards, and
          becomes available again as long as your volume stays healthy. It’s a
          loop, not a one-off event.
        </p>
      </div>

      <div className="mt-10 flex flex-col items-center gap-8 lg:flex-row lg:items-stretch lg:gap-14">
        {/* Left: circular visualization */}
        <div className="relative flex h-[320px] w-[320px] items-center justify-center rounded-full bg-gradient-to-b from-[#F8F4EC] via-[#F3ECE1] to-[#E8DFD1] shadow-[0_24px_60px_rgba(20,20,19,0.12)] sm:h-[360px] sm:w-[360px] lg:shrink-0">
          {/* Center label */}
          <div className="relative z-10 flex h-32 w-32 flex-col items-center justify-center rounded-full bg-[#F8F4EC] px-4 text-center shadow-[0_12px_30px_rgba(20,20,19,0.10)]">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#9B8E7A]">
              Loop
            </p>
            <p className="mt-1 text-xs font-poppins font-semibold text-[#141413]">
              Deploy → Repay → Renew
            </p>
          </div>

          {/* Circular track */}
          <div className="absolute inset-6 rounded-full border border-dashed border-[#D6CDBF]" />

          {/* Invisible SVG for radius math */}
          <div className="pointer-events-none absolute inset-6">
            <svg
              viewBox="0 0 200 200"
              className="h-full w-full"
              aria-hidden="true"
            >
              <circle
                cx="100"
                cy="100"
                r={ringRadius}
                stroke="#E8E6DC"
                strokeWidth={2}
                fill="none"
              />
            </svg>
          </div>

          {/* Draggable, auto-rotating orbit of compact chips */}
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
              // With 4 chips, these land at 12, 3, 6, 9 o’clock
              const angleDeg = -90 + (360 / n) * index;
              const angleRad = (angleDeg * Math.PI) / 180;
              const x = 100 + Math.cos(angleRad) * chipRadius;
              const y = 100 + Math.sin(angleRad) * chipRadius;

              const leftPct = (x / 200) * 100;
              const topPct = (y / 200) * 100;

              const isActive = index === activeIndex;
              const chipStyle =
                fundingStageStyles[index] ??
                fundingStageStyles[fundingStageStyles.length - 1];

              return (
                <div
                  key={stage.id}
                  className="absolute"
                  style={{
                    left: `${leftPct}%`,
                    top: `${topPct}%`,
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  {/* Pill chip stays upright via inverse rotation */}
                  <motion.div
                    className="inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 shadow-[0_10px_26px_rgba(20,20,19,0.12)] border border-transparent"
                    style={{
                      rotate: inverseRotation,
                      backgroundColor: chipStyle.chipBg,
                    }}
                    animate={{
                      borderColor: isActive ? "#D97757" : "rgba(0,0,0,0)", // keep orange edge when active
                      boxShadow: isActive
                        ? "0 14px 32px rgba(20,20,19,0.18)"
                        : "0 10px 26px rgba(20,20,19,0.12)",
                      scale: isActive ? 1.04 : 0.98,
                      opacity: isActive ? 1 : 0.8,
                    }}
                    transition={{ type: "spring", stiffness: 260, damping: 24 }}
                  >
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#D97757] flex-shrink-0" />
                    <span className="text-[11px] font-lora text-[#141413] md:text-xs">
                      {stage.label}
                    </span>
                  </motion.div>
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* Right: dynamic current-step card + explanatory copy */}
        <div className="max-w-md space-y-4 text-sm md:text-base font-lora text-[#524F49]">
          <div
            className="rounded-2xl px-4 py-3 shadow-[0_14px_32px_rgba(20,20,19,0.10)] border border-[#E3DDD0] text-[#141413]"
            style={{ backgroundColor: activeStageStyle.bg }}
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em]">
              Current step
            </p>
            <p className="mt-1 text-sm font-poppins font-semibold">
              {activeStage.label}
            </p>
            <p className="mt-1 text-xs md:text-sm">
              {activeStage.description}
            </p>
          </div>

          <p>
            Instead of fixed monthly payments,{" "}
            <span className="font-semibold text-[#3F3A32]">
              repayment flexes with your sales.
            </span>{" "}
            On strong days, you pay down more. On slower days, less. There’s no
            penalty for early payoff and no compounding interest.
          </p>
          <p>
            Once your balance is paid down and your card volume stays healthy,
            we proactively extend renewed funding offers so you can{" "}
            <span className="font-semibold text-[#3F3A32]">
              keep investing in growth without reapplying.
            </span>
          </p>
          <div className="mt-4 grid gap-3 text-xs md:text-sm">
            <div className="flex items-start gap-2">
              <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-[#D97757]" />
              <p>
                <span className="font-semibold text-[#3F3A32]">
                  No compounding interest or variable rates.
                </span>{" "}
                Just a simple, transparent cost of capital tied to your sales
                volume.
              </p>
            </div>
            <div className="flex items-start gap-2">
              <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-[#D97757]" />
              <p>
                <span className="font-semibold text-[#3F3A32]">
                  Works for seasonal and growth-stage businesses.
                </span>{" "}
                Repayment naturally slows during off-peak periods.
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
    <section className="mt-6 border-t border-[#E3DDD0] pt-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#9B8E7A]">
            Built for established card volume
          </p>
          <p className="max-w-xl text-sm md:text-base font-lora text-[#524F49]">
            We’re building a card processing and funding platform for businesses
            that want a straightforward way to turn card volume into working
            capital.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3 text-xs md:text-sm text-[#524F49]">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#f0ebe2] px-3 py-1">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#D97757]" />
            <span>Simple, transparent structure</span>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full bg-[#f0ebe2] px-3 py-1">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#D97757]" />
            <span>Terms that adjust with your seasonality</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function HowFundingWorksSection() {
  return (
    <section className="bg-[#F8F4EC] py-16 md:py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <header className="mb-10 text-center">
          <h2 className="text-3xl sm:text-4xl font-poppins font-semibold tracking-tight text-[#141413]">
            How funding works
          </h2>
          <p className="mt-4 mx-auto max-w-2xl text-sm font-lora text-[#524F49] sm:text-base md:text-lg">
            Automatic qualification, fast deployment, and repeat funding as your
            card sales stay strong.
          </p>
        </header>

        <AutoQualificationCard />
        <DeploymentTimeline />
        <FundingLoopVisual />
        <ReassuranceStrip />
      </div>
    </section>
  );
}

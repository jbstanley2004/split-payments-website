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

const timelineSteps = [
  {
    label: "Day 0",
    title: "Sign your funding agreement",
    body: "Once we confirm your processing history, we send a simple agreement. As soon as it’s signed, we move straight into activation.",
  },
  {
    label: "Day 0–2",
    title: "Merchant account & equipment activated",
    body: "We set up your merchant account and whatever you need to take payments — terminal, POS, or virtual terminal. If hardware is required, we ship and activate it remotely.",
  },
  {
    label: "Day 3–5",
    title: "Funding deployed",
    body: "As soon as your account is active, we deploy your funding so you can put it to work. No separate application for the first round.",
  },
];

const fundingStages = [
  {
    id: 1,
    label: "Funding deployed",
    description: "Capital hits your business account.",
  },
  {
    id: 2,
    label: "You process card sales",
    description: "Everyday revenue powers the cycle.",
  },
  {
    id: 3,
    label: "We track performance",
    description: "We watch your volume over time.",
  },
  {
    id: 4,
    label: "Volume stays healthy",
    description: "Sales stay at or above baseline.",
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
          Already processing $8,000+/month? You automatically qualify.
        </h3>
        <p className="text-sm md:text-base font-lora text-[#524F49]">
          If your business has a history of at least $8,000 per month in card
          payments, you’re eligible for funding right away. No long underwriting
          cycle, no personal credit pulls, no guesswork.
        </p>
      </div>
    </div>
  );
}

function DeploymentTimeline() {
  const accentStyles = [
    {
      // Day 0 – POS systems color
      cardBg: "bg-[#c3d0ca]",
      badgeBg: "bg-white",
      badgeBorder: "border-[#b3c0ba]",
      badgeText: "text-[#141413]",
    },
    {
      // Day 0–2 – Gift Card & Loyalty color
      cardBg: "bg-[#cccbd8]",
      badgeBg: "bg-white",
      badgeBorder: "border-[#bcbbc8]",
      badgeText: "text-[#141413]",
    },
    {
      // Day 3–5 – Check Processing blue
      cardBg: "bg-[#6a9bcc]",
      badgeBg: "bg-white",
      badgeBorder: "border-[#5889ba]",
      badgeText: "text-[#141413]",
    },
  ];

  return (
    <section className="mb-20">
      <h3 className="mb-6 text-lg md:text-xl font-poppins font-semibold text-[#141413]">
        From agreement to first funding, in a few simple steps.
      </h3>
      <div className="relative">
        <div
          className="absolute left-0 right-0 top-6 hidden h-px bg-[#E0D9C8] md:block"
          aria-hidden="true"
        />
        <div className="grid gap-8 md:grid-cols-3">
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
                className={`relative flex flex-col rounded-2xl ${accent.cardBg} backdrop-blur-sm px-5 py-5 shadow-[0_14px_32px_rgba(20,20,19,0.06)]`}
              >
                <div className="mb-3 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-[#9B8E7A]">
                  <span
                    className={`inline-flex h-7 w-7 items-center justify-center rounded-full border ${accent.badgeBorder} ${accent.badgeBg} text-[11px] ${accent.badgeText}`}
                  >
                    {index + 1}
                  </span>
                  <span>{step.label}</span>
                </div>
                <h4 className="mb-2 text-base md:text-lg font-poppins font-semibold text-[#141413]">
                  {step.title}
                </h4>
                <p className="text-sm md:text-[15px] font-lora text-[#524F49]">
                  {step.body}
                </p>
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
      // Card at 12 o’clock is the one with index ≡ -progress (mod n)
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
      duration: 14, // full loop time
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

  const ringRadius = 78;
  const labelRadius = ringRadius + 40;

  return (
    <section className="mb-16 lg:mb-20">
      <div className="flex flex-col items-center text-center">
        <h3 className="text-lg md:text-xl font-poppins font-semibold text-[#141413]">
          Funding that keeps coming as your sales stay strong.
        </h3>
        <p className="mt-3 max-w-xl text-sm md:text-base font-lora text-[#524F49]">
          Once your first round is deployed, your card sales, performance, and
          ongoing volume all feed back into the same loop — keeping you eligible
          for new offers as your processing stays healthy.
        </p>

        <div className="mt-10 flex justify-center">
          <div className="relative h-[320px] w-[320px] md:h-[360px] md:w-[360px]">
            {/* Static base ring */}
            <svg
              viewBox="0 0 200 200"
              className="absolute inset-0 h-full w-full"
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

            {/* Draggable, auto-rotating carousel */}
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
                // With 4 cards, these land at 12, 3, 6, 9 o’clock
                const angleDeg = -90 + (360 / n) * index;
                const angleRad = (angleDeg * Math.PI) / 180;
                const x = 100 + Math.cos(angleRad) * labelRadius;
                const y = 100 + Math.sin(angleRad) * labelRadius;

                const leftPct = (x / 200) * 100;
                const topPct = (y / 200) * 100;

                const isActive = index === activeIndex;

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
                    {/* Card stays upright via inverse rotation */}
                    <motion.div
                      className="inline-flex w-[210px] min-h-[110px] flex-col items-center justify-center rounded-2xl border border-transparent bg-white px-4 py-3 text-center text-[11px] font-lora text-[#3F3A32] shadow-[0_10px_24px_rgba(20,20,19,0.08)] md:text-xs"
                      style={{ rotate: inverseRotation }}
                      animate={{
                        borderColor: isActive
                          ? "#D97757" // orange outline when active
                          : "rgba(0,0,0,0)", // no border when inactive
                        boxShadow: isActive
                          ? "0 16px 40px rgba(20,20,19,0.16)"
                          : "0 10px 24px rgba(20,20,19,0.08)",
                        scale: isActive ? 1.04 : 1,
                      }}
                      transition={{ type: "spring", stiffness: 260, damping: 24 }}
                    >
                      <span className="mb-1 text-[11px] font-poppins font-semibold text-[#141413] md:text-xs">
                        {stage.label}
                      </span>
                      <span>{stage.description}</span>
                    </motion.div>
                  </div>
                );
              })}
            </motion.div>

            {/* Center label */}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <div className="rounded-full border border-[#E8E6DC] bg-[#FAF9F5] px-4 py-3">
                <p className="text-[11px] font-poppins font-semibold uppercase tracking-[0.18em] text-[#9B8E7A]">
                  Ongoing cycle
                </p>
                <p className="mt-1 text-xs font-lora text-[#524F49]">
                  Repeat funding as long as your sales stay healthy.
                </p>
              </div>
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
      <div className="grid gap-6 md:grid-cols-3">
        <div>
          <h4 className="mb-1 text-sm md:text-base font-poppins font-semibold text-[#141413]">
            What we focus on
          </h4>
          <p className="text-xs md:text-sm font-lora text-[#524F49]">
            Your card processing history — typically $8,000 per month or more in
            sales.
          </p>
        </div>
        <div>
          <h4 className="mb-1 text-sm md:text-base font-poppins font-semibold text-[#141413]">
            How you repay
          </h4>
          <p className="text-xs md:text-sm font-lora text-[#524F49]">
            A fixed percentage of daily card sales, so payments flex with your
            revenue. Slow day? You remit less. No sales? No payment that day.
          </p>
        </div>
        <div>
          <h4 className="mb-1 text-sm md:text-base font-poppins font-semibold text-[#141413]">
            What we don’t use
          </h4>
          <p className="text-xs md:text-sm font-lora text-[#524F49]">
            We don’t base decisions on personal credit scores or bank balances.
            Your processing performance is what matters.
          </p>
        </div>
      </div>
    </section>
  );
}

export default function HowFundingWorksSection() {
  return (
    <section
      id="how-funding-works"
      className="bg-[#FAF9F5] py-20 px-4 sm:px-6 lg:px-12 xl:px-20 border-t border-[#E3DDD0]"
    >
      <div className="mx-auto max-w-5xl">
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

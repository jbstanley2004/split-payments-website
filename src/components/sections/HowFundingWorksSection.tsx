"use client";

import React, { useEffect, useState } from "react";
import { motion, animate } from "framer-motion";

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
    angleDeg: -90, // top
  },
  {
    id: 2,
    label: "You process card sales",
    description: "Everyday revenue powers the cycle.",
    angleDeg: -18, // upper-right
  },
  {
    id: 3,
    label: "We track performance",
    description: "We watch your volume over time.",
    angleDeg: 54, // lower-right
  },
  {
    id: 4,
    label: "Volume stays healthy",
    description: "Sales stay at or above baseline.",
    angleDeg: 126, // lower-left
  },
  {
    id: 5,
    label: "New rounds offered",
    description: "More funding becomes available.",
    angleDeg: 198, // upper-left
  },
];

function AutoQualificationCard() {
  return (
    <div className="mb-16">
      <div className="rounded-3xl border border-[#E5DFD0] bg-[#FAF9F5] px-6 py-6 md:px-8 md:py-7 shadow-[0_18px_45px_rgba(20,20,19,0.06)]">
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
      // Card 1 – blue accent
      cardBg: "bg-[#F2F5FB]",
      border: "border-[#C9D7EA]",
      badgeBg: "bg-[#E1ECF7]",
      badgeBorder: "border-[#C9D7EA]",
      badgeText: "text-[#375985]",
    },
    {
      // Card 2 – green accent
      cardBg: "bg-[#F3F6EF]",
      border: "border-[#CBD7BF]",
      badgeBg: "bg-[#E3EBD8]",
      badgeBorder: "border-[#CBD7BF]",
      badgeText: "text-[#485737]",
    },
    {
      // Card 3 – warm neutral accent
      cardBg: "bg-[#F4F3EF]",
      border: "border-[#D3CEC1]",
      badgeBg: "bg-[#E7E3DA]",
      badgeBorder: "border-[#D3CEC1]",
      badgeText: "text-[#5A5345]",
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
                className={`relative flex flex-col rounded-2xl border ${accent.border} ${accent.cardBg} backdrop-blur-sm px-5 py-5 shadow-[0_14px_32px_rgba(20,20,19,0.06)]`}
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
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const controls = animate(0, fundingStages.length, {
      duration: 16,
      ease: "linear",
      repeat: Infinity,
      onUpdate: (latest) => {
        const next = Math.floor(latest) % fundingStages.length;
        setActiveIndex(next);
      },
    });

    return () => {
      controls.stop();
    };
  }, []);

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
          <div className="relative h-72 w-72 md:h-80 md:w-80">
            {/* Base neutral ring */}
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

            {/* Rotating orange arc */}
            <motion.svg
              viewBox="0 0 200 200"
              className="absolute inset-0 h-full w-full"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 16, ease: "linear" }}
            >
              <circle
                cx="100"
                cy="100"
                r={ringRadius}
                stroke="#D97757"
                strokeWidth={4}
                strokeLinecap="round"
                strokeDasharray="120 480"
                fill="none"
              />
            </motion.svg>

            {/* Center label */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="rounded-full border border-[#E8E6DC] bg-[#FAF9F5] px-4 py-3">
                <p className="text-[11px] font-poppins font-semibold uppercase tracking-[0.18em] text-[#9B8E7A]">
                  Ongoing cycle
                </p>
                <p className="mt-1 text-xs font-lora text-[#524F49]">
                  Repeat funding as long as your sales stay healthy.
                </p>
              </div>
            </div>

            {/* Stage labels */}
            {fundingStages.map((stage, index) => {
              const angleRad = (stage.angleDeg * Math.PI) / 180;
              const x = 100 + Math.cos(angleRad) * labelRadius;
              const y = 100 + Math.sin(angleRad) * labelRadius;

              const leftPct = (x / 200) * 100;
              const topPct = (y / 200) * 100;

              const isLeftSide = x < 96;
              const isRightSide = x > 104;

              let alignClasses = "items-center text-center";
              if (isLeftSide) alignClasses = "items-end text-right";
              if (isRightSide) alignClasses = "items-start text-left";

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
                  <motion.div
                    layout
                    initial={false}
                    animate={{
                      scale: isActive ? 1.03 : 1,
                      boxShadow: isActive
                        ? "0 14px 32px rgba(20,20,19,0.14)"
                        : "0 10px 24px rgba(20,20,19,0.08)",
                      borderColor: isActive ? "#D97757" : "#E5DFD0",
                    }}
                    transition={{ type: "spring", stiffness: 260, damping: 22 }}
                    className={`inline-flex max-w-[180px] flex-col rounded-2xl border bg-white px-3 py-2 text-[10px] font-lora text-[#3F3A32] ${alignClasses}`}
                  >
                    <span className="mb-0.5 text-[11px] font-poppins font-semibold text-[#141413] md:text-xs">
                      {stage.label}
                    </span>
                    <span>{stage.description}</span>
                  </motion.div>
                </div>
              );
            })}
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


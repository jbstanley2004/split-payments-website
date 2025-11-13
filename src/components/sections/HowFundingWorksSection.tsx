"use client";

import React from "react";
import { motion } from "framer-motion";

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
  {
    id: 5,
    label: "New rounds offered",
    description: "More funding becomes available.",
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
  return (
    <section className="mb-16 lg:mb-20">
      <div className="flex flex-col items-center text-center">
        <h3 className="text-lg md:text-xl font-poppins font-semibold text-[#141413]">
          Funding that keeps coming as your sales stay strong.
        </h3>
        <p className="mt-3 max-w-xl text-sm md:text-base font-lora text-[#524F49]">
          Once your first round is deployed, your card sales, performance, and
          ongoing volume move through the same steps again and again — keeping
          you eligible for new offers as your processing stays healthy.
        </p>

        {/* Conveyor / assembly-line style loop */}
        <div className="mt-10 w-full max-w-3xl">
          <div className="relative overflow-hidden rounded-3xl border border-[#E8E6DC] bg-white px-4 py-6 shadow-[0_18px_45px_rgba(20,20,19,0.06)]">
            {/* Track line */}
            <div className="pointer-events-none absolute inset-y-10 left-4 right-4 flex items-center">
              <div className="h-[2px] w-full rounded-full bg-[#E8E6DC]" />
            </div>

            {/* Moving cards; duplicated so it can loop infinitely */}
            <motion.div
              className="flex gap-6"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ repeat: Infinity, duration: 26, ease: "linear" }}
            >
              {[0, 1].map((loopIndex) =>
                fundingStages.map((stage) => (
                  <div
                    key={`${stage.id}-${loopIndex}`}
                    className="relative flex min-w-[190px] max-w-[220px] flex-shrink-0 flex-col rounded-2xl border border-[#E5DFD0] bg-[#FAF9F5] px-4 py-3 text-left shadow-[0_10px_24px_rgba(20,20,19,0.08)]"
                  >
                    {/* “Car” dot where it sits on the track */}
                    <div className="absolute left-1/2 top-[52%] -translate-x-1/2">
                      <div className="h-2 w-2 rounded-full border border-[#D97757] bg-white" />
                    </div>

                    <span className="mb-1 inline-flex items-center rounded-full border border-[#E8E6DC] bg-white px-2 py-0.5 text-[10px] font-poppins font-semibold uppercase tracking-[0.16em] text-[#9B8E7A]">
                      Step {stage.id}
                    </span>
                    <span className="mb-1 text-xs font-poppins font-semibold text-[#141413] md:text-sm">
                      {stage.label}
                    </span>
                    <span className="text-[11px] font-lora text-[#524F49] md:text-xs">
                      {stage.description}
                    </span>
                  </div>
                ))
              )}
            </motion.div>
          </div>

          <p className="mt-3 text-xs md:text-sm font-lora text-[#524F49]">
            As long as those steps keep happening — funding, card sales, tracked
            performance, and healthy volume — you stay eligible for the next
            round automatically.
          </p>
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



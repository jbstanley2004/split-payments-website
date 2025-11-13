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
    label: "Typically 3–5 days",
    title: "Funding deployed",
    body: "As soon as your account is active, we deploy your funding so you can put it to work. No separate application for the first round.",
  },
];

const loopStages = [
  {
    id: 1,
    title: "Funding deployed",
    body: "We send your current round of funding to your business account.",
  },
  {
    id: 2,
    title: "You process card sales",
    body: "You keep running your business. A fixed percentage of each card sale automatically goes toward repayment.",
  },
  {
    id: 3,
    title: "We track performance",
    body: "We continuously monitor your card volume against the history that got you qualified in the first place.",
  },
  {
    id: 4,
    title: "Volume stays healthy",
    body: "As long as your card sales stay at or above your baseline, you remain eligible for more capital.",
  },
  {
    id: 5,
    title: "Additional rounds available",
    body: "When you’re ready, we extend new funding offers on top of your existing relationship — round two, round three, and beyond.",
  },
];

function AutoQualificationCard() {
  return (
    <div className="mb-16">
      <div className="rounded-3xl border border-[#E5DFD0] bg-[#FAF9F5] px-6 py-6 md:px-8 md:py-7 shadow-[0_18px_45px_rgba(20,20,19,0.06)]">
        <p className="text-xs font-semibold tracking-[0.16em] uppercase text-[#9B8E7A] mb-2">
          Eligibility
        </p>
        <h3 className="text-xl md:text-2xl font-poppins font-semibold text-[#141413] mb-2">
          Already processing $8,000+/month? You automatically qualify.
        </h3>
        <p className="text-sm md:text-base font-lora text-[#524F49]">
          If your business has a history of at least $8,000 per month in card payments, you’re eligible for funding right away. No long underwriting cycle, no personal credit pulls, no guesswork.
        </p>
      </div>
    </div>
  );
}

function DeploymentTimeline() {
  return (
    <section className="mb-20">
      <h3 className="text-lg md:text-xl font-poppins font-semibold text-[#141413] mb-6">
        From agreement to first funding, in a few simple steps.
      </h3>
      <div className="relative">
        <div className="hidden md:block absolute left-0 right-0 top-6 h-px bg-[#E0D9C8]" aria-hidden="true" />
        <div className="grid gap-8 md:grid-cols-3">
          {timelineSteps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: index * 0.08, duration: 0.5 }}
              className="relative flex flex-col rounded-2xl border border-[#E3DDD0] bg-white/80 backdrop-blur-sm px-5 py-5 shadow-[0_14px_32px_rgba(20,20,19,0.06)]"
            >
              <div className="flex items-center gap-2 text-xs font-medium tracking-[0.18em] uppercase text-[#9B8E7A] mb-3">
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-[#E0D9C8] bg-[#FAF9F5] text-[11px] text-[#7C6C54]">
                  {index + 1}
                </span>
                <span>{step.label}</span>
              </div>
              <h4 className="mb-2 text-base md:text-lg font-poppins font-semibold text-[#141413]">{step.title}</h4>
              <p className="text-sm md:text-[15px] font-lora text-[#524F49]">{step.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FundingLoopVisual() {
  return (
    <section className="mb-16 lg:mb-20">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1.1fr)] items-center">
        {/* Loop visual */}
        <div className="flex justify-center">
          <div className="relative inline-flex items-center justify-center">
            <motion.div
              className="relative h-60 w-60 md:h-72 md:w-72 rounded-full border border-[#E3DDD0] bg-[radial-gradient(circle_at_top,_rgba(226,211,189,0.34),_transparent_58%)]"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6 }}
            >
              <div className="absolute inset-8 rounded-full border border-[#E5DFD0]/70" />
              <div className="absolute inset-4 rounded-full border border-dashed border-[#D6C9B8]/70" />
              {[0, 72, 144, 216, 288].map((deg) => (
                <span
                  key={deg}
                  className="absolute h-2 w-2 rounded-full bg-[#D97757]"
                  style={{
                    top: `calc(50% - 40%)`,
                    left: `calc(50% - 4px)`,
                    transformOrigin: "4px calc(40%)",
                    transform: `rotate(${deg}deg)`,
                  }}
                />
              ))}
              <motion.div
                className="absolute left-1/2 top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#141413] shadow-[0_0_0_8px_rgba(20,20,19,0.06)]"
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 22, ease: "linear" }}
                style={{ transformOrigin: "0 -86px" }}
              />
            </motion.div>
          </div>
        </div>

        {/* Loop text */}
        <div className="space-y-5">
          <h3 className="text-lg md:text-xl font-poppins font-semibold text-[#141413]">
            Funding that keeps coming as your sales stay strong.
          </h3>
          <p className="text-sm md:text-base font-lora text-[#524F49]">
            Once your first round is deployed, we continuously track your card sales. As long as your processing stays healthy, you remain eligible for additional rounds — round two, round three, and beyond.
          </p>
          <div className="grid gap-3">
            {loopStages.map((stage) => (
              <div
                key={stage.id}
                className="flex items-start gap-3 rounded-2xl border border-[#E5DFD0] bg-white/70 px-4 py-3"
              >
                <div className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#141413] text-[11px] font-semibold text-[#FDFBF7]">
                  {stage.id}
                </div>
                <div>
                  <h4 className="text-sm md:text-[15px] font-poppins font-semibold text-[#141413]">
                    {stage.title}
                  </h4>
                  <p className="text-xs md:text-sm font-lora text-[#524F49]">{stage.body}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs md:text-sm font-lora text-[#7A6C57]">
            As long as your processing stays strong, the cycle keeps going.
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
          <h4 className="mb-1 text-sm md:text-base font-poppins font-semibold text-[#141413]">What we focus on</h4>
          <p className="text-xs md:text-sm font-lora text-[#524F49]">
            Your card processing history — typically $8,000 per month or more in sales.
          </p>
        </div>
        <div>
          <h4 className="mb-1 text-sm md:text-base font-poppins font-semibold text-[#141413]">How you repay</h4>
          <p className="text-xs md:text-sm font-lora text-[#524F49]">
            A fixed percentage of daily card sales, so payments flex with your revenue. Slow day? You remit less. No sales? No payment that day.
          </p>
        </div>
        <div>
          <h4 className="mb-1 text-sm md:text-base font-poppins font-semibold text-[#141413]">What we don’t use</h4>
          <p className="text-xs md:text-sm font-lora text-[#524F49]">
            We don’t base decisions on personal credit scores or bank balances. Your processing performance is what matters.
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
          <p className="mt-4 text-sm sm:text-base md:text-lg font-lora text-[#524F49] max-w-2xl mx-auto">
            Automatic qualification, fast deployment, and repeat funding as your card sales stay strong.
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

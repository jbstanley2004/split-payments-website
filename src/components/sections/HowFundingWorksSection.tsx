"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

/** ─────────────────────────────────────────────────────────────────────
 * Notion-style, Split-branded “How Funding Works”
 * - Calm cards, no looping animation
 * - Subtle in-view reveals only
 * - Stepper + Detail instead of spinning loop
 * - Floating timeline strips (no heavy borders)
 * ──────────────────────────────────────────────────────────────────── */

const timelineSteps = [
  {
    label: "Day 0",
    title: "Sign your funding agreement",
    body:
      "Once we confirm your processing history, we send a simple agreement. As soon as it’s signed, we move straight into activation.",
  },
  {
    label: "Day 0–2",
    title: "Merchant account & equipment activated",
    body:
      "We set up your merchant account and whatever you need for processing—software integration, online gateway, or physical terminal. If hardware is required, we ship and activate it remotely.",
  },
  {
    label: "Day 3–5",
    title: "Funding deployed",
    body:
      "As soon as your account is active, we deploy your funding directly into your business bank account so you can put it to work. No separate application for the first round.",
  },
];

const flowSteps = [
  {
    id: 1,
    label: "Funding deployed",
    blurb: "Capital lands in your business bank account.",
    detail:
      "Use funds for growth, inventory, or smoothing cash flow. The structure is simple and transparent—no compounding interest or variable rates.",
  },
  {
    id: 2,
    label: "Repayment as you process",
    blurb: "A fixed % of each card sale repays the balance.",
    detail:
      "Repayment flexes naturally with your daily sales. Strong days pay down more; slower days pay down less. No penalties for paying early.",
  },
  {
    id: 3,
    label: "Balance paid down",
    blurb: "Your advance decreases with every batch.",
    detail:
      "Because repayment is tied to card volume, seasonal businesses aren’t strained during off-peak periods.",
  },
  {
    id: 4,
    label: "Renewed offers",
    blurb: "Volume stays healthy → we extend fresh offers.",
    detail:
      "When your balance is down and your volume is steady, new funding becomes available—without reapplying—so you can keep investing in growth.",
  },
];

function SectionHeader() {
  return (
    <header className="mb-10">
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-subtle">
        Funding
      </p>
      <h2 className="mt-1 text-3xl sm:text-4xl font-poppins font-semibold tracking-tight text-main">
        How funding works
      </h2>
      <p className="mt-4 max-w-2xl text-sm font-lora text-subtle sm:text-base md:text-lg">
        Automatic qualification, fast deployment, and repeat funding as your card
        sales stay strong.
      </p>
    </header>
  );
}

function EligibilityCard() {
  return (
    <section className="mb-12">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.45 }}
        className="rounded-[28px] bg-[#faf9f5] p-6 sm:p-8 shadow-[0_10px_40px_rgba(20,20,19,0.05)]"
      >
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-subtle">
          Eligibility
        </p>
        <h3 className="mt-2 text-2xl md:text-3xl font-poppins font-semibold text-main">
          You don’t apply — you qualify automatically
        </h3>
        <p className="mt-3 text-sm md:text-base text-subtle">
          If your volume and history fit our model, we proactively extend funding
          offers based on your processing. No lengthy application or hard credit
          pull to get started.{" "}
          <span className="font-semibold text-main">
            If you’re processing with us and your numbers qualify, we’ll tap you
            on the shoulder.
          </span>
        </p>

        <div className="mt-5 flex flex-wrap gap-3 text-xs md:text-sm text-subtle">
          {[
            "Based on real sales, not projections",
            "No separate underwriting package to compile",
            "Offers scale up as your processing grows",
          ].map((item, i) => (
            <div
              key={item}
              className={`chip chip--neutral`}
              data-idx={i}
            >
              <span className="dot" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

function DeploymentTimeline() {
  return (
    <section className="mb-14">
      <div className="mb-6">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-subtle">
          Timeline
        </p>
        <h3 className="text-xl md:text-2xl font-poppins font-semibold text-main">
          Funding in days, not months
        </h3>
        <p className="max-w-2xl text-sm md:text-base text-subtle">
          Because we underwrite off your card-processing history, we can move much
          faster than traditional lenders. Here’s how a typical deployment looks
          once you’re processing with us.
        </p>
      </div>

      <ol className="space-y-4 md:space-y-5">
        {timelineSteps.map((step, index) => (
          <motion.li
            key={step.title}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ delay: index * 0.06, duration: 0.4 }}
            className="relative rounded-[26px] bg-[#faf9f5] px-5 py-4 sm:px-6 shadow-[0_10px_40px_rgba(20,20,19,0.04)]"
          >
            <div className="mb-2 flex items-center gap-2">
              <span className="dot" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-main">
                {step.label}
              </span>
            </div>
            <h4 className="text-sm md:text-base font-poppins font-semibold text-main">
              {step.title}
            </h4>
            <p className="mt-1 text-sm text-subtle">{step.body}</p>
          </motion.li>
        ))}
      </ol>
    </section>
  );
}

/** Replaces the rotating loop with a simple Stepper + Detail card */
function FundingFlow() {
  const [active, setActive] = useState(0);
  const step = flowSteps[active];

  return (
    <section className="mb-14">
      <div className="mb-2">
        <h3 className="text-lg md:text-xl font-poppins font-semibold text-main">
          A funding flow that matches your sales cycle
        </h3>
        <p className="mt-3 max-w-xl text-sm md:text-base text-subtle">
          Funding deploys, repays automatically as you process cards, and becomes
          available again as long as your volume stays healthy. Calm, predictable,
          and built around how you actually sell.
        </p>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_1.2fr]">
        {/* Stepper */}
        <div className="flex flex-col gap-3">
          {flowSteps.map((s, i) => {
            const isActive = i === active;
            return (
              <button
                key={s.id}
                onClick={() => setActive(i)}
                className={`group flex items-start gap-3 rounded-full px-4 py-2 transition
                  ${isActive ? "bg-[#e8e6dc]" : "hover:bg-[#f1efe8]"}`}
                aria-current={isActive ? "step" : undefined}
              >
                <span className="dot mt-1" />
                <div className="text-left">
                  <p className="text-xs md:text-sm font-poppins font-semibold text-main">
                    {s.label}
                  </p>
                  <p className="text-xs md:text-sm text-subtle">{s.blurb}</p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Detail card */}
        <motion.div
          key={step.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="rounded-[28px] bg-white border border-border-subtle p-5 sm:p-6"
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-subtle">
            Current step
          </p>
          <p className="mt-1 text-sm font-poppins font-semibold text-main">
            {step.label}
          </p>
          <p className="mt-1 text-sm md:text-base text-subtle">{step.detail}</p>

          <div className="mt-4 grid gap-3 text-xs md:text-sm">
            <div className="flex items-start gap-2">
              <span className="dot mt-1" />
              <p>
                <span className="font-semibold text-main">
                  No compounding interest or variable rates.
                </span>{" "}
                Transparent cost tied to your sales volume.
              </p>
            </div>
            <div className="flex items-start gap-2">
              <span className="dot mt-1" />
              <p>
                <span className="font-semibold text-main">
                  Works for seasonal and growth-stage businesses.
                </span>{" "}
                Repayment naturally slows during off-peak periods.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ReassuranceStrip() {
  return (
    <section className="mt-6 border-t border-border-subtle pt-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-subtle">
            Built for established card volume
          </p>
          <p className="max-w-xl text-sm md:text-base text-subtle">
            We’re building a card processing and funding platform for businesses
            that want a straightforward way to turn card volume into working
            capital.
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
        <SectionHeader />
        <EligibilityCard />
        <DeploymentTimeline />
        <FundingFlow />
        <ReassuranceStrip />
      </div>
    </section>
  );
}

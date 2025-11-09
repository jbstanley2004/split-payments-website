"use client";

import { DynamicIslandNav } from "@/components/dynamic-island-nav";
import OrangePushButton from "@/components/OrangePushButton";
import Link from "next/link";
import { motion } from "framer-motion";
import { RivianBackdrop } from "@/components/RivianBackdrop";
import React from 'react';

// Brand accents for each scene (matches your palette)
const ACCENTS = ["#d97757", "#6a9bcc", "#788c5d"];

const STEPS = [
  {
    title: "Quick application",
    copy: (
      <>Tell us your average monthly card volume (minimum <strong>$8,000</strong>). No credit checks; bankruptcies are OK. We’re evaluating your card‑processing rhythm.</>
    ),
    meta: "What we check: card‑processing rhythm",
  },
  {
    title: "Merchant account approval",
    copy: (
      <>We enroll you so we can securely view your credit‑card receipts.</>
    ),
    meta: "Typical timing: ~24 hours",
  },
  {
    title: "Equipment (if needed)",
    copy: (
      <>If your setup requires hardware, we ship it <strong>within 1–2 business days</strong>. <em>Already compatible? We skip this step.</em></>
    ),
    meta: "Ships in 1–2 business days",
  },
  {
    title: "Remote activation & verification",
    copy: (
      <>When the hardware arrives, we activate remotely and confirm transactions are flowing correctly.</>
    ),
    meta: "Usually the same day the equipment arrives",
  },
  {
    title: "Funds deployed",
    copy: (
      <>As soon as activation is verified, <strong>we deploy funds immediately</strong>.</>
    ),
    meta: "Immediately after verification",
  },
  {
    title: "Automatic split payments",
    copy: (
      <>An agreed holdback (<strong>10–30%</strong>) of daily card receipts pays down the balance. No sales that day = no payment.</>
    ),
    meta: "Flexible, sales‑based payback",
  },
];

export default function HowWeWorkLanding() {
  return (
    <main className="relative min-h-screen min-h-[100dvh] font-lora text-text">
      {/* Keep the orb nav bar untouched */}
      <div className="relative z-20">
        <DynamicIslandNav />
      </div>

      {/* HERO — How We Work */}
      <section className="relative px-6 md:px-10 py-20 lg:py-28">
        <div
          className="rivian-surface rivian-using-assets rounded-none md:rounded-[16px]"
          aria-labelledby="hww-title"
          style={{ ['--accent-1' as any]: ACCENTS[0] }}
        >
          <RivianBackdrop />

          <div className="max-w-4xl mx-auto text-center md:text-left">
            <motion.h1
              id="hww-title"
              className="text-4xl md:text-6xl font-poppins font-semibold leading-tight"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              How We Work
            </motion.h1>

            <motion.p
              className="mt-4 text-[var(--theme-text-secondary)] max-w-2xl"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.7 }}
            >
              Funding that moves with your sales — not a calendar. We purchase a portion of your future card receipts and you repay via a small daily percentage, automatically.
            </motion.p>

            {/* Keep the existing Get Started button functional and unchanged */}
            <motion.div
              className="mt-8"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <Link href="/get-started" passHref>
                <OrangePushButton>Get Started</OrangePushButton>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SCROLLY SECTIONS — one per step with layered parallax imagery */}
      {STEPS.map((step, i) => {
        const accent = ACCENTS[i % ACCENTS.length];
        return (
          <section key={i} className="relative px-6 md:px-10 py-20 md:py-28">
            <div
              className="rivian-surface rivian-using-assets rounded-none md:rounded-[16px]"
              style={{ ['--accent-1' as any]: accent }}
            >
              <RivianBackdrop />

              <div className="max-w-5xl mx-auto grid md:grid-cols-12 gap-6 items-center">
                <motion.div
                  className="md:col-span-6"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.7 }}
                >
                  <div className="text-xs uppercase tracking-wide opacity-80 mb-2">Step {i + 1}</div>
                  <h2 className="text-2xl md:text-4xl font-poppins font-semibold mb-3">{step.title}</h2>
                  <p className="text-[var(--theme-text-secondary)] leading-relaxed">{step.copy}</p>
                  <div className="mt-3 text-sm opacity-80">{step.meta}</div>
                </motion.div>

                {/* Decorative empty column to let the images breathe; backdrop handles visuals */}
                <div className="md:col-span-6"></div>
              </div>
            </div>
          </section>
        );
      })}

      {/* Timeline disclaimer */}
      <section className="px-6 md:px-10 pb-20">
        <div className="max-w-5xl mx-auto">
          <div className="rivian-note">
            <strong>Typical total timeline:</strong> 3–5 business days from signed application to funding. Timing depends on shipping, activation, and responsiveness.
          </div>
        </div>
      </section>
    </main>
  );
}

"use client";

import { DynamicIslandNav } from "@/components/dynamic-island-nav";
import OrangePushButton from "@/components/OrangePushButton";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import React, { useRef } from 'react';
import GlobalBackdrop from "@/components/GlobalBackdrop";

const ACCENTS = ["#d97757", "#6a9bcc", "#788c5d"];

const STEPS = [
  {
    title: "Quick application",
    copy: <>Tell us your average monthly card volume (minimum <strong>$8,000</strong>). No credit checks; bankruptcies are OK. We’re evaluating your card‑processing rhythm.</>,
    meta: "What we check: card‑processing rhythm",
  },
  {
    title: "Merchant account approval",
    copy: <>We enroll you so we can securely view your credit‑card receipts.</>,
    meta: "Typical timing: ~24 hours",
  },
  {
    title: "Equipment (if needed)",
    copy: <>If your setup requires hardware, we ship it <strong>within 1–2 business days</strong>. <em>Already compatible? We skip this step.</em></>,
    meta: "Ships in 1–2 business days",
  },
  {
    title: "Remote activation & verification",
    copy: <>When the hardware arrives, we activate remotely and confirm transactions are flowing correctly.</>,
    meta: "Usually the same day the equipment arrives",
  },
  {
    title: "Funds deployed",
    copy: <>As soon as activation is verified, <strong>we deploy funds immediately</strong>.</>,
    meta: "Immediately after verification",
  },
  {
    title: "Automatic split payments",
    copy: <>An agreed holdback (<strong>10–30%</strong>) of daily card receipts pays down the balance. No sales that day = no payment.</>,
    meta: "Flexible, sales‑based payback",
  },
];

function ParallaxBlock({ children, strength = 12 }: { children: React.ReactNode; strength?: number }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [strength, -strength]);
  return (
    <motion.div ref={ref} style={{ y }} transition={{ type: 'spring', stiffness: 40, damping: 20 }}>
      {children}
    </motion.div>
  );
}

export default function HowWeWorkLanding() {
  return (
    <main className="relative min-h-screen min-h-[100dvh] font-lora text-text">
      {/* Single elaborate backdrop fixed behind everything */}
      <GlobalBackdrop />

      {/* Keep the orb nav bar untouched */}
      <div className="relative z-20">
        <DynamicIslandNav />
      </div>

      {/* HERO — How We Work */}
      <section className="relative z-10 px-6 md:px-10 py-20 lg:py-28">
        <ParallaxBlock strength={10}>
          <div className="rivian-surface rounded-none md:rounded-[16px]" aria-labelledby="hww-title">
            <header className="max-w-4xl mx-auto text-center md:text-left">
              <motion.h1 id="hww-title" className="text-4xl md:text-6xl font-poppins font-semibold leading-tight" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                How We Work
              </motion.h1>
              <motion.p className="mt-4 text-[var(--theme-text-secondary)] max-w-2xl" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.7 }}>
                Funding that moves with your sales — not a calendar. We purchase a portion of your future card receipts and you repay via a small daily percentage, automatically.
              </motion.p>
              <motion.div className="mt-8" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.6 }}>
                <Link href="/get-started" passHref>
                  <OrangePushButton>Get Started</OrangePushButton>
                </Link>
              </motion.div>
            </header>
          </div>
        </ParallaxBlock>
      </section>

      {/* SCROLLY SECTIONS — content parallax over the SINGLE backdrop */}
      {STEPS.map((step, i) => (
        <section key={i} className="relative z-10 px-6 md:px-10 py-20 md:py-28">
          <ParallaxBlock strength={i % 2 === 0 ? 14 : 10}>
            <div className="rivian-surface rounded-none md:rounded-[16px]" style={{ ['--accent-1' as any]: ACCENTS[i % ACCENTS.length] }}>
              <div className="max-w-5xl mx-auto grid md:grid-cols-12 gap-6 items-center">
                <motion.div className="md:col-span-7" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.6 }}>
                  <div className="text-xs uppercase tracking-wide opacity-80 mb-2">Step {i + 1}</div>
                  <h2 className="text-2xl md:text-4xl font-poppins font-semibold mb-3">{step.title}</h2>
                  <p className="text-[var(--theme-text-secondary)] leading-relaxed">{step.copy}</p>
                  <div className="mt-3 text-sm opacity-80">{step.meta}</div>
                </motion.div>
                <div className="md:col-span-5" />
              </div>
            </div>
          </ParallaxBlock>
        </section>
      ))}

      {/* Timeline disclaimer */}
      <section className="relative z-10 px-6 md:px-10 pb-20">
        <div className="max-w-5xl mx-auto">
          <div className="rivian-note">
            <strong>Typical total timeline:</strong> 3–5 business days from signed application to funding. Timing depends on shipping, activation, and responsiveness.
          </div>
        </div>
      </section>
    </main>
  );
}

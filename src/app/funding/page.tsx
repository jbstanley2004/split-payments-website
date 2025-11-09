"use client";

import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform, type MotionProps } from "framer-motion";
import Image from "next/image";
import { DynamicIslandNav } from "@/components/dynamic-island-nav";
import Hero from "@/components/Hero";
import CardBeamAnimation from "@/components/CardBeamAnimation";
import { RivianBackdrop } from "@/components/RivianBackdrop";

function ParallaxIllustration({ className, children, offset = [-6, 6], ...motionProps }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], offset.map((v) => `${v}%`));
  return (
    <motion.div ref={ref} style={{ y }} className={className} {...motionProps}>
      {children}
    </motion.div>
  );
}

export default function FundingPage() {
  return (
    <main className="relative min-h-screen min-h-[100dvh] font-lora text-text">
      <div className="relative z-10 bg-bg min-h-screen min-h-[100dvh]">
        <DynamicIslandNav />
        <Hero />

        {/* === HOW IT WORKS (Rivian-style layered backdrop) === */}
        <section id="split-funding-process" className="relative px-6 md:px-10 py-14 md:py-20">
          <div className="rivian-surface rivian-using-assets" aria-labelledby="how-it-works-title">
            <RivianBackdrop />

            <header className="mb-6">
              <h2 id="how-it-works-title" className="text-3xl md:text-4xl font-poppins">How It Works</h2>
              <p className="text-[var(--theme-text-secondary)]">Funding that moves with your sales—without fixed due dates.</p>
            </header>

            <ol className="rivian-steps">
              <li className="rivian-step">
                <h3>Quick application</h3>
                <p>Tell us your monthly card volume (min <strong>$8,000</strong>). No credit checks; bankruptcies OK.</p>
                <p className="rivian-meta">What we check: card‑processing rhythm</p>
              </li>

              <li className="rivian-step">
                <h3>Merchant account approval</h3>
                <p>We set up secure visibility into your card receipts.</p>
                <p className="rivian-meta">Typical timing: <strong>~24 hours</strong></p>
              </li>

              <li className="rivian-step">
                <h3>Equipment (if needed)</h3>
                <p>We ship compatible hardware if your setup requires it.</p>
                <p className="rivian-meta">Ships in <strong>1–2 business days</strong>. <em>Skip if already compatible.</em></p>
              </li>

              <li className="rivian-step">
                <h3>Remote activation &amp; verification</h3>
                <p>We activate remotely and confirm transactions are flowing correctly.</p>
                <p className="rivian-meta">Usually the <strong>same day</strong> the equipment arrives</p>
              </li>

              <li className="rivian-step">
                <h3>Funds deployed</h3>
                <p>Once activation is verified, we deploy funds.</p>
                <p className="rivian-meta"><strong>Immediately after verification</strong></p>
              </li>

              <li className="rivian-step">
                <h3>Automatic split payments</h3>
                <p>An agreed holdback (<strong>10–30%</strong>) from daily card receipts—no sales, no payment.</p>
                <p className="rivian-meta">Flexible, sales‑based payback</p>
              </li>
            </ol>

            <aside className="rivian-note" role="note">
              <strong>Typical total timeline:</strong> 3–5 business days from signed application to funding.
              Actual timing may vary with shipping, activation, and responsiveness.
            </aside>
          </div>
        </section>

        {/* Payments / POS */}
        <section id="pos" className="px-6 md:px-10 py-8 md:py-12 flex flex-col md:flex-row items-center md:items-stretch justify-between gap-10 md:gap-0 md:min-h-[620px] border-b border-line/50">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
            className="w-full md:w-1/2 max-w-xl mx-auto md:mx-0 text-center md:text-left md:h-full md:flex md:flex-col md:justify-center"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-poppins font-semibold leading-tight text-[var(--theme-text-primary)] mb-4">Payments built for every business</h2>
            <p className="text-lg font-lora text-[var(--theme-text-secondary)] mb-6 max-w-md mx-auto md:mx-0">
              POS, online, and mobile — fast, secure, and all connected to split.
            </p>
            <ul className="text-[var(--theme-text-secondary)] space-y-2 text-sm inline-block text-left font-lora">
              <li>✔ real-time reporting & reconciliation</li>
              <li>✔ competitive, transparent pricing</li>
              <li>✔ multi-location management</li>
            </ul>
          </motion.div>

          <ParallaxIllustration
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
            className="w-full md:w-1/2 flex justify-center md:justify-end md:h-full"
            offset={[-3, 9]}
          >
            <div className="relative w-full max-w-[540px] md:max-w-none aspect-[4/3] md:aspect-auto md:h-full md:min-h-[600px]">
              <Image
                src="/merchants.png"
                alt="merchants"
                fill
                className="object-contain object-center md:object-right-top"
                sizes="(min-width: 1280px) 50vw, (min-width: 768px) 52vw, 90vw"
              />
            </div>
          </ParallaxIllustration>
        </section>

        <CardBeamAnimation />

        <footer className="border-t border-line/50 px-6 md:px-10 py-8 text-xs text-muted flex flex-col md:flex-row items-center justify-between gap-4">
          <div>© 2025 split payments, inc.</div>
          <div className="flex items-center gap-6">
            <a href="/policy">privacy</a>
            <a href="/terms">terms</a>
            <a href="/support">contact</a>
          </div>
        </footer>
      </div>
    </main>
  );
}

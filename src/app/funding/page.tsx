"use client";

import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform, type MotionProps } from "framer-motion";
import Image from "next/image";
import { DynamicIslandNav } from "@/components/dynamic-island-nav";
import CardBeamAnimation from "@/components/CardBeamAnimation";

type ParallaxIllustrationProps = MotionProps & {
  className?: string;
  children: ReactNode;
  offset?: [number, number];
};

function ParallaxIllustration({
  className,
  children,
  offset = [-6, 6],
  ...motionProps
}: ParallaxIllustrationProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    offset.map((value) => `${value}%`)
  );

  return (
    <motion.div ref={ref} style={{ y }} className={className} {...motionProps}>
      {children}
    </motion.div>
  );
}

export default function FundingPage() {
  return (
    <main className="relative min-h-screen min-h-[100dvh] font-lora text-text">
      {/* All content with relative positioning */}
      <div className="relative z-10 bg-bg min-h-screen min-h-[100dvh]">
        <DynamicIslandNav />

        {/* Funding Overview — graphic + copy */}
        <section
          id="funding-overview"
          className="px-6 md:px-10 py-12 md:py-16 border-b border-line/50"
          aria-labelledby="funding-overview-heading"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Graphic */}
            <div className="lg:col-span-6">
              <div className="relative rounded-3xl border border-line/50 bg-[var(--surface)] p-3 md:p-4">
                <Image
                  src="/Split_funding_overview.svg"
                  width={1400}
                  height={760}
                  alt="Diagram showing Split's funding flow: card sales feed a relationship loop where small fixed percentages repay funding while new offers are extended over time."
                  className="w-full h-auto rounded-2xl"
                  priority
                />
              </div>
            </div>

            {/* Copy */}
            <div className="lg:col-span-6 text-[var(--theme-text-primary)]">
              <h1 id="funding-overview-heading" className="font-poppins text-4xl md:text-5xl font-semibold leading-tight mb-5">Relationship, not a one-off</h1>

              <p className="text-lg text-[var(--theme-text-secondary)] mb-6">
                As you process with us, we review your rhythm and extend additional rounds of funding on a cadence that fits your business — biweekly, monthly, or as needed. The goal is to grow together, not to run a single transaction.
              </p>

              <h2 className="font-poppins text-2xl md:text-3xl font-semibold mb-3">Why it works</h2>
              <p className="text-[var(--theme-text-secondary)] mb-6">
                You already process card payments. Repayments come from a fixed percentage of those sales, so payments move in step with your revenue. When you have a slow day, you pay less. If there are no sales, there’s no payment.
              </p>

              <h2 className="font-poppins text-2xl md:text-3xl font-semibold mb-3">What we focus on</h2>
              <p className="text-[var(--theme-text-secondary)] mb-6">
                Our attention is on your card processing revenue. As long as that flow stays consistent, we keep funding you in new rounds. Typical qualification is around eight thousand dollars per month in processing volume. We don’t base decisions on personal credit or bank balances.
              </p>

              <h2 className="font-poppins text-2xl md:text-3xl font-semibold mb-3">Timeline for initial funding</h2>
              <ol className="space-y-3 text-[var(--theme-text-secondary)]">
                <li><strong className="font-poppins text-[var(--theme-text-primary)]">Merchant account approval</strong> — about one day</li>
                <li><strong className="font-poppins text-[var(--theme-text-primary)]">Virtual setup or POS shipped</strong> — same day for virtual, one to two days if equipment is shipped</li>
                <li><strong className="font-poppins text-[var(--theme-text-primary)]">Remote activation and verification</strong></li>
                <li><strong className="font-poppins text-[var(--theme-text-primary)]">Funds deployed</strong> — typically within three to five days from agreement</li>
              </ol>
              <p className="mt-3 text-xs text-muted">(Timelines are averages, not promises.)</p>
            </div>
          </div>
        </section>

        {/* Payments / POS */}
        <section
          id="pos"
          className="px-6 md:px-10 py-8 md:py-12 flex flex-col md:flex-row items-center md:items-stretch justify-between gap-10 md:gap-0 md:min-h-[620px] border-b border-line/50"
        >
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
            className="w-full md:w-1/2 max-w-xl mx-auto md:mx-0 text-center md:text-left md:h-full md:flex md:flex-col md:justify-center"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-poppins font-semibold leading-tight text-[var(--theme-text-primary)] mb-4">Payments built for every business</h2>
            <p className="text-lg font-lora text-[var(--theme-text-secondary)] mb-6 max-w-md mx-auto md:mx-0">
              Simplify your operations with connected POS, online, and mobile payment solutions.
            </p>
            <ul className="text-[var(--theme-text-secondary)] space-y-2 text-sm inline-block text-left font-lora">
              <li>• Real time reporting and reconciliation</li>
              <li>• Transparent, competitive pricing</li>
              <li>• Easy management across multiple locations</li>
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
                alt="Split merchant dashboard showing sales based funding and payment analytics"
                fill
                className="object-contain object-center md:object-right-top"
                sizes="(min-width: 1280px) 50vw, (min-width: 768px) 52vw, 90vw"
              />
            </div>
          </ParallaxIllustration>
        </section>

        {/* Card Beam Animation */}
        <CardBeamAnimation />

        {/* Footer */}
        <footer className="border-t border-line/50 px-6 md:px-10 py-8 text-xs text-muted flex flex-col md:flex-row items-center justify-between gap-4">
          <div>© 2025 Split Payments, Inc. All rights reserved.</div>
          <div className="flex items-center gap-6">
            <a href="/policy">Privacy Policy</a>
            <a href="/terms">Terms of Service</a>
            <a href="/support">Contact</a>
          </div>
        </footer>
      </div>
    </main>
  );
}

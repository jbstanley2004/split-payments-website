"use client";

import { DynamicIslandNav } from "@/components/dynamic-island-nav";
import Hero from "@/components/Hero";
import PaymentsSection from "@/components/sections/PaymentsSection";
import GetStartedSection from "@/components/sections/GetStartedSection";
import OrangePushButton from "@/components/OrangePushButton";
import { WaterRipple } from "@/components/WaterRipple";
import Link from "next/link";
import { motion } from "framer-motion";

export default function HomePage() {
  return (
    <main className="relative min-h-screen min-h-[100dvh] font-lora bg-[#faf9f5] text-[#141413]">
      <div className="relative z-20">
        <DynamicIslandNav
          navItems={[
            { label: 'Home', href: '/#home', sectionId: 'home' },
            { label: 'Payments', href: '/#payments', sectionId: 'payments' },
            { label: 'Funding', href: '/#funding', sectionId: 'funding' },
            { label: 'Get Started', href: '/#get-started', sectionId: 'get-started', variant: 'cta' },
          ]}
        />
      </div>

      <div className="relative z-10">
        <section
          id="home"
          data-section-id="home"
          className="min-h-screen min-h-[100dvh] flex items-end justify-center text-center pb-24 md:pb-32 pt-24"
        >
          <motion.div
            initial={{ opacity: 0, translateY: 30 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex flex-col items-center gap-10 max-w-4xl px-6"
            style={{ willChange: 'transform, opacity' }}
          >
            <div className="rounded-2xl border border-[#e8e6dc] bg-[#faf9f5]/95 shadow-md px-6 py-8 sm:px-10 sm:py-10">
              <p className="text-xs tracking-[0.26em] uppercase text-[#b0aea5] mb-4">Shared payments · Wabi-sabi</p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-poppins font-semibold leading-tight">
                Empowering growth through calm payments.
              </h1>
              <p className="mt-5 text-base md:text-lg font-lora text-[#4b4a45] max-w-2xl mx-auto">
                Accept payments and access funding in a quieter interface. No noisy charts or neon gradients — just the numbers that
                matter for your business.
              </p>
              <motion.div
                initial={{ opacity: 0, translateY: 20 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{ delay: 0.2, duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
                style={{ willChange: 'transform, opacity' }}
                className="mt-8 flex flex-wrap items-center justify-center gap-4"
              >
                <WaterRipple>
                  <Link href="/#get-started" passHref>
                    <OrangePushButton>Get Started</OrangePushButton>
                  </Link>
                </WaterRipple>
                <Link
                  href="/#funding"
                  className="px-4 py-2 rounded-full border border-[#e8e6dc] text-sm text-[#77756c] hover:border-[#141413] hover:text-[#141413] transition-colors"
                >
                  See how funding works
                </Link>
              </motion.div>
              <p className="mt-4 text-xs text-[#77756c]">Scroll to explore payments, funding, and how to get started.</p>
            </div>
          </motion.div>
        </section>

        <section
          id="funding"
          data-section-id="funding"
          className="bg-[#faf9f5] border-t border-[#e8e6dc]"
        >
          <Hero />
        </section>

        <section
          id="payments"
          data-section-id="payments"
          className="bg-[#faf9f5] border-t border-[#e8e6dc]"
        >
          <PaymentsSection />
        </section>

        <section
          id="get-started"
          data-section-id="get-started"
          className="bg-[#faf9f5] border-t border-[#e8e6dc]"
        >
          <GetStartedSection />
        </section>
      </div>
    </main>
  );
}

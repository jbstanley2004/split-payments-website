"use client";

import { DynamicIslandNav } from "@/components/dynamic-island-nav";
import { FlexibleFundingHero, HowFundingWorksBlock } from "@/components/Hero";
import PaymentsSection from "@/components/sections/PaymentsSection";
import GetStartedSection from "@/components/sections/GetStartedSection";
import { motion } from "framer-motion";

export default function HomePage() {
  return (
    <main className="relative min-h-screen min-h-[100dvh] min-h-[100svh] font-lora text-[#161616] bg-[#D8D9D4]">
      <div className="relative z-10">
        <DynamicIslandNav />

        {/* LANDING HERO */}
        <section
          id="home"
          data-section-id="home"
          className="relative min-h-screen min-h-[100dvh] min-h-[100svh] flex items-end justify-center text-center pb-24 md:pb-32"
        >
          <motion.div
            initial={{ opacity: 0, translateY: 30 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex flex-col items-center gap-8 max-w-4xl px-6"
            style={{ willChange: "transform, opacity" }}
          >
            <p className="text-[0.7rem] uppercase tracking-[0.3em] text-[#B0AEA5]">
              Payments • Funding • Partnerships
            </p>
            <h1 className="text-5xl md:text-[3.5rem] lg:text-[4.25rem] font-poppins font-semibold leading-tight text-[#161616]">
              Funding growth through payment technology.
            </h1>
            <p className="text-base md:text-lg lg:text-xl font-lora text-[#2C2C2C] max-w-2xl">
              Split helps mid-market merchants turn everyday card volume into working capital while keeping payments, funding, and partnerships on one calm, predictable stack.
            </p>

            <motion.div
              className="flex flex-wrap items-center justify-center gap-2 mt-2"
              initial={{ opacity: 0, translateY: 10 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{ delay: 0.15, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            >
              {["Cards", "Funding", "Workflows", "Approvals", "Partners"].map((pill, index) => {
                const palette = ["#D8D9D4", "#6A9BCC", "#788C5D", "#CBCADB", "#D8D9D4"];
                const bg = palette[index % palette.length];
                const isBeige = bg === "#D8D9D4";
                const textColor = isBeige ? "#161616" : "#F5F5F3";

                return (
                  <span
                    key={pill}
                    className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-medium tracking-[0.16em] uppercase border border-[#D8D9D4]"
                    style={{ backgroundColor: bg, color: textColor }}
                  >
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#FF4306]" />
                    <span>{pill}</span>
                  </span>
                );
              })}
            </motion.div>

            <motion.div
              className="flex flex-col items-center text-[0.7rem] uppercase tracking-[0.3em] text-[#B0AEA5] mt-8"
              initial={{ opacity: 0, translateY: 10 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{ delay: 0.25, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <span>Scroll to see how it works</span>
              <motion.span
                aria-hidden="true"
                className="mt-3 flex flex-col items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.4, 1, 0.4], translateY: [0, 4, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <svg
                  width="24"
                  height="32"
                  viewBox="0 0 24 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-[#B0AEA5]"
                >
                  <path
                    d="M12 4v20m0 0l-6-6m6 6 6-6"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </motion.span>
            </motion.div>
          </motion.div>
        </section>

        {/* HOW FUNDING WORKS */}
        <section
          id="how-funding-works"
          data-section-id="how-funding-works"
          className="px-6 md:px-10 lg:px-16 pt-16 md:pt-20"
        >
          <HowFundingWorksBlock />
        </section>

        {/* FLEXIBLE FUNDING HERO */}
        <section
          id="funding"
          data-section-id="funding"
          className="px-6 md:px-10 lg:px-16 pb-8 md:pb-12"
        >
          <FlexibleFundingHero />
        </section>

        {/* HOME PAYMENTS SECTION */}
        <section
          id="payments"
          data-section-id="payments"
          className="px-6 md:px-10 lg:px-16 pt-8 md:pt-12 pb-10 md:pb-16"
        >
          <PaymentsSection />
        </section>

        {/* BOTTOM GET STARTED */}
        <section id="get-started" data-section-id="get-started">
          <GetStartedSection />
        </section>
      </div>
    </main>
  );
}

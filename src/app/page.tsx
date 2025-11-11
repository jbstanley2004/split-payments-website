"use client";

import { DynamicIslandNav } from "@/components/dynamic-island-nav";
import OrangePushButton from "@/components/OrangePushButton";
import { WaterRipple } from "@/components/WaterRipple";
import Link from "next/link";
import { motion } from "framer-motion";
import FundingBento from "@/components/FundingBento/FundingBento";

export default function HomePage() {
  return (
    <main className="relative min-h-screen font-lora text-text bg-bg dark:bg-bg">
      {/* All content with relative positioning */}
      <div className="relative z-10 min-h-screen">
        <DynamicIslandNav />

        {/* Hero Content */}
        <section className="min-h-[calc(100vh-200px)] flex items-center justify-center text-center py-24 md:py-32">
          <motion.div
            initial={{ opacity: 0, translateY: 30 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex flex-col items-center gap-10 max-w-4xl px-6"
            style={{ willChange: "transform, opacity" }}
          >
            {/* Headline */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-poppins font-semibold leading-tight text-text-primary dark:text-text-primary">
              The new standard in merchant cash advances
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl font-lora text-text-secondary dark:text-text-secondary">
              A smarter way to fund your business — seamless integration, instant access, and full transparency.
            </p>

            {/* Get Started Button */}
            <motion.div
              initial={{ opacity: 0, translateY: 20 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{ delay: 0.2, duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
              style={{ willChange: "transform, opacity" }}
            >
              <WaterRipple>
                <Link href="/get-started" passHref>
                  <OrangePushButton>Get Started</OrangePushButton>
                </Link>
              </WaterRipple>
            </motion.div>
          </motion.div>
        </section>

        <FundingBento />

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

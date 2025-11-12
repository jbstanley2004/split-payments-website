"use client";

import { DynamicIslandNav } from "@/components/dynamic-island-nav";
import OrangePushButton from "@/components/OrangePushButton";
import { WaterRipple } from "@/components/WaterRipple";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import PaymentsSection from "@/components/PaymentsSection";
import FundingSection from "@/components/FundingSection";
import GetStartedSection from "@/components/GetStartedSection";

export default function HomePage() {
  return (
    <main className="relative font-lora text-text">
      <DynamicIslandNav />

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen min-h-[100dvh]">
        {/* Background */}
        <div className="absolute inset-0 z-0 w-full h-full">
          <Image
            src="/hero_image_formatted.png"
            alt="A modern office interior"
            fill
            className="object-cover object-center"
            priority
            sizes="100vw"
          />
          {/* Subtle overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/20" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 min-h-screen min-h-[100dvh] flex items-end justify-center text-center pb-24 md:pb-32">
          <motion.div
            initial={{ opacity: 0, translateY: 30 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex flex-col items-center gap-10 max-w-4xl px-6"
            style={{ willChange: "transform, opacity" }}
          >
            {/* Headline */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-poppins font-semibold leading-tight text-black dark:text-black">
              The new standard in merchant cash advances
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl font-lora text-gray-700 dark:text-gray-700">
              A smarter way to fund your business — seamless integration, instant access, and full transparency.
            </p>

            {/* Get Started Button - matching the site's button style */}
            <motion.div
              initial={{ opacity: 0, translateY: 20 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{ delay: 0.2, duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
              style={{ willChange: "transform, opacity" }}
            >
              <WaterRipple>
                <Link href="#get-started" passHref>
                  <OrangePushButton>Get Started</OrangePushButton>
                </Link>
              </WaterRipple>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* @ts-expect-error Async Server Component */}
      <PaymentsSection />
      {/* @ts-expect-error Async Server Component */}
      <FundingSection />
      <GetStartedSection />

      {/* Footer */}
      <footer className="border-t border-line/50 px-6 md:px-10 py-8 text-xs text-muted flex flex-col md:flex-row items-center justify-between gap-4 bg-bg">
        <div>© 2025 Split Payments, Inc. All rights reserved.</div>
        <div className="flex items-center gap-6">
          <a href="/policy">Privacy Policy</a>
          <a href="/terms">Terms of Service</a>
          <a href="/support">Contact</a>
        </div>
      </footer>
    </main>
  );
}

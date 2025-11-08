"use client";

import { DynamicIslandNav } from "@/components/dynamic-island-nav";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function LandingPage() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-[var(--theme-background)]">
      {/* Dynamic Island Navigation */}
      <DynamicIslandNav />

      {/* Full-page Hero Image Background */}
      <div className="fixed inset-0 -z-10">
        <Image
          src="/split_hero_image.png"
          alt="Your Future is Bright"
          fill
          className="object-cover"
          priority
          quality={100}
        />
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/20" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex flex-col items-center gap-10"
        >
          {/* Headline */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-poppins font-semibold leading-tight text-[var(--theme-text-primary)]">
            Your Future is Bright.
          </h1>

          {/* Get Started Button - matching the site's button style */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <Link
              href="/get-started"
              className="inline-flex items-center gap-2 border border-[var(--theme-border)] px-8 py-4 rounded-md text-[var(--theme-accent)] font-poppins text-base font-medium hover:bg-[var(--theme-accent)] hover:text-white transition-all duration-300 ease-out shadow-sm"
            >
              Get Started
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
}

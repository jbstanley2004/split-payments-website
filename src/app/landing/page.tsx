"use client";

import { DynamicIslandNav } from "@/components/dynamic-island-nav";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function LandingPage() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden">
      {/* Dynamic Island Navigation */}
      <DynamicIslandNav />

      {/* Full-page Hero Image */}
      <div className="fixed inset-0 -z-10">
        <Image
          src="/split_hero_image.png"
          alt="Split Hero"
          fill
          className="object-cover"
          priority
          quality={100}
        />
        {/* Gradient overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex flex-col items-center gap-8"
        >
          {/* Headline */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-poppins font-bold text-white drop-shadow-2xl">
            Your Future is Bright.
          </h1>

          {/* Get Started Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <Link
              href="/get-started"
              className="group relative inline-flex items-center gap-3 rounded-full bg-white/95 px-8 py-4 text-lg font-semibold text-black shadow-2xl backdrop-blur-sm transition-all hover:bg-white hover:scale-105 hover:shadow-[0_20px_60px_rgba(255,255,255,0.3)]"
            >
              <span className="font-poppins">Get Started</span>
              <svg
                className="h-5 w-5 transition-transform group-hover:translate-x-1"
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

"use client";

import { DynamicIslandNav } from "@/components/dynamic-island-nav";
import Image from "next/image";
import { motion } from "framer-motion";
import { SplitPressButton } from "@/components/split-press-button";

export default function HomePage() {
  return (
    <main className="relative min-h-screen font-lora text-text">
      {/* Fixed Background */}
      <div className="fixed inset-0 z-0">
        <Image
          src="/split_hero_image.png"
          alt="Your Future is Bright"
          fill
          className="object-cover"
          priority
        />
        {/* Subtle overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/20" />
      </div>

      {/* All content with relative positioning */}
      <div className="relative z-10">
        <DynamicIslandNav />

        {/* Hero Content */}
        <section className="px-6 md:px-10 min-h-screen flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-center flex flex-col items-center gap-10"
          >
            {/* Headline */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-poppins font-semibold leading-tight text-[var(--theme-text-primary)]">
              Your Future is Bright.
            </h1>

            {/* Let's Split Button with 3D Press Effect */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <SplitPressButton href="/get-started" />
            </motion.div>
          </motion.div>
        </section>
      </div>
    </main>
  );
}

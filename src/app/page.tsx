"use client";

import { DynamicIslandNav } from "@/components/dynamic-island-nav";
import OrangePushButton from "@/components/OrangePushButton";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function HomePage() {
  return (
    <main className="relative min-h-screen min-h-[100dvh] font-lora text-text">
      {/* Fixed Background */}
      <div className="fixed inset-0 z-0 w-full h-full min-h-screen min-h-[100dvh]">
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

      {/* All content with relative positioning */}
      <div className="relative z-10 min-h-screen min-h-[100dvh]">
        <DynamicIslandNav />

        {/* Hero Content */}
        <section className="min-h-screen min-h-[100dvh] flex items-center justify-start text-left">
          <motion.div
            initial={{ opacity: 0, translateY: 30 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex flex-col items-start gap-10 max-w-2xl pl-12 md:pl-24 lg:pl-32"
            style={{ willChange: "transform, opacity" }}
          >
            {/* Headline */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-poppins font-semibold leading-tight text-black">
              The new standard in merchant cash advances
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl font-lora text-black">
              A smarter way to fund your business — seamless integration, instant access, and full transparency.
            </p>

            {/* Get Started Button - matching the site's button style */}
            <motion.div
              initial={{ opacity: 0, translateY: 20 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{ delay: 0.2, duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
              style={{ willChange: "transform, opacity" }}
            >
              <Link href="/get-started" passHref>
                <OrangePushButton>Get Started</OrangePushButton>
              </Link>
            </motion.div>
          </motion.div>
        </section>
      </div>
    </main>
  );
}

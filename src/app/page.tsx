"use client";

import { DynamicIslandNav } from "@/components/dynamic-island-nav";
import OrangePushButton from "@/components/OrangePushButton";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import HowItWorks from "@/components/HowItWorks";

export default function HomePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How Credit Card Split Funding Works",
    "description": "We purchase a portion of future credit card receipts and provide upfront funding. Payback is a small percentage of daily card sales (10–30%).",
    "step": [
      {"@type":"HowToStep","name":"Quick application","text":"Provide basics and average monthly card volume (minimum $8,000)."},
      {"@type":"HowToStep","name":"Merchant account approval","text":"Enable secure visibility into card receipts.","timeRequired":"P1D"},
      {"@type":"HowToStep","name":"Equipment (if needed)","text":"Ship compatible hardware when required.","timeRequired":"P1D"},
      {"@type":"HowToStep","name":"Remote activation & verification","text":"Activate remotely and confirm transactions are flowing."},
      {"@type":"HowToStep","name":"Funds deployed","text":"Funds are deployed immediately once activation is verified."},
      {"@type":"HowToStep","name":"Automatic split payments","text":"An agreed 10–30% of daily credit card receipts pays down the balance. No sales, no payment."}
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="relative min-h-screen min-h-[100dvh] font-lora text-text">
        {/* Fixed Background */}
        <div className="fixed inset-0 z-0 w-full h-full min-h-screen min-h-[100dvh]">
          <Image
            src="/landing_page_hero.webp"
            alt="Your Future is Bright"
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
          <section className="px-6 md:px-10 min-h-screen min-h-[100dvh] flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, translateY: 30 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
              className="text-center flex flex-col items-center gap-10"
              style={{ willChange: "transform, opacity" }}
            >
              {/* Headline */}
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-poppins font-semibold leading-tight text-[var(--theme-text-primary)]">
                Your Future is Bright.
              </h1>

              {/* Get Started Button - matching the site's button style */}
              <motion.div
                initial={{ opacity: 0, translateY: 20 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{
                  delay: 0.2,
                  duration: 0.7,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
                style={{ willChange: "transform, opacity" }}
              >
                <Link href="/get-started" passHref>
                  <OrangePushButton>Get Started</OrangePushButton>
                </Link>
              </motion.div>
            </motion.div>
          </section>
          <HowItWorks />
        </div>
      </main>
    </>
  );
}
"use client";

import { DynamicIslandNav } from "@/components/dynamic-island-nav";
import OrangePushButton from "@/components/OrangePushButton";
import { WaterRipple } from "@/components/WaterRipple";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import ScrollProgressRail from "@/components/ScrollProgressRail";
import DeploymentCycleVertical from "@/components/DeploymentCycleVertical";
import FundingLoopVertical from "@/components/FundingLoopVertical";
import "@/components/ScrollProgressRail.css";
import "@/components/DeploymentCycleVertical.css";
import "@/components/FundingLoopVertical.css";

export default function HomePage() {
  const nodes = [
    { id: 'hero', label: 'Agreement Signed', colorVar: '--color-slate' },
    { id: 'processing', label: 'Merchant Activated', colorVar: '--theme-accent-blue' },
    { id: 'funding', label: 'Funds Deployed', colorVar: '--theme-accent-green' },
    { id: 'growth', label: 'Additional Round', colorVar: '--color-gold' },
  ];
  return (
    <main className="relative min-h-screen min-h-[100dvh] font-lora text-text">
      <ScrollProgressRail nodes={nodes} />

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
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/20" />
      </div>

      {/* All content with relative positioning */}
      <div className="relative z-10 min-h-screen min-h-[100dvh]">
        <DynamicIslandNav />

        {/* HERO (clean, no overlay UI elements inside) */}
        <section id="hero" className="min-h-screen min-h-[100dvh] flex items-end justify-center text-center pb-24 md:pb-32">
          <motion.div
            initial={{ opacity: 0, translateY: 30 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex flex-col items-center gap-10 max-w-4xl px-6"
            style={{ willChange: 'transform, opacity' }}
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-poppins font-semibold leading-tight text-black">
              The new standard in merchant cash advances
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl font-lora text-gray-700">
              A smarter way to fund your business — seamless integration, instant access, and full transparency.
            </p>
            <motion.div
              initial={{ opacity: 0, translateY: 20 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{ delay: 0.2, duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
              style={{ willChange: 'transform, opacity' }}
            >
              <WaterRipple>
                <Link href="/get-started" passHref>
                  <OrangePushButton>Get Started</OrangePushButton>
                </Link>
              </WaterRipple>
            </motion.div>
          </motion.div>
        </section>

        {/* PROCESSING */}
        <section id="processing" className="px-6 md:px-10 py-16 md:py-24 bg-white border-t border-line/40">
          <div className="grid md:grid-cols-12 gap-x-10 gap-y-8 items-center">
            <div className="md:col-span-6">
              <h2 className="text-4xl md:text-5xl font-poppins font-semibold text-[var(--theme-text-primary)]">Payment infrastructure built for every business</h2>
              <p className="mt-4 text-lg text-[var(--theme-text-secondary)] max-w-prose">Accept payments anywhere with secure, integrated tools that connect directly to Split. Real time reporting, transparent pricing, and the flexibility to manage it all in one place.</p>
            </div>
            <div className="md:col-span-6">
              <div className="relative w-full aspect-[4/3] max-w-[680px] mx-auto">
                <Image src="/merchants.png" alt="Processing dashboard" fill className="object-contain" />
              </div>
            </div>
          </div>
        </section>

        {/* FUNDING (Deployment + Loop combined narrative) */}
        <section id="funding" className="px-6 md:px-10 py-16 md:py-24 bg-white border-t border-line/40">
          <DeploymentCycleVertical className="mb-16" />
          <FundingLoopVertical />
        </section>

        {/* GROWTH / CTA */}
        <section id="growth" className="px-6 md:px-10 py-20 bg-white border-t border-line/40">
          <div className="max-w-3xl text-center mx-auto">
            <h2 className="text-4xl md:text-5xl font-poppins font-semibold">Cycle continues</h2>
            <p className="mt-4 text-lg text-[var(--theme-text-secondary)]">As sales grow, eligibility updates in real time — unlocking the next round right when you need it.</p>
            <div className="mt-8">
              <Link href="/get-started" passHref><OrangePushButton>Get started</OrangePushButton></Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

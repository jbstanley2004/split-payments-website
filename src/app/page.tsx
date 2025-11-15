"use client";

import { DynamicIslandNav } from "@/components/dynamic-island-nav";
import Hero, { FlexibleFundingHero, HowFundingWorksBlock } from "@/components/Hero";
import PaymentsSection from "@/components/sections/PaymentsSection";
import GetStartedSection from "@/components/sections/GetStartedSection";
import OrangePushButton from "@/components/OrangePushButton";
import { WaterRipple } from "@/components/WaterRipple";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function HomePage() {
  return (
    <main className="relative min-h-screen min-h-[100dvh] font-lora text-text bg-[#FAF9F5]">
      {/* Fixed Background for Home Hero (single illustration, as before) */}
      <div className="fixed inset-0 z-0 w-full h-full min-h-screen min-h-[100dvh]">
        <Image
          src="/hero_image_formatted.png"
          alt="Soft illustrated landscape background"
          fill
          className="object-cover object-center bg-[#F8F4EC]"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/20" />
      </div>

      <div className="relative z-10">
        <DynamicIslandNav
          navItems={[
            { label: "Home", href: "/#home", sectionId: "home" },
            { label: "Payments", href: "/#payments", sectionId: "payments" },
            { label: "Funding", href: "/#funding", sectionId: "funding" },
            {
              label: "Get Started",
              href: "/#get-started",
              sectionId: "get-started",
              variant: "cta",
            },
          ]}
        />

        {/* LANDING HERO – full-bleed over background image */}
        <section
          id="home"
          data-section-id="home"
          className="min-h-screen min-h-[100dvh] flex items-end justify-center text-center pb-24 md:pb-32"
        >
          <motion.div
            initial={{ opacity: 0, translateY: 30 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex flex-col items-center gap-10 max-w-4xl px-6"
            style={{ willChange: "transform, opacity" }}
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-poppins font-semibold leading-tight text-black dark:text-black">
              Funding growth through payment technology
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl font-lora text-gray-700 dark:text-gray-700">
              A Smarter Way to Fund Your Business
            </p>

            <motion.div
              initial={{ opacity: 0, translateY: 20 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{ delay: 0.2, duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
              style={{ willChange: "transform, opacity" }}
            >
              <WaterRipple>
                <Link href="/#get-started" passHref>
                  <OrangePushButton>Get Started</OrangePushButton>
                </Link>
              </WaterRipple>
            </motion.div>
          </motion.div>
        </section>

        {/* HOW FUNDING WORKS – full-width narrative block */}
        <section
          id="how-funding-works"
          data-section-id="how-funding-works"
          className="px-3 pb-6 pt-4 sm:px-4 sm:pb-8 sm:pt-6 md:px-6 md:pb-10 md:pt-8"
        >
          <div className="mx-auto max-w-6xl overflow-hidden rounded-[36px] bg-[#FAF9F5] shadow-[0_30px_80px_rgba(20,20,19,0.18)] ring-1 ring-[#E8E6DC]">
            <HowFundingWorksBlock />
          </div>
        </section>

        {/* FLEXIBLE FUNDING HERO – its own block before Payments */}
        <section
          id="funding"
          data-section-id="funding"
          className="px-3 pb-6 pt-4 sm:px-4 sm:pb-8 sm:pt-6 md:px-6 md:pb-10 md:pt-8"
        >
          <div className="mx-auto max-w-6xl overflow-hidden rounded-[36px] bg-[#FAF9F5] shadow-[0_30px_80px_rgba(20,20,19,0.18)] ring-1 ring-[#E8E6DC]">
            <FlexibleFundingHero />
          </div>
        </section>

        {/* HOME PAYMENTS SECTION – wrapped in rounded container */}
        <section
          id="payments"
          data-section-id="payments"
          className="px-3 pb-6 pt-4 sm:px-4 sm:pb-8 sm:pt-6 md:px-6 md:pb-10 md:pt-8"
        >
          <div className="mx-auto max-w-6xl overflow-hidden rounded-[36px] bg-[#FAF9F5] shadow-[0_30px_80px_rgba(20,20,19,0.18)] ring-1 ring-[#E8E6DC]">
            <PaymentsSection />
          </div>
        </section>

        {/* BOTTOM GET STARTED – hero-style card over background, unchanged */}
        <section id="get-started" data-section-id="get-started">
          <GetStartedSection />
        </section>
      </div>
    </main>
  );
}

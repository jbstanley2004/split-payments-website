"use client";

import { DynamicIslandNav } from "@/components/dynamic-island-nav";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, CheckCircle2, CreditCard, Shield, TrendingUp, Zap } from "lucide-react";
import { useState, useEffect } from "react";
import TrustedByCarousel from "@/components/TrustedByCarousel";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import HeroAnimation from "@/components/animations/HeroAnimation";
import CardStackAnimation from "@/components/animations/CardStackAnimation";
import CloverSpotlight from "@/components/CloverSpotlight";
import Image from "next/image";
import WorkingCapitalAnimation from "@/components/animations/WorkingCapitalAnimation";
import PaymentTerminalCard from "@/components/animations/PaymentTerminalCard";
import DashboardAnimation from "@/components/animations/DashboardAnimation";
import ZoomTransitionLink from "@/components/ui/ZoomTransitionLink";


export default function HomePage() {
  const [isScrollLocked, setIsScrollLocked] = useState(true);

  useEffect(() => {
    // Fallback safety timer
    const timer = setTimeout(() => {
      setIsScrollLocked(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  const fadeInUp = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" as any } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  return (
    <main className={`relative min-h-screen text-brand-black selection:bg-black/10 selection:text-black font-poppins ${isScrollLocked ? "h-screen overflow-hidden" : "overflow-x-hidden"}`}>
      <div className="relative z-10">
        <DynamicIslandNav />

        {/* HERO SECTION - Pure White, High Contrast, Elegant */}
        <div className="w-full bg-white pt-20 pb-12 md:pt-20 md:pb-10 min-h-[100dvh] flex flex-col justify-center">
          <section
            id="home"
            className="relative flex flex-col items-center justify-center px-6 md:px-10 lg:px-16"
          >
            <div className="max-w-5xl w-full relative flex flex-col items-center text-center mb-8 md:mb-12">

              <motion.div
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
                onAnimationComplete={() => setIsScrollLocked(false)}
                className="max-w-4xl mx-auto"
              >
                <motion.h1
                  variants={fadeInUp}
                  className="text-4xl md:text-6xl leading-tight tracking-tight text-brand-black mb-6 font-semibold"
                >
                  Payments and funding,
                  <br />
                  <span className="text-brand-charcoal">
                    connected.
                  </span>
                </motion.h1>

                <motion.p
                  variants={fadeInUp}
                  className="text-lg sm:text-xl md:text-2xl font-lora text-black/70 mb-8 md:mb-12 max-w-2xl mx-auto leading-relaxed"
                >
                  One secure platform where your business can process payments and access working capital.
                </motion.p>

                <motion.div
                  variants={fadeInUp}
                  className="flex flex-row justify-center gap-4 w-full max-w-md mx-auto"
                >
                  <Link href="/portal/signup">
                    <PrimaryButton
                      variant="outline-orange"
                      className="shadow-none hover:shadow-none hover:scale-100 active:scale-100"
                    >
                      Get qualified
                    </PrimaryButton>
                  </Link>
                  <Link href="/funding-concierge">
                    <PrimaryButton className="bg-brand-black text-white shadow-none hover:shadow-none hover:scale-100 active:scale-100">
                      AI Help Desk
                    </PrimaryButton>
                  </Link>
                </motion.div>
              </motion.div>
            </div>
            {/* Brands We Work With - Moved here */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 1 }}
              className="w-full max-w-7xl mt-6 text-center"
            >
              <h3 className="text-sm font-medium text-brand-black/50 uppercase tracking-widest mb-8 font-poppins">Brands we work with</h3>
              <TrustedByCarousel />
            </motion.div>
          </section>
        </div>

        {/* FEATURES SECTION 1: Credit Card Processing (Gray) */}
        <div className="w-full bg-[#F6F5F4]">
          <section id="how-it-works" className="px-6 md:px-10 lg:px-16 py-10 md:py-14">
            <div className="max-w-7xl mx-auto space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-8"
              >
                <h2 className="text-4xl md:text-5xl font-bold text-brand-black mb-4 tracking-tight font-poppins">
                  Everything you need
                </h2>
                <p className="text-xl text-brand-black/70 leading-relaxed font-lora max-w-3xl mx-auto">
                  We've unified the fragmented financial stack into one cohesive operating system.
                </p>
              </motion.div>

              {/* 1. Credit Card Processing Section - Copy Left, Visual Right (Desktop) / Visual Top, Copy Bottom (Mobile) */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex flex-col md:flex-row-reverse items-center gap-8 md:gap-12"
              >
                {/* Visual */}
                <div className="w-full md:w-1/2">
                  <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-sm aspect-[4/3] w-full flex items-center justify-center relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <PaymentTerminalCard />
                    </div>
                  </div>
                </div>
                {/* Copy */}
                <div className="w-full md:w-1/2 text-left">
                  <span className="text-sm font-bold text-brand-black/60 uppercase tracking-wider mb-4 block font-poppins">Payments</span>
                  <h3 className="text-4xl md:text-5xl font-bold text-brand-black font-poppins leading-tight mb-4">
                    Smarter payments. <br />
                    <span className="text-brand-charcoal">Stronger cash flow.</span>
                  </h3>
                  <p className="text-xl text-brand-black/70 font-lora leading-relaxed mb-6">
                    Simplify every transaction while unlocking funding that moves at the speed of your business.
                  </p>
                  <ZoomTransitionLink href="/payments">
                    <PrimaryButton className="bg-brand-black text-white shadow-none hover:shadow-none hover:scale-105 active:scale-100 px-8">
                      Learn More
                    </PrimaryButton>
                  </ZoomTransitionLink>
                </div>
              </motion.div>
            </div>
          </section>
        </div>

        {/* FEATURES SECTION 2: Real-time Analytics (Gray) */}
        <div className="w-full bg-[#F6F5F4]">
          <section className="px-6 md:px-10 lg:px-16 py-10 md:py-14">
            <div className="max-w-7xl mx-auto">
              {/* 2. Real-time Analytics Dashboard - Wide console card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="w-full relative"
              >
                <div className="flex flex-col md:flex-row bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="p-6 pb-0 flex flex-col relative z-10 bg-white flex-1 justify-between md:min-h-[400px]">
                    <div className="flex items-start justify-between w-full">
                      <div className="max-w-[80%]">
                        <span className="text-sm font-bold text-brand-black/60 uppercase tracking-wider mb-2 block font-poppins">Analytics</span>
                        <h3 className="text-[32px] font-bold text-brand-black font-poppins leading-tight">
                          Real-time
                          <br />
                          analytics.
                        </h3>
                      </div>
                      <Link href="/funding-concierge" className="flex-shrink-0">
                        <div className="w-14 h-14 rounded-full bg-black flex items-center justify-center text-white transition-transform group-hover:scale-105 shadow-md">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="w-6 h-6"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75" />
                          </svg>
                        </div>
                      </Link>
                    </div>
                  </div>
                  <div className="md:w-2/3 bg-gray-50 relative border-t md:border-t-0 md:border-l border-gray-100 overflow-hidden">
                    <div className="w-full h-full h-[350px] md:h-[400px]">
                      <DashboardAnimation />
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>
        </div>

        {/* FEATURES SECTION 3: Funding (Gray) */}
        <div className="w-full bg-[#F6F5F4]">
          <section className="px-6 md:px-10 lg:px-16 py-10 md:py-14">
            <div className="max-w-7xl mx-auto">
              {/* 3. Working Capital Section - Copy Left, Visual Right (Desktop) / Copy Top, Visual Bottom (Mobile) */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex flex-col md:flex-row items-center gap-8 md:gap-12"
              >
                {/* Copy */}
                <div className="w-full md:w-1/2 text-left">
                  <span className="text-sm font-bold text-brand-black/60 uppercase tracking-wider mb-4 block font-poppins">Funding</span>
                  <h3 className="text-4xl md:text-5xl font-bold text-brand-black font-poppins leading-tight mb-4">
                    Fast, flexible capital <br />
                    <span className="text-brand-charcoal">powered by your sales.</span>
                  </h3>
                  <p className="text-xl text-brand-black/70 font-lora leading-relaxed mb-6">
                    Split Funding offers access to funding that lets you repay as you sell, at every growth stage.
                  </p>
                  <ZoomTransitionLink href="/funding">
                    <PrimaryButton className="bg-brand-black text-white shadow-none hover:shadow-none hover:scale-105 active:scale-100 px-8">
                      Learn More
                    </PrimaryButton>
                  </ZoomTransitionLink>
                </div>
                {/* Visual */}
                <div className="w-full md:w-1/2">
                  <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-sm w-full flex items-center justify-center p-6 md:p-10">
                    <WorkingCapitalAnimation />
                  </div>
                </div>
              </motion.div>
            </div>
          </section>
        </div>

        {/* HARDWARE TEASER */}
        <div className="w-full bg-white">
          <section className="px-6 md:px-10 lg:px-16 py-10 md:py-14 border-b border-brand-stone/30">
            <div className="max-w-6xl mx-auto mb-16 text-center">
              <h2 className="text-3xl md:text-5xl font-bold text-brand-black mb-6 font-poppins">
                Powering the world's best payment tech.
              </h2>
              <p className="text-xl text-brand-black/60 font-lora">
                From mobile readers and full countertop POS systems to autonomous self-service stations.
              </p>
            </div>
            <div className="max-w-5xl mx-auto">
              <CloverSpotlight />
            </div>
          </section>
        </div>



        {/* CTA SECTION */}
        <section className="px-6 md:px-10 lg:px-16 py-20 md:py-32 text-center bg-[#F6F5F4] md:min-h-[100dvh] flex items-center justify-center">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl md:text-6xl font-bold tracking-tight text-brand-black mb-6 font-poppins leading-tight">
                One platform, tailored to every business.
              </h2>
              <p className="text-xl text-brand-black/70 mb-10 font-lora">
                Explore what's possible with Split.
              </p>
              <div className="flex flex-row justify-center gap-4 w-full max-w-md mx-auto">
                <Link href="/portal/signup">
                  <PrimaryButton
                    variant="outline-orange"
                    className="shadow-none hover:shadow-none hover:scale-100 active:scale-100"
                  >
                    Get qualified
                  </PrimaryButton>
                </Link>
                <Link href="/funding-concierge">
                  <PrimaryButton className="bg-brand-black text-white shadow-none hover:shadow-none hover:scale-100 active:scale-100">
                    AI Help Desk
                  </PrimaryButton>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </div >
    </main >
  );
}

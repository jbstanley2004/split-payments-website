"use client";

import { DynamicIslandNav } from "@/components/dynamic-island-nav";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, CheckCircle2, CreditCard, Shield, TrendingUp, Zap } from "lucide-react";
import TrustedByCarousel from "@/components/TrustedByCarousel";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import HeroAnimation from "@/components/animations/HeroAnimation";
import CardStackAnimation from "@/components/animations/CardStackAnimation";
import CloverSpotlight from "@/components/CloverSpotlight";
import Image from "next/image";
import WorkingCapitalAnimation from "@/components/animations/WorkingCapitalAnimation";
import PaymentTerminalCard from "@/components/animations/PaymentTerminalCard";
import DashboardAnimation from "@/components/animations/DashboardAnimation";


import VideoIntro from "@/components/VideoIntro";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function HomePage() {
  const [showIntro, setShowIntro] = useState(true);

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
    <main className="relative min-h-screen text-brand-black selection:bg-black/10 selection:text-black font-poppins overflow-x-hidden">
      <div className="relative z-10">
        <DynamicIslandNav />

        {/* HERO SECTION - Pure White, High Contrast, Elegant */}
        <div className="w-full bg-white pt-20 pb-12 md:pt-24 md:pb-16">
          <section
            id="home"
            className="relative flex flex-col items-center justify-center px-6 md:px-10 lg:px-16"
          >
            <div className="max-w-5xl w-full relative flex flex-col items-center text-center mb-8 md:mb-16">

              <AnimatePresence mode="wait">
                {showIntro ? (
                  <motion.div
                    key="intro"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="w-full aspect-video max-w-4xl mx-auto"
                  >
                    <VideoIntro onComplete={() => setShowIntro(false)} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="content"
                    initial="hidden"
                    animate="visible"
                    variants={staggerContainer}
                    className="max-w-4xl mx-auto"
                  >
                    <motion.h1
                      variants={fadeInUp}
                      className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl leading-[1.1] md:leading-[1.05] tracking-tight text-brand-black mb-6 md:mb-8 font-semibold"
                    >
                      Payments and funding.
                      <br />
                      <span className="text-brand-charcoal">
                        Connected.
                      </span>
                    </motion.h1>

                    <motion.p
                      variants={fadeInUp}
                      className="text-lg sm:text-xl md:text-2xl font-lora text-brand-black/70 mb-8 md:mb-12 max-w-2xl mx-auto leading-relaxed"
                    >
                      One secure platform where your business can process payments, access working capital, and grow with confidence.
                    </motion.p>

                    <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
                      <Link href="/get-started">
                        <PrimaryButton>
                          Get Started
                        </PrimaryButton>
                      </Link>
                      <Link
                        href="/#how-it-works"
                        className="group text-brand-black font-medium text-base sm:text-lg hover:text-brand-charcoal transition-colors inline-flex items-center gap-2 py-2 sm:py-4"
                      >
                        Learn more
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            {/* Brands We Work With - Moved here */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 1 }}
              className="w-full max-w-7xl mt-8 text-center"
            >
              <h3 className="text-sm font-medium text-brand-black/50 uppercase tracking-widest mb-8 font-poppins">Brands we work with</h3>
              <TrustedByCarousel />
            </motion.div>
          </section>
        </div>

        {/* EVERYTHING YOU NEED SECTION */}
        <div className="w-full bg-[#F6F5F4]">
          <section id="how-it-works" className="px-6 md:px-10 lg:px-16 py-16">
            <div className="max-w-7xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-20"
              >
                <h2 className="text-4xl md:text-5xl font-bold text-brand-black mb-6 tracking-tight font-poppins">
                  Everything you need <br />
                  <span className="italic font-lora font-normal">all in one place.</span>
                </h2>
                <p className="text-xl text-brand-black/70 leading-relaxed font-lora max-w-3xl mx-auto">
                  We've unified the fragmented financial stack into one cohesive operating system.
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 gap-8 mb-16">
                {[
                  {
                    label: "Payments",
                    title: "Credit Card Processing",
                    description: "Accept payments anywhere with next-gen processing that's secure, transparent, and built to scale.",
                    component: <PaymentTerminalCard />,
                    href: "/payments"
                  },
                  {
                    label: "Funding",
                    title: "Working Capital",
                    description: "Turn card volume into working capital. Get funding based on your actual sales, not projections.",
                    component: <WorkingCapitalAnimation />,
                    href: "/funding"
                  },
                ].map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="group flex flex-col bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-sm transition-all duration-300 hover:shadow-md h-full"
                  >
                    <div className="p-10 pb-0 flex flex-col relative z-10 bg-white">
                      <div className="flex items-start justify-between mb-4">
                        <div className="space-y-2">
                          <span className="text-sm font-semibold text-brand-black/60">{feature.label}</span>
                          <h3 className="text-[32px] font-bold text-brand-black font-poppins leading-tight max-w-[80%]">
                            {feature.title}.
                          </h3>
                        </div>
                        <Link href={feature.href} className="flex-shrink-0">
                          <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center text-white transition-transform group-hover:scale-110">
                            <ArrowRight className="w-6 h-6" />
                          </div>
                        </Link>
                      </div>
                    </div>
                    <div className="mt-auto w-full bg-gray-50 relative border-t border-gray-100 overflow-hidden">
                      <div className="h-96 w-full">
                        {feature.component}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Real-time Analytics Dashboard - Wide console card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="w-full relative"
              >
                <div className="group flex flex-col md:flex-row bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-sm transition-all duration-300 hover:shadow-md">
                  <div className="p-10 md:w-1/3 flex flex-col relative z-10 bg-white">
                    <div className="space-y-2">
                      <span className="text-sm font-semibold text-brand-black/60">Analytics</span>
                      <h3 className="text-[32px] font-bold text-brand-black font-poppins leading-tight">
                        Real-time analytics.
                      </h3>
                    </div>
                    <div className="mt-auto pt-8">
                      <Link href="/payments" className="inline-block">
                        <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center text-white transition-transform group-hover:scale-110">
                          <ArrowRight className="w-6 h-6" />
                        </div>
                      </Link>
                    </div>
                  </div>
                  <div className="md:w-2/3 bg-gray-50 relative border-t md:border-t-0 md:border-l border-gray-100 overflow-hidden">
                    <div className="w-full h-full min-h-[400px]">
                      <DashboardAnimation />
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>
        </div>

        {/* HARDWARE TEASER */}
        <div className="w-full bg-white">
          <section className="px-6 md:px-10 lg:px-16 py-16 border-b border-brand-stone/30">
            <div className="max-w-6xl mx-auto mb-16 text-center">
              <h2 className="text-3xl md:text-5xl font-bold text-brand-black mb-6 font-poppins">
                Powering the world's best hardware.
              </h2>
              <p className="text-xl text-brand-black/60 font-lora">
                From mobile readers to full countertop POS systems.
              </p>
            </div>
            <CloverSpotlight />
          </section>
        </div>

        {/* TESTIMONIALS SECTION - Whiter cards */}
        <div className="w-full bg-[#F6F5F4]">
          <section className="px-6 md:px-10 lg:px-16 py-16">
            <div className="max-w-7xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl md:text-5xl font-bold text-brand-black mb-6 font-poppins">
                  What people are saying about us.
                </h2>
              </motion.div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    quote: "Although the cost was higher than traditional lending, the quick and easy underwriting process and the fact that I did not have to sign a personal guarantee made it well worth it for my business.",
                  },
                  {
                    quote: "I've had merchant cash advances before, but this one stood out because the payback structure was much friendlier.",
                  },
                  {
                    quote: "They did everything they said they would do.",
                  },
                ].map((testimonial, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex flex-col justify-between h-full p-10 rounded-3xl bg-white shadow-elevation-mid transition-all duration-300 border border-black/10"
                  >
                    <div>
                      <p className="text-xl font-lora text-brand-black/90 leading-relaxed italic">"{testimonial.quote}"</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        </div>

        {/* CTA SECTION */}
        <section className="px-6 md:px-10 lg:px-16 py-32 text-center bg-white">
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
              <Link href="/get-started">
                <button className="bg-black text-white px-8 py-4 rounded-full font-poppins font-semibold text-lg hover:scale-105 transition-transform shadow-lg">
                  Get started
                </button>
              </Link>
            </motion.div>
          </div>
        </section>
      </div >
    </main >
  );
}

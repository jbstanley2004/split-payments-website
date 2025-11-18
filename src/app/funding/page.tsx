"use client";

import { DynamicIslandNav } from "@/components/dynamic-island-nav";
import { FlexibleFundingHero, HowFundingWorksBlock } from "@/components/hero";
import Image from "next/image";
import { motion } from "framer-motion";
import { TrendingUp, Zap, Shield, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function FundingPage() {
  return (
    <main className="min-h-screen min-h-[100dvh] min-h-[100svh] font-lora text-main">
      <div className="relative">
        <DynamicIslandNav />

        {/* HERO SECTION - matching home page style */}
        <section className="relative min-h-screen flex items-center justify-center px-6 md:px-10 lg:px-16 pt-32 pb-24">
          <div className="max-w-6xl w-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-4xl mx-auto"
            >
              <p className="text-sm font-medium text-[#161616] uppercase tracking-wider mb-4">
                Funding
              </p>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-poppins font-semibold leading-tight text-[#161616] mb-6">
                Access fast, flexible capital
                <br />
                powered by your sales.
              </h1>
              <p className="text-xl md:text-2xl font-lora text-[#161616] mb-10 max-w-2xl mx-auto">
                Automatic qualification, fast deployment, and repeat funding as your card sales stay strong.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/get-started">
                  <button className="btn-primary">
                    <span className="dot" />
                    <span>Get started</span>
                  </button>
                </Link>
              </div>
            </motion.div>

            {/* Animated loop visualization */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mt-16 flex justify-center"
            >
              <div className="relative w-full max-w-2xl">
                <div className="bg-[#D8D9D4] rounded-2xl p-8 border border-[#161616]">
                  <div className="relative h-64 overflow-hidden rounded-lg">
                    {/* Creative loop animation */}
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center"
                      animate={{
                        rotate: 360,
                      }}
                      transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    >
                      <div className="w-32 h-32 border-4 border-[#FF4306] rounded-full flex items-center justify-center">
                        <motion.div
                          className="w-16 h-16 bg-[#FF4306] rounded-full"
                          animate={{
                            scale: [1, 1.2, 1],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                        />
                      </div>
                    </motion.div>
                    {/* Additional animated elements */}
                    {[0, 1, 2, 3].map((i) => (
                      <motion.div
                        key={i}
                        className="absolute w-4 h-4 bg-[#FF4306] rounded-full"
                        style={{
                          top: "50%",
                          left: "50%",
                        }}
                        animate={{
                          x: [
                            Math.cos((i * Math.PI) / 2) * 100,
                            Math.cos((i * Math.PI) / 2 + Math.PI) * 100,
                            Math.cos((i * Math.PI) / 2) * 100,
                          ],
                          y: [
                            Math.sin((i * Math.PI) / 2) * 100,
                            Math.sin((i * Math.PI) / 2 + Math.PI) * 100,
                            Math.sin((i * Math.PI) / 2) * 100,
                          ],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: i * 0.5,
                        }}
                      />
                    ))}
                  </div>
                  <p className="text-center mt-4 text-sm text-[#161616]">
                    Continuous funding cycle powered by your card sales
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* FEATURE BLOCKS WITH IMAGES */}
        <section className="px-6 md:px-10 lg:px-16 py-16 bg-[#D8D9D4]">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: TrendingUp,
                  title: "Automatic Qualification",
                  description: "No lengthy application. We proactively extend offers based on your processing history.",
                  image: "/breakdown-light.png",
                },
                {
                  icon: Zap,
                  title: "Fast Deployment",
                  description: "Funding in days, not months. Get capital when you need it most.",
                  image: "/product-overview.jpg",
                },
                {
                  icon: Shield,
                  title: "Repeat Funding",
                  description: "As long as your volume stays healthy, funding becomes available again automatically.",
                  image: "/overview.png",
                },
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="card card--neutral"
                >
                  <div className="mb-4 rounded-lg overflow-hidden border border-[#161616]">
                    <Image
                      src={feature.image}
                      alt={feature.title}
                      width={400}
                      height={200}
                      className="w-full h-48 object-cover"
                    />
                  </div>
                  <div className="card__icon">
                    <feature.icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-xl font-poppins font-semibold text-[#161616] mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-[#161616]">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* HOW FUNDING WORKS */}
        <section
          id="how-funding-works"
          className="px-6 md:px-10 lg:px-16 pt-20 sm:pt-24 md:pt-28"
        >
          <HowFundingWorksBlock />
        </section>

        {/* Interactive funding settings card */}
        <section
          id="funding-settings"
          className="px-6 md:px-10 lg:px-16 pb-16 pt-4 sm:pb-20 md:pb-24 flex justify-center"
        >
          <FlexibleFundingHero />
        </section>

        <footer className="px-6 md:px-10 lg:px-16 pb-10 text-xs text-[#666] flex flex-col md:flex-row items-center justify-between gap-4 border-t border-black/5">
          <div>© 2025 Split Payments, Inc. — Empowering merchants through smarter payments and funding.</div>
          <div className="flex items-center gap-6">
            <a href="/policy">privacy</a>
            <a href="/terms">terms</a>
            <a href="/support">contact</a>
          </div>
        </footer>
      </div>
    </main>
  );
}

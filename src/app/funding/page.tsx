"use client";

import { DynamicIslandNav } from "@/components/dynamic-island-nav";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { motion } from "framer-motion";
import { Shield, TrendingUp, Check, Zap, Smartphone } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import RepeatFundingAnimation from "@/components/animations/RepeatFundingAnimation";
import WorkingCapitalAnimation from "@/components/animations/WorkingCapitalAnimation";
import RefillAnimation from "@/components/animations/RefillAnimation";
import QualificationAnimation from "@/components/animations/QualificationAnimation";
import TimelineSignAnimation from "@/components/animations/TimelineSignAnimation";
import TimelineActivationAnimation from "@/components/animations/TimelineActivationAnimation";
import TimelineFundingAnimation from "@/components/animations/TimelineFundingAnimation";

export default function FundingPage() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <main className="min-h-screen bg-white text-black font-poppins selection:bg-black/10 selection:text-black">
      <div className="relative z-10">
        <DynamicIslandNav />

        {/* HERO SECTION */}
        <section className="relative min-h-screen flex items-center justify-center px-6 md:px-10 lg:px-16 pt-20 pb-12 md:pt-24 overflow-hidden bg-white">
          <div className="max-w-6xl w-full text-center relative z-10">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              className="max-w-4xl mx-auto"
            >
              <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl leading-[1.1] md:leading-[1.05] tracking-tight text-black mb-6 md:mb-8 font-semibold">
                Access fast, flexible capital
                <br />
                <span className="text-brand-charcoal">powered by your sales.</span>
              </h1>

              <p className="text-lg sm:text-xl md:text-2xl font-lora text-black/70 mb-8 md:mb-12 max-w-2xl mx-auto leading-relaxed">
                Split Funding offers access to funding that lets you repay as you sell, at every growth stage.
              </p>


              <div className="flex justify-center mb-8 md:mb-12">
                <Link href="/get-started">
                  <PrimaryButton>Check your offer</PrimaryButton>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ELIGIBILITY SECTION */}
        <section className="px-6 md:px-10 lg:px-16 py-16 bg-[#F6F5F4]">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 text-xs font-bold uppercase tracking-wider text-black/60 mb-6">
              Eligibility
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-6 font-poppins">
              You don't apply. <br /> You qualify automatically.
            </h2>
            <p className="text-xl text-black/70 font-lora leading-relaxed mb-12">
              If your volume and history fit our model, we proactively extend funding offers based on your processing. No lengthy application or hard credit pull to get started. If you’re processing with us and your numbers qualify, we’ll tap you on the shoulder.
            </p>

            <div className="grid md:grid-cols-3 gap-8 text-left">
              <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100">
                <h4 className="font-bold font-poppins text-black mb-2">Real sales, not projections</h4>
                <p className="text-sm text-black/60 font-lora">Based on your actual processing history.</p>
              </div>
              <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100">
                <h4 className="font-bold font-poppins text-black mb-2">No underwriting package</h4>
                <p className="text-sm text-black/60 font-lora">No need to compile tax returns or P&Ls.</p>
              </div>
              <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100">
                <h4 className="font-bold font-poppins text-black mb-2">Scalable offers</h4>
                <p className="text-sm text-black/60 font-lora">Offers grow as your processing volume grows.</p>
              </div>
            </div>
          </div>
        </section>

        {/* TIMELINE SECTION */}
        <section className="px-6 md:px-10 lg:px-16 py-16 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 text-xs font-bold uppercase tracking-wider text-black/60 mb-6">
                Timeline
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-black mb-6 font-poppins">
                Funding in days, not months.
              </h2>
              <p className="text-xl text-black/70 font-lora leading-relaxed max-w-3xl mx-auto">
                Because we underwrite off your card-processing history, we can move much faster than traditional lenders. Here’s how a typical deployment looks once you’re processing with us.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 relative">
              {/* Connecting Line (Desktop) */}
              <div className="hidden md:block absolute top-24 left-[16%] right-[16%] h-0.5 bg-gray-200 -z-0"></div>

              {/* Step 1 */}
              <div className="relative z-10">
                <TimelineSignAnimation />
                <div className="mt-8 text-center md:text-left">
                  <div className="text-sm font-bold text-[#FF4306] uppercase tracking-wider mb-2">Day 0</div>
                  <h3 className="text-2xl font-bold text-black font-poppins mb-3">Sign your funding agreement</h3>
                  <p className="text-black/70 font-lora">
                    Once we confirm your processing history, we send a simple agreement. As soon as it’s signed, we move straight into activation.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="relative z-10">
                <TimelineActivationAnimation />
                <div className="mt-8 text-center md:text-left">
                  <div className="text-sm font-bold text-[#FF4306] uppercase tracking-wider mb-2">Day 0–2</div>
                  <h3 className="text-2xl font-bold text-black font-poppins mb-3">Merchant account & equipment activated</h3>
                  <p className="text-black/70 font-lora">
                    We set up your merchant account and whatever you need for processing—software integration, online gateway, or physical terminal.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="relative z-10">
                <TimelineFundingAnimation />
                <div className="mt-8 text-center md:text-left">
                  <div className="text-sm font-bold text-[#FF4306] uppercase tracking-wider mb-2">Day 3–5</div>
                  <h3 className="text-2xl font-bold text-black font-poppins mb-3">Funding deployed</h3>
                  <p className="text-black/70 font-lora">
                    As soon as your account is active, we deploy your funding directly into your business bank account so you can put it to work.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* METRICS SECTION - Clean Grid */}
        <section className="px-6 md:px-10 lg:px-16 py-16 bg-[#F6F5F4] border-t border-brand-stone/50">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
              {[
                {
                  value: "Immediate",
                  label: "Approval time",
                  description: null
                },
                {
                  value: "1x monthly sales",
                  label: "Max funding",
                  description: null
                },
                {
                  value: "100%",
                  label: "Approval rate",
                  description: "For $8,000+ monthly volume"
                },
              ].map((metric, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="text-center"
                >
                  <div className="text-5xl md:text-6xl font-bold font-poppins text-black mb-3 tracking-tight">
                    {metric.value}
                  </div>
                  <div className="text-base font-semibold text-black/80 font-poppins mb-1">
                    {metric.label}
                  </div>
                  {metric.description && (
                    <div className="text-sm text-black/50 font-lora">
                      {metric.description}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FEATURE CARDS GRID */}
        <section className="px-6 md:px-10 lg:px-16 py-16 bg-white">
          <div className="max-w-[1400px] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

              {/* Repayment Card */}
              <div className="group flex flex-col bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-sm transition-all duration-300 hover:shadow-md h-full">
                <div className="p-6 pb-0 flex flex-col relative z-10 bg-white">
                  <div className="flex items-start justify-between mb-4">
                    <div className="space-y-2">
                      <span className="text-sm font-semibold text-black/60">Repayment</span>
                      <h3 className="text-2xl font-bold text-black font-poppins leading-tight">
                        Repay as you earn. <br />Pay it off faster.
                      </h3>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center text-white shrink-0">
                      <TrendingUp className="w-5 h-5" />
                    </div>
                  </div>
                  <p className="text-black/70 font-lora leading-relaxed mb-8 text-sm">
                    Repayments are a fixed percentage of your daily card sales. Slow day? Lower payment. Busy day? Pay it off faster.
                  </p>
                </div>
                <div className="mt-auto w-full bg-gray-50 relative border-t border-gray-100 overflow-hidden">
                  <div className="h-64 w-full">
                    <RefillAnimation />
                  </div>
                </div>
              </div>

              {/* Qualification Card (Restored) */}
              <div className="group flex flex-col bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-sm transition-all duration-300 hover:shadow-md h-full">
                <div className="p-6 pb-0 flex flex-col relative z-10 bg-white">
                  <div className="flex items-start justify-between mb-4">
                    <div className="space-y-2">
                      <span className="text-sm font-semibold text-black/60">Qualification</span>
                      <h3 className="text-2xl font-bold text-black font-poppins leading-tight">
                        Automatic qualification.
                      </h3>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center text-white shrink-0">
                      <Zap className="w-5 h-5" />
                    </div>
                  </div>
                  <p className="text-black/70 font-lora leading-relaxed mb-8 text-sm">
                    No lengthy application. We proactively extend offers based on your processing history.
                  </p>
                </div>
                <div className="mt-auto w-full bg-gray-50 relative border-t border-gray-100 overflow-hidden">
                  <div className="h-64 w-full">
                    <QualificationAnimation />
                  </div>
                </div>
              </div>

              {/* Refill Card */}
              <div className="group flex flex-col bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-sm transition-all duration-300 hover:shadow-md h-full">
                <div className="p-6 pb-0 flex flex-col relative z-10 bg-white">
                  <div className="flex items-start justify-between mb-4">
                    <div className="space-y-2">
                      <span className="text-sm font-semibold text-black/60">Renewal</span>
                      <h3 className="text-2xl font-bold text-black font-poppins leading-tight">
                        Always there when you need it.
                      </h3>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center text-white shrink-0">
                      <Shield className="w-5 h-5" />
                    </div>
                  </div>
                  <p className="text-black/70 font-lora leading-relaxed mb-8 text-sm">
                    Once you're funded, you're in the ecosystem. As you repay your balance, more funds become available automatically.
                  </p>
                </div>
                <div className="mt-auto w-full bg-gray-50 relative border-t border-gray-100 overflow-hidden">
                  <div className="h-64 w-full">
                    <RepeatFundingAnimation />
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* COMPARISON TABLE SECTION */}
        <section className="px-6 md:px-10 lg:px-16 py-16 bg-[#F6F5F4] border-t border-brand-stone/50">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-black mb-6 font-poppins">
                Split Funding vs. traditional loans
              </h2>
            </div>

            <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">

              {/* Desktop Table View */}
              <div className="hidden md:block overflow-x-auto">
                <div className="min-w-[700px]">
                  <div className="grid grid-cols-12 border-b border-gray-100 bg-gray-50/50">
                    <div className="col-span-6 p-6 text-sm font-bold text-black/50 uppercase tracking-wider font-poppins">Features</div>
                    <div className="col-span-3 p-6 text-center text-sm font-bold text-black uppercase tracking-wider font-poppins border-l border-gray-100">Split Funding</div>
                    <div className="col-span-3 p-6 text-center text-sm font-bold text-black/50 uppercase tracking-wider font-poppins border-l border-gray-100">Traditional loans</div>
                  </div>

                  {[
                    { feature: "Funds deposited directly into your account", split: true, trad: true },
                    { feature: "Real-time offers based on your credit card processing sales", split: true, trad: false },
                    { feature: "No credit checks or impact to your personal credit score", split: true, trad: false },
                    { feature: "No personal liability, no compounding interest", split: true, trad: false },
                    { feature: "Hassle-free, online application", split: true, trad: false },
                    { feature: "Funding in as quick as 2 business days, if approved", split: true, trad: false },
                    { feature: "Early renewals with same streamlined application process", split: true, trad: false },
                    { feature: "Flexible, automated payments from your store's sales", split: true, trad: false },
                    { feature: "Fully integrated solution, so you can run your business from one place", split: true, trad: false },
                  ].map((row, i) => (
                    <div key={i} className="grid grid-cols-12 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
                      <div className="col-span-6 p-6 text-black font-lora font-medium flex items-center">{row.feature}</div>
                      <div className="col-span-3 p-6 flex items-center justify-center border-l border-gray-100">
                        {row.split && <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center"><Check className="w-5 h-5" /></div>}
                      </div>
                      <div className="col-span-3 p-6 flex items-center justify-center border-l border-gray-100">
                        {row.trad && <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center"><Check className="w-5 h-5" /></div>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mobile Card View */}
              <div className="md:hidden p-6 space-y-6">
                {[
                  { feature: "Funds deposited directly into your account", split: true, trad: true },
                  { feature: "Real-time offers based on your credit card processing sales", split: true, trad: false },
                  { feature: "No credit checks or impact to your personal credit score", split: true, trad: false },
                  { feature: "No personal liability, no compounding interest", split: true, trad: false },
                  { feature: "Hassle-free, online application", split: true, trad: false },
                  { feature: "Funding in as quick as 2 business days, if approved", split: true, trad: false },
                  { feature: "Early renewals with same streamlined application process", split: true, trad: false },
                  { feature: "Flexible, automated payments from your store's sales", split: true, trad: false },
                  { feature: "Fully integrated solution, so you can run your business from one place", split: true, trad: false },
                ].map((row, i) => (
                  <div key={i} className="bg-gray-50 rounded-2xl p-6 border border-gray-100 shadow-sm">
                    <h3 className="text-lg font-bold font-poppins text-black mb-4 leading-tight">
                      {row.feature}
                    </h3>

                    <div className="space-y-3">
                      {/* Split Funding Row */}
                      <div className="flex items-center justify-between p-3 bg-white rounded-xl border border-gray-100">
                        <span className="text-sm font-bold text-black uppercase tracking-wide">Split Funding</span>
                        {row.split ? (
                          <div className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center"><Check className="w-3.5 h-3.5" /></div>
                        ) : (
                          <div className="w-6 h-6 rounded-full bg-gray-100 text-gray-300 flex items-center justify-center"><span className="text-xs">✕</span></div>
                        )}
                      </div>

                      {/* Traditional Loans Row */}
                      <div className="flex items-center justify-between p-3 bg-transparent rounded-xl border border-transparent opacity-60">
                        <span className="text-sm font-bold text-black uppercase tracking-wide">Traditional</span>
                        {row.trad ? (
                          <div className="w-6 h-6 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center"><Check className="w-3.5 h-3.5" /></div>
                        ) : (
                          <div className="w-6 h-6 rounded-full bg-gray-200 text-gray-400 flex items-center justify-center"><span className="text-xs">✕</span></div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </section>

        {/* SPLIT APP SECTION */}
        <section className="px-6 md:px-10 lg:px-16 py-16 bg-white">
          <div className="max-w-6xl mx-auto flex justify-center">
            <div className="w-full max-w-md">
              <div className="group flex flex-col bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-sm transition-all duration-300 hover:shadow-md h-[600px]">
                <div className="p-6 pb-0 flex flex-col relative z-10 bg-white shrink-0">
                  <div className="flex items-start justify-between mb-4">
                    <div className="space-y-2">
                      <span className="text-sm font-semibold text-black/60">Coming Soon</span>
                      <h3 className="text-2xl font-bold text-black font-poppins leading-tight">
                        Take Split Funding with you everywhere.
                      </h3>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center text-white shrink-0">
                      <Smartphone className="w-5 h-5" />
                    </div>
                  </div>
                  <p className="text-black/70 font-lora leading-relaxed mb-8 text-sm">
                    One app to manage your finances and business. Track your sales, monitor your funding, and access capital on the go.
                  </p>
                </div>

                {/* App Teaser Image */}
                <div className="w-full bg-gray-50 relative border-t border-gray-100 overflow-hidden flex-grow">
                  <div className="relative w-full h-full">
                    <Image
                      src="/assets/app-teaser.jpg"
                      alt="Split App Interface"
                      fill
                      className="object-cover object-top blur-sm"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA SECTION */}
        <section className="px-6 md:px-10 lg:px-16 py-32 text-center bg-[#F6F5F4] border-t border-brand-stone/50">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl md:text-6xl font-bold tracking-tight text-black mb-6 font-poppins leading-tight">
                Ready to fuel your growth?
              </h2>
              <p className="text-xl text-black/70 mb-10 font-lora max-w-2xl mx-auto">
                See how much funding you qualify for today. No commitment required.
              </p>
              <Link href="/get-started">
                <PrimaryButton className="shadow-2xl hover:shadow-[0_20px_50px_rgba(0,0,0,0.2)] transform hover:-translate-y-1 transition-all scale-110">
                  Get Started
                </PrimaryButton>
              </Link>
            </motion.div>
          </div>
        </section>

      </div>
    </main>
  );
}

"use client";

import { DynamicIslandNav } from "@/components/dynamic-island-nav";
import { FlexibleFundingHero, HowFundingWorksBlock } from "@/components/hero";
import Image from "next/image";
import { motion } from "framer-motion";
import { TrendingUp, Zap, Shield, BarChart3, Users2, CheckCircle2, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import FundingGraphAnimation from "@/components/animations/FundingGraphAnimation";
import FundingSimulation from "@/components/animations/FundingSimulation";
import RepeatFundingAnimation from "@/components/animations/RepeatFundingAnimation";

const METRICS = [
  { label: "Increase in upmarket close rate", value: "+18", suffix: "%" },
  { label: "Time-to-cash from swipe", value: "≤ 2", suffix: " days" },
  { label: "Reduction in invoice churn", value: "-24", suffix: "%" },
  { label: "NPS lift for funded merchants", value: "+12", suffix: " pts" },
];

export default function FundingPage() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as any } }
  };

  return (
    <main className="min-h-screen bg-white text-brand-black font-lora selection:bg-black/10 selection:text-black">
      <div className="relative">
        <DynamicIslandNav />

        {/* HERO SECTION */}
        <section className="relative min-h-[85vh] flex items-center justify-center px-6 md:px-10 lg:px-16 pt-32 pb-40">
          <div className="max-w-6xl w-full text-center">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              className="max-w-4xl mx-auto"
            >

              <h1 className="text-5xl md:text-6xl lg:text-7xl leading-[1.1] tracking-tight text-brand-black mb-8 font-semibold">
                Access fast, flexible capital
                <br />
                <span className="text-brand-charcoal">powered by your sales.</span>
              </h1>

              <p className="text-xl md:text-2xl font-lora text-brand-black/70 mb-12 max-w-2xl mx-auto leading-relaxed">
                Split large card payments without changing how customers pay. Automatic qualification, fast deployment, and repeat funding.
              </p>

              <div className="flex justify-center">
                <Link href="/get-started">
                  <PrimaryButton>Get Started</PrimaryButton>
                </Link>
              </div>
            </motion.div>

            {/* Clean Visualization - Replaced static image with live animation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mt-20 flex justify-center"
            >
              <div className="relative w-full max-w-5xl">
                <FundingGraphAnimation />
              </div>
            </motion.div>
          </div>
        </section>

        {/* METRICS SECTION - From old CC Split */}
        <section className="px-6 md:px-10 lg:px-16 py-24 bg-white border-t border-brand-stone/50">
          <div className="mx-auto max-w-6xl">
            <div className="mb-16">
              <h2 className="text-3xl md:text-4xl font-poppins font-bold tracking-tight text-brand-black mb-6 text-center">
                Impact on a typical SaaS portfolio.
              </h2>
              <p className="text-lg font-lora text-brand-black/70 mb-10 leading-relaxed text-center max-w-2xl mx-auto">
                These numbers show how split funding on the card rails can strengthen close rates, time-to-cash, and renewal quality.
              </p>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {METRICS.map((metric, i) => (
                  <motion.div
                    key={metric.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="p-6 rounded-2xl bg-white shadow-elevation-low border border-brand-stone hover:shadow-elevation-mid transition-all"
                  >
                    <div className="text-3xl md:text-4xl font-bold text-brand-black font-poppins mb-2">
                      {metric.value}
                      <span className="ml-1 text-xl font-normal text-brand-black/40">{metric.suffix}</span>
                    </div>
                    <p className="text-xs font-bold uppercase tracking-wide text-brand-black/50">{metric.label}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FEATURE BLOCKS */}
        <section className="px-6 md:px-10 lg:px-16 py-24 bg-brand-gray/10 border-t border-brand-stone/50">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: TrendingUp,
                  title: "Automatic Qualification",
                  description: "No lengthy application. We proactively extend offers based on your processing history.",
                  component: <FundingSimulation />,
                },
                {
                  icon: Zap,
                  title: "Fast Deployment",
                  description: "Funding in days, not months. Get capital when you need it most.",
                  image: "/assets/new_photos/in_person/tap-payment.jpeg",
                },
                {
                  icon: Shield,
                  title: "Repeat Funding",
                  description: "As long as your volume stays healthy, funding becomes available again automatically.",
                  component: <RepeatFundingAnimation />,
                },
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group bg-white rounded-2xl overflow-hidden shadow-elevation-low hover:shadow-elevation-mid transition-all duration-300 border border-brand-stone/50 hover:border-brand-stone hover:-translate-y-1"
                >
                  <div className={`${feature.component ? "h-64" : "h-48"} overflow-hidden bg-brand-gray/30 relative border-b border-brand-stone/50`}>
                    {feature.component ? (
                      <div className="w-full h-64 bg-white relative">
                        {feature.component}
                      </div>
                    ) : (
                      <Image
                        src={feature.image!}
                        alt={feature.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105 grayscale-[20%] group-hover:grayscale-0"
                      />
                    )}
                  </div>
                  <div className="p-8">
                    <div className="w-10 h-10 rounded-lg bg-black flex items-center justify-center mb-4 text-white">
                      <feature.icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-xl font-poppins font-bold text-brand-black mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-brand-black/70 leading-relaxed text-sm font-lora">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* LIFESTYLE / GROWTH SECTION */}
        <section className="w-full bg-black overflow-hidden relative">
          <div className="absolute inset-0 opacity-60">
            <Image
              src="/assets/new_photos/style/clover-lifestyle.webp"
              alt="Business Growth"
              fill
              className="object-cover"
            />
          </div>
          <div className="relative z-10 px-6 md:px-10 lg:px-16 py-32 flex items-center">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 font-poppins tracking-tight">
                Fuel your growth without slowing down.
              </h2>
              <p className="text-xl text-white/90 font-lora leading-relaxed">
                Whether you need inventory, equipment, or expansion capital, our split funding model works with your cash flow, not against it.
              </p>
            </div>
          </div>
        </section>

        {/* REASONS SECTION – operator-focused (From CC Split) */}
        <section className="px-6 md:px-10 lg:px-16 py-24 bg-white border-t border-brand-stone/50">
          <div className="mx-auto max-w-6xl">
            <div className="mb-16 text-center">
              <h2 className="text-4xl md:text-5xl font-poppins font-bold tracking-tight text-brand-black mb-4">
                Built so sales, RevOps, and finance all say yes.
              </h2>
            </div>
            <div className="grid gap-8 md:grid-cols-2">
              {[
                { title: "No new behavior", desc: "Merchants keep swiping the way they always have.", icon: Users2 },
                { title: "Cleaner forecasting", desc: "Dynamic remits map to volume curves so forecasts track real performance.", icon: BarChart3 },
                { title: "Less friction at renewal", desc: "Split large renewals across the term and remove pricing as a blocker.", icon: CheckCircle2 },
                { title: "Fewer exceptions", desc: "Turn one-off payment plans into a single, standardized program.", icon: ShieldCheck },
              ].map((card, i) => (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="flex gap-6 rounded-3xl p-8 bg-white shadow-elevation-low hover:shadow-elevation-mid transition-all duration-300 border border-brand-stone/50"
                >
                  <div className="shrink-0">
                    <div className="w-12 h-12 rounded-xl bg-brand-gray flex items-center justify-center text-black">
                      <card.icon className="h-6 w-6" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-poppins text-xl font-bold text-brand-black mb-2">{card.title}</h3>
                    <p className="text-brand-black/70 leading-relaxed font-lora text-sm">{card.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* HOW FUNDING WORKS */}
        <section
          id="how-funding-works"
          className="px-6 md:px-10 lg:px-16 py-24 bg-brand-gray/20"
        >
          <HowFundingWorksBlock />
        </section>

        {/* Interactive funding settings card */}
        <section
          id="funding-settings"
          className="px-6 md:px-10 lg:px-16 py-24 bg-white flex justify-center"
        >
          <FlexibleFundingHero />
        </section>

        <footer className="px-6 md:px-10 lg:px-16 py-12 bg-white border-t border-brand-stone text-sm text-brand-black/60 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>© 2025 Split Payments, Inc. — Empowering merchants through smarter payments and funding.</div>
          <div className="flex items-center gap-8 font-medium">
            <a href="/policy" className="hover:text-black transition-colors">Privacy</a>
            <a href="/terms" className="hover:text-black transition-colors">Terms</a>
            <a href="/support" className="hover:text-black transition-colors">Contact</a>
          </div>
        </footer>
      </div>
    </main>
  );
}

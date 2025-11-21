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
import InteractiveCardWall from "@/components/InteractiveCardWall";
import WorkingCapitalAnimation from "@/components/animations/WorkingCapitalAnimation";
import CreditCardVideo from "@/components/CreditCardVideo";
import DashboardAnimation from "@/components/animations/DashboardAnimation";


export default function HomePage() {
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
    <main className="min-h-screen text-brand-black selection:bg-black/10 selection:text-black font-poppins overflow-x-hidden">
      <InteractiveCardWall />
      <div className="relative z-10">
        <DynamicIslandNav />

        {/* HERO SECTION - Pure White, High Contrast, Elegant */}
        <div className="w-full bg-white pt-24 pb-16">
          <section
            id="home"
            className="relative flex flex-col items-center justify-center px-6 md:px-10 lg:px-16"
          >
            <div className="max-w-5xl w-full relative flex flex-col items-center text-center mb-16">

              <motion.div
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
                className="max-w-4xl mx-auto"
              >
                <motion.h1
                  variants={fadeInUp}
                  className="text-5xl md:text-7xl lg:text-8xl leading-[1.05] tracking-tight text-brand-black mb-8 font-semibold"
                >
                  Payments and funding.
                  <br />
                  <span className="text-brand-charcoal">
                    Connected.
                  </span>
                </motion.h1>

                <motion.p
                  variants={fadeInUp}
                  className="text-xl md:text-2xl font-lora text-brand-black/70 mb-12 max-w-2xl mx-auto leading-relaxed"
                >
                  One secure platform where your business can process payments, access working capital, and grow with confidence.
                </motion.p>

                <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center justify-center gap-6">
                  <Link href="/get-started">
                    <PrimaryButton>
                      Get Started
                    </PrimaryButton>
                  </Link>
                  <Link
                    href="/#how-it-works"
                    className="group text-brand-black font-medium text-lg hover:text-brand-charcoal transition-colors inline-flex items-center gap-2 py-4"
                  >
                    Learn more
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </motion.div>
              </motion.div>
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



        {/* EVERYTHING YOU NEED SECTION */}
        <div className="w-full bg-white">
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
                    icon: CreditCard,
                    title: "Credit Card Processing",
                    description: "Accept payments anywhere with next-gen processing that's secure, transparent, and built to scale.",
                    component: <CreditCardVideo />
                  },
                  {
                    icon: TrendingUp,
                    title: "Working Capital",
                    description: "Turn card volume into working capital. Get funding based on your actual sales, not projections.",
                    component: <WorkingCapitalAnimation />
                  },
                ].map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="group bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl"
                  >
                    <div className="h-64 bg-gray-50 relative border-b border-gray-100 overflow-hidden">
                      {feature.component}
                    </div>
                    <div className="p-8">
                      <div className="w-10 h-10 rounded-lg bg-black flex items-center justify-center mb-4 text-white">
                        <feature.icon className="w-5 h-5" />
                      </div>
                      <h3 className="text-xl font-bold text-brand-black mb-3 font-poppins">{feature.title}</h3>
                      <p className="text-brand-black/70 leading-relaxed text-sm font-lora">
                        {feature.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Real-time Analytics Dashboard - Full Width Below with Aspect Ratio Container */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="w-full relative"
              >
                {/* Aspect ratio container: 1200/750 = 1.6 = 8/5 */}
                <div className="w-full" style={{ aspectRatio: '8 / 5' }}>
                  <DashboardAnimation />
                </div>
              </motion.div>
            </div>
          </section>
        </div>

        {/* TESTIMONIALS SECTION - Whiter cards */}
        <div className="w-full bg-white">
          <section className="px-6 md:px-10 lg:px-16 py-16">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    quote: "Split has transformed how we manage payments and access capital. The platform is intuitive and powerful.",
                    author: "Mark Kim",
                    role: "Head of Product",
                    company: "TechCorp",
                  },
                  {
                    quote: "Seamlessly integrates into our existing workflows. We couldn't imagine running our business without it.",
                    author: "Sarah Chen",
                    role: "CTO",
                    company: "StartupXYZ",
                  },
                  {
                    quote: "Streamlined our entire payment and funding process. It's truly a game-changer for growing businesses.",
                    author: "John Miller",
                    role: "CEO",
                    company: "GrowthCo",
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
                    <div className="mb-8">
                      <div className="flex gap-1 mb-6">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className="text-black text-sm">★</span>
                        ))}
                      </div>
                      <p className="text-xl font-lora text-brand-black/90 leading-relaxed italic">"{testimonial.quote}"</p>
                    </div>
                    <div className="flex items-center gap-4 border-t border-black/5 pt-6 mt-auto">
                      <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center font-bold text-sm font-poppins">
                        {testimonial.author[0]}
                      </div>
                      <div>
                        <div className="font-bold text-sm text-brand-black font-poppins">{testimonial.author}</div>
                        <div className="text-xs text-brand-black/50 uppercase tracking-wide">{testimonial.company}</div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        </div>

        {/* CTA SECTION */}
        <section className="px-6 md:px-10 lg:px-16 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-black rounded-[3rem] p-16 text-white relative overflow-hidden shadow-2xl"
            >
              <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay"></div>
              <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/5 blur-[100px] rounded-full pointer-events-none" />

              <h2 className="text-4xl md:text-6xl font-bold mb-8 relative z-10 font-poppins tracking-tight">
                Ready to scale?
              </h2>
              <p className="text-xl text-white/70 mb-12 max-w-2xl mx-auto relative z-10 font-lora">
                Get started today and see how Split can transform your payment processing and working capital access.
              </p>
              <div className="relative z-10">
                <Link href="/get-started">
                  <button className="bg-white text-black px-10 py-5 rounded-full font-poppins font-semibold text-lg hover:scale-105 transition-transform shadow-lg">
                    Create free account
                  </button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </div >
    </main >
  );
}

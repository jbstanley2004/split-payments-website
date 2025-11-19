"use client";

import { DynamicIslandNav } from "@/components/dynamic-island-nav";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { CreditCard, TrendingUp, Shield, Zap, ArrowRight, CheckCircle2 } from "lucide-react";
import TrustedByCarousel from "@/components/TrustedByCarousel";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="relative">
        <DynamicIslandNav />

        {/* HERO SECTION - Notion-style clean hero */}
        <section
          id="home"
          className="relative min-h-screen flex items-center justify-center px-6 md:px-10 lg:px-16 pt-32 pb-24"
        >
          <div className="max-w-6xl w-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-4xl mx-auto"
            >
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-poppins font-semibold leading-tight text-[#161616] mb-6">
                Payments and funding.
                <br />
                Connected.
              </h1>
              <p className="text-xl md:text-2xl font-lora text-[#161616] mb-10 max-w-2xl mx-auto">
                One secure platform where your business can process payments, access working capital, and grow with confidence.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/get-started">
                  <button className="btn-primary">
                    <span className="dot" />
                    <span>Get started</span>
                  </button>
                </Link>
                <Link
                  href="/#how-it-works"
                  className="text-[#161616] font-medium hover:text-[#FF4306] transition-colors inline-flex items-center gap-2"
                >
                  Learn more
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>

            {/* Partner logos - Brand payment card logos - Carousel */}
            <TrustedByCarousel />
          </div>
        </section>

        {/* STATISTICS SECTION - Brand colors */}
        <section className="px-6 md:px-10 lg:px-16 py-16 bg-[#F8F7F4]">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-lg p-8 border border-[#E8E6DC]"
              >
                <div className="text-5xl font-bold text-[#161616] mb-2">#1</div>
                <div className="text-sm text-[#161616]">Most trusted payment platform</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-lg p-8 border border-[#E8E6DC]"
              >
                <div className="text-5xl font-bold text-[#161616] mb-2">98%</div>
                <div className="text-sm text-[#161616]">Of merchants recommend us</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-lg p-8 border border-[#E8E6DC]"
              >
                <div className="text-5xl font-bold text-[#161616] mb-2">62%</div>
                <div className="text-sm text-[#161616]">Choose us over competitors</div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ALL-IN-ONE SECTION - Notion-style feature showcase */}
        <section className="px-6 md:px-10 lg:px-16 py-24 bg-white">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center max-w-3xl mx-auto mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-poppins font-semibold text-[#161616] mb-6">
                All-in-one FinTech, right where you work.
              </h2>
              <div className="grid md:grid-cols-2 gap-8 mt-12 text-left">
                <div>
                  <p className="text-lg text-[#161616] mb-4">
                    Payment processing built into every transaction. From card acceptance to ACH transfers, everything you need is integrated and ready to scale.
                  </p>
                </div>
                <div>
                  <p className="text-lg text-[#161616] mb-4">
                    One platform for everything. Payments, funding, reporting, and analytics—all connected and powered by intelligent automation.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Payment Terminal Showcase */}
            <div className="grid md:grid-cols-2 gap-12 items-center mt-16">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="bg-[#F8F7F4] rounded-lg p-8 border border-[#E8E6DC] flex items-center justify-center">
                  <Image
                    src="/product-overview.jpg"
                    alt="Payment Terminal Dashboard"
                    width={600}
                    height={400}
                    className="w-full h-auto rounded-lg"
                  />
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h3 className="text-2xl font-poppins font-semibold text-[#161616] mb-4">
                  Accept payments anywhere
                </h3>
                <p className="text-[#161616] mb-6">
                  Whether you need a physical terminal, mobile swiper, or online gateway, we provide the hardware and software to accept payments wherever your business operates.
                </p>
                <div className="space-y-3">
                  {["Point of Sale systems", "Mobile card readers", "Online payment gateways", "Virtual terminals"].map((feature) => (
                    <div key={feature} className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#FF4306]" />
                      <span className="text-[#161616]">{feature}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* FEATURES SECTION - Brand colors */}
        <section id="how-it-works" className="px-6 md:px-10 lg:px-16 py-24 bg-[#F8F7F4]">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-poppins font-semibold text-[#161616] mb-6">
                Easy to start, powerful to use.
              </h2>
              <p className="text-xl text-[#161616] max-w-2xl mx-auto">
                Intuitive interface, powerful features, and a seamless experience that makes financial management effortless.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: CreditCard,
                  title: "Credit Card Processing",
                  description: "Accept payments anywhere with next-gen processing that's secure, transparent, and built to scale.",
                },
                {
                  icon: TrendingUp,
                  title: "Working Capital",
                  description: "Turn card volume into working capital. Get funding based on your actual sales, not projections.",
                },
                {
                  icon: Shield,
                  title: "Enterprise Security",
                  description: "Bank-level security with PCI compliance, encryption, and fraud protection built into every transaction.",
                },
                {
                  icon: Zap,
                  title: "Real-time Analytics",
                  description: "Track every transaction, monitor cash flow, and make data-driven decisions with comprehensive reporting.",
                },
                {
                  icon: CreditCard,
                  title: "Flexible Payment Types",
                  description: "Accept cards, ACH, checks, and more. One platform for all your payment needs.",
                },
                {
                  icon: TrendingUp,
                  title: "Automated Workflows",
                  description: "Streamline operations with automated reconciliation, reporting, and funding deployment.",
                },
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`card card--neutral`}
                >
                  <div className={`card__icon`}>
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

        {/* TESTIMONIALS SECTION - Notion-style testimonial cards */}
        <section className="px-6 md:px-10 lg:px-16 py-24 bg-white">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-poppins font-semibold text-[#161616] mb-6">
                Loved by innovative businesses.
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                {
                  quote: "Unlocked new levels of productivity. The automated funding and reporting features are exceptional.",
                  author: "Tina Patel",
                  role: "VP of Engineering",
                  company: "ScaleUp Inc",
                },
                {
                  quote: "Intuitive and powerful. Split makes complex financial operations feel simple.",
                  author: "David Black",
                  role: "Product Lead",
                  company: "InnovateLabs",
                },
                {
                  quote: "The best decision we made for our payment infrastructure. Reliable, fast, and easy to use.",
                  author: "Sam Clark",
                  role: "Co-founder",
                  company: "NextGen Payments",
                },
              ].map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-[#F8F7F4] rounded-lg p-6 border border-[#E8E6DC]"
                >
                  <p className="text-[#161616] mb-4 italic">"{testimonial.quote}"</p>
                  <div>
                    <div className="font-semibold text-[#161616]">{testimonial.author}</div>
                    <div className="text-sm text-[#161616]">{testimonial.role}, {testimonial.company}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA SECTION */}
        <section className="px-6 md:px-10 lg:px-16 py-24 bg-[#F8F7F4]">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-poppins font-semibold text-[#161616] mb-6">
                One FinTech platform, tailored to every business.
              </h2>
              <p className="text-xl text-[#161616] mb-10 max-w-2xl mx-auto">
                Get started today and see how Split can transform your payment processing and working capital access.
              </p>
              <Link href="/get-started">
                <button className="btn-primary">
                  <span className="dot" />
                  <span>Get started</span>
                </button>
              </Link>
            </motion.div>
          </div>
        </section>
      </div>
    </main>
  );
}

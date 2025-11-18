"use client";

import { DynamicIslandNav } from "@/components/dynamic-island-nav";
import OrangePushButton from "@/components/OrangePushButton";
import { PageBackdrop } from "@/components/page-backdrop";
import { CreditCard, Check, Laptop, Zap, Shield, TrendingUp } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

type PaymentSolution = {
  title: string;
  description: string;
  icon: LucideIcon;
};

const SOLUTIONS: PaymentSolution[] = [
  {
    title: "Credit Card Acceptance",
    description:
      "Accept payments anywhere with next-gen processing that's secure, transparent, and built to scale with your business.",
    icon: CreditCard,
  },
  {
    title: "Check Processing",
    description:
      "Modernize your check acceptance with automated verification, faster deposits, and lower transaction costs.",
    icon: Check,
  },
  {
    title: "Point of Sale (POS) systems",
    description:
      "Power your business with flexible POS systems — tailored for retail, restaurants, and service providers, in-store or on-the-go.",
    icon: Laptop,
  },
];

const SOLUTION_CARD_STYLES = [
  { bg: "bg-[#d8d1c6]" }, // darkest beige
  { bg: "bg-[#6A9BCC]" }, // blue
  { bg: "bg-[#BCD1CA]" }, // green
];

const SUMMARY_ITEMS = ["Cards", "ACH", "Terminals", "POS", "Online"];
const SUMMARY_COLORS = ["#d8d1c6", "#6A9BCC", "#BCD1CA"];

export default function PaymentsPage() {
  return (
    <main className="min-h-screen min-h-[100dvh] min-h-[100svh] font-lora text-main">
      <div className="relative">
        <DynamicIslandNav />

        {/* HERO – matching home page style */}
        <section className="relative min-h-screen flex items-center justify-center px-6 md:px-10 lg:px-16 pt-32 pb-24">
          <div className="max-w-6xl w-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-4xl mx-auto"
            >
              <p className="text-sm font-medium text-[#161616] uppercase tracking-wider mb-4">
                Payments
              </p>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-poppins font-semibold leading-tight text-[#161616] mb-6">
                Smarter payments.
                <br />
                Stronger cash flow.
              </h1>
              <p className="text-xl md:text-2xl font-lora text-[#161616] mb-10 max-w-2xl mx-auto">
                Simplify every transaction — from cards to ACH — while unlocking
                funding that moves at the speed of your business. Split unites
                payment processing, merchant services, and split-funding into one
                seamless experience so your cash flow stays strong and predictable.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
                <Link href="/get-started">
                  <button className="btn-primary">
                    <span className="dot" />
                    <span>Get started</span>
                  </button>
                </Link>
              </div>
              
              {/* Summary chips: All neutral with brand colors */}
              <div className="flex flex-wrap items-center justify-center gap-2">
                <div className="chip chip--neutral">
                  <span className="dot" />
                  <span>CARDS</span>
                </div>
                <div className="chip chip--neutral">
                  <span className="dot" />
                  <span>ACH</span>
                </div>
                <div className="chip chip--neutral">
                  <span className="dot" />
                  <span>TERMINALS</span>
                </div>
                <div className="chip chip--neutral">
                  <span className="dot" />
                  <span>POS</span>
                </div>
                <div className="chip chip--neutral">
                  <span className="dot" />
                  <span>ONLINE</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* COVERAGE + SOLUTIONS GRID – floating cards only */}
        <section className="px-6 md:px-10 lg:px-16 py-12 md:py-20">
          <div className="mx-auto max-w-5xl">
            <div className="text-left">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-subtle">
                Coverage
              </p>
              <h2 className="mt-2 text-2xl md:text-3xl font-poppins font-semibold tracking-tight text-main">
                Built for every way you accept payments.
              </h2>
              <p className="mt-3 text-sm sm:text-base md:text-lg font-lora text-subtle max-w-3xl">
                From in-person swipes to online checkouts, Split brings cards,
                ACH, terminals, and POS together under one transparent platform
                so you don&apos;t have to stitch together multiple providers.
              </p>
            </div>

            <div className="mx-auto mt-10 grid max-w-5xl gap-6 md:grid-cols-3">
              {SOLUTIONS.map((solution, index) => (
                <motion.article
                  key={solution.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="card card--neutral flex flex-col p-6 text-left cursor-pointer"
                >
                  <motion.div
                    className="card__icon"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <solution.icon className="h-4 w-4" aria-hidden="true" />
                  </motion.div>
                  <h3 className="font-poppins text-base md:text-lg font-semibold">
                    {solution.title}
                  </h3>
                  <p className="mt-1 text-sm font-lora">
                    {solution.description}
                  </p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* HARDWARE SHOWCASE - Ingenico & Verifone */}
        <section className="px-6 md:px-10 lg:px-16 py-16 md:py-24 bg-[#D8D9D4]">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#161616] mb-4">
                Payment Hardware
              </p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-poppins font-semibold text-[#161616] mb-6">
                Industry-leading payment terminals
              </h2>
              <p className="text-lg text-[#161616] max-w-2xl mx-auto">
                We support the most trusted payment hardware from Ingenico and Verifone, ensuring secure, reliable transactions for your business.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8 mt-12">
              {/* Ingenico Section */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-2xl p-8 border border-[#161616]"
              >
                <h3 className="text-2xl font-poppins font-semibold text-[#161616] mb-4">Ingenico</h3>
                <p className="text-[#161616] mb-6">
                  Advanced payment terminals with contactless, chip, and mobile payment support.
                </p>
                <div className="relative h-64 bg-[#D8D9D4] rounded-lg overflow-hidden flex items-center justify-center">
                  <Image
                    src="/brand_images/ingenico/Ingenico _ Home-20.svg"
                    alt="Ingenico Terminal"
                    width={300}
                    height={200}
                    className="object-contain"
                  />
                </div>
              </motion.div>

              {/* Verifone Section */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-2xl p-8 border border-[#161616]"
              >
                <h3 className="text-2xl font-poppins font-semibold text-[#161616] mb-4">Verifone</h3>
                <p className="text-[#161616] mb-6">
                  Secure, versatile payment solutions designed for modern retail environments.
                </p>
                <div className="relative h-64 bg-[#D8D9D4] rounded-lg overflow-hidden flex items-center justify-center">
                  <Image
                    src="/brand_images/verifone/svg14.svg"
                    alt="Verifone Terminal"
                    width={300}
                    height={200}
                    className="object-contain"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CARD ANIMATIONS SHOWCASE */}
        <section className="px-6 md:px-10 lg:px-16 py-16 md:py-24 bg-white">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#161616] mb-4">
                Payment Methods
              </p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-poppins font-semibold text-[#161616] mb-6">
                Accept all major card types
              </h2>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
              {[
                { name: "Visa", src: "/visa.png", color: "#1A1F71" },
                { name: "Mastercard", src: "/mastercard.png", color: "#EB001B" },
                { name: "American Express", src: "/amex.png", color: "#006FCF" },
                { name: "Discover", src: "/cards/visa.png", color: "#FF6000" },
              ].map((card, index) => (
                <motion.div
                  key={card.name}
                  initial={{ opacity: 0, scale: 0.8, rotateY: -90 }}
                  whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  whileHover={{ 
                    scale: 1.1, 
                    rotateY: 15,
                    z: 50
                  }}
                  className="relative perspective-1000"
                >
                  <div className="bg-white rounded-xl p-6 border border-[#161616] shadow-lg h-32 flex items-center justify-center">
                    <Image
                      src={card.src}
                      alt={card.name}
                      width={120}
                      height={60}
                      className="object-contain"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ADDITIONAL FEATURES */}
        <section className="px-6 md:px-10 lg:px-16 py-16 md:py-24 bg-[#D8D9D4]">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#161616] mb-4">
                Features
              </p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-poppins font-semibold text-[#161616] mb-6">
                Everything you need to process payments
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6 mt-12">
              {[
                {
                  icon: Zap,
                  title: "Real-time Processing",
                  description: "Instant transaction processing with immediate confirmation and settlement.",
                },
                {
                  icon: Shield,
                  title: "Enterprise Security",
                  description: "PCI-compliant infrastructure with end-to-end encryption and fraud protection.",
                },
                {
                  icon: TrendingUp,
                  title: "Advanced Analytics",
                  description: "Comprehensive reporting and insights to optimize your payment operations.",
                },
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-xl p-8 border border-[#161616]"
                >
                  <div className="w-12 h-12 rounded-full bg-[#FF4306] flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-poppins font-semibold text-[#161616] mb-3">
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

        {/* REASSURANCE STRIP – text only, no section card */}
        <section className="px-6 md:px-10 lg:px-16 py-10">
          <div className="mx-auto flex max-w-5xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="space-y-1 text-left">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-subtle">
                Why merchants switch to Split
              </p>
              <p className="max-w-xl text-sm md:text-base font-lora text-subtle">
                We combine payment processing and funding so you get one
                relationship for your card volume and your working capital.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3 text-xs md:text-sm text-subtle">
              <div className="chip chip--neutral">
                <span className="dot" />
                <span>Simple, transparent pricing</span>
              </div>
              <div className="chip chip--neutral">
                <span className="dot" />
                <span>Funding-ready payment rails</span>
              </div>
            </div>
          </div>
        </section>

        {/* CTA SECTION – containerless copy + CTA */}
        <section className="px-6 md:px-10 lg:px-16 py-16 md:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-2xl md:text-3xl font-poppins font-semibold tracking-tight text-main">
              See how Split can improve your processing.
            </h2>
            <p className="mt-4 text-sm sm:text-base md:text-lg font-lora text-subtle">
              Share a recent statement and we&apos;ll review your current setup,
              uncover potential savings, and show how funding and payments work
              together in one platform.
            </p>
            <div className="mt-8 flex justify-center">
              <Link href="/get-started">
                <button className="btn-primary">
                  <span className="dot" />
                  <span>Start my cost review</span>
                </button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

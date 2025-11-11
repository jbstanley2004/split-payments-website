"use client";

import { DynamicIslandNav } from "@/components/dynamic-island-nav";
import GlowingCard from "@/components/GlowingCard";
import OrangePushButton from "@/components/OrangePushButton";
import { motion, useScroll, useTransform } from "framer-motion";
import { CreditCard, Check, Landmark, Laptop, Gift } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

const solutions = [
  {
    title: "Credit Card Acceptance",
    description:
      "Accept payments anywhere with reliable processing that is secure, transparent, and built to scale with your business.",
    icon: CreditCard,
  },
  {
    title: "Check Processing",
    description:
      "Modernize your check acceptance with automated verification, faster deposits, and lower transaction costs.",
    icon: Check,
  },
  {
    title: "ACH Payments",
    description:
      "Simplify ACH transfers for payroll, recurring billing, and B2B transactions with faster, lower cost automation.",
    icon: Landmark,
  },
  {
    title: "Point of Sale (POS) systems",
    description:
      "Power your operations with flexible POS systems tailored for retail, restaurants, and service providers both in store and online.",
    icon: Laptop,
  },
  {
    title: "Gift Card and Loyalty Programs",
    description:
      "Engage and retain customers with branded gift cards and loyalty rewards that inspire repeat visits and increase spending.",
    icon: Gift,
  },
];

export default function HomePage() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  return (
    <main ref={ref} className="relative min-h-screen min-h-[100dvh] font-lora text-text">
      {/* Fixed Parallax Background */}
      <motion.div
        style={{ y }}
        className="fixed inset-0 z-0 w-full h-full min-h-screen min-h-[100dvh]"
      >
        <Image
          src="/hero_image_formatted.png"
          alt="A modern office interior"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
        {/* Subtle overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/20" />
      </motion.div>

      {/* All content with relative positioning */}
      <div className="relative z-10 min-h-screen min-h-[100dvh]">
        <DynamicIslandNav />

        {/* Hero Content */}
        <section className="min-h-screen min-h-[100dvh] flex items-end justify-center text-center pb-24 md:pb-32">
          <motion.div
            initial={{ opacity: 0, translateY: 30 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex flex-col items-center gap-10 max-w-4xl px-6"
            style={{ willChange: "transform, opacity" }}
          >
            {/* Headline */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-poppins font-semibold leading-tight text-black dark:text-black">
              The new standard in merchant cash advances
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl font-lora text-black dark:text-black">
              A smarter way to fund your business — seamless integration, instant access, and full transparency.
            </p>

            {/* Get Started Button - matching the site's button style */}
            <motion.div
              initial={{ opacity: 0, translateY: 20 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{ delay: 0.2, duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
              style={{ willChange: "transform, opacity" }}
            >
              <Link href="/get-started" passHref>
                <OrangePushButton>Get Started</OrangePushButton>
              </Link>
            </motion.div>
          </motion.div>
        </section>

        {/* Payments Hero Section */}
        <section className="px-6 md:px-10 py-32 md:py-48 min-h-[80vh] flex items-center border-b border-line/50">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="font-poppins text-4xl md:text-6xl leading-tight mb-6 text-black">
              Smarter payments. Stronger cash flow.
            </h1>
            <p className="font-lora text-black text-lg md:text-xl mb-8 leading-relaxed">
              Simplify every transaction from cards to ACH while unlocking funding that moves at the speed of your business.
              Our platform unites payment processing, merchant services, and split funding into one seamless experience.
              From terminals to advanced software integrations, Split delivers payment technology that keeps your business running smoothly. Increase revenue, improve cash flow, and enhance every customer interaction.
            </p>
          </motion.div>
        </section>

        {/* Solutions Grid */}
        <section className="px-6 md:px-10 py-16 md:py-24 border-b border-line/50">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {solutions.map((solution, index) => (
              <GlowingCard
                key={solution.title}
                title={solution.title}
                icon={solution.icon}
                className="min-h-[300px]"
              >
                <p className="text-black">{solution.description}</p>
              </GlowingCard>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-6 md:px-10 py-16 md:py-24 border-b border-line/50">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
            className="text-center max-w-3xl mx-auto border border-line p-12 bg-bg/80 backdrop-blur-sm"
          >
            <h2 className="font-poppins text-3xl md:text-4xl mb-4 text-black">Find the Right Fit for Your Business</h2>
            <p className="font-lora text-black mb-8 text-lg leading-relaxed">
              Let's review your processing setup and uncover how Split can streamline payments, reduce fees, and fund your growth — all in one platform.
            </p>
            <Link href="/get-started" passHref>
              <OrangePushButton>Start My Cost Review</OrangePushButton>
            </Link>
          </motion.div>
        </section>
      </div>
    </main>
  );
}

"use client";

import { motion } from "framer-motion";
import { CreditCard, Check, Landmark, Laptop, Gift } from "lucide-react";
import Link from "next/link";
import LiquidGlassCard from "./LiquidGlassCard";
import OrangePushButton from "./OrangePushButton";

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

export default function HomePaymentsSection() {
  return (
    <section className="relative py-24 md:py-32">
      {/* Content */}
      <div className="relative z-10 px-6 md:px-10 max-w-7xl mx-auto">
        {/* Hero Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16 md:mb-20"
        >
          <h2 className="font-poppins text-4xl md:text-5xl lg:text-6xl leading-tight mb-6 text-white">
            Smarter payments. Stronger cash flow.
          </h2>
          <p className="font-lora text-white/90 text-lg md:text-xl mb-8 leading-relaxed max-w-4xl mx-auto">
            Simplify every transaction from cards to ACH while unlocking funding that moves at the speed of your business.
            Our platform unites payment processing, merchant services, and split funding into one seamless experience.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16 md:mb-20"
        >
          {solutions.map((solution) => (
            <LiquidGlassCard
              key={solution.title}
              title={solution.title}
              description={solution.description}
              icon={solution.icon}
            />
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto border border-white/20 p-8 md:p-12 bg-white/10 backdrop-blur-md rounded-2xl"
        >
          <h2 className="font-poppins text-3xl md:text-4xl mb-4 text-white">
            Find the Right Fit for Your Business
          </h2>
          <p className="font-lora text-white/90 mb-8 text-lg leading-relaxed">
            Let's review your processing setup and uncover how Split can streamline payments, reduce fees, and fund your growth — all in one platform.
          </p>
          <Link href="/get-started" passHref>
            <OrangePushButton>Start My Cost Review</OrangePushButton>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

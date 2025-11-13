"use client";

import InteractiveCard from "@/components/InteractiveCard";
import PaymentInfrastructureSection from "@/components/sections/PaymentInfrastructureSection";
import { motion } from "framer-motion";
import { CreditCard, Check, Landmark, Laptop, Gift } from "lucide-react";

const solutions = [
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

const colorIndexes = [0, 1, 4];

export default function PaymentsSection() {
  return (
    <div className="relative min-h-screen min-h-[100dvh] font-lora text-text bg-bg">
      {/* Hero */}
      <section className="px-6 md:px-10 pt-32 pb-16 md:pt-40 md:pb-20 min-h-[80vh] flex items-center border-b border-line/50">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-4xl mx-auto"
        >
          <h2 className="font-poppins text-4xl md:text-6xl leading-tight mb-6">
            Smarter Payments. Stronger Cash Flow.
          </h2>
          <p className="font-lora text-[#2C2C2C] text-lg md:text-xl mb-8 leading-relaxed">
            Simplify every transaction — from cards to ACH — while unlocking funding that moves at the speed of your business. Our
            platform unites payment processing, merchant services, and split-funding into one seamless experience. From terminals to
            advanced software integrations, Split delivers payment technology that keeps your business running smoothly — increasing
            revenue, improving cash flow, and creating better customer experiences.
          </p>
        </motion.div>
      </section>

      {/* Solutions Grid */}
      <section className="px-6 md:px-10 pt-8 pb-16 md:pt-10 md:pb-20 border-b border-line/50">
        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {solutions.map((solution, index) => (
            <InteractiveCard
              key={solution.title}
              title={solution.title}
              icon={solution.icon}
              colorIndex={colorIndexes[index]}
              className="min-h-[300px]"
            >
              <p>{solution.description}</p>
            </InteractiveCard>
          ))}
        </div>
      </section>

      {/* Payment infrastructure CTA replacing "Find the Right Fit" */}
      <PaymentInfrastructureSection />
    </div>
  );
}

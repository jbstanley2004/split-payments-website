"use client";

import { CreditCard, Check, Laptop } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

type PaymentFeature = {
  title: string;
  description: string;
  icon: LucideIcon;
};

const PAYMENT_FEATURES: PaymentFeature[] = [
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

const CARD_STYLES = [
  "card--neutral",
  "card--blue",
  "card--sage",
];

export default function PaymentsSection() {
  return (
    <section id="payments-inner" className="pt-16 md:pt-24 pb-4 md:pb-6 bg-white">
      {/* Copy block sits directly on the page background */}
      <div className="mx-auto max-w-4xl px-0 md:px-2 lg:px-4 text-left">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#6B6B6B]">
            Payments
          </p>
          <h2 className="text-3xl md:text-4xl font-poppins font-semibold tracking-tight text-[#2E2E2E]">
            Smarter payments. Stronger cash flow.
          </h2>
          <p className="mt-4 text-sm sm:text-base md:text-lg font-lora text-[#6B6B6B] max-w-3xl">
            Simplify every transaction — from cards to ACH — while unlocking
            funding that moves at the speed of your business. Split unites payment
            processing, merchant services, and split-funding into one seamless
            experience so your cash flow stays strong and predictable.
          </p>

          {/* Learn more link to standalone payments page */}
          <div className="mt-5">
            <Link
              href="/payments"
              className="inline-flex items-center text-sm md:text-base font-lora text-[#2E2E2E] hover:text-[#4A90E2] transition-colors duration-300"
            >
              <span>Learn more about payments</span>
              <span aria-hidden className="ml-1">
                →
              </span>
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Floating feature cards as their own band */}
      <div className="mt-10 px-0 md:px-2 lg:px-4">
        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
          {PAYMENT_FEATURES.map((feature, index) => {
            const cardClass =
              CARD_STYLES[index] || CARD_STYLES[CARD_STYLES.length - 1];

            return (
              <motion.article
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`card ${cardClass} flex flex-col p-6 text-left`}
              >
                <div className="card__icon">
                  <feature.icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <h3 className="font-poppins text-base md:text-lg font-semibold text-[#2E2E2E]">
                  {feature.title}
                </h3>
                <p className="mt-1 text-sm font-lora text-[#6B6B6B]">
                  {feature.description}
                </p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

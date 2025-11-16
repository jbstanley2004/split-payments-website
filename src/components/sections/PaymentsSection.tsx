"use client";

import { CreditCard, Check, Laptop } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";

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

export default function PaymentsSection() {
  return (
    <section
      id="payments-inner"
      className="pt-16 md:pt-24 pb-4 md:pb-6 px-6 md:px-10 lg:px-16"
    >
      <div className="mx-auto max-w-5xl text-left">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#9B8E7A]">
          Payments
        </p>
        <h2 className="text-3xl md:text-4xl font-poppins font-semibold tracking-tight text-[#141413]">
          Smarter payments. Stronger cash flow.
        </h2>
        <p className="mt-4 text-sm sm:text-base md:text-lg font-lora text-[#524F49] max-w-3xl">
          Simplify every transaction — from cards to ACH — while unlocking
          funding that moves at the speed of your business. Split unites payment
          processing, merchant services, and split-funding into one seamless
          experience so your cash flow stays strong and predictable.
        </p>

        {/* Learn more link to standalone payments page */}
        <div className="mt-5">
          <Link
            href="/payments"
            className="inline-flex items-center text-sm md:text-base font-lora text-[#141413] hover:text-[#D97757] transition-colors duration-300"
          >
            <span>Learn more about payments</span>
            <span aria-hidden className="ml-1">
              →
            </span>
          </Link>
        </div>
      </div>

      <div className="mx-auto mt-10 grid max-w-5xl gap-6 md:grid-cols-3">
        {PAYMENT_FEATURES.map((feature) => (
          <article
            key={feature.title}
            className="flex flex-col gap-3 p-0 text-left"
          >
            <div className="flex items-center gap-3">
              <div className="inline-flex h-9 w-9 items-center justify-center text-[#D97757]">
                <feature.icon className="h-4 w-4" aria-hidden="true" />
              </div>
              <h3 className="font-poppins text-base md:text-lg font-semibold text-[#141413]">
                {feature.title}
              </h3>
            </div>
            <p className="text-sm font-lora text-[#141413]">
              {feature.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

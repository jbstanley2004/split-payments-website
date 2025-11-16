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

const CARD_STYLES = [
  { bg: "bg-[#d8d1c6]" }, // darkest beige
  { bg: "bg-[#6A9BCC]" }, // blue
  { bg: "bg-[#BCD1CA]" }, // green
];

export default function PaymentsSection() {
  return (
    <section id="payments-inner" className="pt-16 md:pt-24 pb-4 md:pb-6">
      {/* Copy block sits directly on the page background */}
      <div className="mx-auto max-w-4xl px-0 md:px-2 lg:px-4 text-left">
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

      {/* Floating feature cards as their own band */}
      <div className="mt-10 px-0 md:px-2 lg:px-4">
        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
          {PAYMENT_FEATURES.map((feature, index) => {
            const style =
              CARD_STYLES[index] || CARD_STYLES[CARD_STYLES.length - 1];

            return (
              <article
                key={feature.title}
                className={`flex flex-col rounded-3xl ${style.bg} p-6 text-left shadow-[0_12px_30px_rgba(20,20,19,0.08),_0_1px_0_rgba(255,255,255,0.8)_inset,_0_-1px_0_rgba(20,20,19,0.08)_inset]`}
              >
                <div className="mb-3 flex items-center gap-3">
                  <div className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#D97757] text-[#FAF9F5]">
                    <feature.icon className="h-4 w-4" aria-hidden="true" />
                  </div>
                  <h3 className="font-poppins text-base md:text-lg font-semibold text-[#141413]">
                    {feature.title}
                  </h3>
                </div>
                <p className="mt-1 text-sm font-lora text-[#141413]">
                  {feature.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

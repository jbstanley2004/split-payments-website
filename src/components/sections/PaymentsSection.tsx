"use client";

import { CreditCard, Check, Laptop } from "lucide-react";
import type { LucideIcon } from "lucide-react";

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
    <div className="container mx-auto px-6">
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-semibold">
          Built for every way you get paid.
        </h2>
      </div>
      <div className="mt-12 grid gap-8 md:grid-cols-3">
        {PAYMENT_FEATURES.map((feature) => (
          <div key={feature.title} className="notion-card text-left">
            <feature.icon className="h-6 w-6 mb-4 text-[var(--text-main)]" />
            <h3 className="text-xl font-semibold">{feature.title}</h3>
            <p className="mt-2 text-[var(--text-body)]">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

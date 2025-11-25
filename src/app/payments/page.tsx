"use client";

import { DynamicIslandNav } from "@/components/dynamic-island-nav";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { CreditCard, Check, Laptop, Zap, Shield, ArrowRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";

import MobileTerminalsCard from "@/components/animations/MobileTerminalsCard";
import OnlineEcommerceCard from "@/components/animations/OnlineEcommerceCard";
import TapToPayCard from "@/components/animations/TapToPayCard";
import InPersonPOSCard from "@/components/animations/InPersonPOSCard";
import EChecksCard from "@/components/animations/EChecksCard";
import HardwareGridShowcase from "@/components/HardwareGridShowcase";
import MetricsStrip from "@/components/MetricsStrip";


type PaymentSolution = {
  title: string;
  description: string;
  icon: LucideIcon;
  image: string;
};

const SOLUTIONS = [
  {
    title: "Payment Gateway",
    description:
      "Seamless checkout experiences for your digital store, integrated directly with your inventory.",
    icon: Zap,
    image: "/assets/new_photos/ecom/ingenico-ecommerce.webp"
  },
  {
    title: "Mobile Wireless",
    description:
      "Take wireless payments tableside, curbside, or on the go with long-range wireless terminals.",
    icon: CreditCard,
    image: "/assets/new_photos/in_person/ingenico-wireless.webp"
  },
  {
    title: "Integrations",
    description:
      "Modernize your check acceptance with automated verification, faster deposits, and lower transaction costs.",
    icon: Check,
    image: ""
  },
  {
    title: "Contactless Tap to Pay",
    description:
      "Turn your smartphone into a secure contactless payment terminal with contactless tap-to-pay technology.",
    icon: Shield,
    image: "/assets/new_photos/in_person/tap-payment.jpeg"
  }
];

export default function PaymentsPage() {
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const [viewedCards, setViewedCards] = useState<Set<string>>(new Set());

  const handleExpand = (cardId: string) => {
    if (expandedCard !== cardId) {
      setExpandedCard(cardId);
      setViewedCards((prev) => {
        if (prev.has(cardId)) return prev;
        const next = new Set(prev);
        next.add(cardId);
        return next;
      });
    }
  };

  const CopyBubble = ({
    eyebrow,
    title,
    body
  }: {
    eyebrow: string;
    title: string;
    body: string;
  }) => (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
      <div className="max-w-md w-full rounded-2xl border border-black/70 bg-[#F6F5F4] text-brand-black shadow-[0_20px_45px_-25px_rgba(0,0,0,0.2)] px-6 py-5">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-brand-black/70">{eyebrow}</p>
          <h3 className="text-2xl md:text-3xl font-bold font-poppins leading-tight">{title}</h3>
          <p className="text-sm md:text-base leading-relaxed text-brand-black/80">{body}</p>
          <p className="text-[11px] md:text-xs font-semibold text-brand-black/70">Hover another card to keep exploring.</p>
        </div>
      </div>
    </div>
  );

  const fadeInUp = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as any } }
  };

  return (
    <main className="min-h-screen bg-white text-black font-poppins selection:bg-black/10 selection:text-black">
      {/* Global Background Layer */}

      <div className="relative z-10">
        <DynamicIslandNav />

        {/* HERO – Clean, Bright */}
        <section className="relative min-h-[100dvh] bg-white flex items-center justify-center px-6 md:px-10 lg:px-16 pt-20 pb-20 md:pt-24 overflow-hidden">

          <div className="max-w-6xl w-full text-center relative z-10">

            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              className="max-w-4xl mx-auto"
            >

              <h1 className="text-4xl md:text-6xl leading-tight tracking-tight text-black mb-6 md:mb-8 font-semibold">
                Smarter payments.
                <br />
                <span className="text-brand-charcoal">Stronger cash flow.</span>
              </h1>

              <p className="text-lg sm:text-xl md:text-2xl font-lora text-black/70 mb-8 md:mb-12 max-w-2xl mx-auto leading-relaxed">
                Simplify every transaction while unlocking funding that moves at the speed of your business.
              </p>


              <div className="flex flex-row justify-center gap-4 w-full max-w-md mx-auto">
                <Link href="/get-started">
                  <PrimaryButton
                    variant="outline-orange"
                    className="shadow-none hover:shadow-none hover:scale-100 active:scale-100"
                  >
                    Get started
                  </PrimaryButton>
                </Link>
                <Link href="/get-started">
                  <PrimaryButton className="bg-brand-black text-white shadow-none hover:shadow-none hover:scale-100 active:scale-100">
                    Contact sales
                  </PrimaryButton>
                </Link>
              </div>
            </motion.div>

          </div>
          <MetricsStrip />
        </section>






        {/* COVERAGE + SOLUTIONS GRID */}
        <section className="w-full bg-[#F6F5F4] px-6 md:px-10 lg:px-16 py-16 md:py-24">
          <div className="mx-auto max-w-6xl">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-poppins font-bold tracking-tight text-black mb-6">
                Built for every way <br /> you accept payments.
              </h2>
            </div>

            {/* Row 1: Payment Gateway + Mobile Wireless */}
            <div className="grid gap-8 md:grid-cols-2 mb-8 relative">
              <motion.div
                className="relative"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0, duration: 0.5 }}
              >
                <div
                  className={`w-full transition-opacity duration-300 ${expandedCard === 'mobile-wireless' ? 'opacity-0 invisible pointer-events-none' : 'opacity-100 visible'}`}
                >
                  <OnlineEcommerceCard
                    isExpanded={expandedCard === 'payment-gateway'}
                    onExpand={() => handleExpand('payment-gateway')}
                    expandDirection="down"
                    hasBeenViewed={viewedCards.has('payment-gateway')}
                  />
                </div>
                {expandedCard === 'mobile-wireless' && (
                  <CopyBubble
                    eyebrow="Wireless terminals"
                    title="Wireless demo walkthrough"
                    body="With the wireless video active to the right, we spotlight patio-to-curb range, smarter tipping prompts, and battery life that keeps drivers running an entire shift."
                  />
                )}
              </motion.div>
              <motion.div
                className="relative"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1, duration: 0.5 }}
              >
                <div
                  className={`w-full transition-opacity duration-300 ${expandedCard === 'payment-gateway' ? 'opacity-0 invisible pointer-events-none' : 'opacity-100 visible'}`}
                >
                  <MobileTerminalsCard
                    isExpanded={expandedCard === 'mobile-wireless'}
                    onExpand={() => handleExpand('mobile-wireless')}
                    expandDirection="down"
                    hasBeenViewed={viewedCards.has('mobile-wireless')}
                  />
                </div>
                {expandedCard === 'payment-gateway' && (
                  <CopyBubble
                    eyebrow="Checkout flows"
                    title="Gateway demo highlights"
                    body="While the ecommerce video plays to the left, we call out conversion boosts, tokenized vaults for repeat orders, and recovery prompts that bring abandoned carts back."
                  />
                )}
              </motion.div>
            </div>

            {/* Row 2: Integrations + Contactless Tap to Pay */}
            <div className="grid gap-8 md:grid-cols-2 mb-8 relative">
              <motion.div
                className="relative"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <div
                  className={`w-full transition-opacity duration-300 ${expandedCard === 'tap-to-pay' ? 'opacity-0 invisible pointer-events-none' : 'opacity-100 visible'}`}
                >
                  <EChecksCard
                    isExpanded={expandedCard === 'integrations'}
                    onExpand={() => handleExpand('integrations')}
                    expandDirection="up"
                    hasBeenViewed={viewedCards.has('integrations')}
                  />
                </div>
                {expandedCard === 'tap-to-pay' && (
                  <CopyBubble
                    eyebrow="Contactless playbook"
                    title="Tap-to-pay in action"
                    body="When tap to pay is expanding on the right, we highlight instant device provisioning, staff PIN controls, and speedy receipts that keep every register moving."
                  />
                )}
              </motion.div>
              <motion.div
                className="relative"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <div
                  className={`w-full transition-opacity duration-300 ${expandedCard === 'integrations' ? 'opacity-0 invisible pointer-events-none' : 'opacity-100 visible'}`}
                >
                  <TapToPayCard
                    isExpanded={expandedCard === 'tap-to-pay'}
                    onExpand={() => handleExpand('tap-to-pay')}
                    expandDirection="up"
                    hasBeenViewed={viewedCards.has('tap-to-pay')}
                  />
                </div>
                {expandedCard === 'integrations' && (
                  <CopyBubble
                    eyebrow="ACH + eCheck stack"
                    title="Integrations demo takeaways"
                    body="With the eCheck video expanded to the left, we spell out verification automation, funds guarantees, and reconciliation that syncs straight to your back office."
                  />
                )}
              </motion.div>
            </div>

            {/* Row 3: Brand Agnostic (centered) */}
            <div className="flex justify-center">
              <motion.div
                className="w-full md:w-1/2"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <HardwareGridShowcase
                  isExpanded={expandedCard === 'brand-agnostic'}
                  onExpand={() => setExpandedCard('brand-agnostic')}
                />
              </motion.div>
            </div>
          </div>
        </section>




        {/* CTA SECTION */}
        <section className="relative w-full min-h-[600px] md:min-h-[100dvh] overflow-hidden flex items-center justify-center bg-[#F6F5F4]">
          <div className="relative z-10 px-6 md:px-10 lg:px-16 py-24 mx-auto max-w-4xl text-center">
            <h2 className="text-4xl md:text-6xl font-poppins font-bold tracking-tight text-black mb-8 drop-shadow-[0_0_25px_rgba(255,255,255,1)]">
              See how Split can improve your processing.
            </h2>
            <p className="text-xl md:text-2xl font-lora text-black mb-12 leading-relaxed max-w-3xl mx-auto drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]">
              Share a recent statement and we'll review your current setup,
              uncover potential savings, and show how funding and payments work
              together in one platform.
            </p>
            <div className="flex justify-center">
              <Link href="/get-started">
                <PrimaryButton
                  variant="outline-orange"
                  className="shadow-none hover:shadow-none hover:scale-100 active:scale-100"
                >
                  Get started
                </PrimaryButton>
              </Link>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}

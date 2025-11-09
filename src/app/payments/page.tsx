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
      "Seamlessly process credit card transactions in-store, online, or on-the-go with our reliable and secure systems.",
    icon: CreditCard,
  },
  {
    title: "Check Processing",
    description:
      "Traditional and electronic checks, risk-free check guarantee programs, and check conversion to access funds at lower rates.",
    icon: Check,
  },
  {
    title: "ACH Payments",
    description:
      "The most cost-effective ACH transfers for payroll, recurring billing, and B2B payments.",
    icon: Landmark,
  },
  {
    title: "Point of Sale (POS) systems",
    description:
      "Whether it's in-store, on the go, or online, we provide a range of POS systems to meet the needs of hardworking customers.",
    icon: Laptop,
  },
  {
    title: "Gift Card and Loyalty Programs",
    description:
      "Customizable gift card and loyalty programs that encourage customers to return and spend more.",
    icon: Gift,
  },
];

export default function PaymentsPage() {
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
          src="/payments-hero.png"
          alt="Payment Processing"
          fill
          className="object-contain md:object-cover object-center"
          priority
          sizes="100vw"
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-bg/70" />
      </motion.div>

      {/* All content with relative positioning */}
      <div className="relative z-10 min-h-screen min-h-[100dvh]">
        <DynamicIslandNav showHomeLogoOnMobile />

        {/* Hero */}
        <section className="px-6 md:px-10 py-32 md:py-48 min-h-[80vh] flex items-center border-b border-line/50">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="font-poppins text-4xl md:text-6xl leading-tight mb-6">
              Payment Processing Made Simple
            </h1>
            <p className="font-lora text-[#2C2C2C] text-lg md:text-xl mb-8 leading-relaxed">
              From credit card processing to check services, gift cards, and ACH
              payments, we provide an all-in-one resource for your non-cash payment
              needs. Solutions ranging from card terminals to complex software
              integrations, all designed to streamline your payment operations, boost
              your sales, and enhance your customer's experience.
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
                <p>{solution.description}</p>
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
            <h2 className="font-poppins text-3xl md:text-4xl mb-4">Find Your Perfect Solution</h2>
            <p className="font-lora text-[#2C2C2C] mb-8 text-lg leading-relaxed">
              Get in touch for a no-obligation cost review and discover the perfect
              payment solution for your business needs.
            </p>
            <Link href="/get-started" passHref>
              <OrangePushButton>Get a Cost Review</OrangePushButton>
            </Link>
          </motion.div>
        </section>

        {/* Footer */}
        <footer className="border-t border-line/50 px-6 md:px-10 py-8 text-xs text-muted flex flex-col md:flex-row items-center justify-between gap-4">
          <div>© 2025 split payments, inc.</div>
          <div className="flex items-center gap-6">
            <a href="/policy">privacy</a>
            <a href="/terms">terms</a>
            <a href="/support">contact</a>
          </div>
        </footer>
      </div>
    </main>
  );
}

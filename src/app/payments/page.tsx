"use client";

import { DynamicIslandNav } from "@/components/dynamic-island-nav";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { CreditCard, Check, Laptop, Zap, Shield, TrendingUp, ArrowRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import WorkingCapitalAnimation from "@/components/animations/WorkingCapitalAnimation";
import PaymentTerminalCard from "@/components/animations/PaymentTerminalCard";
import MobileTerminalsCard from "@/components/animations/MobileTerminalsCard";
import OnlineEcommerceCard from "@/components/animations/OnlineEcommerceCard";
import TapToPayCard from "@/components/animations/TapToPayCard";
import InPersonPOSCard from "@/components/animations/InPersonPOSCard";
import EChecksCard from "@/components/animations/EChecksCard";
import FullHardwareSpotlight from "@/components/FullHardwareSpotlight";
import CursorParticles from "@/components/animations/CursorParticles";
import HardwareAgnosticCard from "@/components/animations/HardwareAgnosticCard";

type PaymentSolution = {
  title: string;
  description: string;
  icon: LucideIcon;
  image: string;
};

const SOLUTIONS = [
  {
    title: "In-Person POS",
    description:
      "Powerful point-of-sale systems for retail and dining. Accept every payment type with speed and reliability.",
    icon: Laptop,
    image: "/assets/new_photos/in_person/clover-full-pos.webp"
  },
  {
    title: "Mobile Terminals",
    description:
      "Take payments tableside, curbside, or on the go with long-range wireless terminals.",
    icon: CreditCard,
    image: "/assets/new_photos/in_person/ingenico-wireless.webp"
  },
  {
    title: "Online & E-Commerce",
    description:
      "Seamless checkout experiences for your digital store, integrated directly with your inventory.",
    icon: Zap,
    image: "/assets/new_photos/ecom/ingenico-ecommerce.webp"
  },
  {
    title: "Tap to Pay",
    description:
      "Turn your smartphone into a secure payment terminal with contactless tap-to-pay technology.",
    icon: Shield,
    image: "/assets/new_photos/in_person/tap-payment.jpeg"
  },
  {
    title: "E-Checks",
    description:
      "Modernize your check acceptance with automated verification, faster deposits, and lower transaction costs.",
    icon: Check,
    image: ""
  },
  {
    title: "Hardware Agnostic",
    description: "Our favorite is your favorite. We integrate seamlessly with the hardware you already know and trust.",
    icon: Laptop, // Placeholder, not used in custom card
    image: ""
  }
];

export default function PaymentsPage() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as any } }
  };

  return (
    <main className="min-h-screen bg-white text-black font-lora selection:bg-black/10 selection:text-black">
      {/* Global Background Layer */}

      <div className="relative z-10">
        <DynamicIslandNav />

        {/* HERO – Clean, Bright */}
        <section className="relative min-h-[75vh] flex items-center justify-center px-6 md:px-10 lg:px-16 pt-24 pb-12 overflow-hidden">
          <CursorParticles />
          <div className="max-w-6xl w-full text-center relative z-10">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              className="max-w-4xl mx-auto"
            >

              <h1 className="text-5xl md:text-6xl lg:text-7xl leading-[1.1] tracking-tight text-black mb-6 font-semibold">
                Smarter payments.
                <br />
                <span className="text-black">Stronger cash flow.</span>
              </h1>

              <p className="text-xl md:text-2xl font-lora text-black mb-8 max-w-2xl mx-auto leading-relaxed">
                Simplify every transaction while unlocking funding that moves at the speed of your business.
              </p>

              <div className="max-w-2xl mx-auto mt-8 mb-8">
                <PaymentTerminalCard />
              </div>

              <div className="flex justify-center mb-12">
                <Link href="/get-started">
                  <PrimaryButton>Get Started</PrimaryButton>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>





        {/* COVERAGE + SOLUTIONS GRID */}
        <section className="w-full bg-[#F6F5F4] px-6 md:px-10 lg:px-16 py-24">
          <div className="mx-auto max-w-6xl">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-poppins font-bold tracking-tight text-black mb-6">
                Built for every way <br /> you accept payments.
              </h2>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              {SOLUTIONS.map((solution, index) => {
                // Special handling for In-Person POS - use the new card component
                if (solution.title === "In-Person POS") {
                  return (
                    <motion.div
                      key={solution.title}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                    >
                      <InPersonPOSCard />
                    </motion.div>
                  );
                }

                // Special handling for Mobile Terminals - use the new card component
                if (solution.title === "Mobile Terminals") {
                  return (
                    <motion.div
                      key={solution.title}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                    >
                      <MobileTerminalsCard />
                    </motion.div>
                  );
                }

                // Special handling for Online & E-Commerce - use the new card component
                if (solution.title === "Online & E-Commerce") {
                  return (
                    <motion.div
                      key={solution.title}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                    >
                      <OnlineEcommerceCard />
                    </motion.div>
                  );
                }

                // Special handling for Tap to Pay - use the new card component
                if (solution.title === "Tap to Pay") {
                  return (
                    <motion.div
                      key={solution.title}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                    >
                      <TapToPayCard />
                    </motion.div>
                  );
                }

                // Special handling for E-Checks - use the new card component
                if (solution.title === "E-Checks") {
                  return (
                    <motion.div
                      key={solution.title}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                    >
                      <EChecksCard />
                    </motion.div>
                  );
                }

                // Special handling for Hardware Agnostic - use the new card component
                if (solution.title === "Hardware Agnostic") {
                  return (
                    <motion.div
                      key={solution.title}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                    >
                      <HardwareAgnosticCard />
                    </motion.div>
                  );
                }

                // Regular cards for other solutions (if any)
                return (
                  <motion.article
                    key={solution.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className="group bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300"
                  >
                    <div className="h-48 bg-gray-50 relative border-b border-gray-100">
                      <Image
                        src={solution.image}
                        alt={solution.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw"
                        className="object-cover object-top grayscale-[10%] group-hover:grayscale-0 transition-all duration-500"
                      />
                    </div>
                    <div className="p-8">
                      <div className="w-12 h-12 rounded-xl bg-black flex items-center justify-center mb-6 text-white">
                        <solution.icon className="h-6 w-6" aria-hidden="true" />
                      </div>
                      <h3 className="font-poppins text-xl font-bold text-black mb-3">
                        {solution.title}
                      </h3>
                      <p className="text-black leading-relaxed text-sm font-lora">
                        {solution.description}
                      </p>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </section>

        {/* HARDWARE SHOWCASE */}
        <section className="px-6 md:px-10 lg:px-16 py-24 bg-white border-t border-brand-stone/50">
          <div className="max-w-6xl mx-auto text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-poppins font-bold text-black mb-6">
              Industry-leading payment terminals
            </h2>
            <p className="text-lg text-black max-w-2xl mx-auto font-lora">
              We support the most trusted payment hardware from Ingenico, Verifone, Pax, and Clover.
            </p>
          </div>
          <FullHardwareSpotlight />
        </section>


        {/* CTA SECTION */}
        <section className="relative w-full min-h-[600px] overflow-hidden flex items-center justify-center bg-[#F6F5F4]">
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
                <PrimaryButton className="shadow-2xl hover:shadow-[0_20px_50px_rgba(0,0,0,0.2)] transform hover:-translate-y-1 transition-all scale-110">
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

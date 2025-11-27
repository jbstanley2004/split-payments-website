"use client";

import { DynamicIslandNav } from "@/components/dynamic-island-nav";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { CreditCard, Check, Laptop, Zap, Shield, ArrowRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";

import MobileTerminalsCard from "@/components/animations/MobileTerminalsCard";
import OnlineEcommerceCard from "@/components/animations/OnlineEcommerceCard";
import TapToPayCard from "@/components/animations/TapToPayCard";
import InPersonPOSCard from "@/components/animations/InPersonPOSCard";
import EChecksCard from "@/components/animations/EChecksCard";
import HardwareGridShowcase from "@/components/HardwareGridShowcase";
import MetricsStrip from "@/components/MetricsStrip";
import BrandAgnosticSection from "@/components/BrandAgnosticSection";


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
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const scrollTimeoutRef = useRef<NodeJS.Timeout>();

  // Detect touch device
  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  // Scroll-aware collapse: collapse cards when user starts scrolling (DESKTOP ONLY)
  useEffect(() => {
    // Skip scroll collapse on touch devices for smoother mobile experience
    if (isTouchDevice) return;

    let isScrolling = false;

    const handleScroll = () => {
      if (!isScrolling && expandedCard) {
        isScrolling = true;
        setExpandedCard(null);
      }

      clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = setTimeout(() => {
        isScrolling = false;
      }, 150);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, [expandedCard, isTouchDevice]);

  // Viewport awareness: collapse cards when they leave viewport
  useEffect(() => {
    const cardIds = ['payment-gateway', 'mobile-wireless', 'integrations', 'tap-to-pay'];
    const observers: IntersectionObserver[] = [];

    cardRefs.current.forEach((ref, index) => {
      if (!ref) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting && expandedCard === cardIds[index]) {
            setExpandedCard(null);
          }
        },
        // More forgiving threshold on mobile for smoother experience
        { threshold: isTouchDevice ? 0.1 : 0.2, rootMargin: isTouchDevice ? '-5% 0px' : '-10% 0px' }
      );

      observer.observe(ref);
      observers.push(observer);
    });

    return () => observers.forEach(obs => obs.disconnect());
  }, [expandedCard, isTouchDevice]);

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
    body,
    slideDirection = "left",
    isMobile = false
  }: {
    eyebrow: string;
    title: string;
    body: string;
    slideDirection?: "left" | "right";
    isMobile?: boolean;
  }) => (
    <div className={isMobile
      ? "relative w-full mt-4 block md:hidden"
      : "pointer-events-none col-start-1 row-start-1 hidden md:flex items-center justify-center w-full h-full z-10"
    }>
      <motion.div
        initial={{ opacity: 0, x: isMobile ? 0 : (slideDirection === "left" ? -50 : 50), y: isMobile ? 20 : 0 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        exit={{ opacity: 0, x: isMobile ? 0 : (slideDirection === "left" ? -20 : 20), y: isMobile ? 10 : 0, transition: { duration: 0.3 } }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
        className={`w-full rounded-2xl border border-black/70 bg-[#F6F5F4] text-brand-black shadow-[0_20px_45px_-25px_rgba(0,0,0,0.2)] px-6 py-5 ${isMobile ? '' : 'max-w-md'}`}
      >
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-brand-black/70">{eyebrow}</p>
          {title === "Wireless terminals" ? (
            <h3 className="text-2xl md:text-3xl font-bold font-poppins leading-tight">
              <span className="flex items-center gap-1.5 md:gap-2 flex-wrap">
                <span>Mobile freedom, powered by Android</span>
                <Image src="/brand_logos/android.svg" alt="Android" width={24} height={24} className="inline-block w-5 h-5 md:w-7 md:h-7" />
              </span>
            </h3>
          ) : title === "E-commerce integration" ? (
            <h3 className="text-2xl md:text-3xl font-bold font-poppins leading-tight">
              <span className="flex items-center gap-1.5 md:gap-2 flex-wrap">
                <span>Seamless</span>
                <Image src="/brand_logos/shopify.svg" alt="Shopify" width={70} height={20} className="inline-block h-5 md:h-7 w-auto" />
                <span>& online platform connections</span>
              </span>
            </h3>
          ) : title === "Contactless payments" ? (
            <>
              <h3 className="text-2xl md:text-3xl font-bold font-poppins leading-tight">Contactless payments</h3>
              <div className="flex items-center gap-2 md:gap-3 flex-wrap mb-2">
                <Image src="/brand_logos/google-pay.svg" alt="Google Pay" width={60} height={24} className="h-5 md:h-7 w-auto" />
                <Image src="/brand_logos/apple-pay.svg" alt="Apple Pay" width={60} height={24} className="h-5 md:h-7 w-auto" />
                <Image src="/brand_logos/samsung-pay.svg" alt="Samsung Pay" width={80} height={24} className="h-5 md:h-7 w-auto" />
              </div>
            </>
          ) : (
            <h3 className="text-2xl md:text-3xl font-bold font-poppins leading-tight">{title}</h3>
          )}
          <p className="text-sm md:text-base leading-relaxed text-brand-black/80">{body}</p>
          <p className="text-[11px] md:text-xs font-semibold text-brand-black/70">Hover another card to keep exploring.</p>
        </div>
      </motion.div>
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
                <Link href="/contact">
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
        <section className="w-full bg-[#F6F5F4] px-6 md:px-10 lg:px-16 py-10 md:py-14">
          <div className="mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-poppins font-bold tracking-tight text-black mb-4">
                Built for every way <br className="hidden md:block" /> you accept payments.
              </h2>
            </div>

            {/* Row 1: Payment Gateway + Mobile Wireless */}
            <div className="grid gap-6 md:grid-cols-2 mb-6 relative">
              <motion.div
                ref={(el) => cardRefs.current[0] = el}
                className="grid relative"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0, duration: 0.5 }}
              >
                <div
                  className={`col-start-1 row-start-1 w-full transition-opacity duration-300 ${expandedCard === 'mobile-wireless' ? 'md:opacity-0 md:invisible md:pointer-events-none' : 'opacity-100 visible'}`}
                >
                  <OnlineEcommerceCard
                    isExpanded={expandedCard === 'payment-gateway'}
                    onExpand={() => handleExpand('payment-gateway')}
                    expandDirection="down"
                    hasBeenViewed={viewedCards.has('payment-gateway')}
                  />
                  <AnimatePresence>
                    {expandedCard === 'payment-gateway' && (
                      <CopyBubble
                        eyebrow="E-commerce integration"
                        title="E-commerce integration"
                        body="We integrate safely and securely with Shopify and other leading e-commerce platforms through our NMI and Authorize.net gateway connections. Accept payments with confidence, protect customer data, and streamline your checkout experience."
                        isMobile={true}
                      />
                    )}
                  </AnimatePresence>
                </div>
                <AnimatePresence>
                  {expandedCard === 'mobile-wireless' && (
                    <CopyBubble
                      eyebrow="Wireless terminals"
                      title="Wireless terminals"
                      body="We offer the best mobile wireless devices on the market, powered by Android for seamless performance. Choose from industry-leading brands including PAX, Ingenico, Clover, Dejavoo, and Verifone—all designed to keep your business moving."
                      slideDirection="right"
                    />
                  )}
                </AnimatePresence>
              </motion.div>
              <motion.div
                ref={(el) => cardRefs.current[1] = el}
                className="grid relative"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1, duration: 0.5 }}
              >
                <div
                  className={`col-start-1 row-start-1 w-full transition-opacity duration-300 ${expandedCard === 'payment-gateway' ? 'md:opacity-0 md:invisible md:pointer-events-none' : 'opacity-100 visible'}`}
                >
                  <MobileTerminalsCard
                    isExpanded={expandedCard === 'mobile-wireless'}
                    onExpand={() => handleExpand('mobile-wireless')}
                    expandDirection="down"
                    hasBeenViewed={viewedCards.has('mobile-wireless')}
                  />
                  <AnimatePresence>
                    {expandedCard === 'mobile-wireless' && (
                      <CopyBubble
                        eyebrow="Wireless terminals"
                        title="Wireless terminals"
                        body="We offer the best mobile wireless devices on the market, powered by Android for seamless performance. Choose from industry-leading brands including PAX, Ingenico, Clover, Dejavoo, and Verifone—all designed to keep your business moving."
                        isMobile={true}
                      />
                    )}
                  </AnimatePresence>
                </div>
                <AnimatePresence>
                  {expandedCard === 'payment-gateway' && (
                    <CopyBubble
                      eyebrow="E-commerce integration"
                      title="E-commerce integration"
                      body="We integrate safely and securely with Shopify and other leading e-commerce platforms through our NMI and Authorize.net gateway connections. Accept payments with confidence, protect customer data, and streamline your checkout experience."
                      slideDirection="left"
                    />
                  )}
                </AnimatePresence>
              </motion.div>
            </div>

            {/* Row 2: Integrations + Contactless Tap to Pay */}
            <div className="grid gap-6 md:grid-cols-2 mb-6 relative">
              <motion.div
                ref={(el) => cardRefs.current[2] = el}
                className="grid relative"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <div
                  className={`col-start-1 row-start-1 w-full transition-opacity duration-300 ${expandedCard === 'tap-to-pay' ? 'md:opacity-0 md:invisible md:pointer-events-none' : 'opacity-100 visible'}`}
                >
                  <EChecksCard
                    isExpanded={expandedCard === 'integrations'}
                    onExpand={() => handleExpand('integrations')}
                    expandDirection="up"
                    hasBeenViewed={viewedCards.has('integrations')}
                  />
                  <AnimatePresence>
                    {expandedCard === 'integrations' && (
                      <CopyBubble
                        eyebrow="Payment flexibility"
                        title="Electronic checks and invoicing"
                        body="We accept all types of payments including electronic checks (eChecks), offering lower transaction costs and faster deposits. Integrated with QuickBooks and powered by NMI and Authorize.net, our solution automates reconciliation and streamlines your back-office operations."
                        isMobile={true}
                      />
                    )}
                  </AnimatePresence>
                </div>
                <AnimatePresence>
                  {expandedCard === 'tap-to-pay' && (
                    <CopyBubble
                      eyebrow="Contactless payments"
                      title="Contactless payments"
                      body="We offer the best equipment from the best brands with the latest technology. Accept contactless payments seamlessly. We work with everyone to keep your business moving forward."
                      slideDirection="right"
                    />
                  )}
                </AnimatePresence>
              </motion.div>
              <motion.div
                ref={(el) => cardRefs.current[3] = el}
                className="grid relative"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <div
                  className={`col-start-1 row-start-1 w-full transition-opacity duration-300 ${expandedCard === 'integrations' ? 'md:opacity-0 md:invisible md:pointer-events-none' : 'opacity-100 visible'}`}
                >
                  <TapToPayCard
                    isExpanded={expandedCard === 'tap-to-pay'}
                    onExpand={() => handleExpand('tap-to-pay')}
                    expandDirection="up"
                    hasBeenViewed={viewedCards.has('tap-to-pay')}
                  />
                  <AnimatePresence>
                    {expandedCard === 'tap-to-pay' && (
                      <CopyBubble
                        eyebrow="Contactless payments"
                        title="Contactless payments"
                        body="We offer the best equipment from the best brands with the latest technology. Accept contactless payments seamlessly. We work with everyone to keep your business moving forward."
                        isMobile={true}
                      />
                    )}
                  </AnimatePresence>
                </div>
                <AnimatePresence>
                  {expandedCard === 'integrations' && (
                    <CopyBubble
                      eyebrow="Payment flexibility"
                      title="Electronic checks and invoicing"
                      body="We accept all types of payments including electronic checks (eChecks), offering lower transaction costs and faster deposits. Integrated with QuickBooks and powered by NMI and Authorize.net, our solution automates reconciliation and streamlines your back-office operations."
                      slideDirection="left"
                    />
                  )}
                </AnimatePresence>
              </motion.div>
            </div>

          </div>
        </section>

        {/* BRAND AGNOSTIC SECTION */}
        <BrandAgnosticSection />




        {/* CTA SECTION */}
        <section className="relative w-full min-h-[600px] md:min-h-[100dvh] overflow-hidden flex items-center justify-center bg-white">
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

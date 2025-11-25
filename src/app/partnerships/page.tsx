"use client";

import Image from "next/image";
import { DynamicIslandNav } from "@/components/dynamic-island-nav";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import type { LucideIcon } from "lucide-react";
import {
  BarChart3,
  Handshake,
  Headphones,
  Layers,
  LineChart,
  ShieldCheck,
  Sparkles,
  ArrowRight
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

// Using brand logos from brand_animations directory
const partnerLogos = [
  { name: "Brand 1", src: "/brand_animations/svg0.svg" },
  { name: "Brand 2", src: "/brand_animations/svg1.svg" },
  { name: "Brand 3", src: "/brand_animations/svg2.svg" },
  { name: "Brand 4", src: "/brand_animations/svg7.svg" },
  { name: "Brand 5", src: "/brand_animations/svg15.svg" },
  { name: "Brand 6", src: "/brand_animations/svg18.svg" },
  { name: "Brand 7", src: "/brand_animations/svg19.svg" },
  { name: "Brand 8", src: "/brand_animations/svg33.svg" },
  { name: "Brand 9", src: "/brand_animations/svg34.svg" },
  { name: "Brand 10", src: "/brand_animations/svg35.svg" },
];

const heroHighlights = [
  {
    title: "Revenue-first underwriting",
    description:
      "Offers are calibrated to the processors you already manage, not bank scorecards.",
  },
  {
    title: "Daily split remittance",
    description:
      "Repayments come out of live batches, so merchants and partners stay in sync.",
  },
  {
    title: "Hands-on partner desk",
    description:
      "Our ISO success team co-sells, models, and services every deal you bring.",
  },
];

const partnerMetrics = [
  { label: "Avg. revenue share", value: "35%", detail: "kept by partners" },
  { label: "Time to first funding", value: "6", detail: "business days" },
  { label: "Merchant retention", value: "94%", detail: "after 12 months" },
  { label: "Average split", value: "8-12%", detail: "of daily batches" },
];

type Step = {
  title: string;
  description: string;
  detail: string;
  icon: LucideIcon;
};

const partnerSteps: Step[] = [
  {
    title: "Scope the portfolio",
    description:
      "Share current card volume and industry mix for the merchants you want to fund.",
    detail:
      "We create instant eligibility tiers so you can position funding in your pitch decks.",
    icon: Layers,
  },
  {
    title: "Co-sell with Split",
    description: "Invite our partner desk into calls or drop in a white-labeled deck.",
    detail:
      "Merchants sign digitally, and we underwrite directly from processor statements.",
    icon: Handshake,
  },
  {
    title: "Share in the yield",
    description: "Revenue share drops every month you stay on the account.",
    detail: "You see repayments, renewals, and conversion analytics inside the portal.",
    icon: BarChart3,
  },
];

const economicsBreakdown = [
  {
    label: "Split percentage",
    description: "2–8% of each settled batch flexes with sales volume.",
    partnerShare: "Partners take up to 40 bps of the total remit.",
  },
  {
    label: "Upfront funding",
    description: "$25K–$500K advances based on historic processing.",
    partnerShare: "Automatic renewal alerts and refresh commissions.",
  },
  {
    label: "Servicing",
    description: "Split manages remittance, statements, and customer care.",
    partnerShare: "You stay the hero—we stay invisible unless you loop us in.",
  },
];

const enablementCards: Step[] = [
  {
    title: "Revenue simulations",
    description: "Model cost of capital vs. processor incentives in a single worksheet.",
    detail:
      "Overlay different split percentages to show merchants exactly what they keep.",
    icon: LineChart,
  },
  {
    title: "Compliance guardrails",
    description: "Every deck, disclosure, and email template is pre-cleared.",
    detail: "Use ready-made FAQ cards so underwriting never slows the sale.",
    icon: ShieldCheck,
  },
  {
    title: "Partner concierge",
    description: "Dedicated Slack channel + standing pipeline reviews.",
    detail: "We help prioritize merchants that will clear diligence fastest.",
    icon: Headphones,
  },
  {
    title: "Automated renewals",
    description: "Smart reminders when merchants are halfway through repayment.",
    detail: "Drop in a refreshed offer with two clicks—no resubmitting paperwork.",
    icon: Sparkles,
  },
];

const industries = [
  {
    name: "Restaurants",
    stat: "Avg. 4.3x renewal",
    image: "/industries/restaurants.webp",
  },
  {
    name: "Auto & repair",
    stat: "$120K avg. advance",
    image: "/industries/car_repair.webp",
  },
  {
    name: "Retail & boutiques",
    stat: "13% blended split",
    image: "/industries/clothing.webp",
  },
  {
    name: "Beauty & wellness",
    stat: "93% retention",
    image: "/industries/hair_beauty.webp",
  },
];

const faqs = [
  {
    question: "What makes a merchant a fit?",
    answer:
      "$25K+ in monthly card volume, at least six months of processing history, and the desire to reinvest in growth without hard credit pulls.",
  },
  {
    question: "How are partners paid?",
    answer:
      "You receive a recurring revenue share on every batch Split collects plus bonuses on renewals. Payouts happen monthly via ACH.",
  },
  {
    question: "Can Split stay invisible?",
    answer:
      "Yes. We can stay fully white-labeled behind your processor brand or step in as a named co-sell resource when you prefer.",
  },
];

export default function PartnershipsPage() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as any } }
  };

  return (
    <main className="min-h-screen bg-white text-brand-black font-lora selection:bg-black/10 selection:text-black">
      <div className="relative">
        <DynamicIslandNav />

        {/* HERO - Clean Bright */}
        <section className="relative min-h-[85vh] flex items-center justify-center px-6 md:px-10 lg:px-16 pt-32 pb-24">
          <div className="max-w-6xl w-full grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              className="text-left"
            >

              <h1 className="text-5xl md:text-6xl lg:text-7xl leading-[1.1] tracking-tight text-brand-black mb-8 font-semibold">
                Partnerships built on
                <br />
                <span className="text-brand-charcoal">processing performance.</span>
              </h1>

              <p className="text-xl md:text-2xl font-lora text-brand-black/70 mb-12 leading-relaxed">
                Equip your ISO, agent, or referral team with funding that mirrors every card swipe.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <PrimaryButton>Become a partner</PrimaryButton>
                <button className="px-8 py-4 rounded-full border border-gray-200 font-bold text-black hover:bg-gray-50 transition-colors">View Commission Structure</button>
              </div>
            </motion.div>

            {/* Hero Visual */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative h-[600px] hidden lg:block rounded-3xl overflow-hidden bg-gray-100"
            >
              <Image
                src="/assets/new_photos/style/clover-lifestyle.webp"
                alt="Partner Success"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute bottom-8 left-8 right-8 bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-white/20">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-xs font-bold uppercase text-gray-500 mb-1">Avg Rev Share</div>
                    <div className="text-2xl font-bold text-black">35%</div>
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase text-gray-500 mb-1">Retention</div>
                    <div className="text-2xl font-bold text-black">94%</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <div className="px-6 pb-16 pt-24 sm:px-8 md:px-12 lg:px-16 space-y-24">
          {/* HERO CARDS REPLACED BY NEW HERO LAYOUT, SKIPPING DIRECTLY TO CONTENT */}

          {/* TRUSTED PROCESSING ALLIANCES */}
          <section className="max-w-6xl mx-auto">
            <div className="rounded-[40px] border border-brand-stone bg-white p-8 sm:p-12 shadow-elevation-mid">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between mb-10">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-black/40 mb-2">Trusted processing alliances</p>
                  <h2 className="font-poppins text-3xl font-bold text-brand-black">Partners already in the Split orbit</h2>
                </div>
                <p className="text-base text-brand-black/70 max-w-md font-lora">
                  Use our processors of record or bring your own BIN sponsor—we integrate into existing payout flows.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 lg:grid-cols-5">
                {partnerLogos.map((logo) => (
                  <div
                    key={logo.name}
                    className="flex items-center justify-center rounded-xl border border-brand-stone bg-white px-6 py-4 shadow-sm hover:shadow-md transition-shadow grayscale hover:grayscale-0 opacity-70 hover:opacity-100 duration-300"
                  >
                    <Image
                      src={logo.src}
                      alt={logo.name}
                      width={120}
                      height={48}
                      className="h-8 w-auto object-contain"
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* PROGRAM FLOW */}
          <section className="max-w-6xl mx-auto space-y-10">
            <div className="text-center">
              <h2 className="font-poppins text-4xl font-bold text-brand-black mb-4">How the partnership works</h2>
              <p className="text-lg text-brand-black/60 max-w-2xl mx-auto font-lora">
                Each step is built to respect your merchant relationship.
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              {partnerSteps.map((step, i) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="rounded-3xl border border-brand-stone bg-white p-8 shadow-elevation-low hover:shadow-elevation-mid hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-gray text-black mb-6">
                    <step.icon className="h-6 w-6" aria-hidden />
                  </div>
                  <h3 className="font-poppins text-xl font-bold text-brand-black mb-3">{step.title}</h3>
                  <p className="text-sm text-brand-black/80 mb-4 leading-relaxed font-lora">{step.description}</p>
                  <div className="pt-4 border-t border-brand-stone/50">
                    <p className="text-xs text-brand-black/50 font-lora">{step.detail}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* DEAL ECONOMICS */}
          <section className="max-w-6xl mx-auto space-y-10">
            <div className="text-center">
              <h2 className="font-poppins text-4xl font-bold text-brand-black mb-4">Funding mechanics & partner yield</h2>
            </div>
            <div className="grid gap-6 lg:grid-cols-3">
              {economicsBreakdown.map((item) => (
                <div
                  key={item.label}
                  className="rounded-3xl border border-brand-stone bg-white p-8 shadow-elevation-low hover:shadow-elevation-mid transition-shadow"
                >
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-black/40 mb-4">{item.label}</p>
                  <p className="text-base text-brand-black/80 mb-4 font-lora">{item.description}</p>
                  <p className="text-sm font-semibold text-brand-black bg-brand-gray inline-block px-3 py-1 rounded-lg">{item.partnerShare}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ENABLEMENT */}
          <section className="max-w-6xl mx-auto space-y-10">
            <div className="text-center">
              <h2 className="font-poppins text-4xl font-bold text-brand-black mb-4">Tools that keep partners in motion</h2>
            </div>
            <div className="grid gap-8 md:grid-cols-2">
              {enablementCards.map((card) => (
                <div
                  key={card.title}
                  className="flex gap-6 rounded-3xl border border-brand-stone bg-white p-8 shadow-elevation-low hover:shadow-elevation-mid transition-all duration-300 group"
                >
                  <div className="shrink-0">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-gray text-black group-hover:bg-black group-hover:text-white transition-colors">
                      <card.icon className="h-6 w-6" aria-hidden />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-poppins text-xl font-bold text-brand-black mb-2">{card.title}</h3>
                    <p className="text-sm text-brand-black/80 mb-2 font-lora">{card.description}</p>
                    <p className="text-xs text-brand-black/50 font-lora">{card.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* INDUSTRIES */}
          <section className="max-w-6xl mx-auto space-y-10">
            <div className="text-center">
              <h2 className="font-poppins text-4xl font-bold text-brand-black mb-4">Where Split funding resonates</h2>
            </div>
            <div className="grid gap-8 md:grid-cols-2">
              {industries.map((industry) => (
                <div
                  key={industry.name}
                  className="group rounded-[32px] overflow-hidden bg-white shadow-elevation-low hover:shadow-elevation-mid transition-all duration-300 border border-brand-stone"
                >
                  <div className="relative h-64 w-full overflow-hidden">
                    <Image
                      src={industry.image}
                      alt={industry.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105 grayscale hover:grayscale-0"
                      sizes="(min-width: 768px) 50vw, 100vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    <div className="absolute bottom-6 left-6 text-white">
                      <p className="font-poppins text-2xl font-bold mb-1">{industry.name}</p>
                      <p className="text-sm opacity-90 font-lora">{industry.stat}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section className="max-w-4xl mx-auto space-y-6">
            <p className="text-center text-xs font-bold uppercase tracking-[0.2em] text-brand-black/40">FAQ</p>
            <div className="space-y-4">
              {faqs.map((faq) => (
                <div
                  key={faq.question}
                  className="rounded-2xl border border-brand-stone bg-white px-8 py-6 shadow-elevation-low hover:shadow-elevation-mid transition-all duration-300"
                >
                  <h3 className="font-poppins text-lg font-bold text-brand-black mb-2">{faq.question}</h3>
                  <p className="text-sm text-brand-black/70 leading-relaxed font-lora">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>

          {/* FINAL CTA - Consistent White/Black Style */}
          <section className="max-w-6xl mx-auto pb-12">
            <div className="rounded-[40px] bg-black text-white p-12 text-center shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/10 blur-[100px] rounded-full pointer-events-none" />

              <h2 className="font-poppins text-3xl md:text-4xl font-bold mb-6 relative z-10">Bring Split into your next portfolio review</h2>
              <p className="text-lg text-white/70 max-w-2xl mx-auto mb-10 relative z-10 font-lora">
                Send a merchant list or invite us to your next ISO roundtable. We&apos;ll show exactly how Split flexes with the processing stack you already built.
              </p>

              <div className="flex flex-col items-center gap-4 relative z-10">
                <button className="bg-white text-black px-10 py-5 rounded-full font-poppins font-semibold text-lg hover:scale-105 transition-transform shadow-lg">
                  Book a partner session
                </button>
                <span className="text-xs text-white/40 font-bold uppercase tracking-wide">No obligation. No hard credit pulls.</span>
              </div>
            </div>
          </section>
        </div>


      </div>
    </main>
  );
}

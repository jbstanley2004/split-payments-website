import Image from "next/image";
import { DynamicIslandNav } from "@/components/dynamic-island-nav";
import OrangePushButton from "@/components/OrangePushButton";
import type { LucideIcon } from "lucide-react";
import {
  BarChart3,
  Handshake,
  Headphones,
  Layers,
  LineChart,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

const partnerLogos = [
  { name: "First Data", src: "/payment_types/first-data.svg" },
  { name: "Worldpay", src: "/payment_types/worldpay.svg" },
  { name: "Clover", src: "/payment_types/clover.svg" },
  { name: "Square", src: "/payment_types/square.svg" },
  { name: "Stripe", src: "/payment_types/stripe.svg" },
  { name: "Global Payments", src: "/payment_types/global-payments.svg" },
  { name: "Visa", src: "/gsap-animated-logo-wh-carousel/logos/visa.svg" },
  { name: "Mastercard", src: "/gsap-animated-logo-wh-carousel/logos/mastercard.svg" },
  { name: "American Express", src: "/gsap-animated-logo-wh-carousel/logos/amex.svg" },
  { name: "PayPal", src: "/gsap-animated-logo-wh-carousel/logos/paypal.svg" },
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

const BRAND_BEIGE_DARK = "#d8d1c6";
const BRAND_ORANGE = "#D97757";

export default function PartnershipsPage() {
  return (
    <main className="min-h-screen min-h-[100dvh] min-h-[100svh] font-lora text-main">
      <div className="relative">
        <DynamicIslandNav />

        <div className="px-6 pb-16 pt-24 sm:px-8 md:px-12 lg:px-16 space-y-12 sm:space-y-16">
          {/* HERO */}
          <section className="space-y-8">
            <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
              {/* Left: headline + hero cards directly on image */}
              <div className="max-w-3xl">
                <div className="inline-flex items-center gap-2 rounded-full border border-[#E8E6DC] bg-[#f0ebe2] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.3em] text-[#9B8E7A]">
                  <span
                    className="inline-block h-1.5 w-1.5 rounded-full"
                    style={{ backgroundColor: BRAND_ORANGE }}
                  />
                  ISO Partnerships
                </div>
                <div className="mt-6 space-y-4">
                  <h1 className="font-poppins text-4xl font-semibold leading-tight text-[#141413] sm:text-5xl">
                    Partnerships built on processing performance
                  </h1>
                  <p className="text-lg text-[#3F3A32] sm:text-xl max-w-2xl">
                    Equip your ISO, agent, or referral team with funding that mirrors every card swipe. Split prices against actual processor data so your merchants see capital faster—and you capture more share of wallet.
                  </p>
                </div>
                <div className="mt-8 grid gap-4 sm:grid-cols-3">
                  {heroHighlights.map((item) => (
                    <div
                      key={item.title}
                      className="rounded-2xl border border-[#E8E6DC] p-5 shadow-[0_18px_40px_rgba(20,20,19,0.10)]"
                      style={{ backgroundColor: BRAND_BEIGE_DARK }}
                    >
                      <p className="font-poppins text-base font-semibold text-[#141413]">{item.title}</p>
                      <p className="mt-2 text-sm text-[#524F49]">{item.description}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <button className="btn-primary">
                    <span className="dot" />
                    <span>Become a partner</span>
                  </button>
                </div>
              </div>

              {/* Right: metrics cards, no outer container */}
              <div className="flex flex-col gap-6">
                <div className="grid grid-cols-2 gap-4">
                  {partnerMetrics.map((metric) => (
                    <div
                      key={metric.label}
                      className="rounded-[32px] border border-[#E8E6DC] p-5 shadow-[0_18px_40px_rgba(20,20,19,0.12)]"
                      style={{ backgroundColor: BRAND_BEIGE_DARK }}
                    >
                      <p className="text-[11px] uppercase tracking-[0.2em] text-[#9B8E7A]">{metric.label}</p>
                      <p className="mt-2 font-poppins text-3xl font-semibold text-[#141413]">{metric.value}</p>
                      <p className="text-sm text-[#524F49]">{metric.detail}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* TRUSTED PROCESSING ALLIANCES – leave structure as-is */}
          <section>
            <div className="rounded-[32px] border border-[#E8E6DC] bg-[#FAF9F5] p-6 sm:p-8">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.25em] text-[#9B8E7A]">Trusted processing alliances</p>
                  <h2 className="mt-2 font-poppins text-2xl font-semibold text-[#141413]">Partners already in the Split orbit</h2>
                </div>
                <p className="text-sm text-[#524F49] max-w-md">
                  Use our processors of record or bring your own BIN sponsor—we integrate into existing payout flows and keep your brand front and center.
                </p>
              </div>
              <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-5">
                {partnerLogos.map((logo) => (
                  <div
                    key={logo.name}
                    className="flex items-center justify-center rounded-2xl border border-[#E8E6DC] bg-[#F8F4EC] px-4 py-3"
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
          <section className="space-y-6">
            <div className="flex flex-col gap-3">
              <p className="text-sm uppercase tracking-[0.25em] text-[#9B8E7A]">Program flow</p>
              <h2 className="font-poppins text-3xl font-semibold text-[#141413]">How the partnership works</h2>
              <p className="text-base text-[#524F49] max-w-3xl">
                Each step is built to respect your merchant relationship. You own the conversation; we provide underwriting, capital, and servicing.
              </p>
            </div>
            <div className="grid gap-5 md:grid-cols-3">
              {partnerSteps.map((step) => (
                <div
                  key={step.title}
                  className="rounded-3xl border border-[#E8E6DC] p-6 shadow-[0_18px_45px_rgba(20,20,19,0.12)]"
                  style={{ backgroundColor: BRAND_BEIGE_DARK }}
                >
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-full"
                    style={{ backgroundColor: BRAND_ORANGE }}
                  >
                    <step.icon className="h-5 w-5 text-white" aria-hidden />
                  </div>
                  <h3 className="mt-4 font-poppins text-xl font-semibold text-[#141413]">{step.title}</h3>
                  <p className="mt-2 text-sm text-[#524F49]">{step.description}</p>
                  <p className="mt-3 text-sm text-[#3F3A32]">{step.detail}</p>
                </div>
              ))}
            </div>
          </section>

          {/* DEAL ECONOMICS – long beige cards directly on background */}
          <section className="space-y-6">
            <div className="flex flex-col gap-3">
              <p className="text-sm uppercase tracking-[0.25em] text-[#9B8E7A]">Deal economics</p>
              <h2 className="font-poppins text-3xl font-semibold text-[#141413]">Funding mechanics & partner yield</h2>
              <p className="text-base text-[#524F49] max-w-3xl">
                Transparent economics keep your agents confident. Every file includes a clear payout schedule, remittance assumptions, and renewal triggers.
              </p>
            </div>
            <div className="grid gap-4 lg:grid-cols-3">
              {economicsBreakdown.map((item) => (
                <div
                  key={item.label}
                  className="rounded-[32px] border border-[#E8E6DC] p-5 shadow-[0_18px_40px_rgba(20,20,19,0.10)]"
                  style={{ backgroundColor: BRAND_BEIGE_DARK }}
                >
                  <p className="text-xs uppercase tracking-[0.25em] text-[#9B8E7A]">{item.label}</p>
                  <p className="mt-3 text-sm text-[#3F3A32]">{item.description}</p>
                  <p className="mt-4 text-sm font-semibold text-[#141413]">{item.partnerShare}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ENABLEMENT – tools cards with orange icons */}
          <section className="space-y-6">
            <div className="flex flex-col gap-3">
              <p className="text-sm uppercase tracking-[0.25em] text-[#9B8E7A]">Enablement</p>
              <h2 className="font-poppins text-3xl font-semibold text-[#141413]">Tools that keep partners in motion</h2>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              {enablementCards.map((card) => (
                <div
                  key={card.title}
                  className="rounded-3xl border border-[#E8E6DC] p-6 shadow-[0_18px_40px_rgba(20,20,19,0.10)]"
                  style={{ backgroundColor: BRAND_BEIGE_DARK }}
                >
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-full"
                    style={{ backgroundColor: BRAND_ORANGE }}
                  >
                    <card.icon className="h-5 w-5 text-white" aria-hidden />
                  </div>
                  <h3 className="mt-4 font-poppins text-xl font-semibold text-[#141413]">{card.title}</h3>
                  <p className="mt-2 text-sm text-[#524F49]">{card.description}</p>
                  <p className="mt-3 text-sm text-[#3F3A32]">{card.detail}</p>
                </div>
              ))}
            </div>
          </section>

          {/* INDUSTRIES – left as-is */}
          <section className="space-y-6">
            <div className="flex flex-col gap-3">
              <p className="text-sm uppercase tracking-[0.25em] text-[#9B8E7A]">Industries we accelerate</p>
              <h2 className="font-poppins text-3xl font-semibold text-[#141413]">Where Split funding resonates</h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {industries.map((industry) => (
                <div
                  key={industry.name}
                  className="rounded-[32px] border border-[#E8E6DC] bg-[#FAF9F5] p-5"
                >
                  <div className="relative h-48 w-full overflow-hidden rounded-3xl">
                    <Image
                      src={industry.image}
                      alt={industry.name}
                      fill
                      className="object-cover"
                      sizes="(min-width: 768px) 50vw, 100vw"
                    />
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <div>
                      <p className="font-poppins text-xl font-semibold text-[#141413]">{industry.name}</p>
                      <p className="text-sm text-[#7B7569]">{industry.stat}</p>
                    </div>
                    <div className="rounded-full bg-[#f0ebe2] px-4 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-[#9B8E7A]">
                      Split ready
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* FAQ – day-card style beige rows with orange dot */}
          <section className="space-y-4">
            <p className="text-sm uppercase tracking-[0.25em] text-[#9B8E7A]">FAQ</p>
            <div className="space-y-4">
              {faqs.map((faq) => (
                <div
                  key={faq.question}
                  className="flex flex-col gap-2 rounded-[32px] border border-[#E8E6DC] px-6 py-5 sm:flex-row sm:items-center sm:justify-between shadow-[0_18px_40px_rgba(20,20,19,0.10)]"
                  style={{ backgroundColor: BRAND_BEIGE_DARK }}
                >
                  <div className="flex items-start gap-3">
                    <span
                      className="mt-2 inline-block h-2 w-2 rounded-full"
                      style={{ backgroundColor: BRAND_ORANGE }}
                    />
                    <div>
                      <h3 className="font-poppins text-lg font-semibold text-[#141413]">{faq.question}</h3>
                      <p className="mt-1 text-sm text-[#524F49]">{faq.answer}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* FINAL CTA – solid black card without opacity overlay */}
          <section>
            <div className="rounded-[36px] border border-[#E8E6DC] bg-[#141413] p-8 text-[#FAF9F5] shadow-[0_30px_80px_rgba(20,20,19,0.5)]">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div className="space-y-3">
                  <p className="text-sm uppercase tracking-[0.25em] text-[#D97757]">Ready when you are</p>
                  <h2 className="font-poppins text-3xl font-semibold">Bring Split into your next portfolio review</h2>
                  <p className="text-base text-[#E8E6DC]">
                    Send a merchant list or invite us to your next ISO roundtable. We&apos;ll show exactly how Split flexes with the processing stack you already built.
                  </p>
                </div>
                <div className="flex flex-col gap-4">
                  <button className="btn-primary">
                    <span className="dot" />
                    <span>Book a partner session</span>
                  </button>
                  <span className="text-sm text-white">No obligation. No hard credit pulls for your merchants.</span>
                </div>
              </div>
            </div>
          </section>
        </div>

        <footer className="px-6 pb-8 pt-4 text-xs text-[#7B7569] sm:px-8 md:px-12 lg:px-16">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p>© 2025 Split Payments, Inc. — Funding growth through payment technology.</p>
            <div className="flex items-center gap-6">
              <a className="hover:text-[#D97757]" href="/policy">
                privacy
              </a>
              <a className="hover:text-[#D97757]" href="/terms">
                terms
              </a>
              <a className="hover:text-[#D97757]" href="/support">
                contact
              </a>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}


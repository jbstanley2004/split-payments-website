import Image from "next/image";
import { DynamicIslandNav } from "@/components/dynamic-island-nav";
import OrangePushButton from "@/components/OrangePushButton";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  BarChart3,
  Building2,
  CheckCircle2,
  Clock3,
  CreditCard,
  LineChart,
  PieChart,
  ShieldCheck,
  Sparkles,
  Star,
  Users2,
} from "lucide-react";
import TwinklingStarsBackground from "@/components/TwinklingStarsBackground";

type IconCard = {
  title: string;
  description: string;
  icon: LucideIcon;
};

const overviewPoints: IconCard[] = [
  {
    title: "Turn fixed costs into growth",
    description: "Transform your largest recurring expense into an asset that drives customer loyalty and higher average order values.",
    icon: LineChart,
  },
  {
    title: "Built for real-world operations",
    description: "Split payments are structured around your existing cash flow, not rigid BNPL templates or one-size-fits-all financing.",
    icon: Building2,
  },
  {
    title: "No new headaches for finance",
    description: "We handle the complexity of orchestration, reconciliation, and compliance while your team keeps their existing workflows.",
    icon: ShieldCheck,
  },
];

const benefits: IconCard[] = [
  {
    title: "Lift conversion on high-intent purchasers",
    description: "Let customers split larger invoices onto their existing cards while your business is funded on your terms.",
    icon: CreditCard,
  },
  {
    title: "Reduce invoice friction",
    description: "Turn multi-stakeholder approvals into a single, card-based flow that feels familiar and fast.",
    icon: Users2,
  },
  {
    title: "Align cost with value delivered",
    description: "Structure splits around milestones, usage, or stages in your relationship instead of forcing full payment on day one.",
    icon: Clock3,
  },
];

const analytics: IconCard[] = [
  {
    title: "Cohort-level performance",
    description: "Understand how split pay behavior impacts retention, expansion, and cash realization over time.",
    icon: BarChart3,
  },
  {
    title: "Channel + segment insights",
    description: "See which products, geographies, or customer profiles respond best to CC Split offers.",
    icon: PieChart,
  },
  {
    title: "Portfolio-quality monitoring",
    description: "Track repayment, disputes, and fraud indicators across your split portfolio with clear guardrails.",
    icon: Star,
  },
];

export default function CCSplitPage() {
  return (
    <main className="relative min-h-screen min-h-[100dvh] min-h-[100svh] bg-transparent font-lora text-[#141413]">
      <TwinklingStarsBackground />

      <div className="relative z-10">
        <DynamicIslandNav />

        <section className="px-6 md:px-10 lg:px-16 pt-28 md:pt-32 pb-12 md:pb-16">
          <div className="max-w-5xl mx-auto flex flex-col gap-10 md:gap-12">
            <div className="flex flex-col gap-4 md:gap-5">
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-[#E4DED0]">
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-[#E4DED0]/60 bg-black/40">
                  <Sparkles className="h-3 w-3" />
                </span>
                <span>Card-based split payments</span>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-poppins font-semibold text-white">
                CC Split: Split large card payments without changing how your customers pay.
              </h1>
              <p className="text-base md:text-lg text-white/80 max-w-2xl">
                Offer flexible payment schedules on your terms while your customers keep using the cards, workflows, and approvals they already trust.
              </p>
              <div className="flex flex-wrap items-center gap-3 md:gap-4">
                <OrangePushButton asChild size="lg">
                  <a href="/contact" className="inline-flex items-center gap-2">
                    Talk to our team
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </OrangePushButton>
                <button className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-white/70">
                  <PlusIcon />
                  Download product overview
                </button>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {overviewPoints.map((point) => (
                <article
                  key={point.title}
                  className="rounded-2xl border border-white/8 bg-black/35 p-5 backdrop-blur"
                >
                  <point.icon className="h-5 w-5 text-white mb-3" />
                  <h2 className="text-sm font-semibold text-white mb-1.5">{point.title}</h2>
                  <p className="text-xs text-white/80 leading-relaxed">{point.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 md:px-10 lg:px-16 pb-16 md:pb-20">
          <div className="max-w-6xl mx-auto grid gap-10 md:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] items-start">
            <div className="space-y-5">
              <h2 className="text-2xl md:text-3xl font-poppins font-semibold text-white">
                Designed for operators, not just cardholders.
              </h2>
              <p className="text-sm md:text-base text-white/80 max-w-xl">
                CC Split sits between your billing systems and the card networks, so you can orchestrate when and how payments land without asking customers to adopt a new financing tool.
              </p>
              <ul className="space-y-3 text-sm text-white/80">
                <li className="flex gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#FDE68A]" />
                  <span>Support single invoices, recurring subscriptions, or project-based schedules.</span>
                </li>
                <li className="flex gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#FDE68A]" />
                  <span>Configure who pays what and when, including internal cost centers or external stakeholders.</span>
                </li>
                <li className="flex gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#FDE68A]" />
                  <span>Keep your existing CRM, billing, and finance stack — we connect to what you already use.</span>
                </li>
              </ul>
            </div>

            <div className="rounded-3xl border border-white/8 bg-black/35 p-6 md:p-7 backdrop-blur space-y-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.18em] text-white/60">Illustrative metrics</p>
                  <p className="text-sm text-white/90">Impact of Split on a typical mid-market SaaS portfolio</p>
                </div>
                <Image
                  src="/logo_split_currentColor.svg"
                  alt="Split logo"
                  width={40}
                  height={40}
                  className="h-8 w-auto opacity-80"
                />
              </div>
              <dl className="grid grid-cols-2 gap-4 text-white">
                <div>
                  <dt className="text-[11px] uppercase tracking-[0.18em] text-white/60">Increase in upmarket close rate</dt>
                  <dd className="text-xl md:text-2xl font-semibold">+18%</dd>
                </div>
                <div>
                  <dt className="text-[11px] uppercase tracking-[0.18em] text-white/60">Average time-to-cash</dt>
                  <dd className="text-xl md:text-2xl font-semibold">≤ 2 days</dd>
                </div>
                <div>
                  <dt className="text-[11px] uppercase tracking-[0.18em] text-white/60">Reduction in invoice churn</dt>
                  <dd className="text-xl md:text-2xl font-semibold">-24%</dd>
                </div>
                <div>
                  <dt className="text-[11px] uppercase tracking-[0.18em] text-white/60">Merchant NPS impact</dt>
                  <dd className="text-xl md:text-2xl font-semibold">+12 pts</dd>
                </div>
              </dl>
            </div>
          </div>
        </section>

        <section className="px-6 md:px-10 lg:px-16 pb-16 md:pb-20">
          <div className="max-w-6xl mx-auto grid gap-8 md:grid-cols-3">
            {benefits.map((benefit) => (
              <article
                key={benefit.title}
                className="rounded-2xl border border-white/8 bg-black/35 p-5 backdrop-blur"
              >
                <benefit.icon className="h-5 w-5 text-white mb-3" />
                <h3 className="text-sm font-semibold text-white mb-1.5">{benefit.title}</h3>
                <p className="text-xs text-white/80 leading-relaxed">{benefit.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="px-6 md:px-10 lg:px-16 pb-20 md:pb-24">
          <div className="max-w-6xl mx-auto grid gap-10 md:grid-cols-[minmax(0,1.2fr)_minmax(0,0.9fr)] items-start">
            <div className="space-y-5">
              <h2 className="text-2xl md:text-3xl font-poppins font-semibold text-white">
                Analytics that finance and RevOps can both trust.
              </h2>
              <p className="text-sm md:text-base text-white/80 max-w-xl">
                Split isn"t just a new payment option; it"s a new data surface. Track performance at the level of cohorts, partners, and individual customers — all mapped back to how you recognize revenue today.
              </p>
            </div>

            <div className="rounded-3xl border border-white/8 bg-black/35 p-6 md:p-7 backdrop-blur space-y-4">
              <p className="text-[11px] uppercase tracking-[0.18em] text-white/60">Portfolio views</p>
              <div className="grid gap-4">
                {analytics.map((item) => (
                  <div key={item.title} className="flex gap-3">
                    <div className="mt-0.5">
                      <item.icon className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-white">{item.title}</div>
                      <div className="text-[11px] text-white/80">{item.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function PlusIcon() {
  return (
    <svg viewBox="0 0 16 16" className="h-4 w-4" aria-hidden="true">
      <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

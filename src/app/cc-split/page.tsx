import { DynamicIslandNav } from "@/components/dynamic-island-nav";
import OrangePushButton from "@/components/OrangePushButton";
import type { LucideIcon } from "lucide-react";
import { BarChart3, Building2, CheckCircle2, Clock3, CreditCard, LineChart, PieChart, ShieldCheck, Users2 } from "lucide-react";

type IconCard = {
  title: string;
  description: string;
  icon: LucideIcon;
};

// Brand chips follow the shared palette from the new brand system.
const REASSURANCE_PILLS = [
  "Cards",
  "Workflows",
  "Approvals",
  "Flexible billing",
] as const;

const HERO_HIGHLIGHTS: IconCard[] = [
  {
    title: "Lift conversion on large invoices",
    description:
      "Let customers split bigger card payments while you keep clean, predictable cash flow on your side.",
    icon: CreditCard,
  },
  {
    title: "Reduce approval drag",
    description:
      "Turn multi-step signoffs into a single, card-based flow that feels familiar to every buyer.",
    icon: CheckCircle2,
  },
  {
    title: "Align cost with value delivered",
    description:
      "Structure splits around milestones or usage so customers only pay as they see value.",
    icon: BarChart3,
  },
  {
    title: "Keep finance confident",
    description:
      "We handle orchestration, reconciliation, and risk while your team keeps existing processes.",
    icon: ShieldCheck,
  },
];

const FEATURE_CARDS: IconCard[] = [
  {
    title: "Portfolio-grade underwriting",
    description:
      "Use live processor and card data instead of static underwriting so offers grow with every batch.",
    icon: LineChart,
  },
  {
    title: "Merchant-friendly terms",
    description:
      "No new logins, no new cards — CC Split rides the rails your merchants already trust.",
    icon: Building2,
  },
  {
    title: "Automated repayments",
    description:
      "Tie remittances directly to card volume so cash never fights against operations.",
    icon: Clock3,
  },
  {
    title: "Clear economics for everyone",
    description:
      "Transparent economics across you, your merchants, and Split with no buried fees.",
    icon: PieChart,
  },
];

const REASONS: IconCard[] = [
  {
    title: "No new behavior for your merchants",
    description:
      "Merchants keep swiping the way they always have — CC Split just changes how the capital flows.",
    icon: Users2,
  },
  {
    title: "Cleaner forecasting for finance",
    description:
      "Dynamic remits map to volume curves so forecasts track real performance instead of guesses.",
    icon: BarChart3,
  },
  {
    title: "Less friction at renewal",
    description:
      "Split large renewals across the term and remove pricing as a blocker for high-intent customers.",
    icon: CheckCircle2,
  },
  {
    title: "Fewer one-off exceptions",
    description:
      "Turn one-off payment plans into a single, standardized CC Split program your teams can trust.",
    icon: ShieldCheck,
  },
];

const METRICS = [
  { label: "Increase in upmarket close rate", value: "+18", suffix: "%" },
  { label: "Time-to-cash from swipe", value: "≤ 2", suffix: " days" },
  { label: "Reduction in invoice churn", value: "-24", suffix: "%" },
  { label: "NPS lift for funded merchants", value: "+12", suffix: " pts" },
];

export default function CCSplitPage() {
  return (
    <main className="relative min-h-screen min-h-[100dvh] min-h-[100svh] bg-[color:var(--bg-page)] font-lora text-[color:var(--text-main)]">
      <div className="relative z-10">
        <DynamicIslandNav />

        {/* HERO */}
        <section className="px-6 md:px-10 lg:px-16 pt-24 sm:pt-28 md:pt-32 pb-10 md:pb-12">
          <div className="mx-auto max-w-4xl text-left">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-[color:var(--text-subtle)]">
              CC Split
            </p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-poppins font-semibold tracking-tight text-[color:var(--text-main)]">
              Split large card payments without changing how customers pay.
            </h1>
            <p className="mt-4 text-sm sm:text-base md:text-lg font-lora text-[color:var(--text-subtle)] max-w-3xl">
              Offer flexible schedules on your terms while customers keep using the cards, workflows, and approvals they
              already trust.
            </p>
          </div>

          {/* Top chips */}
          <div className="mt-8 flex justify-start">
            <div className="flex flex-wrap gap-2">
              {REASSURANCE_PILLS.map((pill) => {
                let variant = "chip chip--neutral";
                if (pill === "Workflows") variant = "chip chip--sage";
                if (pill === "Approvals") variant = "chip chip--rose";
                if (pill === "Flexible billing") variant = "chip chip--blue";

                return (
                  <span key={pill} className={variant}>
                    <span className="dot" />
                    <span className="tracking-[0.16em] uppercase text-[11px] font-medium">{pill}</span>
                  </span>
                );
              })}
            </div>
          </div>
        </section>

        {/* VALUE PROPS */}
        <section className="px-6 md:px-10 lg:px-16 py-12 md:py-16">
          <div className="mx-auto max-w-5xl">
            <div className="mb-8 text-left">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[color:var(--text-subtle)]">
                Why CC Split
              </p>
              <h2 className="mt-2 text-2xl md:text-3xl font-poppins font-semibold tracking-tight text-[color:var(--text-main)]">
                Designed for operators, not just cardholders.
              </h2>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {HERO_HIGHLIGHTS.map((card, index) => {
                const variantClasses = ["card card--neutral", "card card--blue", "card card--sage", "card card--rose"];
                const variant = variantClasses[index % variantClasses.length];

                return (
                  <article key={card.title} className={`${variant} flex flex-col`}>
                    <div className="card__icon">
                      <card.icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <h3 className="font-poppins text-lg font-semibold">{card.title}</h3>
                    <p className="mt-3 text-sm font-lora">{card.description}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* METRICS SECTION */}
        <section className="px-6 md:px-10 lg:px-16 py-12 md:py-20">
          <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[color:var(--text-subtle)]">
                Illustrative metrics
              </p>
              <h2 className="mt-2 text-2xl md:text-3xl font-poppins font-semibold tracking-tight text-[color:var(--text-main)]">
                Impact of CC Split on a typical mid-market SaaS portfolio.
              </h2>
              <p className="mt-4 text-sm sm:text-base md:text-lg font-lora text-[color:var(--text-subtle)]">
                These numbers are directional only, but they show how splits on the card rails can strengthen close rates,
                time-to-cash, and renewal quality.
              </p>

              <div className="mt-8 grid gap-6 sm:grid-cols-2">
                {METRICS.map((metric) => (
                  <div key={metric.label} className="tile">
                    <div className="text-3xl md:text-4xl font-poppins font-semibold tile__value">
                      {metric.value}
                      <span className="ml-1 text-lg font-normal tile__label">{metric.suffix}</span>
                    </div>
                    <p className="mt-3 text-sm font-lora tile__label">{metric.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* CC Split overview card */}
            <div className="mt-4 lg:mt-0">
              <div className="card card--neutral rounded-[40px]">
                <div className="mb-5 flex items-center justify-between text-xs font-semibold uppercase tracking-[0.16em] text-[color:var(--text-subtle)]">
                  <span>CC Split overview</span>
                  <span>Sample merchant</span>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-3xl bg-[#FAF9F5] p-4 shadow-[0_14px_32px_rgba(20,20,19,0.10)] border border-[rgba(255,255,255,0.7)]">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[color:var(--text-subtle)]">
                      Available funding
                    </p>
                    <p className="mt-2 text-3xl font-poppins font-semibold text-[color:var(--text-main)]">$85,000</p>
                    <p className="mt-2 text-sm font-lora text-[color:var(--text-subtle)]">Dynamic, tied to 90-day card volume.</p>
                  </div>
                  <div className="rounded-3xl bg-[#FAF9F5] p-4 shadow-[0_14px_32px_rgba(20,20,19,0.10)] border border-[rgba(255,255,255,0.7)]">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[color:var(--text-subtle)]">
                      Current split rate
                    </p>
                    <p className="mt-2 text-3xl font-poppins font-semibold text-[color:var(--text-main)]">9.5%</p>
                    <p className="mt-2 text-sm font-lora text-[color:var(--text-subtle)]">Adjusts automatically with performance.</p>
                  </div>
                </div>

                <div className="mt-5 space-y-3">
                  {["Breakfast rush", "Lunch", "Dinner"].map((period, idx) => (
                    <div
                      key={period}
                      className="rounded-3xl bg-[#FAF9F5] px-4 py-3 shadow-[0_12px_28px_rgba(20,20,19,0.10)] border border-[rgba(255,255,255,0.7)]"
                    >
                      <div className="flex items-center justify-between text-xs font-lora text-[color:var(--text-subtle)]">
                        <span>{period}</span>
                        <span>{idx === 1 ? "Split remit 9.3%" : "Split remit 9.5%"}</span>
                      </div>
                      <div className="mt-2 h-[6px] rounded-full bg-[#E3DDD0]">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: idx === 0 ? "62%" : idx === 1 ? "86%" : "74%",
                            backgroundColor: "var(--accent-orange)",
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* REASONS SECTION */}
        <section className="px-6 md:px-10 lg:px-16 py-12 md:py-18">
          <div className="mx-auto max-w-5xl">
            <div className="mb-8 text-left">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[color:var(--text-subtle)]">
                For your teams
              </p>
              <h2 className="mt-2 text-2xl md:text-3xl font-poppins font-semibold tracking-tight text-[color:var(--text-main)]">
                Built so sales, RevOps, and finance all say yes.
              </h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {REASONS.map((reason, index) => {
                const variantClasses = ["card card--neutral", "card card--blue", "card card--sage", "card card--rose"];
                const variant = variantClasses[index % variantClasses.length];

                return (
                  <article key={reason.title} className={`${variant} flex flex-col`}>
                    <div className="card__icon">
                      <reason.icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-poppins text-lg font-semibold">{reason.title}</h3>
                    <p className="mt-3 text-sm font-lora">{reason.description}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-6 md:px-10 lg:px-16 pb-16 pt-10 md:pb-24">
          <div className="mx-auto max-w-4xl card card--neutral rounded-[40px]">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[color:var(--text-subtle)]">Get started</p>
                <h2 className="font-poppins text-2xl md:text-3xl font-semibold text-[color:var(--text-main)]">
                  See how CC Split fits into your processing portfolio.
                </h2>
                <p className="text-sm sm:text-base font-lora text-[color:var(--text-subtle)]">
                  Share a bit about your merchant mix and card volume. We&apos;ll map a CC Split program to your existing rails
                  and send a live preview.
                </p>
              </div>
              <div className="flex justify-start lg:justify-end">
                <OrangePushButton>Schedule a walkthrough</OrangePushButton>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

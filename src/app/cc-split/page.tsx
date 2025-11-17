import { DynamicIslandNav } from "@/components/dynamic-island-nav";
import OrangePushButton from "@/components/OrangePushButton";
import type { LucideIcon } from "lucide-react";
import { BarChart3, Building2, CheckCircle2, Clock3, CreditCard, LineChart, PieChart, ShieldCheck, Users2 } from "lucide-react";

type IconCard = {
  title: string;
  description: string;
  icon: LucideIcon;
};

// Brand chips follow the same palette + logic as Payments summary chips and Funding loop chips.
const REASSURANCE_PILLS = [
  "Cards",
  "Workflows",
  "Approvals",
  "Flexible billing",
] as const;

// Exact brand swatches pulled from Funding + Payments implementations.
const BRAND_BEIGE_DARK = "#d8d1c6"; // eligibility card / dark beige pill
const BRAND_BEIGE_PILL = "#f0ebe2"; // smaller beige chips
const BRAND_BLUE = "#6A9BCC";
const BRAND_GREEN = "#BCD1CA";
const BRAND_LAVENDER = "#CBCADB";
const BRAND_ORANGE = "#D97757";

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
    <main className="relative min-h-screen min-h-[100dvh] min-h-[100svh] font-lora text-[#141413]">
      <div className="relative z-10">
        <DynamicIslandNav />

        {/* HERO */}
        <section className="px-6 md:px-10 lg:px-16 pt-24 sm:pt-28 md:pt-32 pb-10 md:pb-12">
          <div className="mx-auto max-w-4xl text-left">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#9B8E7A]">
              CC Split
            </p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-poppins font-semibold tracking-tight text-[#141413]">
              Split large card payments without changing how customers pay.
            </h1>
            <p className="mt-4 text-sm sm:text-base md:text-lg font-lora text-[#524F49] max-w-3xl">
              Offer flexible schedules on your terms while customers keep using the cards, workflows, and approvals they
              already trust.
            </p>
          </div>

          {/* Pills – strictly follow beige / blue / green / purple rules, using dark beige pill color */}
          <div className="mt-8 flex justify-start">
            <div className="flex flex-wrap gap-2">
              {REASSURANCE_PILLS.map((pill, index) => {
                // 1–2 pills: all dark beige
                let bg: string = BRAND_BEIGE_DARK;

                if (REASSURANCE_PILLS.length === 3) {
                  // 3 pills: beige, blue, green
                  const pattern = [BRAND_BEIGE_DARK, BRAND_BLUE, BRAND_GREEN] as const;
                  bg = pattern[index] ?? BRAND_BEIGE_DARK;
                } else if (REASSURANCE_PILLS.length === 4) {
                  // 4 pills: beige, blue, green, lavender
                  const pattern = [BRAND_BEIGE_DARK, BRAND_BLUE, BRAND_GREEN, BRAND_LAVENDER] as const;
                  bg = pattern[index] ?? BRAND_BEIGE_DARK;
                } else if (REASSURANCE_PILLS.length >= 5) {
                  // 5+: beige, blue, green, lavender, beige, repeat
                  const pattern = [
                    BRAND_BEIGE_DARK,
                    BRAND_BLUE,
                    BRAND_GREEN,
                    BRAND_LAVENDER,
                    BRAND_BEIGE_DARK,
                  ] as const;
                  bg = pattern[index % pattern.length];
                }

                const isBeige = bg === BRAND_BEIGE_DARK;
                const textColor = isBeige ? "#141413" : "#FAF9F5";

                return (
                  <span
                    key={pill}
                    className="inline-flex items-center gap-2 rounded-full border border-[#E8E6DC] px-3 py-1 text-[11px] font-medium tracking-[0.16em] uppercase"
                    style={{ backgroundColor: bg, color: textColor }}
                  >
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#D97757]" />
                    <span>{pill}</span>
                  </span>
                );
              })}
            </div>
          </div>
        </section>

        {/* VALUE PROPS – three-up desktop cards that mirror the screenshot and Funding / Payments styles */}
        <section className="px-6 md:px-10 lg:px-16 py-12 md:py-16">
          <div className="mx-auto max-w-5xl">
            <div className="mb-8 text-left">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#9B8E7A]">
                Why CC Split
              </p>
              <h2 className="mt-2 text-2xl md:text-3xl font-poppins font-semibold tracking-tight text-[#141413]">
                Designed for operators, not just cardholders.
              </h2>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {HERO_HIGHLIGHTS.map((card, index) => {
                // Pepper in accent backgrounds across the row: beige, blue, green, lavender.
                const bgPalette = [BRAND_BEIGE_DARK, BRAND_BLUE, BRAND_GREEN, BRAND_LAVENDER] as const;
                const bg = bgPalette[index % bgPalette.length];

                return (
                  <article
                    key={card.title}
                    className="flex flex-col rounded-[32px] p-7 shadow-[0_18px_45px_rgba(20,20,19,0.12),_0_1px_0_rgba(255,255,255,0.85)_inset,_0_-1px_0_rgba(20,20,19,0.08)_inset]"
                    style={{ backgroundColor: bg }}
                  >
                    {/* Icon badge: orange-filled circle with white icon, matching Payments */}
                    <div
                      className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full"
                      style={{ backgroundColor: BRAND_ORANGE }}
                    >
                      <card.icon className="h-5 w-5 text-white" aria-hidden="true" />
                    </div>
                    <h3 className="font-poppins text-lg font-semibold text-[#141413]">
                      {card.title}
                    </h3>
                    <p className="mt-3 text-sm font-lora text-[#141413]">{card.description}</p>
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
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#9B8E7A]">
                Illustrative metrics
              </p>
              <h2 className="mt-2 text-2xl md:text-3xl font-poppins font-semibold tracking-tight text-[#141413]">
                Impact of CC Split on a typical mid-market SaaS portfolio.
              </h2>
              <p className="mt-4 text-sm sm:text-base md:text-lg font-lora text-[#524F49]">
                These numbers are directional only, but they show how splits on the card rails can strengthen close rates,
                time-to-cash, and renewal quality.
              </p>

              <div className="mt-8 grid gap-6 sm:grid-cols-2">
                {METRICS.map((metric) => (
                  <div
                    key={metric.label}
                    className="rounded-[32px] border border-[#E8E6DC] p-6 shadow-[0_18px_40px_rgba(20,20,19,0.10)]"
                    style={{ backgroundColor: BRAND_BEIGE_DARK }}
                  >
                    <div className="text-3xl md:text-4xl font-poppins font-semibold text-[#141413]">
                      {metric.value}
                      <span className="ml-1 text-lg font-normal text-[#524F49]">{metric.suffix}</span>
                    </div>
                    <p className="mt-3 text-sm font-lora text-[#524F49]">{metric.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* CC Split overview card – now built directly off the FundingCard visual language */}
            <div className="mt-4 lg:mt-0">
              <div
                className="rounded-[40px] border border-[rgba(255,255,255,0.7)] p-7 shadow-[0_24px_60px_rgba(20,20,19,0.18),_0_1px_0_rgba(255,255,255,0.85)_inset,_0_-1px_0_rgba(20,20,19,0.08)_inset]"
                style={{ backgroundColor: BRAND_BEIGE_DARK }}
              >
                <div className="mb-5 flex items-center justify-between text-xs font-semibold uppercase tracking-[0.16em] text-[#7B7569]">
                  <span>CC Split overview</span>
                  <span>Sample merchant</span>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-3xl bg-[#FAF9F5] p-4 shadow-[0_14px_32px_rgba(20,20,19,0.10)] border border-[rgba(255,255,255,0.7)]">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#7B7569]">
                      Available funding
                    </p>
                    <p className="mt-2 text-3xl font-poppins font-semibold text-[#141413]">$85,000</p>
                    <p className="mt-2 text-sm font-lora text-[#524F49]">Dynamic, tied to 90-day card volume.</p>
                  </div>
                  <div className="rounded-3xl bg-[#FAF9F5] p-4 shadow-[0_14px_32px_rgba(20,20,19,0.10)] border border-[rgba(255,255,255,0.7)]">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#7B7569]">
                      Current split rate
                    </p>
                    <p className="mt-2 text-3xl font-poppins font-semibold text-[#141413]">9.5%</p>
                    <p className="mt-2 text-sm font-lora text-[#524F49]">Adjusts automatically with performance.</p>
                  </div>
                </div>

                <div className="mt-5 space-y-3">
                  {["Breakfast rush", "Lunch", "Dinner"].map((period, idx) => (
                    <div
                      key={period}
                      className="rounded-3xl bg-[#FAF9F5] px-4 py-3 shadow-[0_12px_28px_rgba(20,20,19,0.10)] border border-[rgba(255,255,255,0.7)]"
                    >
                      <div className="flex items-center justify-between text-xs font-lora text-[#524F49]">
                        <span>{period}</span>
                        <span>{idx === 1 ? "Split remit 9.3%" : "Split remit 9.5%"}</span>
                      </div>
                      <div className="mt-2 h-[6px] rounded-full bg-[#E3DDD0]">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: idx === 0 ? "62%" : idx === 1 ? "86%" : "74%",
                            backgroundColor: BRAND_ORANGE,
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

        {/* REASONS SECTION – operator-focused */}
        <section className="px-6 md:px-10 lg:px-16 py-12 md:py-18">
          <div className="mx-auto max-w-5xl">
            <div className="mb-8 text-left">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#9B8E7A]">
                For your teams
              </p>
              <h2 className="mt-2 text-2xl md:text-3xl font-poppins font-semibold tracking-tight text-[#141413]">
                Built so sales, RevOps, and finance all say yes.
              </h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {REASONS.map((reason, index) => {
                const bgPalette = [BRAND_BEIGE_DARK, BRAND_BLUE, BRAND_GREEN, BRAND_LAVENDER] as const;
                const bg = bgPalette[index % bgPalette.length];

                return (
                  <article
                    key={reason.title}
                    className="rounded-[32px] p-7 shadow-[0_18px_45px_rgba(20,20,19,0.12),_0_1px_0_rgba(255,255,255,0.85)_inset,_0_-1px_0_rgba(20,20,19,0.08)_inset]"
                    style={{ backgroundColor: bg }}
                  >
                    <div
                      className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full"
                      style={{ backgroundColor: BRAND_ORANGE }}
                    >
                      <reason.icon className="h-5 w-5 text-white" />
                    </div>
                    <h3 className="font-poppins text-lg font-semibold text-[#141413]">
                      {reason.title}
                    </h3>
                    <p className="mt-3 text-sm font-lora text-[#141413]">{reason.description}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA – single card, aligned with Payments CTA and without Talk to sales link */}
        <section className="px-6 md:px-10 lg:px-16 pb-16 pt-10 md:pb-24">
          <div
            className="mx-auto max-w-4xl rounded-[40px] border border-[rgba(255,255,255,0.7)] p-8 shadow-[0_24px_60px_rgba(20,20,19,0.18),_0_1px_0_rgba(255,255,255,0.85)_inset,_0_-1px_0_rgba(20,20,19,0.08)_inset]"
            style={{ backgroundColor: BRAND_BEIGE_DARK }}
          >
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#7B7569]">Get started</p>
                <h2 className="font-poppins text-2xl md:text-3xl font-semibold text-[#141413]">
                  See how CC Split fits into your processing portfolio.
                </h2>
                <p className="text-sm sm:text-base font-lora text-[#524F49]">
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


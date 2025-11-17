import { DynamicIslandNav } from "@/components/dynamic-island-nav";
import OrangePushButton from "@/components/OrangePushButton";
import type { LucideIcon } from "lucide-react";
import { ArrowRight, BarChart3, Building2, CheckCircle2, Clock3, CreditCard, LineChart, PieChart, ShieldCheck, Users2 } from "lucide-react";

type IconCard = {
  title: string;
  description: string;
  icon: LucideIcon;
};

const REASSURANCE_PILLS = [
  "Cards",
  "Workflows",
  "Approvals",
  "Flexible billing",
] as const;

const PILL_COLORS = [
  "#FAF9F5", // beige
  "#6A9BCC", // blue
  "#788C5D", // green/teal
  "#C7BFD8", // purple (muted)
];

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
    <main className="relative min-h-screen min-h-[100dvh] min-h-[100svh] bg-[#FAF9F5] font-lora text-[#141413]">
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
              Turn your largest recurring charges into flexible card-based schedules that align cost with value,
              without asking customers to learn new tools or funding products.
            </p>
          </div>

          {/* Pills – follow beige / blue / green / purple rules */}
          <div className="mt-8 flex justify-start">
            <div className="flex flex-wrap gap-2">
              {REASSURANCE_PILLS.map((pill, index) => {
                // 1-2 pills: Beige only
                let bg = PILL_COLORS[0];
                if (REASSURANCE_PILLS.length === 3) {
                  // 3 pills: Beige, Blue, Green
                  bg = [PILL_COLORS[0], PILL_COLORS[1], PILL_COLORS[2]][index] ?? PILL_COLORS[0];
                } else if (REASSURANCE_PILLS.length === 4) {
                  // 4 pills: Beige, Blue, Green, Purple
                  bg = [PILL_COLORS[0], PILL_COLORS[1], PILL_COLORS[2], PILL_COLORS[3]][index] ?? PILL_COLORS[0];
                } else if (REASSURANCE_PILLS.length >= 5) {
                  // 5+: Beige, Blue, Green, Purple, Beige, then cycle
                  const basePattern = [
                    PILL_COLORS[0],
                    PILL_COLORS[1],
                    PILL_COLORS[2],
                    PILL_COLORS[3],
                    PILL_COLORS[0],
                  ];
                  bg = basePattern[index % basePattern.length];
                }

                const isBeige = bg === PILL_COLORS[0];
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

        {/* VALUE PROPS – standalone cards, free-floating */}
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
              {HERO_HIGHLIGHTS.map((card) => (
                <article
                  key={card.title}
                  className="flex flex-col rounded-[30px] bg-[#FAF9F5] p-6 shadow-[0_18px_40px_rgba(20,20,19,0.08)] border border-[#E8E6DC]"
                >
                  <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-[#141413] text-[#FAF9F5]">
                    <card.icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <h3 className="font-poppins text-base md:text-lg font-semibold text-[#141413]">
                    {card.title}
                  </h3>
                  <p className="mt-2 text-sm font-lora text-[#524F49]">{card.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* METRICS SECTION */}
        <section className="px-6 md:px-10 lg:px-16 py-12 md:py-20">
          <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#9B8E7A]">
                Proof in the numbers
              </p>
              <h2 className="mt-2 text-2xl md:text-3xl font-poppins font-semibold tracking-tight text-[#141413]">
                Repayments that move with sales, not against cash flow.
              </h2>
              <p className="mt-4 text-sm sm:text-base md:text-lg font-lora text-[#524F49]">
                CC Split turns one-off payment plans into a repeatable program that steadily improves close rates, cash
                predictability, and renewals.
              </p>

              <div className="mt-8 grid gap-6 sm:grid-cols-2">
                {METRICS.map((metric) => (
                  <div
                    key={metric.label}
                    className="rounded-[30px] border border-[#E8E6DC] bg-[#FAF9F5] p-6 shadow-[0_14px_32px_rgba(20,20,19,0.06)]"
                  >
                    <div className="text-3xl md:text-4xl font-poppins font-semibold text-[#141413]">
                      {metric.value}
                      <span className="ml-1 text-lg font-normal text-[#524F49]">{metric.suffix}</span>
                    </div>
                    <p className="mt-2 text-sm font-lora text-[#524F49]">{metric.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Simple operational view card */}
            <div className="mt-4 lg:mt-0">
              <div className="rounded-[30px] border border-[#E8E6DC] bg-[#FAF9F5] p-6 shadow-[0_22px_46px_rgba(20,20,19,0.08)]">
                <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.16em] text-[#9B8E7A]">
                  <span>CC Split overview</span>
                  <span>Sample merchant</span>
                </div>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl bg-[#FFFFFF] p-4 border border-[#E8E6DC]">
                    <p className="text-xs uppercase tracking-[0.16em] text-[#9B8E7A]">Available funding</p>
                    <p className="mt-2 text-2xl font-poppins font-semibold text-[#141413]">$85,000</p>
                    <p className="mt-1 text-xs font-lora text-[#524F49]">Dynamic, tied to 90-day card volume.</p>
                  </div>
                  <div className="rounded-2xl bg-[#FFFFFF] p-4 border border-[#E8E6DC]">
                    <p className="text-xs uppercase tracking-[0.16em] text-[#9B8E7A]">Current split rate</p>
                    <p className="mt-2 text-2xl font-poppins font-semibold text-[#141413]">9.5%</p>
                    <p className="mt-1 text-xs font-lora text-[#524F49]">Adjusts automatically with performance.</p>
                  </div>
                </div>
                <div className="mt-4 space-y-3">
                  {["Breakfast rush", "Lunch", "Dinner"].map((period, idx) => (
                    <div key={period} className="rounded-2xl border border-[#E8E6DC] bg-[#FAF9F5] p-3">
                      <div className="flex items-center justify-between text-xs font-lora text-[#524F49]">
                        <span>{period}</span>
                        <span>{idx === 1 ? "Split remit 9.3%" : "Split remit 9.5%"}</span>
                      </div>
                      <div className="mt-2 h-1.5 rounded-full bg-[#E8E6DC]">
                        <div
                          className="h-full rounded-full bg-[#D97757]"
                          style={{ width: idx === 0 ? "64%" : idx === 1 ? "84%" : "72%" }}
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
            <div className="text-left mb-8">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#9B8E7A]">
                For your teams
              </p>
              <h2 className="mt-2 text-2xl md:text-3xl font-poppins font-semibold tracking-tight text-[#141413]">
                Built so sales, RevOps, and finance all say yes.
              </h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {REASONS.map((reason) => (
                <article
                  key={reason.title}
                  className="rounded-[30px] bg-[#FAF9F5] border border-[#E8E6DC] p-6 shadow-[0_16px_36px_rgba(20,20,19,0.06)]"
                >
                  <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#FAF9F5] ring-1 ring-[#E8E6DC]">
                    <reason.icon className="h-5 w-5 text-[#141413]" />
                  </div>
                  <h3 className="font-poppins text-base md:text-lg font-semibold text-[#141413]">
                    {reason.title}
                  </h3>
                  <p className="mt-2 text-sm font-lora text-[#524F49]">{reason.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* CTA – no dark band, just a strong card */}
        <section className="px-6 md:px-10 lg:px-16 pb-16 pt-10 md:pb-24">
          <div className="mx-auto max-w-4xl rounded-[30px] bg-[#FAF9F5] border border-[#E8E6DC] p-8 shadow-[0_22px_46px_rgba(20,20,19,0.08)]">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#9B8E7A]">Get started</p>
                <h2 className="font-poppins text-2xl md:text-3xl font-semibold text-[#141413]">
                  See how CC Split fits into your processing portfolio.
                </h2>
                <p className="text-sm sm:text-base font-lora text-[#524F49]">
                  Share a bit about your merchant mix and card volume. We&apos;ll map a CC Split program to your existing rails
                  and send a live preview.
                </p>
              </div>
              <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center">
                <OrangePushButton>Schedule a walkthrough</OrangePushButton>
                <button className="inline-flex items-center text-sm font-semibold text-[#524F49] hover:text-[#D97757]">
                  Talk to sales
                  <ArrowRight className="ml-2 h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}


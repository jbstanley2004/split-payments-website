import { BarChart3, CheckCircle2, CreditCard, ShieldCheck } from "lucide-react";
import Image from "next/image";

const OPERATOR_FEATURES = [
  {
    title: "Lift conversion on large invoices",
    description: "Let customers split bigger card payments while you keep clean, predictable cash flow on your side.",
    icon: CreditCard,
  },
  {
    title: "Reduce approval drag",
    description: "Turn multi-step signoffs into a single, card-based flow that feels familiar to every buyer.",
    icon: CheckCircle2,
  },
  {
    title: "Align cost with value delivered",
    description: "Structure splits around milestones or usage so customers only pay as they see value.",
    icon: BarChart3,
  },
  {
    title: "Keep finance confident",
    description: "We handle orchestration, reconciliation, and risk while your team keeps existing processes.",
    icon: ShieldCheck,
  },
];

const METRICS = [
  { label: "Increase in upmarket close rate", value: "+18%" },
  { label: "Reduction in invoice churn", value: "-24%" },
  { label: "Time-to-cash from swipe", value: "≤ 2 days" },
  { label: "NPS lift for funded merchants", value: "+12 pts" },
];


export default function CCSplitPage() {
  return (
    <main>
      {/* HERO */}
      <section className="py-24 text-left">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl">
            <h1 className="text-5xl md:text-6xl font-semibold">
              Split large card payments without changing how customers pay.
            </h1>
            <p className="mt-4 text-lg text-[var(--text-body)]">
              Offer flexible schedules on your terms while customers keep using the cards, workflows, and approvals they already trust.
            </p>
          </div>
        </div>
      </section>

      {/* "Designed for operators..." */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-semibold">Designed for operators, not just cardholders.</h2>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-4">
            {OPERATOR_FEATURES.map((feature) => (
              <div key={feature.title} className="notion-card text-left">
                <feature.icon className="h-6 w-6 mb-4 text-[var(--text-main)]" />
                <h3 className="text-xl font-semibold">{feature.title}</h3>
                <p className="mt-2 text-[var(--text-body)]">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Illustrative Metrics */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-semibold">The dashboard tells the story.</h2>
              <p className="mt-4 text-lg text-[var(--text-body)]">
                Our unified dashboard gives you a real-time view of how CC Split is impacting your key business metrics.
              </p>
              <div className="mt-8 grid grid-cols-2 gap-8">
                {METRICS.map((metric) => (
                  <div key={metric.label} className="notion-card">
                    <p className="font-serif text-5xl font-bold">{metric.value}</p>
                    <p className="mt-2 font-sans text-sm text-[var(--text-muted)]">{metric.label}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="border border-[var(--border-subtle)] rounded-[var(--radius-block)] p-8">
              <h3 className="font-serif text-xl font-semibold">Daily Volume Comparison</h3>
              <div className="mt-6 space-y-4">
                <div>
                  <div className="flex justify-between font-sans text-sm text-[var(--text-muted)]">
                    <span>Breakfast</span>
                    <span>$1,200</span>
                  </div>
                  <div className="mt-1 bg-[var(--border-subtle)] h-4 rounded">
                    <div className="bg-black h-4 rounded" style={{ width: "60%" }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between font-sans text-sm text-[var(--text-muted)]">
                    <span>Lunch</span>
                    <span>$2,300</span>
                  </div>
                  <div className="mt-1 bg-[var(--border-subtle)] h-4 rounded">
                    <div className="bg-black h-4 rounded" style={{ width: "85%" }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between font-sans text-sm text-[var(--text-muted)]">
                    <span>Dinner</span>
                    <span>$1,800</span>
                  </div>
                  <div className="mt-1 bg-[var(--border-subtle)] h-4 rounded">
                    <div className="bg-black h-4 rounded" style={{ width: "75%" }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

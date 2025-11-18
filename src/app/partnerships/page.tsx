import { Handshake, BarChart3, Layers, LineChart, ShieldCheck, Headphones, Sparkles } from "lucide-react";
import Image from "next/image";

const partnerLogos = [
    { name: "First Data", src: "/payment_types/first-data.svg" },
    { name: "Worldpay", src: "/payment_types/worldpay.svg" },
    { name: "Clover", src: "/payment_types/clover.svg" },
    { name: "Square", src: "/payment_types/square.svg" },
];

const partnershipSteps = [
    {
        title: "Scope the portfolio",
        description: "Share current card volume and industry mix for the merchants you want to fund.",
    },
    {
        title: "Co-sell with Split",
        description: "Invite our partner desk into calls or drop in a white-labeled deck.",
    },
    {
        title: "Share in the yield",
        description: "Revenue share drops every month you stay on the account.",
    },
];

const partnerTools = [
    {
        title: "Revenue simulations",
        description: "Model cost of capital vs. processor incentives in a single worksheet.",
        icon: LineChart,
    },
    {
        title: "Compliance guardrails",
        description: "Every deck, disclosure, and email template is pre-cleared.",
        icon: ShieldCheck,
    },
    {
        title: "Partner concierge",
        description: "Dedicated Slack channel + standing pipeline reviews.",
        icon: Headphones,
    },
    {
        title: "Automated renewals",
        description: "Smart reminders when merchants are halfway through repayment.",
        icon: Sparkles,
    },
]

export default function PartnershipsPage() {
  return (
    <main>
      {/* HERO */}
      <section className="py-24 text-left">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl">
            <h1 className="text-5xl md:text-6xl font-semibold">
              Partnerships built on processing performance.
            </h1>
            <p className="mt-4 text-lg text-[var(--text-body)]">
              Equip your ISO, agent, or referral team with funding that mirrors every card swipe.
            </p>
          </div>
        </div>
      </section>

      {/* LOGOS */}
      <section className="py-16">
        <div className="container mx-auto px-6">
            <h2 className="text-center text-sm font-sans uppercase tracking-widest text-[var(--text-muted)] mb-8">Trusted by industry leaders</h2>
          <div className="grid grid-cols-4 gap-8">
            {partnerLogos.map((logo) => (
              <div key={logo.name} className="flex justify-center items-center">
                <Image
                  src={logo.src}
                  alt={logo.name}
                  width={120}
                  height={48}
                  className="partner-logo"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* "How the partnership works" */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-semibold">How the partnership works</h2>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {partnershipSteps.map((step, index) => (
              <div key={step.title} className="notion-card text-left relative">
                <div className="absolute top-4 right-4 font-mono text-xs text-[var(--text-muted)]">0{index + 1}</div>
                <h3 className="text-xl font-semibold">{step.title}</h3>
                <p className="mt-2 text-[var(--text-body)]">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* "Tools that keep partners in motion" */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-semibold">Tools that keep partners in motion</h2>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {partnerTools.map((tool) => (
                <div key={tool.title} className="notion-card text-left">
                    <tool.icon className="h-6 w-6 mb-4 text-[var(--text-main)]" />
                    <h3 className="text-xl font-semibold">{tool.title}</h3>
                    <p className="mt-2 text-[var(--text-body)]">{tool.description}</p>
                </div>
            ))}
          </div>
        </div>
      </section>

      {/* QUOTE BLOCK */}
      <section className="py-20">
        <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center">
                <p className="font-serif text-3xl md:text-4xl">
                    “Split has been a game-changer for our ISO. The ability to offer funding directly tied to payment processing has unlocked a new level of value for our merchants.”
                </p>
                <div className="mt-8 flex items-center justify-center">
                    <Image src="/placeholder.png" alt="Jane Doe" width={48} height={48} className="rounded-full" />
                    <div className="ml-4 text-left">
                        <p className="font-sans font-semibold">Jane Doe</p>
                        <p className="font-sans text-sm text-[var(--text-muted)]">CEO, Partner ISO</p>
                    </div>
                </div>
            </div>
        </div>
      </section>
    </main>
  );
}

import { DynamicIslandNav } from "@/components/dynamic-island-nav";
import { PageBackdrop } from "@/components/page-backdrop";
import { CreditCard, Check, Laptop } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";

type PaymentSolution = {
  title: string;
  description: string;
  icon: LucideIcon;
};

const SOLUTIONS: PaymentSolution[] = [
  {
    title: "Credit Card Acceptance",
    description:
      "Accept payments anywhere with next-gen processing that's secure, transparent, and built to scale with your business.",
    icon: CreditCard,
  },
  {
    title: "Check Processing",
    description:
      "Modernize your check acceptance with automated verification, faster deposits, and lower transaction costs.",
    icon: Check,
  },
  {
    title: "Point of Sale (POS) systems",
    description:
      "Power your business with flexible POS systems — tailored for retail, restaurants, and service providers, in-store or on-the-go.",
    icon: Laptop,
  },
];

// Map solution cards into the shared card variants from the new brand system.
const SOLUTION_CARD_VARIANTS = [
  "card card--neutral", // Credit Card Acceptance
  "card card--blue",    // Check Processing
  "card card--sage",    // POS systems
];

const SUMMARY_ITEMS = ["Cards", "ACH", "Terminals", "POS", "Online"];

export default function PaymentsPage() {
  return (
    <main className="relative min-h-screen min-h-[100dvh] min-h-[100svh] font-lora text-text bg-[color:var(--bg-page)]">
      {/* Shared backdrop image, same treatment as other editorial pages */}
      <PageBackdrop priority />

      <div className="relative z-10">
        <DynamicIslandNav />

        {/* HERO – copy sits directly on the warm neutral background */}
        <section className="px-6 md:px-10 lg:px-16 pt-24 sm:pt-28 md:pt-32 pb-10 md:pb-12">
          <div className="mx-auto max-w-4xl text-left">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-[color:var(--text-subtle)]">
              Payments
            </p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-poppins font-semibold tracking-tight text-[color:var(--text-main)]">
              Smarter payments. Stronger cash flow.
            </h1>
            <p className="mt-4 text-sm sm:text-base md:text-lg font-lora text-[color:var(--text-subtle)] max-w-3xl">
              Simplify every transaction — from cards to ACH — while unlocking
              funding that moves at the speed of your business. Split unites
              payment processing, merchant services, and split-funding into one
              seamless experience so your cash flow stays strong and predictable.
            </p>
          </div>

          {/* Summary chips: Cards / ACH / Terminals / POS / Online */}
          <div className="mt-8 flex justify-start">
            <div className="flex flex-wrap gap-2">
              {SUMMARY_ITEMS.map((item) => {
                let chipClass = "chip chip--neutral";
                if (item === "ACH") chipClass = "chip chip--blue";
                if (item === "Terminals") chipClass = "chip chip--sage";
                if (item === "Online") chipClass = "chip chip--rose";

                return (
                  <span key={item} className={chipClass}>
                    <span className="dot" />
                    <span className="tracking-[0.16em] uppercase text-[11px] font-medium">{item}</span>
                  </span>
                );
              })}
            </div>
          </div>
        </section>

        {/* COVERAGE + SOLUTIONS GRID – floating cards only */}
        <section className="px-6 md:px-10 lg:px-16 py-12 md:py-20">
          <div className="mx-auto max-w-5xl">
            <div className="text-left">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[color:var(--text-subtle)]">
                Coverage
              </p>
              <h2 className="mt-2 text-2xl md:text-3xl font-poppins font-semibold tracking-tight text-[color:var(--text-main)]">
                Built for every way you accept payments.
              </h2>
              <p className="mt-3 text-sm sm:text-base md:text-lg font-lora text-[color:var(--text-subtle)] max-w-3xl">
                From in-person swipes to online checkouts, Split brings cards,
                ACH, terminals, and POS together under one transparent platform
                so you don&apos;t have to stitch together multiple providers.
              </p>
            </div>

            <div className="mx-auto mt-10 grid max-w-5xl gap-6 md:grid-cols-3">
              {SOLUTIONS.map((solution, index) => {
                const variantClass =
                  SOLUTION_CARD_VARIANTS[index] ||
                  SOLUTION_CARD_VARIANTS[SOLUTION_CARD_VARIANTS.length - 1];

                return (
                  <article
                    key={solution.title}
                    className={`${variantClass} flex flex-col text-left`}
                  >
                    <div className="mb-3 flex items-center gap-3">
                      <div className="card__icon">
                        <solution.icon className="h-4 w-4" aria-hidden="true" />
                      </div>
                      <h3 className="font-poppins text-base md:text-lg font-semibold text-[color:var(--text-main)]">
                        {solution.title}
                      </h3>
                    </div>
                    <p className="mt-1 text-sm font-lora text-[color:var(--text-main)]">
                      {solution.description}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* REASSURANCE STRIP – text only, no section card */}
        <section className="px-6 md:px-10 lg:px-16 py-10">
          <div className="mx-auto flex max-w-5xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="space-y-1 text-left">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[color:var(--text-subtle)]">
                Why merchants switch to Split
              </p>
              <p className="max-w-xl text-sm md:text-base font-lora text-[color:var(--text-subtle)]">
                We combine payment processing and funding so you get one
                relationship for your card volume and your working capital.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3 text-xs md:text-sm text-[color:var(--text-subtle)]">
              <div className="chip chip--neutral">
                <span className="dot" />
                <span>Simple, transparent pricing</span>
              </div>
              <div className="chip chip--neutral">
                <span className="dot" />
                <span>Funding-ready payment rails</span>
              </div>
            </div>
          </div>
        </section>

        {/* CTA SECTION – containerless copy + CTA */}
        <section className="px-6 md:px-10 lg:px-16 py-16 md:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-2xl md:text-3xl font-poppins font-semibold tracking-tight text-[color:var(--text-main)]">
              See how Split can improve your processing.
            </h2>
            <p className="mt-4 text-sm sm:text-base md:text-lg font-lora text-[color:var(--text-subtle)]">
              Share a recent statement and we&apos;ll review your current setup,
              uncover potential savings, and show how funding and payments work
              together in one platform.
            </p>
            <div className="mt-8 flex justify-center">
              <Link href="/get-started">
                <button className="btn-primary">
                  <span className="dot" />
                  <span>Start my cost review</span>
                </button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

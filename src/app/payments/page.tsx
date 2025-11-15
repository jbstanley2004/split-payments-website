"use client";

import { DynamicIslandNav } from "@/components/dynamic-island-nav";
import OrangePushButton from "@/components/OrangePushButton";
import { CreditCard, Check, Laptop } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

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

export default function PaymentsPage() {
  return (
    <main className="relative min-h-screen min-h-[100dvh] font-lora text-text bg-[#FAF9F5]">
      {/* Shared hero background image, same as homepage */}
      <div className="fixed inset-0 z-0 w-full h-full min-h-screen min-h-[100dvh]">
        <Image
          src="/hero_image_formatted.png"
          alt="Soft illustrated landscape background"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/20" />
      </div>

      <div className="relative z-10 px-3 pb-6 pt-4 sm:px-4 sm:pb-8 sm:pt-6 md:px-6 md:pb-10 md:pt-8">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-[36px] bg-[#FAF9F5] shadow-[0_30px_80px_rgba(20,20,19,0.18)] ring-1 ring-[#E8E6DC]">
          <DynamicIslandNav showHomeLogoOnMobile />

          {/* HERO */}
          <section className="px-6 md:px-10 lg:px-16 pt-28 md:pt-32 pb-10 md:pb-12 border-b border-[#E8E6DC]">
            <div className="mx-auto max-w-4xl text-center">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#9B8E7A]">
                Payments
              </p>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-poppins font-semibold tracking-tight text-[#141413]">
                Smarter payments. Stronger cash flow.
              </h1>
              <p className="mt-4 text-sm sm:text-base md:text-lg font-lora text-[#524F49] max-w-3xl mx-auto">
                Simplify every transaction — from cards to ACH — while unlocking funding that moves at the speed of your business.
                Split unites payment processing, merchant services, and split-funding into one seamless experience so your cash flow
                stays strong and predictable.
              </p>
            </div>

            {/* Summary bar */}
            <div className="mt-8 flex justify-center">
              <div className="inline-flex flex-wrap items-center justify-center gap-x-4 gap-y-2 rounded-full border border-[#E8E6DC] bg-white/80 px-4 py-2 text-[11px] font-medium tracking-[0.16em] uppercase text-[#7B7569]">
                <span>Cards</span>
                <span className="h-1 w-1 rounded-full bg-[#D0C7B8]" />
                <span>ACH</span>
                <span className="h-1 w-1 rounded-full bg-[#D0C7B8]" />
                <span>Terminals</span>
                <span className="h-1 w-1 rounded-full bg-[#D0C7B8]" />
                <span>POS</span>
                <span className="h-1 w-1 rounded-full bg-[#D0C7B8]" />
                <span>Online</span>
              </div>
            </div>
          </section>

          {/* COVERAGE + SOLUTIONS GRID */}
          <section className="px-6 md:px-10 lg:px-16 py-12 md:py-20 border-b border-[#E8E6DC]">
            <div className="mx-auto max-w-5xl">
              <div className="text-left md:text-center">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#9B8E7A]">
                  Coverage
                </p>
                <h2 className="mt-2 text-2xl md:text-3xl font-poppins font-semibold tracking-tight text-[#141413]">
                  Built for every way you accept payments.
                </h2>
                <p className="mt-3 text-sm sm:text-base md:text-lg font-lora text-[#524F49] max-w-3xl md:mx-auto">
                  From in-person swipes to online checkouts, Split brings cards, ACH, terminals, and POS together under one
                  transparent platform so you don&apos;t have to stitch together multiple providers.
                </p>
              </div>

              <div className="mx-auto mt-10 grid max-w-5xl gap-6 md:grid-cols-3">
                {SOLUTIONS.map((solution) => (
                  <article
                    key={solution.title}
                    className="flex flex-col rounded-3xl border border-[#E8E6DC] bg-white/80 p-6 text-left shadow-sm"
                  >
                    <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#141413] text-[#FAF9F5]">
                      <solution.icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <h3 className="font-poppins text-base md:text-lg font-semibold text-[#141413]">
                      {solution.title}
                    </h3>
                    <p className="mt-3 text-sm font-lora text-[#524F49]">{solution.description}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* REASSURANCE STRIP */}
          <section className="px-6 md:px-10 lg:px-16 py-10 border-b border-[#E8E6DC] bg-[#FAF9F5]">
            <div className="mx-auto flex max-w-5xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="space-y-1">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#9B8E7A]">
                  Why merchants switch to Split
                </p>
                <p className="max-w-xl text-sm md:text-base font-lora text-[#524F49]">
                  We combine payment processing and funding so you get one relationship for your card volume and your working capital.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3 text-xs md:text-sm text-[#524F49]">
                <div className="inline-flex items-center gap-2 rounded-full bg-[#f0ebe2] px-3 py-1">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#D97757]" />
                  <span>Simple, transparent pricing</span>
                </div>
                <div className="inline-flex items-center gap-2 rounded-full bg-[#f0ebe2] px-3 py-1">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#D97757]" />
                  <span>Funding-ready payment rails</span>
                </div>
              </div>
            </div>
          </section>

          {/* CTA SECTION */}
          <section className="px-6 md:px-10 lg:px-16 py-16 md:py-20 bg-[#FAF9F5]">
            <div className="mx-auto max-w-3xl rounded-3xl border border-[#E8E6DC] bg-white/80 px-6 py-10 md:px-10 md:py-12 text-center shadow-sm">
              <h2 className="text-2xl md:text-3xl font-poppins font-semibold tracking-tight text-[#141413]">
                See how Split can improve your processing.
              </h2>
              <p className="mt-4 text-sm sm:text-base md:text-lg font-lora text-[#524F49]">
                Share a recent statement and we&apos;ll review your current setup, uncover potential savings, and show how funding and
                payments work together in one platform.
              </p>
              <div className="mt-8 flex justify-center">
                <Link href="/get-started">
                  <OrangePushButton>Start my cost review</OrangePushButton>
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

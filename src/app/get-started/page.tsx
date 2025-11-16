"use client";

import { DynamicIslandNav } from "@/components/dynamic-island-nav";
import Link from "next/link";
import OrangePushButton from "@/components/OrangePushButton";
import Image from "next/image";

export default function GetStarted() {
  return (
    <main className="relative min-h-screen min-h-[100dvh] min-h-[100svh] bg-[#FAF9F5] text-[#141413] font-lora">
      {/* Shared hero background image, same as other pages */}
      <div className="fixed inset-0 z-0 w-full h-full min-h-screen min-h-[100dvh] min-h-[100svh]">
        <Image
          src="/hero_image_formatted.png"
          alt="Soft illustrated landscape background"
          fill
          className="object-cover object-center md:object-center"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/20" />
      </div>

      <div className="relative z-10 px-3 pb-6 pt-4 sm:px-4 sm:pb-8 sm:pt-6 md:px-6 md:pb-10 md:pt-8 min-h-screen min-h-[100dvh] min-h-[100svh]">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-[36px] bg-[#FAF9F5] shadow-[0_30px_80px_rgba(20,20,19,0.18)] ring-1 ring-[#E8E6DC]">
          <DynamicIslandNav />

          <section className="px-6 md:px-10 lg:px-16 pt-24 md:pt-28 pb-20 max-w-6xl mx-auto">
            {/* Header */}
            <header className="max-w-3xl mb-10">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#9B8E7A]">
                Get started
              </p>
              <h1 className="text-3xl md:text-4xl lg:text-[2.6rem] font-poppins font-semibold tracking-tight text-[#141413]">
                Get a funding estimate in a few minutes.
              </h1>
              <p className="mt-4 text-sm sm:text-base md:text-lg text-[#524F49]">
                Tell us about your card sales and we&apos;ll share your pre-approved funding options.
                No hard credit checks. No personal guarantees.
              </p>
            </header>

            <div className="grid gap-10 lg:grid-cols-[minmax(0,1.7fr)_minmax(0,1.1fr)] items-start">
              {/* Form card */}
              <div className="rounded-3xl bg-[#E8E6DC] shadow-[0_18px_45px_rgba(20,20,19,0.06)] border border-[#E5DFD0] px-6 py-7 md:px-8 md:py-8">
                <form className="space-y-8">
                  {/* Business section */}
                  <div>
                    <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#9B8E7A]">
                      Business details
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="md:col-span-2 flex flex-col gap-1.5">
                        <label htmlFor="biz" className="text-xs font-semibold tracking-wide text-[#3F3A32]">
                          Business name
                        </label>
                        <input
                          id="biz"
                          name="biz"
                          className="rounded-xl border border-[#E5DFD0] bg-white px-3.5 py-2.5 text-sm text-[#141413] outline-none focus:border-[#D97757] focus:ring-0 shadow-[0_0_0_1px_rgba(217,119,87,0.08)] focus:shadow-[0_0_0_1px_rgba(217,119,87,0.25)] transition-all"
                          placeholder="Acme Coffee LLC"
                        />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="industry" className="text-xs font-semibold tracking-wide text-[#3F3A32]">
                          Industry
                        </label>
                        <select
                          id="industry"
                          name="industry"
                          className="rounded-xl border border-[#E5DFD0] bg-white px-3.5 py-2.5 text-sm text-[#141413] outline-none focus:border-[#D97757] focus:shadow-[0_0_0_1px_rgba(217,119,87,0.25)] transition-all"
                          defaultValue=""
                        >
                          <option value="" disabled>Choose industry</option>
                          <option>Restaurant / QSR</option>
                          <option>Retail</option>
                          <option>Salon / Spa</option>
                          <option>Auto services</option>
                          <option>Hospitality</option>
                          <option>Other</option>
                        </select>
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="months" className="text-xs font-semibold tracking-wide text-[#3F3A32]">
                          Months in business
                        </label>
                        <input
                          id="months"
                          name="months"
                          type="number"
                          className="rounded-xl border border-[#E5DFD0] bg-white px-3.5 py-2.5 text-sm text-[#141413] outline-none focus:border-[#D97757] focus:shadow-[0_0_0_1px_rgba(217,119,87,0.25)] transition-all"
                          placeholder="24"
                        />
                      </div>

                      <div className="md:col-span-2 flex flex-col gap-1.5">
                        <label htmlFor="website" className="text-xs font-semibold tracking-wide text-[#3F3A32]">
                          Website or Instagram (optional)
                        </label>
                        <input
                          id="website"
                          name="website"
                          className="rounded-xl border border-[#E5DFD0] bg-white px-3.5 py-2.5 text-sm text-[#141413] outline-none focus:border-[#D97757] focus:shadow-[0_0_0_1px_rgba(217,119,87,0.25)] transition-all"
                          placeholder="yourbrand.com or @yourbrand"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Volume section */}
                  <div>
                    <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#9B8E7A]">
                      Card volume
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="sales" className="text-xs font-semibold tracking-wide text-[#3F3A32]">
                          Avg. monthly card sales (USD)
                        </label>
                        <input
                          id="sales"
                          name="sales"
                          type="number"
                          className="rounded-xl border border-[#E5DFD0] bg-white px-3.5 py-2.5 text-sm text-[#141413] outline-none focus:border-[#D97757] focus:shadow-[0_0_0_1px_rgba(217,119,87,0.25)] transition-all"
                          placeholder="50000"
                        />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="avgTicket" className="text-xs font-semibold tracking-wide text-[#3F3A32]">
                          Average ticket size (optional)
                        </label>
                        <input
                          id="avgTicket"
                          name="avgTicket"
                          type="number"
                          className="rounded-xl border border-[#E5DFD0] bg-white px-3.5 py-2.5 text-sm text-[#141413] outline-none focus:border-[#D97757] focus:shadow-[0_0_0_1px_rgba(217,119,87,0.25)] transition-all"
                          placeholder="75"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Contact section */}
                  <div>
                    <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#9B8E7A]">
                      Contact info
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="firstName" className="text-xs font-semibold tracking-wide text-[#3F3A32]">
                          First name
                        </label>
                        <input
                          id="firstName"
                          name="firstName"
                          className="rounded-xl border border-[#E5DFD0] bg-white px-3.5 py-2.5 text-sm text-[#141413] outline-none focus:border-[#D97757] focus:shadow-[0_0_0_1px_rgba(217,119,87,0.25)] transition-all"
                          placeholder="Taylor"
                        />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="lastName" className="text-xs font-semibold tracking-wide text-[#3F3A32]">
                          Last name
                        </label>
                        <input
                          id="lastName"
                          name="lastName"
                          className="rounded-xl border border-[#E5DFD0] bg-white px-3.5 py-2.5 text-sm text-[#141413] outline-none focus:border-[#D97757] focus:shadow-[0_0_0_1px_rgba(217,119,87,0.25)] transition-all"
                          placeholder="Jordan"
                        />
                      </div>

                      <div className="md:col-span-2 flex flex-col gap-1.5">
                        <label htmlFor="email" className="text-xs font-semibold tracking-wide text-[#3F3A32]">
                          Work email
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          className="rounded-xl border border-[#E5DFD0] bg-white px-3.5 py-2.5 text-sm text-[#141413] outline-none focus:border-[#D97757] focus:shadow-[0_0_0_1px_rgba(217,119,87,0.25)] transition-all"
                          placeholder="you@company.com"
                        />
                      </div>

                      <div className="md:col-span-2 flex flex-col gap-1.5">
                        <label htmlFor="phone" className="text-xs font-semibold tracking-wide text-[#3F3A32]">
                          Mobile number (optional)
                        </label>
                        <input
                          id="phone"
                          name="phone"
                          type="tel"
                          className="rounded-xl border border-[#E5DFD0] bg-white px-3.5 py-2.5 text-sm text-[#141413] outline-none focus:border-[#D97757] focus:shadow-[0_0_0_1px_rgba(217,119,87,0.25)] transition-all"
                          placeholder="(555) 555-5555"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Consent + CTA */}
                  <div className="mt-2 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div className="flex items-start gap-2 text-[11px] text-[#524F49]">
                      <input
                        id="agree"
                        type="checkbox"
                        className="mt-0.5 accent-[#141413]"
                      />
                      <label htmlFor="agree" className="leading-snug">
                        I agree that Split may contact me about funding and payment products.
                      </label>
                    </div>

                    <div className="mt-2 md:mt-0">
                      <OrangePushButton>See my options</OrangePushButton>
                    </div>
                  </div>

                  <p className="mt-3 text-[11px] text-[#7B7569]">
                    No hard credit checks. This won&apos;t affect your credit score.
                  </p>
                </form>
              </div>

              {/* What happens next card */}
              <aside className="rounded-3xl bg-[#FAF9F5] border border-[#E5DFD0] px-5 py-6 shadow-[0_14px_32px_rgba(20,20,19,0.06)]">
                <h2 className="text-lg font-poppins font-semibold text-[#141413]">
                  What happens next
                </h2>
                <p className="mt-2 text-sm text-[#524F49]">
                  We use your card processing performance to size your funding, not your personal credit.
                </p>

                <ol className="mt-4 space-y-4 text-sm text-[#3F3A32]">
                  <li className="flex gap-3">
                    <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#E8E0D4] text-[11px] font-semibold text-[#141413]">
                      1
                    </span>
                    <span>We review your recent card sales and processing history.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#E8E0D4] text-[11px] font-semibold text-[#141413]">
                      2
                    </span>
                    <span>We share funding options matched to your volume and seasonality.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#E8E0D4] text-[11px] font-semibold text-[#141413]">
                      3
                    </span>
                    <span>You choose how much to draw and when to access additional rounds.</span>
                  </li>
                </ol>

                <p className="mt-5 text-xs text-[#7B7569]">
                  Prefer to talk to a person? Email us at
                  <Link href="mailto:hello@splitpayments.com" className="ml-1 underline underline-offset-2">
                    hello@splitpayments.com
                  </Link>
                  .
                </p>
              </aside>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

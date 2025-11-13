"use client";

import Link from "next/link";
import OrangePushButton from "@/components/OrangePushButton";

export default function GetStartedSection() {
  return (
    <section
      id="get-started"
      className="bg-[#FAF9F5] py-16 md:py-24 px-6 md:px-10 lg:px-16"
    >
      <div className="mx-auto max-w-6xl grid gap-10 lg:grid-cols-[minmax(0,1.7fr)_minmax(0,1.1fr)] items-start">
        {/* Copy + inline form (lightweight) */}
        <div className="max-w-xl">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#9B8E7A]">
            Get started
          </p>
          <h2 className="text-3xl md:text-4xl font-poppins font-semibold tracking-tight text-[#141413]">
            Start your funding conversation.
          </h2>
          <p className="mt-4 text-sm sm:text-base md:text-lg font-lora text-[#524F49]">
            Share a few details about your business and card volume. We&apos;ll follow up with pre-approved options based on your processing history.
          </p>

          <form className="mt-8 space-y-4 max-w-md">
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="inline-biz"
                className="text-xs font-semibold tracking-wide text-[#3F3A32]"
              >
                Business name
              </label>
              <input
                id="inline-biz"
                name="inline-biz"
                className="rounded-xl border border-[#E5DFD0] bg-white px-3 py-2.5 text-sm text-[#141413] outline-none focus:border-[#D97757] focus:shadow-[0_0_0_1px_rgba(217,119,87,0.22)] transition-all"
                placeholder="Acme Coffee LLC"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="inline-sales"
                className="text-xs font-semibold tracking-wide text-[#3F3A32]"
              >
                Avg. monthly card sales (USD)
              </label>
              <input
                id="inline-sales"
                name="inline-sales"
                type="number"
                className="rounded-xl border border-[#E5DFD0] bg-white px-3 py-2.5 text-sm text-[#141413] outline-none focus:border-[#D97757] focus:shadow-[0_0_0_1px_rgba(217,119,87,0.22)] transition-all"
                placeholder="50000"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="inline-email"
                className="text-xs font-semibold tracking-wide text-[#3F3A32]"
              >
                Work email
              </label>
              <input
                id="inline-email"
                name="inline-email"
                type="email"
                className="rounded-xl border border-[#E5DFD0] bg-white px-3 py-2.5 text-sm text-[#141413] outline-none focus:border-[#D97757] focus:shadow-[0_0_0_1px_rgba(217,119,87,0.22)] transition-all"
                placeholder="you@company.com"
              />
            </div>

            <div className="flex items-start gap-2 text-[11px] text-[#524F49]">
              <input
                id="inline-agree"
                type="checkbox"
                className="mt-0.5 accent-[#141413]"
              />
              <label htmlFor="inline-agree" className="leading-snug">
                I agree that Split may contact me about funding and payment products.
              </label>
            </div>

            <div className="pt-2">
              <OrangePushButton>See my options</OrangePushButton>
            </div>

            <p className="mt-2 text-[11px] text-[#7B7569]">
              No hard credit checks. This won&apos;t affect your credit score.
            </p>
          </form>
        </div>

        {/* Right-hand reassurance / link to full form */}
        <aside className="rounded-3xl bg-[#FAF9F5] border border-[#E5DFD0] px-5 py-6 shadow-[0_14px_32px_rgba(20,20,19,0.06)]">
          <h3 className="text-lg font-poppins font-semibold text-[#141413]">
            Prefer the full form?
          </h3>
          <p className="mt-2 text-sm text-[#524F49]">
            Share more detail about your business and card volume on our dedicated
            Get Started page.
          </p>

          <ul className="mt-4 space-y-2 text-sm text-[#3F3A32]">
            <li>See how funding could flex with your daily card sales.</li>
            <li>Get a clearer sense of advance amounts and remit ranges.</li>
            <li>Talk with a specialist about payments and POS if you&apos;d like.</li>
          </ul>

          <Link
            href="/get-started"
            className="mt-5 inline-flex items-center text-sm font-lora text-[#141413] underline underline-offset-2"
          >
            Open full Get Started page →
          </Link>
        </aside>
      </div>
    </section>
  );
}

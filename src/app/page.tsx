"use client";

import PaymentsSection from "@/components/sections/PaymentsSection";
import GetStartedSection from "@/components/sections/GetStartedSection";
import Image from "next/image";

export default function HomePage() {
  return (
    <main>
      {/* LANDING HERO */}
      <section className="text-center py-24 md:py-32">
        <div className="container mx-auto px-6">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold leading-tight">
            Smarter payments. <br /> Stronger cash flow.
          </h1>
          <p className="mt-4 text-lg md:text-xl lg:text-2xl text-[var(--text-body)]">
            A smarter way to turn card volume into working capital.
          </p>
          <div className="mt-8">
            <a href="#" className="btn-primary">
              Request a demo
            </a>
          </div>
        </div>
      </section>

      {/* PAYMENTS SECTION */}
      <section className="py-16">
        <PaymentsSection />
      </section>

      {/* BOTTOM GET STARTED */}
      <section>
        <GetStartedSection />
      </section>
    </main>
  );
}

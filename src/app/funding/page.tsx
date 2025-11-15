import { DynamicIslandNav } from "@/components/dynamic-island-nav";
import Hero from "@/components/Hero";
import TickerBlock from "@/components/TickerBlock";

export default async function FundingPage() {
  return (
    <main className="relative min-h-screen min-h-[100dvh] font-lora text-text bg-[#FAF9F5]">
      <div className="relative z-10 min-h-screen min-h-[100dvh]">
        <DynamicIslandNav showHomeLogoOnMobile />

        {/* Funding hero + How funding works (reused from homepage) */}
        <Hero />

        {/* Metrics ticker */}
        <section className="px-6 md:px-10 lg:px-16 py-10 md:py-12 border-t border-[#E8E6DC]">
          {/* @ts-expect-error Async Server Component */}
          <TickerBlock />
        </section>

        <footer className="border-t border-[#E8E6DC] px-6 md:px-10 lg:px-16 py-8 text-xs text-[#7B7569] flex flex-col md:flex-row items-center justify-between gap-4">
          <div>© 2025 Split Payments, Inc. — Empowering merchants through smarter payments and funding.</div>
          <div className="flex items-center gap-6">
            <a href="/policy">privacy</a>
            <a href="/terms">terms</a>
            <a href="/support">contact</a>
          </div>
        </footer>
      </div>
    </main>
  );
}

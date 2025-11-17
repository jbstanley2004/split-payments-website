import { DynamicIslandNav } from "@/components/dynamic-island-nav";
import { FlexibleFundingHero, HowFundingWorksBlock } from "@/components/Hero";
import TwinklingStarsBackground from "@/components/TwinklingStarsBackground";

export default function FundingPage() {
  return (
    <main className="relative min-h-screen min-h-[100dvh] min-h-[100svh] bg-[#F5F5F3] font-lora text-[#161616]">
      <TwinklingStarsBackground />

      <div className="relative z-10">
        <DynamicIslandNav />

        {/* HOW FUNDING WORKS */}
        <section
          id="how-funding-works"
          className="px-6 md:px-10 lg:px-16 pt-20 sm:pt-24 md:pt-28"
        >
          <HowFundingWorksBlock />
        </section>

        {/* Interactive funding settings card */}
        <section
          id="funding-settings"
          className="px-6 md:px-10 lg:px-16 pb-16 pt-4 sm:pb-20 md:pb-24 flex justify-center"
        >
          <FlexibleFundingHero />
        </section>

        <footer className="px-6 md:px-10 lg:px-16 pb-10 text-xs text-[#666] flex flex-col md:flex-row items-center justify-between gap-4 border-t border-black/5">
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

import { DynamicIslandNav } from "@/components/dynamic-island-nav";
import { FlexibleFundingHero, HowFundingWorksBlock } from "@/components/Hero";

export default function FundingPage() {
  return (
    <main className="relative min-h-screen min-h-[100dvh] min-h-[100svh] bg-[#FAF9F5] font-lora text-[#141413]">
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

        <footer className="px-6 md:px-10 lg:px-16 pb-10 text-xs text-[#7b7569] flex flex-col md:flex-row items-center justify-between gap-4 border-t border-[#e8e6dc]">
          <div>© 2025 Split Payments, Inc. — Funding growth through payment technology.</div>
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

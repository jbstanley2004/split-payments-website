import { DynamicIslandNav } from "@/components/dynamic-island-nav";
import { FlexibleFundingHero, HowFundingWorksBlock } from "@/components/Hero";
import TwinklingStarsBackground from "@/components/TwinklingStarsBackground";

export default function FundingPage() {
  return (
    <main className="relative min-h-screen min-h-[100dvh] min-h-[100svh] font-lora text-text bg-transparent">
      {/* Twinkling stars background replaces hero_image_formatted.png here */}
      <TwinklingStarsBackground />

      <div className="relative z-10">
        <DynamicIslandNav />

        {/* HOW FUNDING WORKS – mirrors homepage, no enclosing card */}
        <section
          id="how-funding-works"
          className="px-6 md:px-10 lg:px-16 pt-24 sm:pt-28 md:pt-32"
        >
          <HowFundingWorksBlock />
        </section>

        {/* Standalone Funding card mirrors the home version and sits last */}
        <section
          id="funding"
          className="px-6 md:px-10 lg:px-16 pb-16 pt-2 sm:pb-20 md:pb-24"
        >
          <FlexibleFundingHero />
        </section>

        <footer className="px-6 md:px-10 lg:px-16 pb-10 text-xs text-[#7B7569] flex flex-col md:flex-row items-center justify-between gap-4">
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

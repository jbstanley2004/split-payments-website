import { DynamicIslandNav } from "@/components/dynamic-island-nav";
import { FlexibleFundingHero, HowFundingWorksBlock } from "@/components/Hero";
import Image from "next/image";

export default function FundingPage() {
  return (
    <main className="relative min-h-screen min-h-[100dvh] font-lora text-text bg-[#FAF9F5]">
      {/* Shared hero background image, same as homepage */}
      <div className="fixed inset-0 z-0 w-full h-full min-h-screen min-h-[100dvh]">
        <Image
          src="/hero_image_formatted.png"
          alt="Soft illustrated landscape background"
          fill
          className="object-cover object-center bg-[#F8F4EC]"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/20" />
      </div>

      <div className="relative z-10">
        <DynamicIslandNav showHomeLogoOnMobile />

        {/* HOW FUNDING WORKS – matches homepage container */}
        <section
          id="how-funding-works"
          className="px-3 pb-6 pt-24 sm:px-4 sm:pb-8 sm:pt-28 md:px-6 md:pb-10 md:pt-32"
        >
          <div className="stacked-shell mx-auto max-w-6xl overflow-hidden">
            <HowFundingWorksBlock />
          </div>
        </section>

        {/* Standalone Funding card mirrors the home version and sits last */}
        <section
          id="funding"
          className="px-3 pb-16 pt-2 sm:px-4 sm:pb-20 md:px-6 md:pb-24"
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

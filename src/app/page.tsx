import { DynamicIslandNav } from "@/components/dynamic-island-nav";
import Hero from "@/components/Hero";
import TickerBlock from "@/components/TickerBlock";
import PaymentsSection from "@/components/sections/PaymentsSection";
import GetStartedSection from "@/components/sections/GetStartedSection";
import Image from "next/image";

export default function HomePage() {
  return (
    <main className="relative min-h-screen min-h-[100dvh] font-lora text-text">
      <div className="fixed inset-0 z-0 w-full h-full min-h-screen min-h-[100dvh]">
        <Image
          src="/hero_image_formatted.png"
          alt="A modern office interior"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/20" />
      </div>

      <div className="relative z-10">
        <DynamicIslandNav
          navItems={[
            { label: "Home", href: "/#home", sectionId: "home" },
            { label: "Payments", href: "/#payments", sectionId: "payments" },
            { label: "Funding", href: "/#funding", sectionId: "funding" },
            { label: "Get Started", href: "/#get-started", sectionId: "get-started", variant: "cta" },
          ]}
        />

        {/* HOME HERO: existing landing copy */}
        <section
          id="home"
          data-section-id="home"
          className="min-h-screen min-h-[100dvh] flex items-end justify-center text-center pb-24 md:pb-32"
        >
          {/* We reuse the Hero component structure by placing its main content here if desired. */}
          {/* For now, we keep this simple and allow the Funding Hero to carry the primary animation. */}
        </section>

        {/* FUNDING / INFRASTRUCTURE */}
        <section id="funding" data-section-id="funding">
          <Hero />
          <div className="px-6 md:px-10">
            {/* @ts-expect-error Async Server Component */}
            <TickerBlock />
          </div>
        </section>

        {/* PAYMENTS */}
        <section id="payments" data-section-id="payments">
          <PaymentsSection />
        </section>

        {/* GET STARTED */}
        <section id="get-started" data-section-id="get-started">
          <GetStartedSection />
        </section>
      </div>
    </main>
  );
}

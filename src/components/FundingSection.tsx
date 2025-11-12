import Image from "next/image";
import Hero from "@/components/Hero";
import CardBeamAnimation from "@/components/CardBeamAnimation";
import TickerBlock from "@/components/TickerBlock";
import ParallaxIllustration from "@/components/ParallaxIllustration";
import Reveal from "@/components/Reveal";

export default async function FundingSection() {
  return (
    <section id="funding" className="relative bg-bg min-h-screen font-lora text-text">
      <div className="relative z-10">
        <Hero />

        {/* Metrics ticker */}
        <div className="px-6 md:px-10">
          {/* @ts-expect-error Async Server Component */}
          <TickerBlock />
        </div>

        {/* Payments / POS */}
        <div
          id="pos"
          className="px-6 md:px-10 py-8 md:py-12 flex flex-col md:flex-row items-center md:items-stretch justify-between gap-10 md:gap-0 md:min-h-[620px] border-b border-line/50"
        >
          <Reveal
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
            className="w-full md:w-1/2 max-w-xl mx-auto md:mx-0 text-center md:text-left md:h-full md:flex md:flex-col md:justify-center"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-poppins font-semibold leading-tight text-[var(--theme-text-primary)] mb-4">Payments built for every business</h2>
            <p className="text-lg font-lora text-[var(--theme-text-secondary)] mb-6 max-w-md mx-auto md:mx-0">
              Simplify your operations with connected POS, online, and mobile payment solutions.
            </p>
            <ul className="text-[var(--theme-text-secondary)] space-y-2 text-sm inline-block text-left font-lora">
              <li>• Real time reporting and reconciliation</li>
              <li>• Transparent, competitive pricing</li>
              <li>• Easy management across multiple locations</li>
            </ul>
          </Reveal>

          <ParallaxIllustration
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
            className="w-full md:w-1/2 flex justify-center md:justify-end md:h-full"
            offset={[-3, 9]}
          >
            <div className="relative w-full max-w-[540px] md:max-w-none aspect-[4/3] md:aspect-auto md:h-full md:min-h-[600px]">
              <Image
                src="/merchants.png"
                alt="Split merchant dashboard showing sales based funding and payment analytics"
                fill
                className="object-contain object-center md:object-right-top"
                sizes="(min-width: 1280px) 50vw, (min-width: 768px) 52vw, 90vw"
              />
            </div>
          </ParallaxIllustration>
        </div>

        <CardBeamAnimation />
      </div>
    </section>
  );
}

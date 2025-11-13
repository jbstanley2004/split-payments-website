"use client";

import Link from "next/link";
import OrangePushButton from "@/components/OrangePushButton";

export default function PaymentInfrastructureSection() {
  return (
    <section
      id="payment-infrastructure"
      className="relative flex flex-col lg:flex-row-reverse items-center justify-between py-24 px-6 lg:px-16 bg-white dark:bg-[#0a0a0a] overflow-hidden min-h-[620px]"
    >
      {/* background glow */}
      <div className="absolute right-0 top-1/2 translate-y-[-50%] w-[600px] h-[600px] bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.04)_0%,transparent_70%)] dark:bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.06)_0%,transparent_70%)] rounded-full blur-3xl pointer-events-none" />

      {/* text */}
      <div className="max-w-xl relative z-10 text-center lg:text-left w-full lg:w-1/2">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-poppins font-semibold leading-tight text-[var(--theme-text-primary)]">
          Payment infrastructure
          <br />
          built for every business
        </h1>
        <p className="mt-6 text-lg font-lora text-[var(--theme-text-secondary)] max-w-md mx-auto lg:mx-0">
          Accept payments anywhere with secure, integrated tools that connect directly to Split. Real time reporting, transparent pricing, and the flexibility to manage it all in one place.
        </p>
        <div className="mt-8 flex flex-wrap gap-4 justify-center lg:justify-start">
          <Link href="/get-started" passHref>
            <OrangePushButton>Get started</OrangePushButton>
          </Link>
          <a
            href="/#funding"
            className="text-[var(--theme-text-primary)] font-lora hover:text-[var(--theme-accent)] transition-colors duration-300 text-base inline-flex items-center"
          >
            Learn more →
          </a>
        </div>
      </div>

      {/* 3D Carousel */}
      <div className="relative mt-16 lg:mt-0 lg:ml-16 w-full lg:w-1/2 flex justify-center lg:justify-end">
        <div id="carousel-wrapper" className="relative w-full h-[600px]">
          <div id="container"></div>
        </div>
      </div>
    </section>
  );
}

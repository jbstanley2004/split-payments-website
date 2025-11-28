"use client";

import { DynamicIslandNav } from "@/components/dynamic-island-nav";
import { PageBackdrop } from "@/components/page-backdrop";
import { OnboardingProvider } from "@/contexts/onboarding-context";
import { OpenAIAppExperience } from "@/components/onboarding/OpenAIAppExperience";

function OnboardingContent() {
  return (
    <main className="relative min-h-screen min-h-[100dvh] min-h-[100svh] bg-gradient-to-b from-white via-[#f7f7f7] to-white text-black font-lora">
      <PageBackdrop priority />

      <div className="relative z-10 px-3 pb-6 pt-4 sm:px-4 sm:pb-8 sm:pt-6 md:px-6 md:pb-10 md:pt-8 min-h-screen min-h-[100dvh] min-h-[100svh]">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-[36px] bg-white/90 shadow-sm ring-1 ring-gray-200 backdrop-blur">
          <DynamicIslandNav />

          <section className="px-6 md:px-10 lg:px-16 pt-20 md:pt-24 pb-14 space-y-10">
            <div className="space-y-3 text-center">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#1f1f1f]">Split Payments x OpenAI</p>
              <h1 className="text-3xl md:text-4xl font-poppins font-semibold tracking-tight text-[#0f0f0f]">
                Conversational onboarding, in black & white
              </h1>
              <p className="mx-auto max-w-3xl text-sm md:text-lg text-[#1f2933]">
                Split Copilot replaces the old forms with a guided ChatKit experience. Upload files, let GPT 5.1 Mini parse them, and complete KYB, consent, and deployment inside one monochrome workspace—whether hosted in ChatGPT or embedded on splitpayments.com.
              </p>
            </div>

            <OpenAIAppExperience />
          </section>
        </div>
      </div>
    </main>
  );
}

export default function GetStarted() {
  return (
    <OnboardingProvider>
      <OnboardingContent />
    </OnboardingProvider>
  );
}

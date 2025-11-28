"use client";

import { DynamicIslandNav } from "@/components/dynamic-island-nav";
import { PageBackdrop } from "@/components/page-backdrop";
import { OnboardingProvider } from "@/contexts/onboarding-context";
import { OpenAIAppExperience } from "@/components/onboarding/OpenAIAppExperience";

function OnboardingContent() {
  return (
    <main className="relative min-h-screen min-h-[100dvh] min-h-[100svh] bg-gradient-to-b from-[#EEF2FF] via-[#F6F5F4] to-[#FDFCFB] text-black font-lora">
      <PageBackdrop priority />

      <div className="relative z-10 px-3 pb-6 pt-4 sm:px-4 sm:pb-8 sm:pt-6 md:px-6 md:pb-10 md:pt-8 min-h-screen min-h-[100dvh] min-h-[100svh]">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-[36px] bg-white/90 shadow-sm ring-1 ring-gray-200 backdrop-blur">
          <DynamicIslandNav />

          <section className="px-6 md:px-10 lg:px-16 pt-20 md:pt-24 pb-14 space-y-10">
            <div className="space-y-3 text-center">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#6B6B6B]">Split Payments x OpenAI</p>
              <h1 className="text-3xl md:text-4xl font-poppins font-semibold tracking-tight text-[#2E2E2E]">
                Launch the Chat Kit onboarding workspace
              </h1>
              <p className="mx-auto max-w-3xl text-sm md:text-lg text-[#4B5563]">
                The new experience packages our funding workflow as an OpenAI App Kit with chat-native widgets, document uploads, and branded theme controls—publishable inside ChatGPT or embedded on your site.
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

"use client";

import { DynamicIslandNav } from "@/components/dynamic-island-nav";
import { PageBackdrop } from "@/components/page-backdrop";
import { OnboardingProvider, useOnboarding } from "@/contexts/onboarding-context";
import { StepTransition } from "@/components/onboarding/StepTransition";
import { OpenAIAppExperience } from "@/components/onboarding/OpenAIAppExperience";

// Import all step components
import { WelcomeStep } from "@/components/onboarding/steps/WelcomeStep";
import { BusinessBasicsStep } from "@/components/onboarding/steps/BusinessBasicsStep";
import { BusinessDetailsStep } from "@/components/onboarding/steps/BusinessDetailsStep";
import { OwnerInfoStep } from "@/components/onboarding/steps/OwnerInfoStep";
import { PartnersStep } from "@/components/onboarding/steps/PartnersStep";
import { AdditionalInfoStep } from "@/components/onboarding/steps/AdditionalInfoStep";
import { CitizenshipStep } from "@/components/onboarding/steps/CitizenshipStep";
import { AuthorizationStep } from "@/components/onboarding/steps/AuthorizationStep";

function OnboardingContent() {
  const { currentStep } = useOnboarding();

  const steps = [
    <WelcomeStep key="welcome" />,
    <BusinessBasicsStep key="business-basics" />,
    <BusinessDetailsStep key="business-details" />,
    <OwnerInfoStep key="owner-info" />,
    <PartnersStep key="partners" />,
    <AdditionalInfoStep key="additional-info" />,
    <CitizenshipStep key="citizenship" />,
    <AuthorizationStep key="authorization" />,
  ];

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
                Chat-first onboarding, rebuilt in black & white
              </h1>
              <p className="mx-auto max-w-3xl text-sm md:text-lg text-[#1f2933]">
                A new Split Copilot built on OpenAI Apps SDK, ChatKit, and AgentKit—made for payments onboarding. Host it in ChatGPT or embed it on splitpayments.com with the same widgets, consent, and data sync.
              </p>
            </div>

            <OpenAIAppExperience />

            <div className="rounded-3xl border border-dashed border-gray-200 bg-white/70 p-5 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#6B6B6B]">Classic form fallback</p>
                  <h2 className="text-xl font-semibold text-[#2E2E2E]">Keep the stepper for partners who prefer forms</h2>
                  <p className="text-sm text-[#4B5563]">We preserved the structured form experience below; the Chat Kit actions hydrate the same data model.</p>
                </div>
                <div className="rounded-full bg-black px-4 py-2 text-xs font-semibold text-white shadow-sm">Synced with chat</div>
              </div>

              <div className="mt-5">
                <StepTransition stepKey={currentStep}>
                  {steps[currentStep]}
                </StepTransition>
              </div>
            </div>
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

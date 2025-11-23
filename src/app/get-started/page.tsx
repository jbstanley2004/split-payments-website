"use client";

import { DynamicIslandNav } from "@/components/dynamic-island-nav";
import { PageBackdrop } from "@/components/page-backdrop";
import { OnboardingProvider, useOnboarding } from "@/contexts/onboarding-context";
import { StepTransition } from "@/components/onboarding/StepTransition";

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
    <main className="relative min-h-screen min-h-[100dvh] min-h-[100svh] bg-[#F6F5F4] text-black font-lora">
      <PageBackdrop priority />

      <div className="relative z-10 px-3 pb-6 pt-4 sm:px-4 sm:pb-8 sm:pt-6 md:px-6 md:pb-10 md:pt-8 min-h-screen min-h-[100dvh] min-h-[100svh]">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-[36px] bg-white shadow-sm ring-1 ring-gray-200">
          <DynamicIslandNav />

          <section className="px-6 md:px-10 lg:px-16 pt-24 md:pt-28 pb-20">
            <StepTransition stepKey={currentStep}>
              {steps[currentStep]}
            </StepTransition>
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

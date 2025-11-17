import Image from "next/image";
import { DynamicIslandNav } from "@/components/dynamic-island-nav";
import OrangePushButton from "@/components/OrangePushButton";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  BarChart3,
  Building2,
  CheckCircle2,
  Clock3,
  CreditCard,
  LineChart,
  PieChart,
  ShieldCheck,
  Sparkles,
  Star,
  Users2,
} from "lucide-react";
import TwinklingStarsBackground from "@/components/TwinklingStarsBackground";

type IconCard = {
  title: string;
  description: string;
  icon: LucideIcon;
};

// NOTE: Content cards/backgrounds on this page have already been simplified on your side;
// here we only ensure the page-level canvas is fully transparent so the starfield shows through.

export default function CCSplitPage() {
  return (
    <main className="relative min-h-screen min-h-[100dvh] min-h-[100svh] bg-transparent font-lora text-[#141413]">
      {/* Twinkling stars background replaces hero_image_formatted.png here */}
      <TwinklingStarsBackground />

      <div className="relative z-10">
        <DynamicIslandNav />
        {/* Rest of your CC Split sections remain as you"ve defined them locally */}
      </div>
    </main>
  );
}

function PlusIcon() {
  return (
    <svg viewBox="0 0 16 16" className="h-4 w-4" aria-hidden="true">
      <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

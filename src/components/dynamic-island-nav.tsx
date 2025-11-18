"use client";

import { useState } from "react";
import Link from "next/link";

import { cn } from "@/lib/stub";

type DynamicIslandNavProps = {
  className?: string;
  logoPriority?: boolean; // kept for API compatibility
};

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Payments", href: "/payments" },
  { label: "Funding", href: "/funding" },
  { label: "CC Split", href: "/cc-split" },
  { label: "Partnerships", href: "/partnerships" },
] as const;

// Expanded pills: pure white with black text
const CHIP_COLORS: Record<(typeof NAV_ITEMS)[number]["label"], string> = {
  Home: "#FFFFFF",
  Payments: "#FFFFFF",
  Funding: "#FFFFFF",
  "CC Split": "#FFFFFF",
  Partnerships: "#FFFFFF",
};

const SAFE_AREA_TOP_OFFSET = "calc(env(safe-area-inset-top, 0px) + 1.25rem)";

const PILL_BASE_CLASSES =
  "inline-flex items-center gap-2 rounded-full border border-[#E8E6DC] text-[11px] font-poppins font-medium uppercase tracking-[0.16em] text-[#161616] shadow-[0_18px_40px_rgba(20,20,19,0.14)] whitespace-nowrap";

export function DynamicIslandNav({ className }: DynamicIslandNavProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <header
      className={cn(
        "fixed left-0 right-0 top-5 sm:top-6 md:top-8 z-50 flex items-center justify-center px-6 pointer-events-none",
        className,
      )}
      style={{ top: SAFE_AREA_TOP_OFFSET }}
    >
      <div className="pointer-events-auto w-full max-w-6xl mx-auto">
        <div className="relative flex items-center justify-center">
          {/* Split wordmark in the traditional logo spot (top-left), characters only */}
          <Link
            href="/"
            className="absolute left-0 flex items-center gap-1 font-poppins text-[20px] font-medium tracking-[0.08em] text-[#161616]"
            aria-label="Split home"
          >
            <span>Spl</span>
            <span className="relative inline-flex items-center">
              <span className="sr-only">i</span>
              {/* Render the "i" with an orange dot to nod to the brand mark */}
              <span aria-hidden className="relative inline-block h-5 w-[6px]">
                <span className="absolute -top-1 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-[#FF4306]" />
                <span className="absolute bottom-0 left-1/2 h-[11px] w-px -translate-x-1/2 bg-[#161616]" />
              </span>
            </span>
            <span>t</span>
          </Link>

          {/* Desktop nav pills, centered in the page */}
          <nav className="hidden md:flex items-center gap-2">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={cn(PILL_BASE_CLASSES, "px-4 py-2.5")}
                style={{ backgroundColor: CHIP_COLORS[item.label] }}
              >
                <span
                  aria-hidden
                  className="inline-block h-1.5 w-1.5 rounded-full bg-[#FF4306]"
                />
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Mobile menu toggle on the right, separate from the wordmark */}
          <button
            type="button"
            className="md:hidden absolute right-0 inline-flex items-center gap-2 rounded-full border border-[#E8E6DC] bg-white px-3 py-1.5 text-[11px] font-poppins font-medium uppercase tracking-[0.16em] text-[#161616] shadow-[0_12px_28px_rgba(20,20,19,0.14)]"
            onClick={() => setIsMobileOpen((open) => !open)}
            aria-expanded={isMobileOpen}
            aria-label={isMobileOpen ? "Hide navigation menu" : "Open navigation menu"}
          >
            <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-full bg-[#FF4306]" />
            Menu
          </button>
        </div>

        {/* Mobile nav pills, centered below when open */}
        {isMobileOpen && (
          <nav className="mt-3 flex justify-center gap-2 md:hidden">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={cn(PILL_BASE_CLASSES, "px-3.5 py-2 shadow-[0_14px_32px_rgba(20,20,19,0.14)]")}
                style={{ backgroundColor: CHIP_COLORS[item.label] }}
                onClick={() => setIsMobileOpen(false)}
              >
                <span
                  aria-hidden
                  className="inline-block h-1.5 w-1.5 rounded-full bg-[#FF4306]"
                />
                {item.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}

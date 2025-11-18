"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/stub";
import splitLogo from "public/new_logo.svg";

type DynamicIslandNavProps = {
  className?: string;
  logoPriority?: boolean;
};

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Payments", href: "/payments" },
  { label: "Funding", href: "/funding" },
  { label: "CC Split", href: "/cc-split" },
  { label: "Partnerships", href: "/partnerships" },
] as const;

// Expanded pills: pure white with black text and orange accent dot
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

export function DynamicIslandNav({ className, logoPriority = false }: DynamicIslandNavProps) {
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
        <div className="relative flex items-center justify-between">
          {/* Left: real Split logo in the traditional logo spot (top-left) */}
          <Link
            href="/"
            aria-label="Split home"
            className="flex items-center gap-2"
          >
            <Image
              src={splitLogo}
              alt="Split"
              height={28}
              className="h-7 w-auto object-contain"
              priority={logoPriority}
            />
          </Link>

          {/* Center: nav pills, aligned similar to Notion's centered header */}
          <nav className="hidden md:flex items-center gap-2 absolute left-1/2 -translate-x-1/2">
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

          {/* Mobile menu toggle on the right */}
          <button
            type="button"
            className="md:hidden inline-flex items-center gap-2 rounded-full border border-[#E8E6DC] bg-white px-3 py-1.5 text-[11px] font-poppins font-medium uppercase tracking-[0.16em] text-[#161616] shadow-[0_12px_28px_rgba(20,20,19,0.14)]"
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

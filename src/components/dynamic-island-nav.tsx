"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/stub";
import splitSphere from "public/new_logo_sphere.svg";

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

// Branding: white chips, black text, orange accent dot
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

export function DynamicIslandNav({
  className,
  logoPriority = false,
}: DynamicIslandNavProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <header
      className={cn(
        "fixed left-0 right-0 top-5 sm:top-6 md:top-8 z-50 flex items-center justify-center px-6 pointer-events-none",
        className,
      )}
      style={{ top: SAFE_AREA_TOP_OFFSET }}
    >
      <div className="flex w-full max-w-4xl items-center justify-between pointer-events-auto">
        {/* Left: orb logo */}
        <button
          type="button"
          aria-label={isMobileOpen ? "Hide navigation menu" : "Open navigation menu"}
          className="flex h-12 w-12 items-center justify-center rounded-full border border-[#E8E6DC]/80 bg-[#D8D9D4] shadow-[0_16px_40px_rgba(0,0,0,0.22)] md:h-14 md:w-14"
          onClick={() => setIsMobileOpen((open) => !open)}
        >
          <Image
            src={splitSphere}
            alt="Split"
            width={56}
            height={56}
            className="h-8 w-auto object-contain"
            priority={logoPriority}
          />
        </button>

        {/* Desktop nav pills */}
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
      </div>

      {/* Mobile nav pills */}
      {isMobileOpen && (
        <nav className="absolute left-1/2 top-full mt-3 flex -translate-x-1/2 items-center gap-2 md:hidden pointer-events-auto">
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
    </header>
  );
}

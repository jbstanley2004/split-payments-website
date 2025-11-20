"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/stub";

type DynamicIslandNavProps = {
  className?: string;
  logoPriority?: boolean;
};

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Payments", href: "/payments" },
  { label: "Funding", href: "/funding" },
  { label: "Partnerships", href: "/partnerships" },
] as const;

const SAFE_AREA_TOP_OFFSET = "calc(env(safe-area-inset-top, 0px) + 1.25rem)";

const PILL_BASE_CLASSES =
  "nav-pill";

export function DynamicIslandNav({ className, logoPriority = false }: DynamicIslandNavProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();
  const [activePath, setActivePath] = useState(pathname);

  useEffect(() => {
    setActivePath(pathname);
  }, [pathname]);

  return (
    <>
      <div
        className="fixed inset-x-0 top-0 h-20 z-40 bg-white/10 backdrop-blur-xl backdrop-saturate-150 pointer-events-none"
        style={{ maskImage: 'linear-gradient(to bottom, black 70%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to bottom, black 70%, transparent 100%)' }}
      />
      <header
        className={cn(
          "fixed inset-x-0 top-5 sm:top-6 md:top-8 z-50 flex items-center justify-between px-6 pointer-events-none",
          className,
        )}
        style={{ top: SAFE_AREA_TOP_OFFSET }}
      >
        <div className="pointer-events-auto flex w-full items-center justify-between">
          {/* Left: sphere-only Split logo pinned to far left */}
          <Link
            href="/"
            aria-label="Split home"
            className="flex items-center gap-2"
          >
            <Image
              src="/new_logo_no_bg_smooth.png"
              alt="Split"
              height={36}
              width={90}
              className="h-9 w-auto object-contain"
              priority={logoPriority}
            />
          </Link>

          {/* Center: nav pills, independent of logo, similar to Notion's centered header */}
          <nav className="hidden md:flex items-center gap-4 absolute left-1/2 -translate-x-1/2">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  "flex items-center gap-2 text-sm font-medium transition-all duration-300 rounded-full px-4 py-2 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.08)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)] text-brand-black border border-black hover:border-black/5",
                  {
                    "bg-gray-50": activePath === item.href,
                  }
                )}
              >
                <span className="w-1 h-1 rounded-full bg-[#FF4306]" />
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>

          {/* Mobile menu toggle on the right */}
          <button
            type="button"
            className="md:hidden inline-flex items-center gap-2 rounded-full border border-border-subtle bg-white px-3 py-1.5 text-[11px] font-poppins font-medium uppercase tracking-[0.16em] text-main shadow-soft"
            onClick={() => setIsMobileOpen((open) => !open)}
            aria-expanded={isMobileOpen}
            aria-label={isMobileOpen ? "Hide navigation menu" : "Open navigation menu"}
          >
            <span className="dot" />
            Menu
          </button>
        </div>

        {/* Mobile nav pills, centered below when open */}
        {isMobileOpen && (
          <nav className="pointer-events-auto mt-3 flex w-full justify-center gap-2 md:hidden">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={cn(PILL_BASE_CLASSES, { "nav-pill--active": activePath === item.href })}
                onClick={() => setIsMobileOpen(false)}
              >
                <span className="dot" />
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
        )}
      </header>
    </>
  );
}


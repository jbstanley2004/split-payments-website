import React from "react";
import Link from "next/link";
import SplitWordmark from "@/components/branding/SplitWordmark";

type Props = {
  href?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
  className?: string;
  "aria-label"?: string;
} & Record<string, any>;

const base =
  "group relative inline-flex items-center gap-2 rounded-2xl px-5 py-3 text-base font-semibold leading-none " +
  "text-slate-900 dark:text-slate-100 bg-white/95 dark:bg-slate-900/90 " +
  "ring-1 ring-slate-300/70 dark:ring-slate-700/80 " +
  "shadow-[inset_0_1px_0_rgba(255,255,255,.15),0_10px_22px_-10px_rgba(0,0,0,.65),0_2px_0_rgba(0,0,0,.35)] " +
  "transition-[transform,box-shadow,background] duration-200 ease-out " +
  "hover:shadow-[inset_0_1px_0_rgba(255,255,255,.15),0_22px_44px_-18px_rgba(0,0,0,.85),0_2px_0_rgba(0,0,0,.4)] " +
  "active:translate-y-[1px]";

export default function SplitCTA({ href, onClick, className = "", ...rest }: Props) {
  const content = (
    <>
      <span className="pr-0.5">Let's</span>
      <SplitWordmark className="tracking-[0.01em]" />
      <svg
        viewBox="0 0 20 20"
        aria-hidden="true"
        className="ml-1 h-4 w-4 opacity-70 transition-opacity group-hover:opacity-100"
      >
        <path fill="currentColor" d="M7 4l6 6-6 6V4z" />
      </svg>
      {/* glossy sweep + soft drop */}
      <span className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-t from-white/25 to-transparent opacity-30 group-hover:opacity-50 transition-opacity" />
      <span className="pointer-events-none absolute -bottom-1 left-2 right-2 h-1.5 rounded-full bg-black/25 blur-md" />
    </>
  );

  // Link variant
  if (href && !onClick) {
    return (
      <Link href={href} className={`${base} ${className}`} aria-label="Let's Split" {...rest}>
        {content}
      </Link>
    );
  }

  // Button variant
  return (
    <button
      type="button"
      onClick={onClick}
      className={`${base} ${className}`}
      aria-label="Let's Split"
      {...rest}
    >
      {content}
    </button>
  );
}

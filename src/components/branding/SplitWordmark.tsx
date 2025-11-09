import React from "react";

type Props = { className?: string };

/**
 * Logo-style wordmark: "Sp | it"
 * The vertical bar is drawn with CSS so it looks like the brand mark, not a text glyph.
 */
export default function SplitWordmark({ className = "" }: Props) {
  return (
    <span
      className={`inline-flex items-baseline whitespace-nowrap font-medium tracking-wide ${className}`}
    >
      <span>Sp</span>
      {/* vertical logo bar */}
      <span
        aria-hidden="true"
        className="relative mx-[0.06em] inline-block h-[1.05em] w-[0.06em] align-[-0.08em] rounded-sm bg-current/85
                   shadow-[0_0_0.45em_rgba(0,0,0,.25)]"
      />
      <span>it</span>
    </span>
  );
}

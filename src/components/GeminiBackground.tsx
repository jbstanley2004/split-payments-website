"use client";

import Image from "next/image";
import type { ComponentPropsWithoutRef } from "react";

export type GeminiBackgroundProps = ComponentPropsWithoutRef<"div"> & {
  priority?: boolean;
};

export default function GeminiBackground({ className, priority = false, ...rest }: GeminiBackgroundProps) {
  const classes = [
    "fixed inset-0 -z-10 w-full h-full min-h-screen min-h-[100dvh] min-h-[100svh]",
    className,
  ]
    .filter(Boolean)
    .join(" " );

  return (
    <div className={classes} {...rest}>
      <Image
        src="/gemini_split.png"
        alt="Soft gradient Gemini background for Split"
        fill
        priority={priority}
        className="object-cover object-center"
        sizes="100vw"
      />
      <div className="pointer-events-none absolute inset-0 bg-black/10 mix-blend-multiply" />
    </div>
  );
}

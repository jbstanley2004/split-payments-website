import type { ComponentPropsWithoutRef } from "react";
import GeminiBackground from "@/components/GeminiBackground";

export type PageBackdropProps = ComponentPropsWithoutRef<"div"> & {
  priority?: boolean;
};

export function PageBackdrop({ className, priority = false, ...rest }: PageBackdropProps) {
  const classes = [
    "fixed inset-0 z-0 w-full h-full min-h-screen min-h-[100dvh] min-h-[100svh]",
    className,
  ]
    .filter(Boolean)
    .join(" " );

  return (
    <div className={classes} {...rest}>
      {/* Gemini background replaces all previous hero/CC Split backgrounds globally */}
      <GeminiBackground priority={priority} />
    </div>
  );
}

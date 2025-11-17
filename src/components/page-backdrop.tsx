import type { ComponentPropsWithoutRef } from "react";
import TwinklingStarsBackground from "@/components/TwinklingStarsBackground";

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
      {/* Twinkling stars background replaces hero_image_formatted.png globally */}
      <TwinklingStarsBackground />
    </div>
  );
}

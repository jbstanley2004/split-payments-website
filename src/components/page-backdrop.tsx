import type { ComponentPropsWithoutRef } from "react";
import { CloudsBackground } from "./clouds/clouds-background";

export type PageBackdropProps = ComponentPropsWithoutRef<"div"> & {
  priority?: boolean;
};

export function PageBackdrop({ className, priority = false, ...rest }: PageBackdropProps) {
  const classes = [
    "fixed inset-0 z-0 w-full h-full min-h-screen min-h-[100dvh] min-h-[100svh]",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes} {...rest}>
      <CloudsBackground />
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />
    </div>
  );
}

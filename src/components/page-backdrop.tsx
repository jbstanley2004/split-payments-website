import Image from "next/image";
import type { ComponentPropsWithoutRef } from "react";

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
      <Image
        src="/hero_image_formatted.png"
        alt="Soft illustrated landscape background"
        fill
        className="object-cover object-center md:object-center"
        priority={priority}
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/20" />
    </div>
  );
}

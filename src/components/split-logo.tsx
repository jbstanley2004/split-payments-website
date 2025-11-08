"use client";

import Image from "next/image";
import splitLogoDark from "public/dark_mode_logo.png";

type SplitLogoProps = {
  imageClassName?: string;
  priority?: boolean;
};

export function SplitLogo({ imageClassName = "h-12 w-auto", priority }: SplitLogoProps) {
  return (
    <span className="inline-flex items-center">
      <Image
        alt="Split logo"
        src={splitLogoDark}
        className={`bg-transparent ${imageClassName}`}
        priority={priority}
      />
    </span>
  );
}

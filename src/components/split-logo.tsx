"use client";

import Image from "next/image";
import splitLogoLight from "public/light_logo.png";

type SplitLogoProps = {
  imageClassName?: string;
  priority?: boolean;
};

export function SplitLogo({ imageClassName = "h-12 w-auto", priority }: SplitLogoProps) {
  return (
    <span className="inline-flex items-center">
      <Image
        alt="Split logo"
        src={splitLogoLight}
        className={`bg-transparent ${imageClassName}`}
        priority={priority}
      />
    </span>
  );
}

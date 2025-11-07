"use client";

import Image from "next/image";
import splitLogoDark from "public/split_logo_dark.png";
import splitLogoLight from "public/split_logo_light.png";

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
        className={`dark:hidden ${imageClassName}`}
        priority={priority}
      />
      <Image
        alt="Split logo"
        src={splitLogoDark}
        className={`hidden dark:block ${imageClassName}`}
        priority={priority}
      />
    </span>
  );
}

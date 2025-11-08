"use client";

import Image from "next/image";
import splitLogoDark from "public/dark_logo.png";
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
        className={`dark:hidden bg-transparent ${imageClassName}`}
        priority={priority}
      />
      <Image
        alt="Split logo"
        src={splitLogoDark}
        className={`hidden dark:block bg-transparent ${imageClassName}`}
        priority={priority}
      />
    </span>
  );
}

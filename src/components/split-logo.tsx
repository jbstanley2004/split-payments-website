"use client";

import Image from "next/image";

type SplitLogoProps = {
  imageClassName?: string;
  priority?: boolean;
};

export function SplitLogo({ imageClassName = "h-12 w-auto", priority }: SplitLogoProps) {
  return (
    <span className="inline-flex items-center">
      <Image
        alt="Split logo"
        src="/new_logo.svg"
        width={120}
        height={30}
        className={`bg-transparent ${imageClassName}`}
        priority={priority}
      />
    </span>
  );
}

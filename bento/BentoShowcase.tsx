"use client";

import Image from "next/image";

export function BentoShowcase() {
  return (
    <div className="w-full px-4 py-12">
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Image
            src="/bento/black_1.png"
            alt="Frictionless experience"
            width={800}
            height={1000}
            className="w-full h-auto"
            unoptimized
          />
          <Image
            src="/bento/black_2.png"
            alt="Sales-based payments"
            width={800}
            height={1000}
            className="w-full h-auto"
            unoptimized
          />
          <Image
            src="/bento/wihit_1.png"
            alt="Pre-approved offers"
            width={800}
            height={1000}
            className="w-full h-auto"
            unoptimized
          />
          <Image
            src="/bento/white_2.png"
            alt="Flexible capital access"
            width={800}
            height={1000}
            className="w-full h-auto"
            unoptimized
          />
       </div>
    </div>
  );
}

"use client";
import dynamic from 'next/dynamic';

const CardBeam = dynamic(() => import('@/components/CardBeamAnimation'), { ssr: false });

export default function FooterBeam() {
  return (
    <div aria-hidden className="mt-24">
      <div className="w-screen relative left-1/2 right-1/2 -mx-[50vw]">
        <CardBeam />
      </div>
    </div>
  );
}

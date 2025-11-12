"use client";
import dynamic from 'next/dynamic';
const CardBeam = dynamic(() => import('@/components/CardBeamAnimation'), { ssr: false });
export default function FooterBeam() {
  return (
    <div aria-hidden className="mt-24">
      <CardBeam />
    </div>
  );
}
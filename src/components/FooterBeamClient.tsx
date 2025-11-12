"use client";
import dynamic from 'next/dynamic';

const FooterBeam = dynamic(() => import('@/components/FooterBeam'), { ssr: false });

export default function FooterBeamClient() {
  return <FooterBeam />;
}

"use client";
import dynamic from 'next/dynamic';
import ScrollStitch from '@/components/ScrollStitch';

const FooterBeam = dynamic(() => import('@/components/FooterBeam'), { ssr: false });

export default function LayoutClient() {
  return (
    <>
      <ScrollStitch />
      <FooterBeam />
    </>
  );
}
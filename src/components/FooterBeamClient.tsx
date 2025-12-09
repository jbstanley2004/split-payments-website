"use client";
import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';

const FooterBeam = dynamic(() => import('@/components/FooterBeam'), { ssr: false });

export default function FooterBeamClient() {
  const pathname = usePathname();

  if (pathname?.startsWith('/funding-concierge') || pathname?.startsWith('/portal/dashboard')) {
    return null;
  }

  return <FooterBeam />;
}

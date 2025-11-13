"use client";
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export default function ScrollStitch() {
  const pathname = usePathname();

  // Scrollspy + URL hash updates only on the home page
  useEffect(() => {
    if (pathname !== '/') return;

    const sections = Array.from(
      document.querySelectorAll<HTMLElement>('[data-section-id]')
    );
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        let mostVisible: IntersectionObserverEntry | null = null;

        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          if (!mostVisible || entry.intersectionRatio > mostVisible.intersectionRatio) {
            mostVisible = entry;
          }
        }

        if (!mostVisible) return;
        const sectionId = mostVisible.target.getAttribute('data-section-id');
        if (!sectionId || typeof window === 'undefined') return;

        const newUrl = sectionId === 'home' ? '/' : `/#${sectionId}`;
        const current = window.location.pathname + window.location.hash;
        if (current !== newUrl) {
          window.history.replaceState(null, '', newUrl);
        }
      },
      { threshold: 0.5 }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [pathname]);

  // Handle initial deep-linking to a section hash on the home page
  useEffect(() => {
    if (pathname !== '/') return;
    if (typeof window === 'undefined') return;

    const hash = window.location.hash.replace('#', '');
    if (!hash) return;

    const el = document.getElementById(hash);
    if (!el) return;

    setTimeout(() => {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 0);
  }, [pathname]);

  return null;
}

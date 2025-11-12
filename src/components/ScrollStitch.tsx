"use client";
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';

export default function ScrollStitch() {
  const router = useRouter();
  const pathname = usePathname();
  const lock = useRef(false);
  const order = ['/', '/payments', '/funding', '/get-started'];

  useEffect(() => {
    const threshold = 24;

    const onWheel = (e: WheelEvent) => {
      if (lock.current) return;
      const idx = order.indexOf(pathname || '/');
      if (idx === -1) return;

      const atTop = window.scrollY <= threshold;
      const atBottom =
        window.innerHeight + window.scrollY >= document.body.scrollHeight - threshold;

      if (e.deltaY > 0 && atBottom && idx < order.length - 1) {
        lock.current = true;
        router.push(order[idx + 1]);
        setTimeout(() => (lock.current = false), 500);
      }

      if (e.deltaY < 0 && atTop && idx > 0) {
        lock.current = true;
        router.push(order[idx - 1]);
        setTimeout(() => (lock.current = false), 500);
      }
    };

    let startY = 0;
    const onTouchStart = (e: TouchEvent) => (startY = e.touches[0].clientY);
    const onTouchEnd = (e: TouchEvent) => {
      if (lock.current) return;
      const idx = order.indexOf(pathname || '/');
      if (idx === -1) return;
      const dy = (e.changedTouches[0]?.clientY ?? 0) - startY;

      const atTop = window.scrollY <= threshold;
      const atBottom =
        window.innerHeight + window.scrollY >= document.body.scrollHeight - threshold;

      if (dy < -32 && atBottom && idx < order.length - 1) {
        lock.current = true;
        router.push(order[idx + 1]);
        setTimeout(() => (lock.current = false), 600);
      }
      if (dy > 32 && atTop && idx > 0) {
        lock.current = true;
        router.push(order[idx - 1]);
        setTimeout(() => (lock.current = false), 600);
      }
    };

    window.addEventListener('wheel', onWheel, { passive: true });
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchend', onTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, [pathname]);

  return null;
}
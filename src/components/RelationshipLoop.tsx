"use client";
import React, { useEffect, useRef } from 'react';
import { useScroll } from 'framer-motion';
import clsx from 'clsx';
import './RelationshipLoop.css';

/**
 * RelationshipLoop — user-driven, brand-aligned
 * - Start at 3 o’clock with “Funding received”
 * - 3 labels, equally spaced (every 120°)
 * - No ticker, no auto keyframes
 * - Accent color via CSS var (--theme-accent-blue)
 */
type Props = { className?: string; accent?: string };

export default function RelationshipLoop({ className, accent }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });

  // Keep arc in sync with scroll (user-driven)
  useEffect(() => {
    const unsub = scrollYProgress.on('change', (p) => {
      const arc = 452 - Math.round(452 * p);
      ref.current?.style.setProperty('--rc-progress', String(arc));
      ref.current?.style.setProperty('--rc-tick-opacity', (0.25 + p * 0.75).toFixed(2));
    });
    return () => unsub?.();
  }, [scrollYProgress]);

  // Hover → “snap” arc to a stage; leave → restore scroll state
  const setByPortion = (portion: number) => {
    const arc = 452 - Math.round(452 * portion);
    ref.current?.style.setProperty('--rc-progress', String(arc));
    ref.current?.style.setProperty('--rc-tick-opacity', '1');
  };
  const restoreFromScroll = () => {
    // @ts-ignore MotionValue has get()
    const p: number = typeof scrollYProgress.get === 'function' ? scrollYProgress.get() : 0;
    const arc = 452 - Math.round(452 * p);
    ref.current?.style.setProperty('--rc-progress', String(arc));
    ref.current?.style.removeProperty('--rc-tick-opacity');
  };

  // 3 labels equally spaced (0°, 120°, 240°), measured from the 3 o’clock axis.
  const labels = [
    { title: 'Funding received', angle: 0,   snap: 0.06 },
    { title: 'Daily sales',      angle: 120, snap: 0.33 },
    { title: 'Go live',          angle: 240, snap: 0.66 },
  ];

  const style: React.CSSProperties = accent ? { ['--rc-accent' as any]: accent } : {};

  return (
    <div ref={ref} className={clsx('relationship-loop', className)} style={style} data-animate='user'>
      <svg
        className='relationship-circle'
        viewBox='0 0 200 200'
        role='img'
        aria-labelledby='rcTitle rcDesc'
      >
        <title id='rcTitle'>Continuous funding loop</title>
        <desc id='rcDesc'>Three stages, equally spaced, show how funding continues as you process sales.</desc>

        <g transform='translate(100 100)'>
          <circle r='72' fill='none' className='rc-muted' strokeWidth='6' />
          <circle r='72' fill='none' className='rc-accent accent-arc' strokeLinecap='round' strokeWidth='6' />

          <g className='ticks' stroke='#141413' strokeWidth='1'>
            {Array.from({ length: 12 }).map((_, i) => (
              <line key={i} x1='0' y1='-78' x2='0' y2='-72' transform={`rotate(${i * 30})`} />
            ))}
          </g>

          <g className='rc-label' textAnchor='middle'>
            {labels.map((l, idx) => {
              const r = 88;
              const rad = (l.angle * Math.PI) / 180;
              const x = Math.cos(rad) * r;
              const y = Math.sin(rad) * r;
              return (
                <text
                  key={idx}
                  x={x.toFixed(2)}
                  y={(y + 4).toFixed(2)}
                  onMouseEnter={() => setByPortion(l.snap)}
                  onMouseLeave={restoreFromScroll}
                >
                  {l.title}
                </text>
              );
            })}
          </g>
        </g>
      </svg>
    </div>
  );
}

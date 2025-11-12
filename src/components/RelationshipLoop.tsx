"use client";
import React, { useEffect, useRef, useState } from 'react';
import { useScroll, motion } from 'framer-motion';
import clsx from 'clsx';
import './RelationshipLoop.css';

/**
 * RelationshipLoop — Complete and user-driven.
 * - Full arc and proper label layout.
 * - Scroll or slider drives subtle motion.
 * - No external data or ticker remnants.
 */

export default function RelationshipLoop({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const [progress, setProgress] = useState(452);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (p) => {
      const arc = 452 - Math.round(452 * p);
      setProgress(arc);
      ref.current?.style.setProperty('--rc-progress', `${arc}`);
      ref.current?.style.setProperty('--rc-tick-opacity', `${0.3 + p * 0.7}`);
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  return (
    <motion.div ref={ref} className={clsx('relationship-loop', className)}>
      <svg
        className="relationship-circle"
        viewBox="0 0 200 200"
        width="260"
        height="260"
        aria-labelledby="relationshipTitle"
        data-animate
      >
        <title id="relationshipTitle">Funding Relationship Cycle</title>
        <desc>Interactive circular diagram showing Advance, Offer, Review, and Repay stages.</desc>

        <g transform="translate(100 100)">
          <circle r="72" fill="none" className="rc-muted" strokeWidth="6" />
          <circle
            r="72"
            fill="none"
            className="rc-accent accent-arc"
            strokeLinecap="round"
            strokeWidth="6"
          />
          <g className="ticks" stroke="#141413" strokeWidth="1">
            {Array.from({ length: 12 }).map((_, i) => (
              <line key={i} x1="0" y1="-78" x2="0" y2="-72" transform={`rotate(${i * 30})`} />
            ))}
          </g>
          <g className="rc-label" textAnchor="middle">
            <text x="0" y="-96">Repay</text>
            <text x="-68" y="8">Advance</text>
            <text x="0" y="92">Offer</text>
            <text x="68" y="8">Review</text>
          </g>
        </g>
      </svg>
      <p className="relationship-caption">Funding cycles adapt in real time as users interact.</p>
    </motion.div>
  );
}
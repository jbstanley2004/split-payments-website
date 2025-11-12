"use client";
import React, { useEffect, useRef } from 'react';
import { useScroll } from 'framer-motion';

const steps = [
  { key: 'sales', title: 'Sales processed', desc: 'Transactions flow through your linked channels.' },
  { key: 'repay', title: 'Repayments flow', desc: 'A small percentage of sales automatically repays the advance.' },
  { key: 'unlock', title: 'Next round unlocked', desc: 'Performance-based eligibility opens your next offer.' },
];

export default function FundingLoopVertical({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 90%','end 10%'] });
  useEffect(() => {
    const unsub = scrollYProgress.on('change', (p) => {
      ref.current?.style.setProperty('--rail', String(Math.round(Math.max(0, Math.min(100, p*100)))));
    });
    return () => unsub?.();
  }, [scrollYProgress]);

  return (
    <div ref={ref} className={className}>
      <div className="grid md:grid-cols-12 gap-x-10 gap-y-8 items-start">
        <div className="md:col-span-5">
          <div className="md:sticky md:top-24">
            <div className="fl-rail">
              {steps.map((s, i) => (
                <div key={s.key} className="fl-marker" style={{ ['--i' as any]: i }} aria-hidden />
              ))}
            </div>
          </div>
        </div>
        <div className="md:col-span-7 space-y-10">
          <h2 className="text-3xl md:text-4xl font-poppins font-semibold text-[var(--theme-text-primary)]">Funding loop</h2>
          {steps.map((s, i) => (
            <article key={s.key} className="fl-step">
              <header className="flex items-baseline gap-3">
                <span className="fl-step-num">{String(i+1).padStart(2,'0')}</span>
                <h3 className="text-xl md:text-2xl font-poppins">{s.title}</h3>
              </header>
              <p className="mt-2 text-[var(--theme-text-secondary)]">{s.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

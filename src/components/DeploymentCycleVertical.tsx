"use client";
import React, { useEffect, useRef } from 'react';
import { useScroll } from 'framer-motion';

const steps = [
  { key: 'agreement', title: 'Agreement signed', desc: 'Mutual terms confirmed and onboarding kicks off.' },
  { key: 'activated', title: 'Merchant account activated', desc: 'Compliance verified and settlement account linked.' },
  { key: 'deployed',  title: 'Funds deployed', desc: 'Capital lands and repayment cadence begins.' },
];

export default function DeploymentCycleVertical({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 90%','end 10%'] });

  useEffect(() => {
    const unsub = scrollYProgress.on('change', (p) => {
      const pct = Math.max(0, Math.min(100, Math.round(p * 100)));
      ref.current?.style.setProperty('--rail', String(pct));
    });
    return () => unsub?.();
  }, [scrollYProgress]);

  return (
    <div ref={ref} className={className}>
      <div className="grid md:grid-cols-12 gap-x-10 gap-y-8 items-start">
        {/* Sticky rail */}
        <div className="md:col-span-5">
          <div className="md:sticky md:top-24">
            <div className="dc-rail">
              {steps.map((s, i) => (
                <div key={s.key} className="dc-marker" style={{ ['--i' as any]: i }} aria-hidden />
              ))}
            </div>
          </div>
        </div>

        {/* Step content */}
        <div className="md:col-span-7 space-y-10">
          <h2 className="text-3xl md:text-4xl font-poppins font-semibold text-[var(--theme-text-primary)]">Deployment cycle</h2>
          {steps.map((s, i) => (
            <article key={s.key} className="dc-step">
              <header className="flex items-baseline gap-3">
                <span className="dc-step-num">{String(i+1).padStart(2,'0')}</span>
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

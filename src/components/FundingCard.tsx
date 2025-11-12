"use client";
import { useState, useMemo } from "react";

/**
 * Lightweight interactive funding card used in the Funding hero.
 * - Sliders: Advance amount, Holdback %, Daily card sales
 * - Live outputs: Estimated daily remit & estimated days to repay
 * - No external state; purely presentational for marketing page
 */
export default function FundingCard() {
  const [advance, setAdvance] = useState(10000);
  const [holdback, setHoldback] = useState(12);
  const [dailySales, setDailySales] = useState(1500);

  const dailyRemit = useMemo(() => +(dailySales * (holdback/100)).toFixed(2), [dailySales, holdback]);
  const estDays = useMemo(() => Math.max(1, Math.round(advance / Math.max(1, dailyRemit))), [advance, dailyRemit]);

  // small accent arc that grows/shrinks with holdback to hint at "review cadence" health
  const arcCirc = 2 * Math.PI * 36;
  const arcProgress = Math.min(1, Math.max(0.05, holdback / 25)); // 0-25% range visualized
  const dash = `${(arcCirc * arcProgress).toFixed(1)} ${arcCirc.toFixed(1)}`;

  return (
    <div className="relative w-full max-w-[520px] rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#0a0a0a] p-6 shadow-[0_20px_50px_rgba(0,0,0,0.08)]">
      <div className="flex items-center justify-between">
        <h3 className="font-poppins text-xl font-semibold text-[var(--theme-text-primary)]">Funding settings</h3>
        <div className="relative h-20 w-20">
          <svg viewBox="0 0 100 100" className="absolute inset-0">
            <circle cx="50" cy="50" r="36" fill="none" stroke="#e5e5e5" strokeWidth="6"/>
            <circle cx="50" cy="50" r="36" fill="none" stroke="#d97757" strokeWidth="6" strokeLinecap="round" strokeDasharray={dash} transform="rotate(-90 50 50)"/>
          </svg>
          <div className="absolute inset-0 grid place-items-center">
            <span className="font-poppins text-sm">{holdback}%</span>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="mt-4 space-y-5">
        <label className="block">
          <span className="block text-sm font-lora mb-2">Advance amount</span>
          <div className="flex items-center gap-3">
            <input type="range" min={2000} max={75000} step={500} value={advance} onChange={(e)=>setAdvance(+e.target.value)} className="w-full"/>
            <span className="font-poppins text-sm">${'{'}advance.toLocaleString(){'}'}</span>
          </div>
        </label>
        <label className="block">
          <span className="block text-sm font-lora mb-2">Holdback</span>
          <div className="flex items-center gap-3">
            <input aria-label="Holdback percentage" type="range" min={5} max={25} step={1} value={holdback} onChange={(e)=>setHoldback(+e.target.value)} className="w-full"/>
            <span className="font-poppins text-sm">{holdback}%</span>
          </div>
        </label>
        <label className="block">
          <span className="block text-sm font-lora mb-2">Daily card sales</span>
          <div className="flex items-center gap-3">
            <input type="range" min={200} max={5000} step={50} value={dailySales} onChange={(e)=>setDailySales(+e.target.value)} className="w-full"/>
            <span className="font-poppins text-sm">${'{'}dailySales.toLocaleString(){'}'}</span>
          </div>
        </label>
      </div>

      {/* Outputs */}
      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="rounded-xl border border-black/10 dark:border-white/10 p-3">
          <div className="text-[10px] uppercase tracking-wide text-black/60 dark:text-white/60">Est. daily remit</div>
          <div className="font-poppins text-2xl">${'{'}dailyRemit.toLocaleString(undefined,{style:'currency',currency:'USD'}){'}'}</div>
        </div>
        <div className="rounded-xl border border-black/10 dark:border-white/10 p-3">
          <div className="text-[10px] uppercase tracking-wide text-black/60 dark:text-white/60">Est. days to repay</div>
          <div className="font-poppins text-2xl">{estDays}</div>
        </div>
      </div>
    </div>
  );
}

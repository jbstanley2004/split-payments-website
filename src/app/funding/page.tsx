"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function FundingPage() {
  const [advance, setAdvance] = useState(15000);
  const [holdback, setHoldback] = useState(15);

  const fee = advance * 0.12;
  const total = advance + fee;

  return (
    <main>
      {/* HOW FUNDING WORKS */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-semibold">How funding works</h1>
            <p className="mt-4 text-lg text-[var(--text-body)]">
              Split provides funding against your future card sales. We advance you a lump sum, and you repay it automatically with a small percentage of your daily sales.
            </p>
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="border border-[var(--border-subtle)] rounded-[var(--radius-block)] p-8 md:p-12">
            <h3 className="font-sans text-sm font-bold uppercase tracking-widest text-[var(--text-muted)]">Day 0</h3>
            <p className="mt-2 text-2xl md:text-3xl font-serif">
              You receive a lump sum of capital to invest in your business. Use it for inventory, marketing, expansion, or whatever you need to grow.
            </p>
          </div>
        </div>
      </section>

      {/* THE LOOP DIAGRAM */}
      <section className="py-16">
        <div className="container mx-auto px-6 text-center">
            <h2 className="text-4xl md:text-5xl font-semibold">The Funding Loop</h2>
            <p className="mt-4 text-lg text-[var(--text-body)] max-w-2xl mx-auto">
                Our model creates a virtuous cycle: you use the funding to grow your sales, and your sales automatically repay the funding.
            </p>
            <div className="mt-12 flex justify-center items-center space-x-8">
                <div className="text-center">
                    <div className="w-24 h-24 rounded-full border-2 border-black flex items-center justify-center font-sans text-sm">Funding</div>
                </div>
                <div className="text-black">→</div>
                <div className="text-center">
                    <div className="w-24 h-24 rounded-full border-2 border-black flex items-center justify-center font-sans text-sm">Growth</div>
                </div>
                <div className="text-black">→</div>
                <div className="text-center">
                    <div className="w-24 h-24 rounded-full border-2 border-black flex items-center justify-center font-sans text-sm">Sales</div>
                </div>
                <div className="text-black">→</div>
                <div className="text-center">
                    <div className="w-24 h-24 rounded-full border-2 border-black flex items-center justify-center font-sans text-sm">Repayment</div>
                </div>
            </div>
        </div>
      </section>

      {/* FUNDING CALCULATOR */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="notion-card md:w-1/2 mx-auto">
            <h3 className="text-2xl font-semibold text-center">Funding Calculator</h3>
            <div className="mt-8">
              <label className="block font-sans text-sm font-medium text-[var(--text-muted)]">Funding Amount</label>
              <input
                type="range"
                min="1000"
                max="50000"
                step="1000"
                value={advance}
                onChange={(e) => setAdvance(Number(e.target.value))}
                className="w-full mt-2"
              />
              <div className="flex justify-between mt-1 font-sans text-xs text-[var(--text-muted)]">
                <span>$1,000</span>
                <span>$50,000</span>
              </div>
            </div>
            <div className="mt-8">
              <label className="block font-sans text-sm font-medium text-[var(--text-muted)]">Holdback Percentage</label>
              <input
                type="range"
                min="5"
                max="25"
                step="1"
                value={holdback}
                onChange={(e) => setHoldback(Number(e.target.value))}
                className="w-full mt-2"
              />
               <div className="flex justify-between mt-1 font-sans text-xs text-[var(--text-muted)]">
                <span>5%</span>
                <span>25%</span>
              </div>
            </div>
            <div className="mt-12 text-center">
              <p className="font-sans text-sm text-[var(--text-muted)]">You receive</p>
              <p className="font-serif text-6xl font-bold">${advance.toLocaleString()}</p>
              <p className="mt-4 font-sans text-sm text-[var(--text-muted)]">
                Total to repay: ${total.toLocaleString()} at {holdback}% of daily sales.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

// Basic slider styling to match Notion's aesthetic
const Slider = ({ ...props }) => {
  return (
    <input
      type="range"
      {...props}
      className="w-full h-2 bg-[var(--border-subtle)] rounded-lg appearance-none cursor-pointer"
      style={{
        '--thumb-bg': 'black',
        '--track-bg': '#D3D1CB',
      }}
    />
  );
};

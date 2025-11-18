"use client";
import React from 'react';
import { motion } from 'framer-motion';

const chipsData = [
  { label: 'CARDS', type: 'text' },
  { label: 'FUNDING', type: 'chip', variant: 'blue' },
  { label: 'WORKFLOWS', type: 'chip', variant: 'sage' },
  { label: 'APPROVALS', type: 'chip', variant: 'rose' },
  { label: 'PARTNERS', type: 'text' },
];

export const HeroTopicChips = () => {
  return (
    <motion.div
      className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 mt-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {chipsData.map(({ label, type, variant }) => {
        if (type === 'text') {
          return (
            <span key={label} className="text-sm font-medium text-main uppercase tracking-widest">
              {label}
            </span>
          );
        }
        return (
          <div key={label} className={`chip chip--${variant}`}>
            <span className="dot" />
            <span>{label}</span>
          </div>
        );
      })}
    </motion.div>
  );
};

import React from "react";
import { motion } from "framer-motion";
import "./FundingCard.css";

type FundingCardProps = {
  advance: number;
  holdback: number;
  sales: number;
  setAdvance: (value: number) => void;
  setHoldback: (value: number) => void;
  setSales: (value: number) => void;
};

const TRACK_DARK = "#3b3a36";
const ADVANCE_COLOR = "#8A6B9B"; // purple
const HOLDBACK_COLOR = "#6A9BCC"; // blue
const SALES_COLOR = "#BCD1CA"; // greenish

function percentage(value: number, min: number, max: number): number {
  const clamped = Math.min(Math.max(value, min), max);
  return ((clamped - min) / (max - min)) * 100;
}

export default function FundingCard({
  advance,
  holdback,
  sales,
  setAdvance,
  setHoldback,
  setSales,
}: FundingCardProps) {
  const remit = (sales * (holdback / 100)).toFixed(2);

  const advancePercent = percentage(advance, 10000, 100000);
  const holdbackPercent = percentage(holdback, 5, 25);
  const salesPercent = percentage(sales, 500, 10000);

  return (
    <motion.div
      className="funding-card"
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="funding-title">Funding settings</h2>
      <p className="funding-subtitle">
        Adjust the sliders to see how your estimated daily remit changes.
      </p>

      {/* Advance amount */}
      <div className="slider advance-slider">
        <div className="slider-header">
          <label htmlFor="advance">Advance amount</label>
          <span className="slider-value">${advance.toLocaleString()}</span>
        </div>
        <p className="slider-helper">Total capital you receive upfront.</p>

        <div className="slider-track-wrapper">
          <div
            className="slider-track-base"
            style={{ backgroundColor: TRACK_DARK }}
          />
          <div
            className="slider-track-fill"
            style={{
              width: `${advancePercent}%`,
              backgroundColor: ADVANCE_COLOR,
            }}
          />
          <input
            id="advance"
            type="range"
            min={10000}
            max={100000}
            value={advance}
            onChange={(e) => setAdvance(+e.target.value)}
          />
        </div>
      </div>

      {/* Holdback rate */}
      <div className="slider holdback-slider">
        <div className="slider-header">
          <label htmlFor="holdback">Holdback rate</label>
          <span className="slider-value">{holdback}%</span>
        </div>
        <p className="slider-helper">Percent of daily card sales you remit.</p>

        <div className="slider-track-wrapper">
          <div
            className="slider-track-base"
            style={{ backgroundColor: TRACK_DARK }}
          />
          <div
            className="slider-track-fill"
            style={{
              width: `${holdbackPercent}%`,
              backgroundColor: HOLDBACK_COLOR,
            }}
          />
          <input
            id="holdback"
            type="range"
            min={5}
            max={25}
            value={holdback}
            onChange={(e) => setHoldback(+e.target.value)}
          />
        </div>
      </div>

      {/* Daily card sales */}
      <div className="slider sales-slider">
        <div className="slider-header">
          <label htmlFor="sales">Daily card sales</label>
          <span className="slider-value">${sales.toLocaleString()}</span>
        </div>
        <p className="slider-helper">
          Average card sales your business processes per day.
        </p>

        <div className="slider-track-wrapper">
          <div
            className="slider-track-base"
            style={{ backgroundColor: TRACK_DARK }}
          />
          <div
            className="slider-track-fill"
            style={{
              width: `${salesPercent}%`,
              backgroundColor: SALES_COLOR,
            }}
          />
          <input
            id="sales"
            type="range"
            min={500}
            max={10000}
            value={sales}
            onChange={(e) => setSales(+e.target.value)}
          />
        </div>
      </div>

      <motion.div layout className="metrics">
        <div>
          <p className="label">Est. daily remit</p>
          <p className="value">${remit}</p>
        </div>
      </motion.div>

      <div className="disclaimer">
        <small>
          Funding estimates are illustrative only and not guarantees of future
          results.
        </small>
      </div>
    </motion.div>
  );
}


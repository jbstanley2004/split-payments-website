"use client";

import React from 'react';
import '@/styles/twinkling-stars.css';

/**
 * Full-viewport twinkling stars background.
 *
 * This is a React-friendly wrapper around public/pure-css-twinkling-stars-background,
 * using the same remote assets but keeping it behind the content and non-interactive.
 */
export default function TwinklingStarsBackground() {
  return (
    <div
      className="background-stars-container"
      aria-hidden="true"
    >
      <div className="background-stars-layer background-stars-base" />
      <div className="background-stars-layer background-stars-stars" />
      <div className="background-stars-layer background-stars-twinkling" />
      <div className="background-stars-layer background-stars-clouds" />
    </div>
  );
}

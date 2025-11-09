import React from 'react';

/**
 * A single elaborate page-wide backdrop (Rivian/Ghibli vibe).
 * Fixed behind all content. Multiple layers drift subtly.
 * Colors are driven by CSS variables defined in rivian.css / globals.
 */
export default function GlobalBackdrop() {
  return (
    <div className="global-backdrop" aria-hidden="true">
      <div className="gb-layer gb-sky" />
      <div className="gb-layer gb-sun" />
      <div className="gb-layer gb-far" />
      <div className="gb-layer gb-mid" />
      <div className="gb-layer gb-fore" />
      <div className="gb-layer gb-haze" />
      <div className="gb-layer gb-grain" />
    </div>
  );
}

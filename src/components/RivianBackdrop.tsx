import React from 'react';

export function RivianBackdrop() {
  return (
    <div className="rivian-bg" aria-hidden="true">
      <div className="rivian-layer rivian-layer--sky" aria-hidden="true" />
      <div className="rivian-layer rivian-layer--haze" aria-hidden="true" />
      <div className="rivian-layer rivian-layer--ridge-left" aria-hidden="true" />
      <div className="rivian-layer rivian-layer--ridge-right" aria-hidden="true" />
    </div>
  );
}

export default RivianBackdrop;

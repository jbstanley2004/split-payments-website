import React from "react";

const ShippingBoxIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="box-glint" x1="50%" y1="0%" x2="50%" y2="100%">
        <stop stopColor="#788c5d" stopOpacity="1" offset="0%" />
        <stop stopColor="#788c5d" stopOpacity="0" offset="100%" />
      </linearGradient>
    </defs>
    <path
      d="M21 8.5v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-10l3.5-3.5h11L21 8.5Z"
      fill="#141413"
      stroke="rgba(250, 249, 245, 0.8)"
    />
    <path
      d="m3.5 9 8.5 4 8.5-4m-17 0V5.5L7 2h10l3.5 3.5V9"
      stroke="rgba(250, 249, 245, 1)"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 13v9"
      stroke="rgba(250, 249, 245, 1)"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <rect
      x="3"
      y="5"
      width="18"
      height="15.5"
      rx="2"
      fill="url(#box-glint)"
      fillOpacity="0.8"
    />
  </svg>
);

export default ShippingBoxIcon;
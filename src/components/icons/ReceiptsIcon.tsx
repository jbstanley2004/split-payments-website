import React from "react";

const ReceiptsIcon = ({ className }: { className?: string }) => (
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
      <linearGradient
        id="receipt-glint"
        x1="50%"
        y1="0%"
        x2="50%"
        y2="100%"
      >
        <stop stopColor="#6a9bcc" stopOpacity="1" offset="0%" />
        <stop stopColor="#6a9bcc" stopOpacity="0" offset="100%" />
      </linearGradient>
    </defs>
    <path
      d="M5 3a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H5Zm2.5 4h9m-9 4h9m-9 4h5"
      fill="#141413"
      stroke="rgba(250, 249, 245, 0.8)"
    />
    <path
      d="M7.5 7h9m-9 4h9m-9 4h5"
      stroke="rgba(250, 249, 245, 1)"
      strokeWidth="1.2"
      strokeLinecap="round"
    />
    <rect
      x="3"
      y="3"
      width="18"
      height="18"
      rx="2"
      fill="url(#receipt-glint)"
      fillOpacity="0.8"
    />
  </svg>
);

export default ReceiptsIcon;
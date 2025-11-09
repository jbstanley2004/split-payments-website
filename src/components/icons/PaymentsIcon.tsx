import React from "react";

const PaymentsIcon = ({ className }: { className?: string }) => (
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
      <linearGradient id="payments-glint" x1="50%" y1="0%" x2="50%" y2="100%">
        <stop stopColor="#788c5d" stopOpacity="1" offset="0%" />
        <stop stopColor="#788c5d" stopOpacity="0" offset="100%" />
      </linearGradient>
    </defs>
    <path
      d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z"
      fill="#141413"
      stroke="rgba(250, 249, 245, 0.8)"
    />
    <path
      d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z"
      fill="url(#payments-glint)"
      fillOpacity="0.8"
    />
    <path
      d="M15.5 15.5a5 5 0 0 0-7-7"
      stroke="rgba(250, 249, 245, 1)"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M10 10.5h1.5V12"
      stroke="rgba(250, 249, 245, 1)"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="m13 13.5 1-1"
      stroke="rgba(250, 249, 245, 1)"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9 15v-1.5H7.5"
      stroke="rgba(250, 249, 245, 1)"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default PaymentsIcon;
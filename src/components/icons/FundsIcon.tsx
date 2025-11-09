import React from "react";

const FundsIcon = ({ className }: { className?: string }) => (
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
      <linearGradient id="funds-glint" x1="50%" y1="0%" x2="50%" y2="100%">
        <stop stopColor="#6a9bcc" stopOpacity="1" offset="0%" />
        <stop stopColor="#6a9bcc" stopOpacity="0" offset="100%" />
      </linearGradient>
    </defs>
    <path
      d="M10 5.5h10.5a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H10"
      fill="#141413"
      stroke="rgba(250, 249, 245, 0.8)"
    />
    <path
      d="M13 12h5m-5 3h2"
      stroke="rgba(250, 249, 245, 1)"
      strokeWidth="1.2"
      strokeLinecap="round"
    />
    <rect
      x="10"
      y="5.5"
      width="12.5"
      height="13"
      rx="2"
      fill="url(#funds-glint)"
      fillOpacity="0.8"
    />
    <path
      d="M6.5 3.5h10a2 2 0 0 1 2 2V15a2 2 0 0 1-2 2h-10a2 2 0 0 1-2-2V5.5a2 2 0 0 1 2-2Z"
      fill="#141413"
      stroke="rgba(250, 249, 245, 0.8)"
    />
    <path
      d="M8 9.5h5m-5 3h2"
      stroke="rgba(250, 249, 245, 1)"
      strokeWidth="1.2"
      strokeLinecap="round"
    />
    <rect
      x="4.5"
      y="3.5"
      width="14"
      height="13.5"
      rx="2"
      fill="url(#funds-glint)"
      fillOpacity="0.8"
    />
    <path
      d="M3 19.5h14.5"
      stroke="rgba(250, 249, 245, 1)"
      strokeWidth="1.2"
      strokeLinecap="round"
    />
  </svg>
);

export default FundsIcon;
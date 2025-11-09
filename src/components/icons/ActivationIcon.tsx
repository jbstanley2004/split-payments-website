import React from "react";

const ActivationIcon = ({ className }: { className?: string }) => (
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
        id="activation-glint"
        x1="50%"
        y1="0%"
        x2="50%"
        y2="100%"
      >
        <stop stopColor="#d97757" stopOpacity="1" offset="0%" />
        <stop stopColor="#d97757" stopOpacity="0" offset="100%" />
      </linearGradient>
    </defs>
    <path
      d="M12 4.5a7.5 7.5 0 0 0-7.5 7.5c0 2.05.83 3.9 2.18 5.25"
      fill="none"
      stroke="rgba(250, 249, 245, 1)"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M12 4.5a7.5 7.5 0 0 1 7.5 7.5c0 2.05-.83 3.9-2.18 5.25"
      fill="#141413"
      stroke="rgba(250, 249, 245, 0.8)"
    />
    <path
      d="M12 4.5a7.5 7.5 0 0 1 7.5 7.5c0 2.05-.83 3.9-2.18 5.25"
      stroke="url(#activation-glint)"
      strokeOpacity="1"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z"
      fill="#141413"
      stroke="rgba(250, 249, 245, 0.8)"
    />
    <path
      d="M12 9.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5Z"
      fill="url(#activation-glint)"
      fillOpacity="1"
    />
    <path
      d="M4 12.5h1m18 0h-1m-8.5-8.5v-1m0 18v-1"
      stroke="rgba(250, 249, 245, 1)"
      strokeWidth="1.2"
      strokeLinecap="round"
    />
  </svg>
);

export default ActivationIcon;
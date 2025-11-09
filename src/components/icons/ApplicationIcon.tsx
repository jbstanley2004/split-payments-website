import React from "react";

const ApplicationIcon = ({ className }: { className?: string }) => (
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
        id="app-glint"
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
      d="M8.5 3h7A1.5 1.5 0 0 1 17 4.5v15a1.5 1.5 0 0 1-1.5 1.5h-7A1.5 1.5 0 0 1 7 19.5v-15A1.5 1.5 0 0 1 8.5 3Z"
      fill="#141413"
      stroke="rgba(250, 249, 245, 0.8)"
    />
    <path
      d="M9.5 7h5M9.5 11h5M9.5 15h3"
      stroke="rgba(250, 249, 245, 1)"
      strokeWidth="1.2"
      strokeLinecap="round"
    />
    <rect
      x="7"
      y="3"
      width="10"
      height="18"
      rx="1.5"
      fill="url(#app-glint)"
      fillOpacity="0.8"
    />
  </svg>
);

export default ApplicationIcon;
import React from "react";
import { cn } from "@/lib/utils";

interface PrimaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "default" | "gradient-border" | "outline-orange" | "outline-gray";
}

export const PrimaryButton = React.forwardRef<HTMLButtonElement, PrimaryButtonProps>(
  ({ className, children, variant = "default", ...props }, ref) => {
    if (variant === "gradient-border") {
      return (
        <button
          ref={ref}
          className={cn(
            "relative inline-flex items-center justify-center rounded-full p-[1.5px] bg-gradient-to-r from-[#ff8454] via-[#ff5400] to-[#ff8454] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_14px_38px_-26px_rgba(255,84,0,0.85)] active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black whitespace-nowrap text-center",
            className
          )}
          {...props}
        >
          <span className="absolute inset-0 rounded-full bg-gradient-to-r from-[#ff8454] via-[#ff5400] to-[#ff8454] opacity-80 blur-[0.5px]" />
          <span className="relative inline-flex items-center justify-center px-8 py-4 rounded-full bg-black text-white font-poppins font-medium text-lg tracking-tight whitespace-nowrap text-center">
            {children}
          </span>
        </button>
      );
    }

    if (variant === "outline-orange") {
      return (
        <button
          ref={ref}
          className={cn(
            "inline-flex items-center justify-center rounded-full border border-[#111111] bg-transparent px-6 py-3 font-poppins font-medium text-base tracking-tight text-[#111111] transition-all duration-300 hover:bg-[#111111]/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#111111] disabled:opacity-50 disabled:pointer-events-none whitespace-nowrap text-center",
            className
          )}
          {...props}
        >
          {children}
        </button>
      );
    }

    if (variant === "outline-gray") {
      return (
        <button
          ref={ref}
          className={cn(
            "inline-flex items-center justify-center rounded-full border border-gray-200 bg-white px-6 py-3 font-poppins font-medium text-base tracking-tight text-gray-600 transition-all duration-300 hover:bg-gray-50 hover:text-black shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-200 disabled:opacity-50 disabled:pointer-events-none whitespace-nowrap text-center",
            className
          )}
          {...props}
        >
          {children}
        </button>
      );
    }

    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center bg-black text-white px-6 py-3 rounded-full font-poppins font-medium text-base transition-all duration-300 hover:scale-[1.02] hover:shadow-lg active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none whitespace-nowrap text-center",
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);
PrimaryButton.displayName = "PrimaryButton";

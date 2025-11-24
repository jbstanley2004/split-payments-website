import React from "react";
import { cn } from "@/lib/utils";

interface PrimaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "default" | "gradient-border";
}

export const PrimaryButton = React.forwardRef<HTMLButtonElement, PrimaryButtonProps>(
  ({ className, children, variant = "default", ...props }, ref) => {
    if (variant === "gradient-border") {
      return (
        <button
          ref={ref}
          className={cn(
            "relative inline-flex items-center justify-center rounded-full p-[1.5px] bg-gradient-to-r from-[#ff8454] via-[#ff5400] to-[#ff8454] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_14px_38px_-26px_rgba(255,84,0,0.85)] active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black",
            className
          )}
          {...props}
        >
          <span className="absolute inset-0 rounded-full bg-gradient-to-r from-[#ff8454] via-[#ff5400] to-[#ff8454] opacity-80 blur-[0.5px]" />
          <span className="relative inline-flex items-center justify-center px-8 py-4 rounded-full bg-black text-white font-poppins font-medium text-lg tracking-tight">
            {children}
          </span>
        </button>
      );
    }

    return (
      <button
        ref={ref}
        className={cn(
          "bg-black text-white px-8 py-4 rounded-full font-poppins font-medium text-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none",
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

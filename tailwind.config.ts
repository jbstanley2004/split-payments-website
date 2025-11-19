import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: {
          DEFAULT: '#FFFFFF', 
          subtle: '#FAFAFA',
          dark: '#0A0A0A',
        },
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Refined Brand Colors - Monochrome with depth
        brand: {
          black: "#111111",     // Slightly softer than pure black
          charcoal: "#222222",   // Secondary dark
          gray: "#F5F5F5",      // Very light gray for hover states
          stone: "#E5E5E5",     // Border gray
        },
      },
      fontFamily: {
        // Reverting to cleaner stack preference
        sans: ['"Inter Tight"', "system-ui", "sans-serif"],
        serif: ['"Source Serif 4"', "Georgia", "serif"],
        poppins: ["var(--font-poppins)", "sans-serif"],
        lora: ["var(--font-lora)", "serif"],
      },
      boxShadow: {
        'elevation-low': '0 2px 4px rgba(0,0,0,0.03), 0 1px 2px rgba(0,0,0,0.02)',
        'elevation-mid': '0 8px 16px rgba(0,0,0,0.04), 0 2px 4px rgba(0,0,0,0.02)',
        'elevation-high': '0 24px 48px rgba(0,0,0,0.06), 0 4px 8px rgba(0,0,0,0.02)',
        'glow-white': '0 0 20px rgba(255,255,255,0.5)',
      },
      backgroundImage: {
        'shimmer': 'linear-gradient(45deg, rgba(255,255,255,0) 40%, rgba(255,255,255,0.5) 50%, rgba(255,255,255,0) 60%)',
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in-up": {
            "0%": { opacity: "0", transform: "translateY(10px)" },
            "100%": { opacity: "1", transform: "translateY(0)" },
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in-up": "fade-in-up 0.6s ease-out forwards",
      },
    },
  },
  plugins: [],
} satisfies Config;
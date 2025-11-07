import { Providers } from "@/components/providers";
import StyledComponentsRegistry from "@/lib/styled-components";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { JetBrains_Mono } from "next/font/google";
import "@/styles/globals.css";

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

const baseUrl = "https://splitpayments.com";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Split — Payments & Merchant Funding",
    template: "%s | Split",
  },
  description:
    "Accept payments, access fast working capital, and grow with Split credit card split funding.",
  openGraph: {
    title: "Split — Payments & Merchant Funding",
    description:
      "Accept payments, access fast working capital, and grow with Split credit card split funding.",
    url: baseUrl,
    siteName: "Split",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    title: "Split — Payments & Merchant Funding",
    description:
      "Accept payments, access fast working capital, and grow with Split credit card split funding.",
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport = {
  themeColor: "#FF6600",
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={jetbrains.variable} suppressHydrationWarning>
      <body>
        <StyledComponentsRegistry>
          <Providers>{children}</Providers>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}

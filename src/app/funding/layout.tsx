import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Merchant Funding and Payment Solutions",
  description:
    "Access flexible working capital through Split's sales based funding platform. Accept payments, manage transactions, and fund your business growth with one connected solution.",
  keywords: [
    "merchant cash advance",
    "split funding",
    "working capital",
    "payment processing",
    "merchant services",
    "business funding",
  ],
  openGraph: {
    title: "Flexible Merchant Funding with Split",
    description:
      "Split empowers businesses to access capital through daily card sales while managing payments, reporting, and growth from one streamlined platform.",
    type: "website",
  },
};

export default function FundingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

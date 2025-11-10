import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Payment Processing and Merchant Services",
  description:
    "Streamline your business with Split's all-in-one payment platform. Accept cards, checks, ACH, and more while unlocking flexible merchant funding through daily transactions.",
  keywords: [
    "payment processing",
    "merchant services",
    "credit card acceptance",
    "ACH payments",
    "business funding",
    "merchant cash advance",
    "split funding",
  ],
  openGraph: {
    title: "Smarter Payment Processing with Split",
    description:
      "Simplify payments and cash flow with Split's connected platform for credit card acceptance, ACH transfers, and merchant funding.",
    type: "website",
  },
};

export default function PaymentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

import { Providers } from '@/components/providers';
import { DynamicThemeColor } from '@/components/dynamic-theme-color';
import StyledComponentsRegistry from '@/lib/styled-components';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Inter } from 'next/font/google';
import { Lora } from 'next/font/google';
import { Poppins } from 'next/font/google';
import '@/styles/globals.css';
import ScrollStitch from '@/components/ScrollStitch';
import FooterBeamClient from '@/components/FooterBeamClient';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const lora = Lora({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-lora',
  display: 'swap',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
});

const baseUrl = 'https://splitpayments.com';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'Split — Payments & Merchant Funding',
    template: '%s | Split',
  },
  description:
    'Accept payments, access fast working capital, and grow with Split credit card split funding.',

  openGraph: {
    title: 'Split — Payments & Merchant Funding',
    description:
      'Accept payments, access fast working capital, and grow with Split credit card split funding.',
    url: baseUrl,
    siteName: 'Split',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    title: 'Split — Payments & Merchant Funding',
    description:
      'Accept payments, access fast working capital, and grow with Split credit card split funding.',
    card: 'summary_large_image',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#d97757' },
    { media: '(prefers-color-scheme: dark)', color: '#1a1a1a' },
  ],
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang='en' className={`${inter.variable} ${lora.variable} ${poppins.variable}`} suppressHydrationWarning>
      <head>
        <meta name='mobile-web-app-capable' content='yes' />
        <meta name='apple-mobile-web-app-capable' content='yes' />
        <meta name='apple-mobile-web-app-status-bar-style' content='black-translucent' />
        <meta name='format-detection' content='telephone=no' />
        <script src='https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js'></script>
        <script src='https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js'></script>
        <script src='https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/Observer.min.js'></script>
        <script src='https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/Draggable.min.js'></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function() {
              try {
                var isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                document.documentElement.classList.remove('light', 'dark');
                document.documentElement.classList.add(isDark ? 'dark' : 'light');
              } catch (e) {
                document.documentElement.classList.add('light');
              }
            })();`,
          }}
        />
      </head>
      <body>
        <DynamicThemeColor />
        <StyledComponentsRegistry>
          <Providers>{children}</Providers>
        </StyledComponentsRegistry>
        <ScrollStitch />
        <FooterBeamClient />
      </body>
    </html>
  );
}

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

  // Favicons and app icons
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-48x48.png', sizes: '48x48', type: 'image/png' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/apple-touch-icon-180x180.png', sizes: '180x180', type: 'image/png' },
    ],
  },

  // PWA manifest
  manifest: '/site.webmanifest',

  openGraph: {
    title: 'Split — Payments & Merchant Funding',
    description:
      'Accept payments, access fast working capital, and grow with Split credit card split funding.',
    url: baseUrl,
    siteName: 'Split',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og-image-1200x630.png',
        width: 1200,
        height: 630,
        alt: 'Split — Payments & Merchant Funding',
      },
    ],
  },
  twitter: {
    title: 'Split — Payments & Merchant Funding',
    description:
      'Accept payments, access fast working capital, and grow with Split credit card split funding.',
    card: 'summary_large_image',
    images: ['/og-image-1200x630.png'],
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
        <script
          src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`}
          async
          defer
        ></script>
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

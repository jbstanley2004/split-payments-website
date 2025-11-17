import { Providers } from '@/components/providers';
import { DynamicThemeColor } from '@/components/dynamic-theme-color';
import StyledComponentsRegistry from '@/lib/styled-components';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Poppins, Lora } from 'next/font/google';
import '@/styles/globals.css';
import ScrollStitch from '@/components/ScrollStitch';
import FooterBeamClient from '@/components/FooterBeamClient';
import Image from 'next/image';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
});

const lora = Lora({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-lora',
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
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico' },
      { url: '/favicon.png', type: 'image/png', sizes: '32x32' },
      { url: '/icon.png', type: 'image/png', sizes: '192x192' },
    ],
    apple: [{ url: '/apple-icon.png', type: 'image/png', sizes: '180x180' }],
  },
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
    <html lang='en' className={`${poppins.variable} ${lora.variable}`} suppressHydrationWarning>
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
      <body className='relative min-h-screen font-lora text-[#141413]'>
        {/* GLOBAL BACKGROUND IMAGE – single source of truth */}
        {/* To change global background, update this Image src */}
        <div className='fixed inset-0 -z-10'>
          <Image
            src='/hero_image_formatted.png'
            alt='Global background'
            fill
            priority
            className='object-cover object-center'
          />
        </div>
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

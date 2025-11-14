import { Providers } from '@/components/providers';
import { DynamicThemeColor } from '@/components/dynamic-theme-color';
import StyledComponentsRegistry from '@/lib/styled-components';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Poppins, Lora } from 'next/font/google';
import '@/styles/globals.css';
import ScrollStitch from '@/components/ScrollStitch';
import FooterBeamClient from '@/components/FooterBeamClient';

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
  themeColor: '#faf9f5',
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang='en' className={`${poppins.variable} ${lora.variable}`} suppressHydrationWarning>
      <head>
        <meta name='mobile-web-app-capable' content='yes' />
        <meta name='apple-mobile-web-app-capable' content='yes' />
        <meta name='apple-mobile-web-app-status-bar-style' content='black-translucent' />
        <meta name='format-detection' content='telephone=no' />
      </head>
      <body className="bg-paper text-ink antialiased">
        <DynamicThemeColor />
        <StyledComponentsRegistry>
          <Providers>
            <div className="min-h-screen flex flex-col bg-paper text-ink">
              <header className="px-6 sm:px-10 pt-8 pb-4">
                <nav className="flex items-center justify-between gap-6">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full border border-mist/60 flex items-center justify-center">
                      <span className="text-xs tracking-[0.22em] uppercase text-mist">
                        SP
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-poppins text-sm tracking-[0.18em] uppercase text-mist">
                        Split
                      </span>
                      <span className="text-xs text-text-soft">
                        Shared payments, quietly handled.
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-xs sm:text-sm">
                    <button className="px-3 py-1.5 rounded-full border border-transparent hover:border-mist/70 transition-all">
                      Log in
                    </button>
                    <button className="px-4 py-1.5 rounded-full border border-ink text-ink text-xs sm:text-sm tracking-wide hover:bg-ink hover:text-paper transition-colors">
                      Get early access
                    </button>
                  </div>
                </nav>
              </header>
              <main className="flex-1 px-6 sm:px-10 pb-10">{children}</main>
              <footer className="px-6 sm:px-10 py-6 text-xs text-text-soft border-t border-stone">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <span>© {new Date().getFullYear()} Split.</span>
                  <div className="flex gap-4">
                    <button className="hover:text-ink">Status</button>
                    <button className="hover:text-ink">Privacy</button>
                    <button className="hover:text-ink">Terms</button>
                  </div>
                </div>
              </footer>
            </div>
          </Providers>
        </StyledComponentsRegistry>
        <ScrollStitch />
        <FooterBeamClient />
      </body>
    </html>
  );
}

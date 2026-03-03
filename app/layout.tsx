import type { Metadata, Viewport } from 'next';
import { Hepta_Slab } from 'next/font/google';
import localFont from 'next/font/local'
import './globals.css';
import Script from 'next/script';
import { Providers } from './providers';
import { Navigation } from '@/src/components/Navigation';

const heptaSlab = Hepta_Slab({
  subsets: ['latin']
})

const gmcafe = localFont({
  src: '../public/gmcafe.ttf',
  variable: '--font-gmcafe'
})

export const metadata: Metadata = {
  openGraph: {
    url: 'https://gmcafe.io',
    type: 'website',
    title: 'Good Morning Café'
  },
  twitter: {
    site: '@gmcafeNFT',
    title: 'Good Morning Café'
  }
};

export const viewport: Viewport = {
  themeColor: '#ff7dbd'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${heptaSlab.className} ${gmcafe.variable} antialiased`}
      >
        <Navigation />
        <Providers>
          {children}
        </Providers>
      </body>
      <Script src="/cursor/trail.js" />
    </html>
  );
}

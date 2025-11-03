import type { Metadata } from "next";
import localFont from 'next/font/local';
import { Great_Vibes } from 'next/font/google';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Providers from './providers';
import "./globals.css";
import "./styles/global-protection.css";

const greatVibes = Great_Vibes({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-great-vibes',
});

const albertSans = localFont({
  src: [
    {
      path: '../public/Fonts/AlbertSans-Light.ttf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../public/Fonts/AlbertSans-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/Fonts/AlbertSans-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/Fonts/AlbertSans-SemiBold.ttf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../public/Fonts/AlbertSans-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-albert-sans',
});

export const metadata: Metadata = {
  title: "Memorial - Pauline Adobea Dadzawa",
  description: "In loving memory of our fiery Adobea",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${albertSans.variable} ${greatVibes.variable}`}>
        <Providers>
          <Navigation />
          <main>
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}

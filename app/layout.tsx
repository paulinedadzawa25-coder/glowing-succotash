import type { Metadata } from "next";
import localFont from 'next/font/local';
import { Great_Vibes } from 'next/font/google';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import "./globals.css";

const greatVibes = Great_Vibes({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-great-vibes',
});

const albertSans = localFont({
  src: [
    {
      path: '../public/images/Fonts/AlbertSans-Light.ttf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../public/images/Fonts/AlbertSans-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/images/Fonts/AlbertSans-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/images/Fonts/AlbertSans-SemiBold.ttf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../public/images/Fonts/AlbertSans-Bold.ttf',
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
        <Navigation />
        <main>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

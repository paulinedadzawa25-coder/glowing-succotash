import type { Metadata } from "next";
import { Dancing_Script, Great_Vibes } from 'next/font/google';
import { GeistSans } from 'geist/font';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import "./globals.css";

const greatVibes = Great_Vibes({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-great-vibes',
});

const dancingScript = Dancing_Script({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-dancing-script',
});

const geistSans = GeistSans;

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
      <body className={`${geistSans.className} ${dancingScript.variable} ${greatVibes.variable}`}>
        <Navigation />
        <main>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

'use client';

import { CldImage } from 'next-cloudinary';
import { CldOgImage } from 'next-cloudinary';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
    </>
  );
}

export const runtime = 'edge';